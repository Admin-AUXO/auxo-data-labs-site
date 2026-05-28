const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const WORDS_PER_MINUTE = 200;

/** Sort blog entries newest-first by publishDate. */
export function sortByPublishDate<T extends { data: { publishDate: Date } }>(
  posts: T[],
): T[] {
  return [...posts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

/** Estimate reading time in whole minutes at ~200 wpm (min 1). */
export function getReadingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/** Format a date as "May 28, 2026". */
export function formatBlogDate(date: Date): string {
  return BLOG_DATE_FORMATTER.format(date);
}
