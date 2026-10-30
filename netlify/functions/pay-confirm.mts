import { findProposal, markProposal, stripe } from "../lib/proposals.mts";

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

export default async (req: Request) => {
  const sessionId = new URL(req.url).searchParams.get("session_id") ?? "";
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return json(400, { ok: false });
  try {
    const session = await stripe(`checkout/sessions/${sessionId}`);
    const id = String((session.metadata as Record<string, string> | undefined)?.proposal_id ?? "");
    const paid = session.payment_status === "paid";
    const p = await findProposal(id);
    if (p && paid && !/^paid$/i.test(p.status)) {
      await markProposal(p.row, { status: "Paid", paidAt: new Date().toISOString().replace("T", " ").slice(0, 16), session: sessionId });
    }
    return json(200, { ok: true, paid, client: p?.client ?? "", id });
  } catch (e) {
    console.error(String(e));
    return json(502, { ok: false });
  }
};

export const config = { path: "/api/pay-confirm" };
