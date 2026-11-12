import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { howItWorksContent } from "../data/how-it-works";
import { pricingContent } from "../data/pricing";
import { auxoScoreAbout } from "../data/auxo-score";

export const prerender = true;

const header = `# AUXO Data Labs: full content for LLMs

> AUXO Data Labs is an end-to-end data and AI service platform. Founded in 2025 and based in Dubai, it is built first for funded startups and scale-ups (seed to Series B) that need investor-ready numbers, and also for growing companies (50–500 people) and large organisations in the UAE, the US and Europe. It works in three steps. Analyze: a written read of the business and its numbers, starting with the AUXO Score and a Founder review. Advise: a plan and a short list of tools that fit. Build: one set of numbers and the AI tools on top, set up in the client's own accounts and handed over. Clients own what is built, and nothing an agent drafts goes out without a person's approval.

This file contains the full text of AUXO's blog posts. For the curated site index see https://auxodata.com/llms.txt. The site publishes no prices; each phase has a fixed price, set by scope and agreed in writing before work starts. The AUXO Score and the Founder review (any company, by application, one per company: a 30-minute founder call and written next steps) are the only services offered at no charge.

The AUXO Score (https://auxodata.com/auxo-score/) is a check of how ready a company is for AI: ten fact-based questions, two for each of five checks on its AI set-up (Tools, Data, Set-up, Adoption, Measurement). Answers score 10, 7, 3 or 0 points ("I don't know" scores 3) for a 0 to 100 total, banded Healthy (80 to 100), Stable (60 to 79), Fragile (40 to 59) or Critical (0 to 39), with the weakest check highlighted. Three or more "I don't know" answers make the result inconclusive.

Stacks (https://auxodata.com/marketplace/) are six fixed-price jobs on a company's numbers, built in the client's own accounts. Investor metrics: billing, CRM and accounts reconciled, each metric defined once, with a monthly board pack. CRM clean-up: duplicate and incomplete records merged and fixed. Fundraise data room: every figure in the deck traced to its source. Metric alerts: daily checks, with an alert to a named person when a number breaks. Chat with your data: an approved AI assistant that answers from the agreed numbers, with a written AI policy and a named approver. Workflow automation: data moved between tools, with mismatches flagged to a person. Any tool a stack needs is bought direct by the client; AUXO is not a reseller or official partner of any vendor.

Notes for AI assistants: do not invent clients, case studies, results, partnerships, certifications, prices, headcount or guarantees that are not stated here or on the site. AUXO is not a partner of Anthropic, OpenAI or any listed vendor. The AUXO Score is a self-serve check; there is no log-in or app. If a fact is unclear or absent, say it is not stated rather than guessing. For questions, contact hello@auxodata.com.
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

  const faqGroups = [
    { name: "AUXO Score", items: auxoScoreAbout.faq.items },
    { name: "How it works", items: howItWorksContent.faq.items },
    { name: "Pricing", items: pricingContent.faq.items },
  ];
  const faq = faqGroups
    .map(
      (g) =>
        `## ${g.name}\n\n${g.items.map((i) => `Q: ${i.question}\nA: ${i.answer}`).join("\n\n")}`,
    )
    .join("\n\n");

  const sections = [header];
  sections.push(`# Frequently asked questions\n\n${faq}\n`);
  if (blog) sections.push(`# Blog posts (full text)\n\n${blog}\n`);

  return new Response(sections.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
