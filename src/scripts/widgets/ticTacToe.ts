/**
 * Playable tic-tac-toe with an unbeatable minimax opponent.
 *
 * Human plays X (and moves first); "AUXO" plays O with perfect strategy.
 * Animations use the Web Animations API — no GSAP, no runtime deps — and only
 * run when the site's opt-in motion model is enabled. Init is idempotent so it
 * is safe to call on both first paint and every `astro:page-load`.
 *
 * Scoring convention: X win = +1, O win = -1, draw = 0.
 * AUXO (O) therefore minimises; the human can at best force a draw.
 */

type Mark = "X" | "O";
type Board = (Mark | null)[];

const HUMAN: Mark = "X";
const AI: Mark = "O";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

const POP_EASING = "cubic-bezier(0.34, 1.56, 0.64, 1)"; // approximates back.out

const O = '<span class="ttt__o">AUXO</span>';

// AUXO wins escalate with the streak, then cycle through generic gloats.
const AI_WIN_ESCALATION = [
  `${O} wins. The model doesn't miss.`,
  `Two straight for ${O}. It saw that one coming.`,
  `Three in a row — the model's still three moves ahead.`,
  `Four, and counting. Might be time to sit one out.`,
];
const AI_WIN_GENERIC = [
  `${O} again. Resistance noted, not rewarded.`,
  `Another for the model. Flawless, as designed.`,
  `The house reads every line before you draw it.`,
];
const DRAWS = [
  `Draw. A perfect game ends even — that's the point.`,
  `Even again. Optimal play, nothing left on the table.`,
  `Stalemate. That's the ceiling against a model that doesn't slip.`,
];
const HUMAN_WINS = [
  `You beat the model?! That shouldn't be possible — nicely done.`,
  `Again? Either you're brilliant or we owe the model a patch.`,
];

function aiWinMessage(streak: number): string {
  if (streak <= AI_WIN_ESCALATION.length) return AI_WIN_ESCALATION[streak - 1];
  const i = (streak - AI_WIN_ESCALATION.length - 1) % AI_WIN_GENERIC.length;
  return AI_WIN_GENERIC[i];
}
function drawMessage(count: number): string {
  return DRAWS[(count - 1) % DRAWS.length];
}
function humanWinMessage(count: number): string {
  return HUMAN_WINS[Math.min(count - 1, HUMAN_WINS.length - 1)];
}

function winningLine(b: Board): readonly number[] | null {
  for (const line of LINES) {
    const [a, c, d] = line;
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return line;
  }
  return null;
}

function isFull(b: Board): boolean {
  return b.every((c) => c !== null);
}

function minimax(b: Board, turn: Mark): number {
  const line = winningLine(b);
  if (line) return b[line[0]] === "X" ? 1 : -1;
  if (isFull(b)) return 0;

  const scores: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (b[i] === null) {
      b[i] = turn;
      scores.push(minimax(b, turn === "X" ? "O" : "X"));
      b[i] = null;
    }
  }
  return turn === "X" ? Math.max(...scores) : Math.min(...scores);
}

function bestMove(b: Board): number {
  let best = Infinity; // AI is O → minimising
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i] === null) {
      b[i] = AI;
      const score = minimax(b, HUMAN);
      b[i] = null;
      if (score < best) {
        best = score;
        move = i;
      }
    }
  }
  return move;
}

function motionEnabled(): boolean {
  const optedIn = document.documentElement.dataset.motion === "on";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return optedIn && !reduce;
}

