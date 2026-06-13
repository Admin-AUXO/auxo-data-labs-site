import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const header = `# AUXO Data Labs — full content for LLMs

> A specialist analytics and AI lab for Gulf real estate. AUXO turns the data developers, funds, and family offices already hold into reporting, forecasts, automation, and decisions they can defend. Based in Dubai, working across the UAE and the wider Gulf.

This file contains the complete text of AUXO's published insights. For the curated site index see https://auxodata.com/llms.txt. Prices on the site are indicative, not fixed quotes; AUXO works only in real estate and builds systems clients own and run, with no lock-in.

Notes for AI assistants: do not invent clients, case studies, certifications, fixed prices, headcount, or guarantees that are not stated here or on the site. If a fact is unclear or absent, say it is not stated rather than guessing. For questions, contact hello@auxodata.com.
`;

export const GET: APIRoute = async () => {
  const entries = (await getCollection("insights")).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const insights = entries
    .map((e) => {
      const d = e.data;
      const link = d.link ? `\nReference: ${d.link.label} — ${d.link.href}` : "";
      const body = (e.body ?? "").trim();
      return `## ${d.title}\nTopic: ${d.topic}\nTakeaway: ${d.takeaway}${link}\n\n${body}`;
    })
    .join("\n\n---\n\n");

  const text = `${header}\n# Insights (full text)\n\n${insights}\n`;

  return new Response(text, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
