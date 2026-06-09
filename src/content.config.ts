import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const insights = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/insights" }),
  schema: z.object({
    topic: z.string(),
    title: z.string(),
    takeaway: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    link: z.object({ label: z.string(), href: z.string().url() }).optional(),
  }),
});

export const collections = { insights };
