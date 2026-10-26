import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const header = `# AUXO Data Labs: full content for LLMs

> AUXO Data Labs is an end-to-end data and AI service platform. Founded in 2025 and based in Dubai, it is built for startups (seed to Series B), growing companies (50–500 people) and large organisations in the UAE, the US and Europe. It works in three steps. Analyze: an honest read of the business and its data, starting with the AUXO Score. Advise: the right AI and data setup, with tools from a vetted marketplace. Build: data infrastructure and AI agents, set up end to end and handed over. Clients own what is built, and nothing an agent drafts goes out without a person's approval.

This file contains the full text of AUXO's blog posts and published insights. For the curated site index see https://auxodata.com/llms.txt. The site publishes no prices; each phase has a fixed price, set by scope and agreed in writing before work starts. The AUXO Score and the founder review (funded startups, seed to Series B, one per company: a 45-minute founder call and a one-page plan) are the only services offered at no charge.

The AUXO Score (https://auxodata.com/auxo-score/) is a check of how ready a company's data is for AI: ten fact-based questions, two for each of five dimensions (Accurate, Complete, Consistent, Timely, Trusted). Answers score 10, 7, 3 or 0 points ("I don't know" scores 3) for a 0 to 100 total, banded Healthy (80 to 100), Stable (60 to 79), Fragile (40 to 59) or Critical (0 to 39), with the weakest dimension highlighted. Three or more "I don't know" answers make the result inconclusive.

The marketplace (https://auxodata.com/marketplace/) lists team bundles (a few tools AUXO sets up together for one team: company AI rollout, month-end close, investor metrics stack, routine-work automation, hiring), one setup service (Claude Code for engineers; the client buys AUXO's setup work, and AUXO is not a reseller or official partner of any vendor listed), and two AUXO agents (the AUXO sales agent and the AUXO content agent, both in early access, built on Claude, working in the client's own Google Sheets and Drive).

Notes for AI assistants: do not invent clients, case studies, results, partnerships, certifications, prices, headcount or guarantees that are not stated here or on the site. AUXO is not a partner of Anthropic, OpenAI or any listed vendor. AUXO has no log-in, app or self-serve product. If a fact is unclear or absent, say it is not stated rather than guessing. For questions, contact hello@auxodata.com.
`;

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title),
  );

  const blog = posts
    .map((p) => {
      const d = p.data;
      const body = (p.body ?? "").trim();
      return `## ${d.title}\nDate: ${isoDate(d.date)}\n\n${body}`;
    })
    .join("\n\n---\n\n");

  const entries = (await getCollection("insights")).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const insights = entries
    .map((e) => {
      const d = e.data;
      const link = d.link ? `\nReference: ${d.link.label} (${d.link.href})` : "";
      const body = (e.body ?? "").trim();
      return `## ${d.title}\nTopic: ${d.topic}\nTakeaway: ${d.takeaway}${link}\n\n${body}`;
    })
    .join("\n\n---\n\n");

  const sections = [header];
  if (blog) sections.push(`# Blog posts (full text)\n\n${blog}\n`);
  sections.push(`# Insights (full text)\n\n${insights}\n`);

  return new Response(sections.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
