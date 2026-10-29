import { googleToken, sendEmail } from "../lib/services.mts";
import { scoreFollowUp } from "../lib/emails.mts";

const DAY = 86400e3;
const COL = { received: 0, type: 1, email: 3, score: 7, band: 8, stage: 15, notes: 18 };
const SENT = "Follow-up sent";

export default async () => {
  const sheetId = process.env.PIPELINE_SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT) return new Response("not configured", { status: 500 });
  const token = await googleToken("https://www.googleapis.com/auth/spreadsheets");
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values`;
  const res = await fetch(`${base}/${encodeURIComponent("Inbound!A:S")}`, { headers: { Authorization: `Bearer ${token}` } });
  const rows: string[][] = ((await res.json()) as { values?: string[][] }).values ?? [];

  const applied = new Set(rows.filter((r) => r[COL.type] === "Founder review application").map((r) => (r[COL.email] ?? "").toLowerCase()));
  const now = Date.now();
  const updates: { range: string; values: string[][] }[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const email = (r[COL.email] ?? "").toLowerCase();
    const age = now - Date.parse(`${r[COL.received]?.replace(" ", "T")}Z`);
    if (r[COL.type] !== "AUXO Score" || !email || applied.has(email)) continue;
    if ((r[COL.notes] ?? "").includes(SENT) || !(age >= 3 * DAY && age < 7 * DAY)) continue;
    try {
      await sendEmail(email, scoreFollowUp({ total: r[COL.score] ?? "", band: r[COL.band] || "your" }), "auxo-score-follow-up", `followup-${email}-${r[COL.received]}`);
      updates.push({ range: `Inbound!S${i + 1}`, values: [[[r[COL.notes], `${SENT} ${new Date().toISOString().slice(0, 10)}`].filter(Boolean).join("; ")]] });
      applied.add(email);
    } catch (e) {
      console.error(String(e));
    }
  }

  if (updates.length) {
    await fetch(`${base}:batchUpdate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ valueInputOption: "RAW", data: updates }),
    });
  }
  return new Response(JSON.stringify({ sent: updates.length }), { headers: { "Content-Type": "application/json" } });
};

export const config = { schedule: "0 6 * * *" };
