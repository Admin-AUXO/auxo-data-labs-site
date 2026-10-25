import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const insights = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/insights" }),
  schema: z.object({
    family: z.enum(["foundations", "guardrails"]),
    topic: z.string(),
    title: z.string(),
    takeaway: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    link: z.object({ label: z.string(), href: z.string().url() }).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { insights, blog };
