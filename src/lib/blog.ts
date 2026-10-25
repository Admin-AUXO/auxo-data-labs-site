import { getCollection, render, type CollectionEntry } from "astro:content";
import getReadingTime from "reading-time";
import { blogContent, type BlogAuthor } from "../data/blog";

export type BlogPost = CollectionEntry<"blog">;

export interface BlogPostSummary {
  post: BlogPost;
  slug: string;
  href: string;
  minutes: number;
  dateLabel: string;
  isoDate: string;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatPostDate(date: Date): string {
  return dateFormat.format(date);
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function authorFor(name: string): BlogAuthor {
  return blogContent.authors[name] ?? { kind: "Person" };
}

async function minutesFor(post: BlogPost): Promise<number> {
  const { remarkPluginFrontmatter } = await render(post);
  const fromPlugin = Number.parseInt(String(remarkPluginFrontmatter?.minutesRead ?? ""), 10);
  if (Number.isFinite(fromPlugin) && fromPlugin > 0) return fromPlugin;
  return Math.max(1, Math.round(getReadingTime(post.body ?? "").minutes));
}

export async function summarise(post: BlogPost): Promise<BlogPostSummary> {
  return {
    post,
    slug: post.id,
    href: `/blog/${post.id}/`,
    minutes: await minutesFor(post),
    dateLabel: formatPostDate(post.data.date),
    isoDate: post.data.date.toISOString(),
  };
}

export async function getPublishedPosts(): Promise<BlogPostSummary[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title),
  );
  return Promise.all(posts.map(summarise));
}

export function relatedPosts(current: BlogPost, all: BlogPostSummary[], limit = 2): BlogPostSummary[] {
  const tags = new Set(current.data.tags);
  return all
    .filter((s) => s.slug !== current.id)
    .map((s, order) => ({ s, order, shared: s.post.data.tags.filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.shared - a.shared || a.order - b.order)
    .slice(0, limit)
    .map(({ s }) => s);
}
