import { WEEKLY_CAP, readInbound, spotsLeft } from "../lib/services.mts";

export default async () => {
  const headers = { "Content-Type": "application/json", "Cache-Control": "public, max-age=300" };
  try {
    return new Response(JSON.stringify({ cap: WEEKLY_CAP, left: spotsLeft(await readInbound()) }), { headers });
  } catch {
    return new Response(JSON.stringify({ cap: WEEKLY_CAP, left: null }), { headers });
  }
};

export const config = { path: "/api/spots" };
