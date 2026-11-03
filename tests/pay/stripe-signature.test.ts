import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyStripeSignature } from "../../netlify/lib/proposals.mts";

const secret = "whsec_test";
const payload = '{"type":"checkout.session.completed"}';
const sign = (t: number, body = payload) => `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${body}`).digest("hex")}`;

describe("verifyStripeSignature", () => {
  it("accepts a fresh valid signature", () => {
    expect(verifyStripeSignature(payload, sign(1000), secret, 1100)).toBe(true);
  });
  it("rejects a tampered body", () => {
    expect(verifyStripeSignature(payload + " ", sign(1000), secret, 1100)).toBe(false);
  });
  it("rejects a stale timestamp", () => {
    expect(verifyStripeSignature(payload, sign(1000), secret, 2000)).toBe(false);
  });
  it("rejects a wrong secret and malformed header", () => {
    expect(verifyStripeSignature(payload, sign(1000), "other", 1100)).toBe(false);
    expect(verifyStripeSignature(payload, "garbage", secret, 1100)).toBe(false);
  });
});
