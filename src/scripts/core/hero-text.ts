function splitHeadline(head: HTMLElement): void {
  if (head.dataset.split !== undefined) return;

  const frag = document.createDocumentFragment();
  let i = 0;

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
    frag.appendChild(outer);
    i += 1;
  };

  const processText = (text: string, cls: string | null): void => {
    for (const tok of text.split(/(\s+)/)) {
      if (tok === "") continue;
      if (/^\s+$/.test(tok)) frag.appendChild(document.createTextNode(" "));
      else addWord(tok, cls);
    }
  };

  head.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      processText(node.textContent ?? "", null);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      processText(el.textContent ?? "", el.className || null);
    }
  });

  head.textContent = "";
  head.appendChild(frag);
  head.dataset.split = "";
}

export function initHeroText(): void {
  document
    .querySelectorAll<HTMLElement>('[data-enter="headline"]')
    .forEach(splitHeadline);
}
