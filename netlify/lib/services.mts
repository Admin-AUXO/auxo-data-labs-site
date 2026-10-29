import { createSign } from "node:crypto";

export async function googleToken(scope: string): Promise<string> {
  const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT ?? "{}");
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    sub: process.env.GOOGLE_IMPERSONATE ?? "admin@auxodata.com",
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = createSign("RSA-SHA256").update(unsigned).sign(sa.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${signature}`,
    }),
  });
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error(`google token ${res.status}`);
  return data.access_token;
}

export async function sendEmail(to: string, mail: { subject: string; preview: string; html: string }, trackAs: string, key: string) {
  const apiKey = process.env.SEQUENZY_API_KEY;
  if (!apiKey) throw new Error("sequenzy not configured");
  const res = await fetch("https://api.sequenzy.com/api/v1/transactional/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": key },
    body: JSON.stringify({
      to,
      subject: mail.subject,
      preview: mail.preview,
      html: mail.html,
      trackAs,
      ...(process.env.SEQUENZY_FROM ? { from: process.env.SEQUENZY_FROM } : {}),
      replyTo: process.env.SEQUENZY_REPLY_TO ?? "AUXO <hello@auxodata.com>",
    }),
  });
  if (!res.ok) throw new Error(`sequenzy send ${res.status}`);
}
