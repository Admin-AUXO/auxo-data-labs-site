import { googleToken } from "./services.mts";

const RANGE = "Proposals!A:M";
const ID_RE = /^[A-Z0-9-]{8,40}$/;

export type Proposal = {
  row: number;
  id: string;
  client: string;
  email: string;
  covers: string;
  total: number;
  currency: string;
  depositPct: number;
  vatPct: number;
  status: string;
  deposit: number;
  vat: number;
  due: number;
};

const num = (v: unknown) => Number(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;
const round2 = (n: number) => Math.round(n * 100) / 100;

async function sheet(method: string, path: string, body?: unknown) {
  const sheetId = process.env.PIPELINE_SHEET_ID;
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT) throw new Error("sheet not configured");
  const token = await googleToken("https://www.googleapis.com/auth/spreadsheets");
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`sheet ${res.status}`);
  return res.json() as Promise<{ values?: string[][] }>;
}

export async function findProposal(rawId: string | null): Promise<Proposal | null> {
  const id = String(rawId ?? "").trim().toUpperCase();
  if (!ID_RE.test(id)) return null;
  const { values = [] } = await sheet("GET", `/${encodeURIComponent(RANGE)}`);
  const i = values.findIndex((r, idx) => idx > 0 && (r[0] ?? "").trim().toUpperCase() === id);
  if (i < 0) return null;
  const r = values[i];
  const total = num(r[4]);
  const depositPct = Math.min(100, num(r[6]) || 50);
  const vatPct = Math.min(30, num(r[12]));
  const deposit = round2((total * depositPct) / 100);
  const vat = round2((deposit * vatPct) / 100);
  return {
    row: i + 1,
    id,
    client: (r[1] ?? "").trim(),
    email: (r[2] ?? "").trim(),
    covers: (r[3] ?? "").trim(),
    total,
    currency: ((r[5] ?? "").trim() || "AED").toUpperCase(),
    depositPct,
    vatPct,
    status: (r[7] ?? "").trim(),
    deposit,
    vat,
    due: round2(deposit + vat),
  };
}

export async function markProposal(row: number, values: { status?: string; link?: string; paidAt?: string; session?: string }) {
  const data: { range: string; values: string[][] }[] = [];
  if (values.status !== undefined) data.push({ range: `Proposals!H${row}`, values: [[values.status]] });
  if (values.link !== undefined) data.push({ range: `Proposals!I${row}`, values: [[values.link]] });
  if (values.paidAt !== undefined) data.push({ range: `Proposals!J${row}`, values: [[values.paidAt]] });
  if (values.session !== undefined) data.push({ range: `Proposals!K${row}`, values: [[values.session]] });
  if (data.length) await sheet("POST", ":batchUpdate", { valueInputOption: "RAW", data });
}

const ZERO_DECIMAL = new Set(["JPY", "KRW", "VND", "CLP", "XOF", "XAF", "UGX", "RWF", "PYG"]);
export const minorUnits = (amount: number, currency: string) => Math.round(amount * (ZERO_DECIMAL.has(currency) ? 1 : 100));

export async function stripe(path: string, params?: Record<string, string>) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("stripe not configured");
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: params ? "POST" : "GET",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params ? new URLSearchParams(params) : undefined,
  });
  const json = (await res.json()) as Record<string, unknown>;
  if (!res.ok) throw new Error(`stripe ${res.status} ${JSON.stringify(json).slice(0, 200)}`);
  return json;
}

export const publicView = (p: Proposal) => ({
  id: p.id,
  client: p.client,
  covers: p.covers,
  currency: p.currency,
  depositPct: p.depositPct,
  deposit: p.deposit,
  vatPct: p.vatPct,
  vat: p.vat,
  due: p.due,
  paid: /^paid$/i.test(p.status),
  open: /^(approved|sent|open)$/i.test(p.status),
});
