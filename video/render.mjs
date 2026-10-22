import { execFileSync } from "node:child_process";

const jobs = {
  hero: ["Terrain", "out/terrain.mp4"],
  "hero-audio": ["TerrainAudio", "out/terrain-audio.mp4"],
  film: ["FilmAudio", "out/film.mp4"],
};
const run = (args) => execFileSync("npx", args, { stdio: "inherit", shell: true });
const picked = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(jobs);

run(["remotion", "bundle", "src/index.ts", "--out-dir=build", "--log=error"]);
for (const name of picked) {
  const [id, out] = jobs[name];
  const started = Date.now();
  run(["remotion", "render", "build", id, out, "--codec=h264", "--crf=20", "--audio-bitrate=256k", "--log=error"]);
  console.log(`${name}: ${((Date.now() - started) / 1000).toFixed(1)}s -> ${out}`);
}
