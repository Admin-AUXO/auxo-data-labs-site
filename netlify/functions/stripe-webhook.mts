import { settleSession, verifyStripeSignature } from "../lib/proposals.mts";

export default async (req: Request) => {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (req.method !== "POST" || !secret) return new Response(null, { status: 405 });
  const payload = await req.text();
  if (!verifyStripeSignature(payload, req.headers.get("stripe-signature") ?? "", secret)) return new Response(null, { status: 400 });
  try {
    const event = JSON.parse(payload) as { type: string; data: { object: Record<string, unknown> } };
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      await settleSession(event.data.object);
    }
    return new Response(null, { status: 200 });
  } catch (e) {
    console.error(String(e));
    return new Response(null, { status: 500 });
  }
};

export const config = { path: "/api/stripe-webhook" };
