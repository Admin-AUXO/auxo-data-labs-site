import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const TILE = 512;
const TILES = Array.from({ length: 8 }, (_, i) => staticFile(`grain/${i}.png`));

export const Finish: React.FC<{ grain?: number; vignette?: number }> = ({ grain = 0.07, vignette = 0.8 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const k = frame % TILES.length;
  const ox = -((k * 197) % TILE);
  const oy = -((k * 331) % TILE);
  const cols = Math.ceil((width - ox) / TILE);
  const rows = Math.ceil((height - oy) / TILE);
  return (
    <>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 75% 70% at 50% 50%, transparent 45%, rgba(0,0,0,${vignette}) 100%)`,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill style={{ mixBlendMode: "overlay", opacity: grain * 1.6, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: cols * rows }, (_, i) => (
          <Img
            key={i}
            src={TILES[k]}
            style={{ position: "absolute", left: ox + (i % cols) * TILE, top: oy + Math.floor(i / cols) * TILE, width: TILE, height: TILE }}
          />
        ))}
      </AbsoluteFill>
    </>
  );
};
