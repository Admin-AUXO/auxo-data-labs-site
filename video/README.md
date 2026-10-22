# Homepage video

Code-rendered hero loop (16s, 1080×1080, muted) and brand film (60s, 1920×1080, 2.39:1 letterbox, with score) for the homepage. Built with Remotion 4 and three.js; the score is synthesised in code.

Remotion is free for companies of up to three people. Re-check the licence if the team grows.

## Run

```bash
npm install
node scripts/grain.mjs
node scripts/score.mjs
node render.mjs
```

- `node render.mjs film | hero | hero-audio` renders one output into `out/`.
- `npm run studio` opens Remotion Studio for scrubbing.
- `node scripts/audit.mjs Film 60` writes contact sheets (one frame every N frames) to `out/audit/`.
- `node scripts/strip.mjs Film 600,960 6` writes frame strips around given frames to `out/strips/`.

`out/`, `build/`, the score WAVs and the grain tiles are generated and not committed. The preview page at `/video-drafts/` expects renders copied into `../public/video-drafts/` (also not committed).

## Layout

- `src/cues.json` — single timeline shared by the scenes and the score.
- `src/lib/world.tsx` — the terrain world: particle shaders, sun backlight, light wall, beam, god rays, labels.
- `src/lib/GlowStage.tsx` — glow from downscaled, blurred copies of the scene (pmndrs Bloom rendered blank frames under Remotion).
- `src/scenes/Terrain.tsx` — hero loop on a closed camera spline.
- `src/scenes/Film.tsx` — film as two continuous camera moves joined by one black beat.
- `scripts/score.mjs` — score and sound design rendered to WAV from the cues.

## Render performance

On the i7-1360P / Iris Xe laptop: about 2–5 min for the film and 40–70s for the hero. RAM pressure is the main slowdown; free memory before long renders. Settings live in `remotion.config.ts` (ANGLE, concurrency 6, x264 `veryfast`).

## Research notes

