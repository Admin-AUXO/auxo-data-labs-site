import { findProposal, markProposal, minorUnits, publicView, stripe } from "../lib/proposals.mts";

const SITE = process.env.URL ?? "https://auxodata.com";
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

export default async (req: Request) => {
  const url = new URL(req.url);
  try {
    if (req.method === "GET" && url.searchParams.has("p")) {
      const p = await findProposal(url.searchParams.get("p"));
      if (!p) return json(404, { ok: false });
      return json(200, { ok: true, proposal: publicView(p) });
    }

    if (req.method === "POST") {
      const { p: id } = (await req.json().catch(() => ({}))) as { p?: string };
      const p = await findProposal(id ?? null);
      if (!p) return json(404, { ok: false });
      const view = publicView(p);
      if (view.paid || !view.open || p.due <= 0) return json(409, { ok: false, reason: view.paid ? "paid" : "closed" });
      const params: Record<string, string> = {
        mode: "payment",
        "line_items[0][quantity]": "1",
        "line_items[0][price_data][currency]": p.currency.toLowerCase(),
        "line_items[0][price_data][unit_amount]": String(minorUnits(p.deposit, p.currency)),
        "line_items[0][price_data][product_data][name]": `Deposit (${p.depositPct}%): ${p.covers || "AUXO proposal"}`.slice(0, 250),
        "line_items[0][price_data][product_data][description]": `Proposal ${p.id} for ${p.client}. The balance follows the proposal terms.`.slice(0, 500),
        success_url: `${SITE}/pay/thanks/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE}/pay/?p=${encodeURIComponent(p.id)}`,
        "metadata[proposal_id]": p.id,
        "payment_intent_data[metadata][proposal_id]": p.id,
        "payment_intent_data[description]": `AUXO proposal ${p.id} deposit`,
        client_reference_id: p.id,
      };
      if (p.vat > 0) {
        params["line_items[1][quantity]"] = "1";
        params["line_items[1][price_data][currency]"] = p.currency.toLowerCase();
        params["line_items[1][price_data][unit_amount]"] = String(minorUnits(p.vat, p.currency));
        params["line_items[1][price_data][product_data][name]"] = `VAT (${p.vatPct}%)`;
      }
      if (p.email) params.customer_email = p.email;
      const session = await stripe("checkout/sessions", params);
      await markProposal(p.row, { session: String(session.id) });
      return json(200, { ok: true, url: session.url });
    }

    return json(405, { ok: false });
  } catch (e) {
    console.error(String(e));
    return json(502, { ok: false });
  }
};

export const config = { path: "/api/pay" };