export function initTicTacToe(root: HTMLElement): void {
  // Idempotent: guard against double-binding on repeat astro:page-load events.
  if (root.dataset.tttReady === "1") return;
  root.dataset.tttReady = "1";

  const board: Board = Array(9).fill(null);
  const cells = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-ttt-cell]"),
  );
  const status = root.querySelector<HTMLElement>("[data-ttt-status]");
  const resetBtn = root.querySelector<HTMLButtonElement>("[data-ttt-reset]");
  const strike = root.querySelector<HTMLElement>("[data-ttt-strike]");
  const turnChips = {
    X: root.querySelector<HTMLElement>('[data-ttt-turn="X"]'),
    O: root.querySelector<HTMLElement>('[data-ttt-turn="O"]'),
  };
  const scoreEls = {
    you: root.querySelector<HTMLElement>("[data-ttt-score-you]"),
    draw: root.querySelector<HTMLElement>("[data-ttt-score-draw]"),
    ai: root.querySelector<HTMLElement>("[data-ttt-score-ai]"),
  };
  const score = { you: 0, draw: 0, ai: 0 };

  const animate = motionEnabled();
  let locked = false; // block input while AI "thinks" / game over
  let finished: { line: readonly number[]; winner: Mark } | null = null;
  let aiStreak = 0; // consecutive AUXO wins, for escalating messages

  function setStatus(html: string): void {
    if (status) status.innerHTML = html;
  }

  function setTurn(mark: Mark | null): void {
    if (turnChips.X)
      turnChips.X.toggleAttribute("data-active", mark === HUMAN);
    if (turnChips.O) turnChips.O.toggleAttribute("data-active", mark === AI);
  }

  function bumpScore(): void {
    if (scoreEls.you) scoreEls.you.textContent = String(score.you);
    if (scoreEls.draw) scoreEls.draw.textContent = String(score.draw);
    if (scoreEls.ai) scoreEls.ai.textContent = String(score.ai);
  }

  function placeMark(i: number, mark: Mark): void {
    board[i] = mark;
    const cell = cells[i];
    const glyph = cell.querySelector<HTMLElement>("[data-ttt-glyph]");
    cell.disabled = true;
    cell.setAttribute(
      "aria-label",
      `Cell ${i + 1}, ${mark === HUMAN ? "you" : "AUXO"} played ${mark}`,
    );
    if (!glyph) return;
    glyph.textContent = mark;
    glyph.dataset.mark = mark;
    if (!animate) {
      glyph.style.opacity = "1";
      return;
    }
    glyph.animate(
      [
        { opacity: 0, transform: "scale(0.6)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 320, easing: POP_EASING, fill: "forwards" },
    );
  }

  /**
   * Draw the winning strike from the real cell rects (gap-agnostic), centred on
   * the line through both end cells' centres. `withAnim` is false on resize so
   * the line snaps to the new geometry without re-running the draw animation.
   */
  function drawStrike(
    line: readonly number[],
    winner: Mark,
    withAnim = animate,
  ): void {
    if (!strike) return;
    const panel = strike.parentElement;
    if (!panel) return;
    const base = panel.getBoundingClientRect();
    const a = cells[line[0]].getBoundingClientRect();
    const c = cells[line[line.length - 1]].getBoundingClientRect();

    // Centre points of the first and last winning cells, relative to the panel.
    const x1 = a.left + a.width / 2 - base.left;
    const y1 = a.top + a.height / 2 - base.top;
    const x2 = c.left + c.width / 2 - base.left;
    const y2 = c.top + c.height / 2 - base.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const pad = 0.12; // extend slightly past the end marks
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    const color = winner === HUMAN ? "var(--accent)" : "var(--accent-2)";
    strike.style.background = color;
    strike.style.boxShadow = `0 0 12px color-mix(in oklch, ${color} 70%, transparent)`;
    // Pivot the bar on the start cell's centre; CSS margin-top:-2px centres the
    // 4px-tall bar vertically, and transform-origin:left center rotates about it.
    strike.style.left = `${x1 - dx * pad}px`;
    strike.style.top = `${y1 - dy * pad}px`;
    strike.style.width = `${len * (1 + pad * 2)}px`;
    strike.style.opacity = "1";

    if (!withAnim) {
      strike.style.transform = `rotate(${angle}deg) scaleX(1)`;
      return;
    }
    strike.style.transform = `rotate(${angle}deg)`;
    strike.animate(
      [
        { transform: `rotate(${angle}deg) scaleX(0)` },
        { transform: `rotate(${angle}deg) scaleX(1)` },
      ],
      { duration: 420, easing: "ease-out", fill: "forwards" },
    );
  }

  function endGame(line: readonly number[] | null, winner: Mark | null): void {
    locked = true;
    root.dataset.state = "over";
    setTurn(null);
    cells.forEach((c) => (c.disabled = true));

    if (line && winner) {
      finished = { line, winner };
      line.forEach((i) => {
        const glyph = cells[i].querySelector<HTMLElement>("[data-ttt-glyph]");
        if (glyph) glyph.dataset.win = "true";
      });
      drawStrike(line, winner);
      if (winner === HUMAN) {
        score.you += 1;
        aiStreak = 0;
        setStatus(humanWinMessage(score.you));
      } else {
        score.ai += 1;
        aiStreak += 1;
        setStatus(aiWinMessage(aiStreak));
      }
    } else {
      score.draw += 1;
      aiStreak = 0;
      setStatus(drawMessage(score.draw));
    }
    bumpScore();
  }

  function aiMove(): void {
    if (winningLine(board) || isFull(board)) return;
    setTurn(AI);
    setStatus(`<span class="ttt__o">AUXO</span> is thinking…`);
    const move = bestMove(board);
    const delay = animate ? 380 : 0;
    window.setTimeout(() => {
      placeMark(move, AI);
      if (winningLine(board)) {
        endGame(winningLine(board), AI);
      } else if (isFull(board)) {
        endGame(null, null);
      } else {
        locked = false;
        setTurn(HUMAN);
        setStatus(`Your move — you're <span class="ttt__x">X</span>.`);
      }
    }, delay);
  }

  function onCell(i: number): void {
    if (locked || board[i] !== null) return;
    placeMark(i, HUMAN);
    const line = winningLine(board);
    if (line) {
      endGame(line, HUMAN);
      return;
    }
    if (isFull(board)) {
      endGame(null, null);
      return;
    }
    locked = true;
    aiMove();
  }

  function reset(): void {
    board.fill(null);
    locked = false;
    finished = null;
    delete root.dataset.state;
    setTurn(HUMAN);
    if (strike) {
      strike.style.opacity = "0";
      strike.style.transform = "scaleX(0)";
      strike.style.width = "0px";
    }
    cells.forEach((cell, i) => {
      cell.disabled = false;
      cell.setAttribute("aria-label", `Cell ${i + 1}, empty`);
      const glyph = cell.querySelector<HTMLElement>("[data-ttt-glyph]");
      if (glyph) {
        glyph.textContent = "";
        glyph.style.opacity = "0";
        delete glyph.dataset.mark;
        delete glyph.dataset.win;
      }
    });
    setStatus(`Your move — tap a square.`);
  }

  cells.forEach((cell, i) => cell.addEventListener("click", () => onCell(i)));
  resetBtn?.addEventListener("click", reset);

  // Keep the winning strike centred if the board is resized after a win.
  let resizeRaf = 0;
  window.addEventListener("resize", () => {
    if (!finished) return;
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() =>
      drawStrike(finished!.line, finished!.winner, false),
    );
  });

  setTurn(HUMAN);
  bumpScore();
}
