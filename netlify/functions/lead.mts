import { applicationConfirmation, scoreReport } from "../lib/emails.mts";
import { googleToken, sendEmail } from "../lib/services.mts";

type Lead = {
  type?: string;
  name?: string;
  email?: string;
  website?: string;
  stage?: string;
  number?: string;
  total?: number | string;
  band?: string;
  bandLine?: string;
  weakest?: string;
  why?: string;
  steps?: string[];
  good?: string;
  tool?: string;
  newsletter?: boolean;
  page?: string;
  hp?: string;
  utm?: { source?: string; medium?: string; campaign?: string; content?: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TYPES = new Set(["score", "application"]);
const SHEET_RANGE = "Inbound!A:S";
const ALLOWED_ORIGINS = ["https://auxodata.com", "https://www.auxodata.com"];

const clip = (v: unknown, n = 300) => String(v ?? "").trim().slice(0, n);
const slug = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function json(status: number, body: unknown, origin: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

async function appendRow(row: string[]) {
  const sheetId = process.env.PIPELINE_SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT) throw new Error("sheet not configured");
  const token = await googleToken("https://www.googleapis.com/auth/spreadsheets");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) throw new Error(`sheet append ${res.status}`);
}

async function upsertSubscriber(lead: Lead) {
  const key = process.env.SEQUENZY_API_KEY;
  if (!key) throw new Error("sequenzy not configured");
  const tags = [lead.type === "application" ? "founder-review-applicant" : "score-taker"];
  if (lead.band) tags.push(`band-${slug(lead.band)}`);
  if (lead.newsletter) tags.push("newsletter");
  if (lead.utm?.campaign) tags.push(`campaign-${slug(lead.utm.campaign)}`);
  const [firstName, ...rest] = clip(lead.name, 120).split(/\s+/);
  const res = await fetch("https://api.sequenzy.com/api/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: lead.email,
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
      tags,
      duplicateStrategy: "merge",
      enrollInSequences: true,
      customAttributes: {
        band: lead.band || undefined,
        score: lead.total ? Number(lead.total) : undefined,
        companyWebsite: lead.website || undefined,
        sizeOrStage: lead.stage || undefined,
        marketplaceTool: lead.tool || undefined,
        utmSource: lead.utm?.source || undefined,
        utmCampaign: lead.utm?.campaign || undefined,
        utmContent: lead.utm?.content || undefined,
      },
    }),
  });
  if (!res.ok) throw new Error(`sequenzy ${res.status}`);
}

export default async (req: Request) => {
  const reqOrigin = req.headers.get("origin") ?? "";
  const origin = ALLOWED_ORIGINS.includes(reqOrigin) || /^http:\/\/localhost:\d+$/.test(reqOrigin) ? reqOrigin : ALLOWED_ORIGINS[0];
  if (req.method === "OPTIONS") return json(204, {}, origin);
  if (req.method !== "POST") return json(405, { ok: false }, origin);

  let lead: Lead;
  try {
    lead = (await req.json()) as Lead;
  } catch {
    return json(400, { ok: false }, origin);
  }
  if (lead.hp) return json(200, { ok: true }, origin);

  lead.email = clip(lead.email, 200).toLowerCase();
  if (!TYPES.has(String(lead.type)) || !EMAIL_RE.test(lead.email)) return json(400, { ok: false }, origin);
  if (lead.type === "application" && (!clip(lead.name) || !clip(lead.website) || !clip(lead.stage))) {
    return json(400, { ok: false }, origin);
  }

  const row = [
    new Date().toISOString().replace("T", " ").slice(0, 19),
    lead.type === "application" ? "Founder review application" : "AUXO Score",
    clip(lead.name, 120),
    lead.email,
    clip(lead.website, 200),
    clip(lead.stage, 60),
    clip(lead.number, 500),
    clip(lead.total, 5),
    clip(lead.band, 20),
    clip(lead.tool, 80),
    lead.newsletter ? "Yes" : "No",
    clip(lead.utm?.source, 60) || "direct",
    clip(lead.utm?.medium, 60),
    clip(lead.utm?.campaign, 80),
    clip(lead.utm?.content, 60),
    lead.type === "application" ? "Applied" : "Score taken",
    clip(lead.page, 200),
    "",
    "",
  ];

  const mail =
    lead.type === "application"
      ? applicationConfirmation({ name: lead.name })
      : scoreReport({
          total: clip(lead.total, 5),
          band: clip(lead.band, 20) || "Your result",
          bandLine: clip(lead.bandLine, 400),
          weakest: clip(lead.weakest, 40),
          why: clip(lead.why, 600),
          steps: (Array.isArray(lead.steps) ? lead.steps : []).map((x) => clip(x, 300)),
          good: clip(lead.good, 400),
        });
  const idem = `${lead.type}-${lead.email}-${new Date().toISOString().slice(0, 13)}`;
  const results = await Promise.allSettled([
    appendRow(row),
    upsertSubscriber(lead),
    sendEmail(lead.email, mail, lead.type === "application" ? "founder-review-confirmation" : "auxo-score-report", idem),
  ]);
  const sheetOk = results[0].status === "fulfilled";
  const emailed = results[2].status === "fulfilled";
  for (const r of results) if (r.status === "rejected") console.error(String(r.reason));
  return json(sheetOk || emailed ? 200 : 502, { ok: sheetOk || emailed, emailed }, origin);
};

export const config = { path: "/api/lead" };
