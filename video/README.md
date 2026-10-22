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
The owner still finds the look basic. Next step is evaluating free tools beyond the browser renderer (for example Blender, Unreal Engine, DaVinci Resolve) and stronger in-code post-processing.