**Story and structure**
- One idea (Saul Bass, Kyle Cooper): light finds where to act. [Medium](https://medium.com/art-science/saul-bass-on-his-approach-to-designing-movie-title-sequences-47fd537c457b)
- Brand film shape: approach, turn, arrival held long, consequence; hook in the first 3s. [8frame](https://www.8frame.co/blog/how-to-storyboard-a-brand-film)
- Colour arc (Pixar colour scripts): warm amber noise to teal shadows and lime light. [Colorpick](https://colorpick.app/blog/color-film-cinematography-color-grading-guide)
- Edit for emotion first (Walter Murch, Rule of Six). [Beverly Boy](https://beverlyboy.com/filmmaking/what-is-walter-murchs-rule-of-six-in-editing-theory/)

**Cinematography**
- Emmanuel Lubezki: found natural light, wide lens close to the subject, floating camera, long takes. Applied as the rising sun, backlit terrain, wide-lens opening and camera breath. [DFI Rentals](https://www.dfirentals.com/news/emmanuel-lubezki-cinematography-natural-light-wide-lenses-long-takes-digger)
- Roger Deakins: one motivated source, let darkness stay dark, haze and silhouettes. Applied as one source per moment and lit haze motes. [Neil Oseman](https://neiloseman.com/roger-deakins-oscar-winning-cinematography-blade-runner-2049/)
- Gordon Willis: top light, underexposure, stillness. Applied as the locked, symmetrical, top-lit arrival frame. [IndieWire](https://www.indiewire.com/features/general/godfather-50th-anniversary-cinematography-1234712372/)
- David Fincher: the camera only moves when motivated. [No Film School](https://nofilmschool.com/david-fincher-never-pans)
- Denis Villeneuve: scale through held wides and negative space. [StillsLab](https://stillslab.com/news/denis-villeneuve-s-visual-style-scale-silence-and-letting-the-frame-talk)

**Audits that shaped the current cut**
- Hard cuts with the camera easing to zero at every cut read as disconnected; replaced by continuous moves with velocity smoothing.
- Leader lines on the pillars were cluttered; replaced by a tile list synced to light pulses on each peak.

**Open question**
The owner still finds the look basic. Two research tracks below: upgrading the current code pipeline, and free tools beyond the browser renderer.

## Code pipeline upgrades (researched 2026-10-22)

Verified on this laptop with Remotion 4.0.537 and headless shell 157:
- WebGL2 with `--gl=angle` runs on the Iris Xe (D3D11) and supports half-float render targets, which real bloom needs.
- WebGPU fails in Remotion's bundled headless shell (`dxcompiler.dll` missing) but works when Remotion uses system Chrome via `--browser-executable`.
- `<ThreeCanvas>` calls R3F's `advance()` each frame, so a hand-built composer rendered from `useFrame(() => composer.render(1 / fps), 1)` should work. The blank frames likely came from `@react-three/postprocessing` setting up after that call. Not yet confirmed by a test render.

| Package | Licence | Adds | Notes |
|---|---|---|---|
| `postprocessing` 6.39.5 (pmndrs), used directly | Zlib | Mipmap bloom, DOF, chromatic aberration, vignette, `LUT3DEffect`, AgX/ACES | Half-float buffers; fixed delta per frame |
| three.js post (`UnrealBloomPass`, `BokehPass`, `LUTPass`, `OutputPass`) | MIT | Same, less polished | Same pattern |
| three.js WebGPU/TSL nodes (`BloomNode`, `DepthOfFieldNode`, `MotionBlur`, `FilmNode`, `GodraysNode`, `TRAANode`, `Lut3DNode`) | MIT | Full cinematic post | Needs `<ThreeWebGPUCanvas>` + system Chrome; shaders rewritten in TSL |
| `GPUComputationRenderer` / TSL compute | MIT | Flowing GPU particles, curl noise | Must be deterministic per frame (out-of-order parallel renders) |
| `troika-three-text` 0.52.5 | MIT | Crisp 3D SDF typography | Wrap font load in `delayRender` |
| `@remotion/media-utils` 4.0.537 | MIT | Audio-reactive uniforms (`useAudioData`, `visualizeAudio`) | Low effort |
| `@remotion/noise` 4.0.537 | MIT | Deterministic camera drift | Low effort |

Avoid or skip: Lygia (non-commercial Prosperity licence), `three-good-godrays` (needs shadow-casting geometry; use a radial-blur pass instead), `three-gpu-pathtracer` (stills only), Gaussian splats (need captured scenes), `@theatre/core` (dormant since 2024-05), GSAP for the 3D camera (`@remotion/gsap` tweens DOM/SVG only), `@remotion/motion-blur` around `<ThreeCanvas>` (reported deadlock; multiplies render time).

Ranked plan:
1. Replace the blurred duplicate canvases with one hand-built pmndrs composer: HDR particles, mipmap bloom, AgX, a `.cube` film LUT, vignette, frame-seeded grain.
2. DOF with animated rack focus, plus a radial-blur light-shaft pass from the scan light.
3. Spline camera with deterministic noise drift; shader-side motion streaks.
4. Audio-reactive terrain and scan via `@remotion/media-utils`; `troika-three-text` for 3D typography.
5. Later: `<ThreeWebGPUCanvas>` with TSL compute particles and TSL post nodes.

Sources: [Remotion WebGPU canvas](https://www.remotion.dev/docs/three-webgpu-canvas), [Remotion issue #623](https://github.com/remotion-dev/remotion/issues/623), [three.js EffectComposer](https://threejs.org/docs/pages/EffectComposer.html), [@remotion/gsap](https://www.remotion.dev/docs/gsap), [CameraMotionBlur](https://www.remotion.dev/docs/motion-blur/camera-motion-blur).

## Free 3D and film tools (researched 2026-10-22)

Checked against commercial use for a 3-person company and this laptop (i7-1360P, Iris Xe, 16 GB). Render times are estimates.

| Tool | Adds | Licence | On this laptop | Scriptable |
|---|---|---|---|---|
| Blender 5.2 LTS | Path-traced volumetrics, DOF, motion blur, Geometry Nodes, Mantaflow, AgX/ACES 2.0, compositor bloom and grain | GPL, renders are yours | EEVEE on Iris Xe ~3–30 s/frame; Cycles CPU-only (Iris Xe isn't Arc) ~1–5 min/frame | Full `bpy`, headless CLI |
| SheepIt render farm | Free Cycles/EEVEE rendering | Points-based; no rights claimed; check [terms](https://www.sheepit-renderfarm.com/termsofuse) | Offloads the final render | Bake first; no scripts in uploads; 2 GB cap |
| Unreal Engine 5.8 | Lumen, path tracer, Niagara, Sequencer | Free under $1M/yr revenue | Not viable: no Nanite, Lumen ~20 min/frame on Iris Xe | Python, heavy |
| DaVinci Resolve free | Best-in-class grading, Fusion | Commercial OK | Fine | Scripting Studio-only since 21.1; no Film Grain/Look in free |
| Godot 4 | Frame-perfect Movie Maker | MIT | Fine | GDScript + CLI; real-time look only |
| Cavalry | 2D data typography | Free for individuals since 2026-04; check studio terms | Fine | JavaScript |
| JangaFX VDB library | Smoke/fire volumes for Blender | CC0 library | Import only | n/a |
| Houdini Apprentice | — | Non-commercial, watermarked | Not allowed | — |
| Natron | Compositing | GPL, unmaintained since 2022 | Skip; Blender compositor covers it | — |

Recommendation: build shots in Blender with `bpy` scripts, preview in EEVEE locally, render finals in Cycles on SheepIt, and grade in Blender's compositor (AgX/ACES 2.0, film grain, glare). Keep Remotion for typography and assembly. Optionally finish by hand in Resolve free.

Sources: [Blender 5.0](https://www.blender.org/download/releases/5-0/), [Cycles GPU](https://docs.blender.org/manual/en/latest/render/cycles/gpu_rendering.html), [SheepIt FAQ](https://www.sheepit-renderfarm.com/faq), [Unreal licence](https://www.unrealengine.com/license), [Iris Xe and Nanite](https://forums.unrealengine.com/t/does-intels-iris-xe-support-nanite-full-specs-in-text-body/522321), [Resolve 21.1](https://www.cined.com/davinci-resolve-21-1-released-ai-assistant-integration-via-mcp-individual-hdr-trims-and-python-scripting-moves-to-studio/), [Godot Movie Maker](https://docs.godotengine.org/en/stable/tutorials/animation/creating_movies.html), [Cavalry free](https://www.cgchannel.com/2026/04/canva-makes-motion-graphics-and-animation-app-cavalry-free/), [JangaFX VDBs](https://jangafx.com/software/embergen/download/free-vdb-animations).
