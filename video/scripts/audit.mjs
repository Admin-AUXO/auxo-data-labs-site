import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";

const require = createRequire(import.meta.url);
const sharp = require("../../node_modules/sharp");

const id = process.argv[2] ?? "Film";
const step = Number(process.argv[3] ?? 60);
const outDir = path.resolve("out/audit");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = path.resolve("build");
const browser = await openBrowser("chrome", { chromiumOptions: { gl: "angle" } });
const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser });
const frames = [];
for (let f = 0; f < composition.durationInFrames; f += step) frames.push(f);
frames.push(composition.durationInFrames - 1);

for (const frame of frames) {
  await renderStill({ composition, serveUrl, frame, output: path.join(outDir, `${String(frame).padStart(4, "0")}.jpeg`), imageFormat: "jpeg", puppeteerInstance: browser });
}
await browser.close({ silent: true });

const cols = 4;
const tw = 480;
const th = Math.round((tw * composition.height) / composition.width);
const tiles = await Promise.all(
  frames.map(async (f) => {
    const img = await sharp(path.join(outDir, `${String(f).padStart(4, "0")}.jpeg`)).resize(tw, th).toBuffer();
    const label = Buffer.from(`<svg width="${tw}" height="28"><rect width="${tw}" height="28" fill="#000" opacity="0.6"/><text x="8" y="19" font-family="monospace" font-size="16" fill="#a3e635">f${f} · ${(f / composition.fps).toFixed(1)}s</text></svg>`);
    return sharp(img).composite([{ input: label, top: 0, left: 0 }]).toBuffer();
  }),
);
const pages = Math.ceil(tiles.length / 12);
for (let p = 0; p < pages; p++) {
  const chunk = tiles.slice(p * 12, p * 12 + 12);
  const rows = Math.ceil(chunk.length / cols);
  await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: "#000" } })
    .composite(chunk.map((b, i) => ({ input: b, left: (i % cols) * tw, top: Math.floor(i / cols) * th })))
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, `sheet-${p + 1}.jpeg`));
}
console.log(`${frames.length} frames, ${pages} sheets in ${outDir}`);
