import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const svg = readFileSync(join(pub, "favicon.svg"));
const BG = "#080808";

const render = (size) => sharp(svg, { density: 384 }).resize(size, size).png();

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

async function flat(size, out) {
  await render(size).toFile(join(pub, out));
  console.log("wrote", out);
}

async function ico() {
  const png = await render(32).toBuffer();
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);
  writeFileSync(join(pub, "favicon.ico"), Buffer.concat([header, entry, png]));
  console.log("wrote favicon.ico");
}

await flat(192, "icon-192.png");
await flat(512, "icon-512.png");
await padded(180, 0.82, "apple-touch-icon.png");
await padded(512, 0.6, "maskable-512.png");
await ico();
console.log("done");
