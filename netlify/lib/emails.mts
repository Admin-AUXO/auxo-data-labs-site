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

type Nurture = { total: number | string; band: string; left: number | null; cap: number };

const spotsLine = (n: Nurture) =>
  typeof n.left === "number"
    ? n.left > 0
      ? `<b>${n.left} of ${n.cap} places</b> are left this week.`
      : "This week is full, so we'll offer you a slot next week."
    : "Places are limited each week.";

const tagged = (path: string, content: string, extra: Record<string, string> = {}) =>
  `${SITE}${path}?${new URLSearchParams({ ...extra, utm_source: "email", utm_medium: "nurture", utm_campaign: `nurture-${content}` })}`;

const nurtureClose = (n: Nurture, content: string) =>
  `<p style="margin:24px 0 0">A Founder review is 30 minutes with Vignesh or Ajay. Bring the one number you don't trust, and leave with what to fix first. No charge. ${spotsLine(n)}</p>
${button(tagged("/apply/", content, { band: n.band.toLowerCase(), score: String(n.total) }), "Apply for a Founder review")}`;

const readLink = (path: string, content: string, text: string) =>
  `<p style="margin:18px 0"><a href="${tagged(path, content)}" style="color:#0a0a0a;font-weight:700">${esc(text)} →</a></p>`;

export function nurture(step: 1 | 2 | 3, n: Nurture) {
  if (step === 1) {
    const inner = `<p style="margin:0 0 14px">Hi,</p>
<p style="margin:0 0 14px">You took the AUXO Score a couple of days ago and came out <b>${esc(n.band)}</b>. Here's one idea worth five minutes.</p>
<h2 style="font-size:19px;margin:22px 0 8px;color:#0a0a0a">Your AI assistant is not the hard part</h2>
<p style="margin:0 0 14px">Most AI pilots don't stall on the model. They stall because two teams bring two different numbers for the same thing, and nobody trusts the report the AI is reading from. The post covers three questions to ask your leadership team before you spend on AI.</p>
${readLink("/blog/your-ai-assistant-is-not-the-hard-part/", "business", "Read the post")}
${nurtureClose(n, "business")}`;
    return { subject: "Before you spend on AI, ask these three questions", preview: "Why most AI pilots stall, and it isn't the model.", html: shell("Why most AI pilots stall, and it isn't the model.", inner) };
  }
  if (step === 2) {
    const inner = `<p style="margin:0 0 14px">Hi,</p>
<p style="margin:0 0 14px">If someone on your team would be the one to build it, this one's for them.</p>
<h2 style="font-size:19px;margin:22px 0 8px;color:#0a0a0a">The model is the easy part</h2>
<p style="margin:0 0 14px">Often the model can do part of the job. The hard part is the data it reads, the systems it connects to, the rules on what it may do, who approves its work, and who keeps it running. The post is the checklist we use before building any agent.</p>
${readLink("/blog/the-model-is-the-easy-part/", "technical", "Read the checklist")}
${nurtureClose(n, "technical")}`;
    return { subject: "The checklist we use before building any agent", preview: "Data, systems, rules, approvals, upkeep.", html: shell("Data, systems, rules, approvals, upkeep.", inner) };
  }
  const inner = `<p style="margin:0 0 14px">Hi,</p>
<p style="margin:0 0 14px">Here's what actually happens on a Founder review.</p>
<ol style="margin:0 0 14px;padding-left:20px">
<li style="margin:0 0 8px"><b>You apply.</b> Five questions, including the one number you don't trust today. We read every application before the call.</li>
<li style="margin:0 0 8px"><b>We talk for 30 minutes.</b> Vignesh or Ajay learns how your business runs, where your data lives and where it lets you down. No slides, no pitch, no price on the call.</li>
<li style="margin:0 0 8px"><b>You get next steps in writing</b> within 3 business days: what to fix first, and what not to buy yet. They're yours, whether or not you work with us.</li>
<li style="margin:0"><b>If there's work worth doing,</b> a fixed price follows in writing. If we're not the right fit, we say so.</li>
</ol>
${nurtureClose(n, "founder-review")}
<p style="margin:0;color:#555">This is the last email about your Score result. After this, you'll only hear from us if you asked for the newsletter.</p>`;
  return { subject: "What happens on a Founder review", preview: "30 minutes, written next steps, no pitch.", html: shell("30 minutes, written next steps, no pitch.", inner) };
}
