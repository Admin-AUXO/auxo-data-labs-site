import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const sharp = require("../../node_modules/sharp");
const SIZE = 512;

function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

fs.mkdirSync("public/grain", { recursive: true });
for (let k = 0; k < 8; k++) {
  const r = mulberry(100 + k);
  const px = Buffer.alloc(SIZE * SIZE);
  for (let i = 0; i < px.length; i++) {
    const g = (r() + r() + r()) / 3;
    px[i] = Math.round(g * 255);
  }
  await sharp(px, { raw: { width: SIZE, height: SIZE, channels: 1 } }).png().toFile(`public/grain/${k}.png`);
}
console.log("grain tiles written");
