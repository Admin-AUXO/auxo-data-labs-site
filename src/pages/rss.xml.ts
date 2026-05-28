import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortByPublishDate } from "../lib/blog";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = sortByPublishDate(await getCollection("blog"));

  return rss({
    title: "AUXO Insights",
    description:
      "Decision intelligence, operating models, and analytics from AUXO Data Labs.",
    site: context.site ?? "https://auxodata.com",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
