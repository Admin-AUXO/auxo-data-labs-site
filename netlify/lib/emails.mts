const SITE = "https://auxodata.com";
const BOOKING = "https://calendar.app.google/aJmnvMS2uBbYPCgC7";

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

const button = (href: string, text: string) =>
  `<p style="margin:28px 0"><a href="${href}" style="background:#a3e635;color:#0a0a0a;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px;display:inline-block">${esc(text)}</a></p>`;

const shell = (preview: string, inner: string) => `<!doctype html><html><body style="margin:0;background:#f4f4f2">
<span style="display:none;max-height:0;overflow:hidden">${esc(preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px">
<tr><td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;font-weight:800;letter-spacing:0.18em;font-size:13px;color:#0a0a0a">AUXO</td></tr>
<tr><td style="padding:8px 32px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222">${inner}</td></tr>
</table>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#777;margin:18px 0 0">AUXO Data Labs · Dubai Internet City, UAE · <a href="${SITE}" style="color:#777">auxodata.com</a></p>
</td></tr></table></body></html>`;

export type ScoreEmail = {
  name?: string;
  total: number | string;
  band: string;
  bandLine?: string;
  weakest?: string;
  why?: string;
  steps?: string[];
  good?: string;
};

export function scoreReport(r: ScoreEmail) {
  const apply = `${SITE}/apply/?${new URLSearchParams({ band: r.band.toLowerCase(), score: String(r.total) })}`;
  const steps = (r.steps ?? []).slice(0, 5).map((s) => `<li style="margin:0 0 8px">${esc(s)}</li>`).join("");
  const inner = `<h1 style="font-size:26px;line-height:1.2;margin:0 0 6px;color:#0a0a0a">Your AUXO Score: ${esc(r.total)}/100</h1>
<p style="margin:0 0 20px;color:#555">Band: <b style="color:#0a0a0a">${esc(r.band)}</b></p>
${r.bandLine ? `<p style="margin:0 0 20px">${esc(r.bandLine)}</p>` : ""}
${r.weakest ? `<h2 style="font-size:18px;margin:28px 0 8px;color:#0a0a0a">Your first fix: ${esc(r.weakest)}</h2>
${r.why ? `<p style="margin:0 0 14px">${esc(r.why)}</p>` : ""}
${steps ? `<ol style="margin:0 0 14px;padding-left:20px">${steps}</ol>` : ""}
${r.good ? `<p style="margin:0;color:#555"><b style="color:#0a0a0a">What good looks like:</b> ${esc(r.good)}</p>` : ""}` : ""}
<h2 style="font-size:18px;margin:32px 0 8px;color:#0a0a0a">Want a second pair of eyes?</h2>
<p style="margin:0">Apply for a Founder review: 30 minutes with Vignesh or Ajay. Bring the one number you don't trust, and leave with what to fix first. No charge.</p>
${button(apply, "Apply for a Founder review")}
<p style="margin:0;color:#555">Questions about your result? Just reply to this email. A real person reads every reply.</p>`;
  return {
    subject: `Your AUXO Score: ${r.total}/100 (${r.band})`,
    preview: r.weakest ? `Your first fix is ${r.weakest}. Here's where to start.` : "Your result and where to start.",
    html: shell("Your result and where to start.", inner),
  };
}

export function applicationConfirmation(a: { name?: string }) {
  const first = esc(String(a.name ?? "").trim().split(/\s+/)[0] || "there");
  const inner = `<h1 style="font-size:24px;line-height:1.25;margin:0 0 18px;color:#0a0a0a">Thanks, ${first}. Your application is in.</h1>
<p style="margin:0 0 14px">Here's what happens next:</p>
<ol style="margin:0 0 18px;padding-left:20px">
<li style="margin:0 0 8px"><b>Pick a time</b> if you haven't already. Choose any open 30-minute slot.</li>
<li style="margin:0 0 8px"><b>We read your application</b> before the call. A founder replies personally within one business day. If it isn't a fit, we'll say so.</li>
<li style="margin:0 0 8px"><b>The call:</b> we learn your business, your customers and your data, then propose a path. No price on the call.</li>
<li style="margin:0"><b>Next steps in writing</b> within 3 business days, whether or not you work with us.</li>
</ol>
${button(BOOKING, "Pick a time")}
<p style="margin:0;color:#555">Anything to add before we talk? Just reply to this email.</p>`;
  return {
    subject: "Your Founder review application is in",
    preview: "What happens next, and how to pick a time.",
    html: shell("What happens next, and how to pick a time.", inner),
  };
}

export function scoreFollowUp(r: { total: number | string; band: string }) {
  const apply = `${SITE}/apply/?${new URLSearchParams({ band: r.band.toLowerCase(), score: String(r.total) })}`;
  const inner = `<p style="margin:0 0 14px">Hi,</p>
<p style="margin:0 0 14px">A few days ago you took the AUXO Score and came out <b>${esc(r.band)}</b> (${esc(r.total)}/100).</p>
<p style="margin:0 0 14px">If the first fix felt clear, great. If you'd rather talk it through, a Founder review is 30 minutes with Vignesh or Ajay. Bring the one number you don't trust, and leave with what to fix first. No charge, and places are limited each month.</p>
${button(apply, "Apply for a Founder review")}
<p style="margin:0;color:#555">This is the only follow-up we'll send about your result.</p>`;
  return {
    subject: `Your ${r.band} result: want a founder's view?`,
    preview: "30 minutes, no charge, limited places each month.",
    html: shell("30 minutes, no charge, limited places each month.", inner),
  };
}
