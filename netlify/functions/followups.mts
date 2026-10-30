import { WEEKLY_CAP, googleToken, readInbound, sendEmail, spotsLeft } from "../lib/services.mts";
import { nurture } from "../lib/emails.mts";

const DAY = 86400e3;
const COL = { received: 0, type: 1, email: 3, score: 7, band: 8, notes: 18 };
const STEPS: { step: 1 | 2 | 3; day: number; tag: string }[] = [
  { step: 1, day: 2, tag: "Nurture 1 sent" },
  { step: 2, day: 4, tag: "Nurture 2 sent" },
  { step: 3, day: 6, tag: "Nurture 3 sent" },
];

export default async () => {
  const sheetId = process.env.PIPELINE_SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT) return new Response("not configured", { status: 500 });
  const token = await googleToken("https://www.googleapis.com/auth/spreadsheets");
  const rows = await readInbound(token);
  const left = spotsLeft(rows);
  const applied = new Set(rows.filter((r) => r[COL.type] === "Founder review application").map((r) => (r[COL.email] ?? "").toLowerCase()));
  const now = Date.now();
  const updates: { range: string; values: string[][] }[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const email = (r[COL.email] ?? "").toLowerCase();
    if (r[COL.type] !== "AUXO Score" || !email || applied.has(email)) continue;
    const age = now - Date.parse(`${(r[COL.received] ?? "").replace(" ", "T")}Z`);
    const notes = r[COL.notes] ?? "";
    const due = STEPS.filter((s) => age >= s.day * DAY && !notes.includes(s.tag)).pop();
    if (!due || age >= (due.day + 2) * DAY) continue;
    try {
      const mail = nurture(due.step, { total: r[COL.score] ?? "", band: r[COL.band] || "your", left, cap: WEEKLY_CAP });
      await sendEmail(email, mail, `auxo-score-nurture-${due.step}`, `nurture-${due.step}-${email}-${r[COL.received]}`);
      updates.push({ range: `Inbound!S${i + 1}`, values: [[[notes, `${due.tag} ${new Date().toISOString().slice(0, 10)}`].filter(Boolean).join("; ")]] });
      applied.add(email);
    } catch (e) {
      console.error(String(e));
    }
  }

  if (updates.length) {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ valueInputOption: "RAW", data: updates }),
    });
  }
  return new Response(JSON.stringify({ sent: updates.length, left }), { headers: { "Content-Type": "application/json" } });
};

export const config = { schedule: "0 6 * * *" };
