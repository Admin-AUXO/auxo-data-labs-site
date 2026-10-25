export function initBlogFilter(): void {
  const root = document.querySelector<HTMLElement>("[data-blog-filter]");
  if (!root || root.dataset.bound) return;
  root.dataset.bound = "1";

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-blog-tag]"));
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-blog-item]"));

  const apply = (tag: string): void => {
    buttons.forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.blogTag ?? "") === tag)));
    items.forEach((item) => {
      const tags = (item.dataset.tags ?? "").split(" ");
      item.hidden = tag !== "" && !tags.includes(tag);
    });
  };

  buttons.forEach((b) => b.addEventListener("click", () => apply(b.dataset.blogTag ?? "")));
  root.hidden = false;
}
