import { motionEnabled } from "./motion";

function splitHeadline(head: HTMLElement): void {
  if (head.dataset.split !== undefined) return;

  const frag = document.createDocumentFragment();
  let target: Node = frag;
  let i = 0;
  let k = 0;

  const addWord = (word: string, cls: string | null): void => {
    const outer = document.createElement("span");
    outer.className = "m-word";
    const inner = document.createElement("span");
    inner.className = "m-word-i";
    inner.style.setProperty("--i", String(i));
    inner.textContent = word;
    if (cls) {
      const extra = cls.split(/\s+/).filter(Boolean);
      if (extra.length) inner.classList.add(...extra);
    }
    outer.appendChild(inner);
    target.appendChild(outer);
    i += 1;
  };

  const processText = (text: string, cls: string | null): void => {
    for (const tok of text.split(/([ \t\n\r]+)/)) {
      if (tok === "") continue;
      if (/^[ \t\n\r]+$/.test(tok)) target.appendChild(document.createTextNode(" "));
      else addWord(tok, cls);
    }
  };

  head.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      processText(node.textContent ?? "", null);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.dataset.group !== undefined) {
        const group = document.createElement("span");
        group.className = el.className;
        frag.appendChild(group);
        target = group;
        processText(el.textContent ?? "", null);
        target = frag;
        if (el.dataset.read !== undefined) {
          head.setAttribute("aria-label", head.textContent?.replace(/\s+/g, " ").trim() ?? "");
          group.querySelectorAll<HTMLElement>(".m-word-i").forEach((word) => {
            const chars = [...(word.textContent ?? "")];
            word.textContent = "";
            chars.forEach((ch) => {
              const c = document.createElement("span");
              c.className = "m-char";
              c.setAttribute("aria-hidden", "true");
              c.textContent = ch;
              c.style.setProperty("--k", String(k));
              word.appendChild(c);
              k += 1;
            });
          });
        }
      } else {
        processText(el.textContent ?? "", el.className || null);
      }
    }
  });

  head.textContent = "";
  head.appendChild(frag);
  head.dataset.split = "";
}

export function initHeroText(): void {
  if (!motionEnabled()) return;
  document
    .querySelectorAll<HTMLElement>('[data-enter="headline"]')
    .forEach(splitHeadline);
}
