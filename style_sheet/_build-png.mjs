import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";

const sora = readFileSync("style_sheet/fonts/Sora-Variable.woff2").toString("base64");
const fontFace = `<defs><style>
@font-face{font-family:'Sora';font-weight:100 800;font-style:normal;src:url(data:font/woff2;base64,${sora}) format('woff2');}
text{font-family:'Sora',system-ui,Arial,sans-serif;}
</style></defs>`;

function withFont(svgPath) {
  const svg = readFileSync(svgPath, "utf8");
  return svg.replace(/(<svg[^>]*>)/, `$1${fontFace}`);
}

const jobs = [
  { src: "auxo-monogram.svg", out: "auxo-monogram", widths: [512, 1024] },
  { src: "auxo-monogram-on-dark.svg", out: "auxo-monogram-on-dark", widths: [512, 1024] },
  { src: "auxo-favicon.svg", out: "auxo-favicon", widths: [64, 256] },
  { src: "auxo-lockup-dark.svg", out: "auxo-lockup-dark", widths: [1000, 2000] },
  { src: "auxo-lockup-light.svg", out: "auxo-lockup-light", widths: [1000, 2000] },
];

for (const job of jobs) {
  const buf = Buffer.from(withFont(`style_sheet/logos/${job.src}`));
  for (const w of job.widths) {
    const file = `style_sheet/logos/${job.out}-${w}.png`;
    await sharp(buf, { density: 384 })
      .resize({ width: w })
      .png({ compressionLevel: 9 })
      .toFile(file);
    console.log("wrote", file);
  }
}
