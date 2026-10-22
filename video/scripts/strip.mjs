import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";

const require = createRequire(import.meta.url);
const sharp = require("../../node_modules/sharp");

const id = process.argv[2] ?? "Film";
const centers = (process.argv[3] ?? "").split(",").filter(Boolean).map(Number);
const span = Number(process.argv[4] ?? 12);
const outDir = path.resolve("out/strips");
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = path.resolve("build");
const browser = await openBrowser("chrome", { chromiumOptions: { gl: "angle" } });
const composition = await selectComposition({ serveUrl, id, puppeteerInstance: browser });
const tw = 320;
const th = Math.round((tw * composition.height) / composition.width);

for (const c of centers) {
  const frames = [-2, -1, 0, 1, 2].map((k) => Math.max(0, Math.min(composition.durationInFrames - 1, c + k * span)));
  const tiles = [];
  for (const frame of frames) {
    const file = path.join(outDir, `${c}-${frame}.jpeg`);
    await renderStill({ composition, serveUrl, frame, output: file, imageFormat: "jpeg", puppeteerInstance: browser });
    const label = Buffer.from(`<svg width="${tw}" height="22"><rect width="${tw}" height="22" fill="#000" opacity="0.6"/><text x="6" y="16" font-family="monospace" font-size="14" fill="#a3e635">f${frame}</text></svg>`);
    tiles.push(await sharp(await sharp(file).resize(tw, th).toBuffer()).composite([{ input: label, top: 0, left: 0 }]).toBuffer());
  }
  await sharp({ create: { width: tw * tiles.length, height: th, channels: 3, background: "#000" } })
    .composite(tiles.map((b, i) => ({ input: b, left: i * tw, top: 0 })))
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, `strip-${c}.jpeg`));
}
await browser.close({ silent: true });
console.log(`strips for ${centers.join(", ")} in ${outDir}`);
