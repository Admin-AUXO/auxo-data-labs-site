import { CARDS, FOCUS } from "../../lib/auxo-score/cards";
import { DIMENSIONS, IDK_LIMIT, IDK_POINTS, QUADS, buildLayout, computeResult, idkCount, tone } from "../../lib/auxo-score/scoring";
import { checkWorkEmail } from "../../lib/auxo-score/email";
import { captureUtm, clearLegacy, loadState, saveResult, saveState } from "../../lib/auxo-score/storage";
import {
  MAX_SUBMITS, MESSAGES, buildContext, buildReportPayload, durationSec, postJson, uuid,
} from "../../lib/auxo-score/submit";
import { scoreEvent } from "../../lib/auxo-score/analytics";
import { LOAD_STEPS, SCORE_COPY } from "./copy";
import type { Answer, Quadrant, Result, Screen, State } from "../../lib/auxo-score/types";

const FLASH_MS = 150;
const LOADER_MS = 1400;
const SCREENS: Screen[] = ["intro", "quiz", "loader", "result", "inconclusive"];

let keyHandler: ((e: KeyboardEvent) => void) | null = null;

const fresh = (screen: Screen = "quiz"): State => ({
  screen,
  index: 0,
  answers: {},
  layout: buildLayout(),
  startedAt: new Date().toISOString(),
  attemptId: uuid(),
});

