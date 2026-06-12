// Regenerate raster icons from public/favicon.svg.
// Run: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const svg = readFileSync(join(pub, "favicon.svg"));
const BG = "#080808"; // brand dark / --background (matches manifest theme/background)

const render = (size) => sharp(svg, { density: 384 }).resize(size, size).png();

// Centered on a solid background, with a safe-zone margin (for Apple + maskable).
async function padded(canvas, logoFrac, out) {
  const logoSize = Math.round(canvas * logoFrac);
  const logo = await render(logoSize).toBuffer();
  const offset = Math.round((canvas - logoSize) / 2);
  await sharp({
    create: { width: canvas, height: canvas, channels: 4, background: BG },
  })
    .composite([{ input: logo, top: offset, left: offset }])
    .png()
    .toFile(join(pub, out));
  console.log("wrote", out);
}

// Transparent, edge-to-edge (modern any-purpose PWA + favicon fallback).
async function flat(size, out) {
  await render(size).toFile(join(pub, out));
  console.log("wrote", out);
}

// Minimal ICO wrapping a 32x32 PNG (browsers support PNG-encoded ICO entries).
async function ico() {
  const png = await render(32).toBuffer();
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // width
  entry.writeUInt8(32, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // size
  entry.writeUInt32LE(header.length + entry.length, 12); // offset
  writeFileSync(join(pub, "favicon.ico"), Buffer.concat([header, entry, png]));
  console.log("wrote favicon.ico");
}

await flat(192, "icon-192.png");
await flat(512, "icon-512.png");
await padded(180, 0.82, "apple-touch-icon.png"); // small margin; iOS rounds corners
await padded(512, 0.6, "maskable-512.png"); // ~20% safe zone each side
await ico();
console.log("done");
