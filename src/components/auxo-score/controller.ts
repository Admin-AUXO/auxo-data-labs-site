import { CARDS, FOCUS } from "../../lib/auxo-score/cards";
import { DIMENSIONS, IDK_LIMIT, IDK_POINTS, QUADS, buildLayout, computeResult, idkCount, tone } from "../../lib/auxo-score/scoring";
import { checkWorkEmail } from "../../lib/auxo-score/email";
import { captureUtm, clearLegacy, loadState, saveResult, saveState } from "../../lib/auxo-score/storage";
import {
  MAX_SUBMITS, MESSAGES, buildContext, buildExtendedPayload, buildReportPayload, postJson, uuid,
} from "../../lib/auxo-score/submit";
import { scoreEvent } from "../../lib/auxo-score/analytics";
import { radarLabel, radarSvg } from "./Radar";
import type { Answer, Quadrant, Result, Screen, State } from "../../lib/auxo-score/types";

const FLASH_MS = 150;
const LOADER_MS = 1400;
const LOAD_STEPS = ["Scoring each dimension…", "Building your report…"];
const SCREENS: Screen[] = ["intro", "quiz", "loader", "result", "extended", "inconclusive"];

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
  if (keyHandler) {
    document.removeEventListener("keydown", keyHandler);
    keyHandler = null;
  }
  if (!found || found.dataset.bound) return;
  const root: HTMLElement = found;
  root.dataset.bound = "1";

  const $ = <T extends HTMLElement = HTMLElement>(id: string) => root.querySelector<T>(`#${id}`)!;
  const reportUrl = root.dataset.reportUrl || undefined;
  const extendedUrl = root.dataset.extendedUrl || undefined;

  clearLegacy();
  const utm = captureUtm();

  let state: State = fresh("intro");
  let locked = false;
  let timers: number[] = [];
  let result = null as Result | null;
  const submits = { report: 0, extended: 0 };

  const persist = () => saveState(state);

  function show(name: Screen, focus = true): void {
    state.screen = name;
    for (const s of SCREENS) $(`s-${s}`).hidden = s !== name;
    window.scrollTo({ top: 0 });
    if (focus) root.querySelector<HTMLElement>(`#s-${name} [tabindex="-1"]`)?.focus({ preventScroll: true });
    persist();
  }

  function renderCard(): void {
    const card = CARDS[state.index];
    const prev = state.answers[card.id];
    const back = $("backBtn");
    back.setAttribute("aria-hidden", state.index === 0 ? "true" : "false");
    back.tabIndex = state.index === 0 ? -1 : 0;
    $("dimPill").textContent = card.dimension.toUpperCase();
    $("count").textContent = `${card.id} / ${CARDS.length}`;
    $("progress").style.width = `${(state.index / CARDS.length) * 100}%`;
    $("question").textContent = card.question;

    const grid = $("grid");
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
      b.addEventListener("click", () => choose(q, b));
      grid.appendChild(b);
    });

    const idk = $("idkBtn");
    const idkSel = !!prev?.isIdk;
    idk.classList.toggle("is-selected", idkSel);
    idk.classList.remove("is-flash");
    idk.setAttribute("aria-pressed", String(idkSel));
    $("keepBtn").hidden = !prev;
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
    if (idkCount(state.answers) >= IDK_LIMIT) {
      show("inconclusive");
      scoreEvent("score_inconclusive", { atCard: CARDS[state.index].id, idkCount: idkCount(state.answers) });
      return;
    }
    if (state.index < CARDS.length - 1) {
      state.index++;
      persist();
      renderCard();
      $("question").focus({ preventScroll: true });
    } else {
      runLoader();
    }
  }

  function goBack(): void {
    if (locked || state.index === 0) return;
    scoreEvent("score_back", { fromCard: CARDS[state.index].id });
    state.index--;
    persist();
    renderCard();
    $("question").focus({ preventScroll: true });
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

  function finish(): void {
    renderResult();
    show("result");
    if (!result) return;
    saveResult({ total: result.total, band: result.band.name, weakest: result.weakest, radar: result.radar, completedAt: new Date().toISOString() });
    (window as unknown as { __auxoMarkScore?: () => void }).__auxoMarkScore?.();
    const started = Date.parse(state.startedAt);
    scoreEvent("score_complete", {
      total: result.total, band: result.band.name, weakest: result.weakest, idkCount: result.idkCount,
      durationSec: Number.isFinite(started) ? Math.round((Date.now() - started) / 1000) : 0,
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
    $("bandLine").textContent = r.band.line;

    const svg = $("radar");
    svg.innerHTML = radarSvg(r.radar, r.weakest);
    svg.setAttribute("aria-label", radarLabel(r.radar));

    $("dimTable").innerHTML =
      "<caption class=\"sr-only\">Score by dimension, out of 100</caption><tbody>" +
      DIMENSIONS.map((d) => {
        const v = r.radar[d];
        const weak = d === r.weakest;
        const tag = weak ? ` <span class="score__weak-tag">Weakest</span>` : "";
        return `<tr data-tone="${tone(v)}"><th scope="row">${d}${tag}</th><td class="score__meter"><div class="score__meter-track"><i style="width:${v}%"></i></div></td><td>${v}</td></tr>`;
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

    const gaps = CARDS
      .map((c) => ({ c, a: state.answers[c.id] }))
      .filter(({ a }) => a && (a.isIdk || a.points < 7))
      .sort((x, y) => x.a.points - y.a.points || x.c.id - y.c.id)
      .slice(0, 3);
    const box = $("gaps");
    box.textContent = "";
    box.hidden = gaps.length === 0;
    if (gaps.length) {
      box.append(el("p", "score__panel-title", "Where you lost the most points"));
      const list = el("ul", "score__gap-list");
      for (const { c, a } of gaps) {
        const li = el("li", "score__gap");
        li.append(el("span", "score__gap-dim", c.dimension), el("b", "", c.topic));
        const now = c.options.find((o) => o.tier === a.tier);
        li.append(el("p", "", a.isIdk || !now ? "You said: I don't know. Finding out is the first step." : `You said: ${now.label}. ${now.sub}.`));
        list.append(li);
      }
      box.append(list, el("p", "score__gap-next", "The step-by-step plan for each of these is in your emailed report."));
    }
  }

  function clearTimers(): void {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function resetResultActions(): void {
    ["emailForm", "extCheck"].forEach((id) => { $(id).hidden = true; });
    for (const [inputId, msgId] of [["emailInput", "emailMsg"], ["seatInput", "seatMsg"]]) {
      const input = $<HTMLInputElement>(inputId);
      input.value = "";
      input.removeAttribute("aria-invalid");
      const m = $(msgId);
      m.textContent = "";
      m.classList.remove("is-err");
    }
    root.querySelectorAll<HTMLButtonElement>(".score__mail button[type=submit]").forEach((b) => {
      b.disabled = false;
      b.textContent = b.dataset.label ?? b.textContent;
    });
    $<HTMLInputElement>("chk1").checked = false;
    $<HTMLInputElement>("chk2").checked = false;
    $<HTMLButtonElement>("extContinue").disabled = true;
    $("emailBtn").textContent = "Email my full report";
    $("emailBtn").setAttribute("aria-expanded", "false");
    $("extLink").setAttribute("aria-expanded", "false");
    submits.report = 0;
    submits.extended = 0;
  }

  function start(): void {
    clearTimers();
    locked = false;
    state = fresh("quiz");
    result = null;
    resetResultActions();
    scoreEvent("score_start", { resumed: false });
    show("quiz", false);
    renderCard();
    $("question").focus({ preventScroll: true });
  }

  function resume(): void {
    scoreEvent("score_start", { resumed: true });
    show("quiz", false);
    renderCard();
    $("question").focus({ preventScroll: true });
  }

  function wireForm(opts: {
    formId: string; inputId: string; msgId: string; kind: "report" | "extended";
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
        if (opts.kind === "report") {
          btn.textContent = "Sent ✓";
          btn.disabled = true;
          $("emailBtn").textContent = "Report sent";
          scoreEvent("score_email_submit", { band: result?.band.name ?? "" });
        } else {
          btn.disabled = true;
          scoreEvent("score_extended_submit");
        }
      };
      if (hp.value) return done();
      if (submits[opts.kind] >= MAX_SUBMITS) return say(MESSAGES.tooMany, true);
      submits[opts.kind]++;

      const r = result ?? computeResult(state.answers);
      const ctx = buildContext(state, utm);
      const body = opts.kind === "report"
        ? buildReportPayload(email, hp.value, state, r, ctx)
        : buildExtendedPayload(email, hp.value, state, r, ctx);
      btn.disabled = true;
      btn.textContent = "Sending…";
      say("");
      const out = await postJson(opts.url, body);
      if (out.ok) return done();
      btn.disabled = false;
      btn.textContent = btn.dataset.label ?? "";
      say(out.message, true);
      if (opts.kind === "report") scoreEvent("score_email_error", { status: out.status });
    });
  }

  wireForm({
    formId: "emailForm", inputId: "emailInput", msgId: "emailMsg", kind: "report", url: reportUrl,
    success: (email) => `Sent. Check ${email} in the next few minutes.`,
  });
  wireForm({
    formId: "seatForm", inputId: "seatInput", msgId: "seatMsg", kind: "extended", url: extendedUrl,
    success: (email) => `Request received. We'll confirm your place at ${email}.`,
  });

  $("startBtn").addEventListener("click", start);
  $("startOverBtn").addEventListener("click", start);
  $("resumeBtn").addEventListener("click", resume);
  $("retakeBtn").addEventListener("click", start);
  $("backBtn").addEventListener("click", goBack);
  $("idkBtn").addEventListener("click", (e) => choose("IDK", e.currentTarget as HTMLElement));
  $("keepBtn").addEventListener("click", () => { if (!locked) advance(); });

  $("emailBtn").addEventListener("click", () => {
    const f = $("emailForm");
    f.hidden = !f.hidden;
    $("emailBtn").setAttribute("aria-expanded", String(!f.hidden));
    if (!f.hidden) {
      $("emailInput").focus();
      scoreEvent("score_email_open");
    }
  });
  $("extLink").addEventListener("click", () => {
    const f = $("extCheck");
    f.hidden = !f.hidden;
    $("extLink").setAttribute("aria-expanded", String(!f.hidden));
    if (!f.hidden) scoreEvent("score_extended_click");
  });
  for (const id of ["chk1", "chk2"]) {
    $(id).addEventListener("change", () => {
      $<HTMLButtonElement>("extContinue").disabled = !($<HTMLInputElement>("chk1").checked && $<HTMLInputElement>("chk2").checked);
    });
  }
  $("extCheck").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($<HTMLButtonElement>("extContinue").disabled) return;
    scoreEvent("score_extended_qualified");
    show("extended");
  });
  $("backToResult").addEventListener("click", () => show("result"));

  keyHandler = (e: KeyboardEvent) => {
    if (state.screen !== "quiz" || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const k = e.key.toUpperCase();
    const i = (QUADS as readonly string[]).indexOf(k);
    if (i >= 0) {
      e.preventDefault();
      choose(QUADS[i], $("grid").children[i] as HTMLElement);
    } else if (k === "I") {
      e.preventDefault();
      choose("IDK", $("idkBtn"));
    } else if (e.key === "Backspace") {
      e.preventDefault();
      goBack();
    }
  };
  document.addEventListener("keydown", keyHandler);

  const saved = loadState();
  if (saved && saved.layout && saved.answers && saved.attemptId) {
    state = saved;
    if (saved.screen === "quiz") {
      $("resumeText").textContent = `You have a test in progress (card ${saved.index + 1} of ${CARDS.length}).`;
      $("resumeBar").hidden = false;
      state.screen = "intro";
    } else if (saved.screen === "loader" || saved.screen === "result" || saved.screen === "extended") {
      renderResult();
      show(saved.screen === "extended" ? "extended" : "result", false);
      if (saved.screen === "loader" && result) {
        saveResult({ total: result.total, band: result.band.name, weakest: result.weakest, radar: result.radar, completedAt: new Date().toISOString() });
      }
    } else if (saved.screen === "inconclusive") {
      show("inconclusive", false);
    }
  }
}