export function initAuxoScore(): void {
  const found = document.querySelector<HTMLElement>("[data-auxo-score]");
  if (found?.dataset.bound) return;
  if (keyHandler) {
    document.removeEventListener("keydown", keyHandler);
    keyHandler = null;
  }
  if (!found) return;
  const root: HTMLElement = found;
  root.dataset.bound = "1";

  const $ = <T extends HTMLElement = HTMLElement>(id: string) => root.querySelector<T>(`#${id}`)!;
  const reportUrl = root.dataset.reportUrl || undefined;
  const screens = SCREENS.map((s) => [s, $(`s-${s}`)] as const);
  const back = $("backBtn");
  const dimPill = $("dimPill");
  const count = $("count");
  const progress = $("progress");
  const question = $("question");
  const grid = $("grid");
  const idk = $("idkBtn");
  const keep = $("keepBtn");

  clearLegacy();
  const utm = captureUtm();

  let state: State = fresh("intro");
  let locked = false;
  let timers: number[] = [];
  let result = null as Result | null;
  let submits = 0;

  const persist = () => saveState(state);

  function show(name: Screen, focus = true): void {
    state.screen = name;
    for (const [s, el] of screens) el.hidden = s !== name;
    window.scrollTo({ top: 0 });
    if (focus) root.querySelector<HTMLElement>(`#s-${name} [tabindex="-1"]`)?.focus({ preventScroll: true });
    persist();
  }

  function showCard(): void {
    renderCard();
    question.focus({ preventScroll: true });
  }

  function renderCard(): void {
    const card = CARDS[state.index];
    const prev = state.answers[card.id];
    back.setAttribute("aria-hidden", state.index === 0 ? "true" : "false");
    back.tabIndex = state.index === 0 ? -1 : 0;
    dimPill.textContent = card.dimension.toUpperCase();
    count.textContent = `${card.id} / ${CARDS.length}`;
    progress.style.width = `${(state.index / CARDS.length) * 100}%`;
    question.textContent = card.question;

    grid.textContent = "";
    state.layout[card.id].forEach((tier, i) => {
      const opt = card.options.find((o) => o.tier === tier)!;
      const q = QUADS[i];
      const selected = !!prev && !prev.isIdk && prev.selectedQuadrant === q;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "score__block" + (selected ? " is-selected" : "");
      b.dataset.quad = q;
      b.setAttribute("aria-pressed", String(selected));
      b.setAttribute("aria-keyshortcuts", q);
      const tile = document.createElement("span");
      tile.className = "score__q";
      tile.setAttribute("aria-hidden", "true");
      tile.textContent = q;
      const lbl = document.createElement("span");
      lbl.className = "score__lbl";
      lbl.textContent = opt.label;
      const sub = document.createElement("span");
      sub.className = "score__sub";
      sub.textContent = opt.sub;
      b.append(tile, lbl, sub);
      grid.appendChild(b);
    });

    const idkSel = !!prev?.isIdk;
    idk.classList.toggle("is-selected", idkSel);
    idk.classList.remove("is-flash");
    idk.setAttribute("aria-pressed", String(idkSel));
    keep.hidden = !prev;
  }

  function choose(quad: Quadrant | "IDK", el: HTMLElement): void {
    if (locked || state.screen !== "quiz") return;
    const card = CARDS[state.index];
    const prev = state.answers[card.id];
    const same = !!prev && (quad === "IDK" ? prev.isIdk : !prev.isIdk && prev.selectedQuadrant === quad);
    if (!same) {
      let answer: Answer;
      if (quad === "IDK") {
        answer = { tier: 5, points: IDK_POINTS, selectedQuadrant: null, isIdk: true };
      } else {
        const tier = state.layout[card.id][QUADS.indexOf(quad)];
        const opt = card.options.find((o) => o.tier === tier)!;
        answer = { tier: opt.tier, points: opt.points, selectedQuadrant: quad, isIdk: false };
      }
      state.answers[card.id] = answer;
      persist();
    }
    const a = state.answers[card.id];
    scoreEvent("score_card_answered", { cardId: card.id, dimension: card.dimension, tier: a.tier, isIdk: a.isIdk, index: state.index });

    locked = true;
    root.querySelectorAll(".score__block, .score__idk").forEach((n) => n.classList.remove("is-selected"));
    el.classList.add("is-flash");
    timers.push(window.setTimeout(() => {
      locked = false;
      advance();
    }, FLASH_MS));
  }

  function advance(): void {
    const unknowns = idkCount(state.answers);
    if (unknowns >= IDK_LIMIT) {
      show("inconclusive");
      scoreEvent("score_inconclusive", { atCard: CARDS[state.index].id, idkCount: unknowns });
      return;
    }
    if (state.index < CARDS.length - 1) {
      state.index++;
      persist();
      showCard();
    } else {
      runLoader();
    }
  }

  function goBack(): void {
    if (locked || state.index === 0) return;
    scoreEvent("score_back", { fromCard: CARDS[state.index].id });
    state.index--;
    persist();
    showCard();
  }

  function runLoader(): void {
    locked = true;
    show("loader", false);
    const msg = $("loadmsg");
    msg.textContent = LOAD_STEPS[0];
    msg.focus({ preventScroll: true });
    timers.push(
      window.setTimeout(() => { msg.textContent = LOAD_STEPS[1]; }, LOADER_MS / 2),
      window.setTimeout(() => {
        locked = false;
        finish();
      }, LOADER_MS),
    );
  }

  function persistResult(r: Result): void {
    saveResult({ total: r.total, band: r.band.name, weakest: r.weakest, radar: r.radar, completedAt: new Date().toISOString() });
  }

  function finish(): void {
    renderResult();
    show("result");
    if (!result) return;
    persistResult(result);
    (window as unknown as { __auxoMarkScore?: () => void }).__auxoMarkScore?.();
    scoreEvent("score_complete", {
      total: result.total, band: result.band.name, weakest: result.weakest, idkCount: result.idkCount,
      durationSec: durationSec(state.startedAt),
    });
  }

  function renderResult(): void {
    const r = computeResult(state.answers);
    result = r;
    const big = $("bigScore");
    big.textContent = String(r.total);
    const small = document.createElement("small");
    small.textContent = "/100";
    big.appendChild(small);
    const chip = $("bandChip");
    chip.textContent = r.band.name;
    chip.dataset.band = r.band.name.toLowerCase();
    $("scoreHead").dataset.band = r.band.name.toLowerCase();
    $("scoreRing").style.strokeDasharray = `${r.total} 100`;
    $("bandLine").textContent = r.band.line;

    $("dimTable").innerHTML =
      "<caption class=\"sr-only\">Score by dimension, out of 100</caption><tbody>" +
      DIMENSIONS.map((d) => {
        const v = r.radar[d];
        return `<tr data-tone="${tone(v)}"><th scope="row">${d}</th><td class="score__meter"><div class="score__meter-track"><i style="width:${v}%"></i></div></td><td>${v}</td></tr>`;
      }).join("") +
      "</tbody>";

    const f = FOCUS[r.weakest];
    const el = (tag: string, cls: string, text = "") => {
      const n = document.createElement(tag);
      if (cls) n.className = cls;
      n.textContent = text;
      return n;
    };
    const focus = $("focus");
    focus.textContent = "";
    const good = el("p", "score__good");
    good.append(el("strong", "", "What good looks like: "), f.good);
    focus.append(el("b", "", `Your first fix: ${r.weakest}`), el("p", "", f.why), good);

  }

  function clearTimers(): void {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function resetResultActions(): void {
    $("emailForm").hidden = true;
    const input = $<HTMLInputElement>("emailInput");
    input.value = "";
    input.removeAttribute("aria-invalid");
    const m = $("emailMsg");
    m.textContent = "";
    m.classList.remove("is-err");
    root.querySelectorAll<HTMLButtonElement>(".score__mail button[type=submit]").forEach((b) => {
      b.disabled = false;
      b.textContent = b.dataset.label ?? b.textContent;
    });
    $("emailBtn").textContent = "Email my full report";
    $("emailBtn").setAttribute("aria-expanded", "false");
    submits = 0;
  }

  function openQuiz(resumed: boolean): void {
    scoreEvent("score_start", { resumed });
    show("quiz", false);
    showCard();
  }

  function start(): void {
    clearTimers();
    locked = false;
    state = fresh("quiz");
    result = null;
    resetResultActions();
    openQuiz(false);
  }

  function wireForm(opts: {
    formId: string; inputId: string; msgId: string;
    url: string | undefined; success: (email: string) => string;
  }): void {
    const form = $<HTMLFormElement>(opts.formId);
    const input = $<HTMLInputElement>(opts.inputId);
    const msg = $(opts.msgId);
    const btn = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
    btn.dataset.label = btn.textContent ?? "";
    const hp = form.querySelector<HTMLInputElement>("input[name=company_website]")!;
    const say = (text: string, err = false) => {
      msg.textContent = text;
      msg.classList.toggle("is-err", err);
    };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (btn.disabled) return;
      const error = checkWorkEmail(input.value);
      if (error) {
        input.setAttribute("aria-invalid", "true");
        say(error, true);
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      const email = input.value.trim().toLowerCase();
      const done = () => {
        say(opts.success(email));
        btn.textContent = "Sent ✓";
        btn.disabled = true;
        $("emailBtn").textContent = "Report sent";
        scoreEvent("score_email_submit", { band: result?.band.name ?? "" });
      };
      if (hp.value) return done();
      if (submits >= MAX_SUBMITS) return say(MESSAGES.tooMany, true);
      submits++;

      const r = result ?? computeResult(state.answers);
      const ctx = buildContext(state, utm);
      const body = buildReportPayload(email, state, r, ctx);
      btn.disabled = true;
      btn.textContent = "Sending…";
      say("");
      const out = await postJson(opts.url, body);
      if (out.ok) return done();
      btn.disabled = false;
      btn.textContent = btn.dataset.label ?? "";
      say(out.message, true);
      scoreEvent("score_email_error", { status: out.status });
    });
  }

  wireForm({
    formId: "emailForm", inputId: "emailInput", msgId: "emailMsg", url: reportUrl,
    success: (email) => `Sent. Check ${email} in the next few minutes.`,
  });

  $("startBtn").addEventListener("click", start);
  $("startOverBtn").addEventListener("click", start);
  $("resumeBtn").addEventListener("click", () => openQuiz(true));
  $("retakeBtn").addEventListener("click", start);
  back.addEventListener("click", goBack);
  idk.addEventListener("click", () => choose("IDK", idk));
  keep.addEventListener("click", () => { if (!locked) advance(); });
  grid.addEventListener("click", (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>("[data-quad]");
    if (b) choose(b.dataset.quad as Quadrant, b);
  });
  document.addEventListener("astro:before-swap", clearTimers, { once: true });

  $("emailBtn").addEventListener("click", () => {
    const f = $("emailForm");
    f.hidden = !f.hidden;
    $("emailBtn").setAttribute("aria-expanded", String(!f.hidden));
    if (!f.hidden) {
      $("emailInput").focus();
      scoreEvent("score_email_open");
    }
  });
  keyHandler = (e: KeyboardEvent) => {
    if (state.screen !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const k = e.key.toUpperCase();
    const i = (QUADS as readonly string[]).indexOf(k);
    if (i >= 0) {
      e.preventDefault();
      choose(QUADS[i], grid.children[i] as HTMLElement);
    } else if (k === "I") {
      e.preventDefault();
      choose("IDK", idk);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      goBack();
    }
  };
  document.addEventListener("keydown", keyHandler);

  const saved = loadState();
  const valid = !!saved && !!saved.answers && !!saved.attemptId && !!saved.layout
    && saved.index >= 0 && saved.index < CARDS.length
    && CARDS.every((c) => Array.isArray(saved.layout[c.id]));
  if (saved && valid) {
    state = saved;
    if (saved.screen === "quiz") {
      $("resumeText").textContent = SCORE_COPY.intro.resume(saved.index + 1, CARDS.length);
      $("resumeBar").hidden = false;
      state.screen = "intro";
    } else if (saved.screen === "loader" || saved.screen === "result") {
      renderResult();
      show("result", false);
      if (saved.screen === "loader" && result) persistResult(result);
    } else if (saved.screen === "inconclusive") {
      show("inconclusive", false);
    }
  }
}
