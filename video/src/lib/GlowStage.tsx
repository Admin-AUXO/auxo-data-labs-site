import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import type { Object3D } from "three";
import { CameraRig } from "./CameraRig";
import type { Vec3 } from "./keys";

interface Props {
  object: Object3D;
  glowObject?: Object3D;
  position: Vec3;
  target: Vec3;
  fov: number;
  glow?: number;
  haze?: number;
  downscale?: number;
}

export const GlowStage: React.FC<Props> = ({ object, glowObject, position, target, fov, glow = 0.9, haze = 0.55, downscale = 4 }) => {
  const { width, height } = useVideoConfig();
  const soft = glowObject ?? object;
  const copies = useMemo(() => [object, soft.clone(), soft.clone()], [object, soft]);
  const layers = [
    { blur: 0, brightness: 1, opacity: 1, scale: 1 },
    { blur: width / 140, brightness: 1.5, opacity: glow, scale: downscale },
    { blur: width / 36, brightness: 1.7, opacity: haze, scale: downscale },
  ];
  return (
    <>
      {layers.map((l, i) => {
        const w = Math.round(width / l.scale);
        const h = Math.round(height / l.scale);
        return (
          <AbsoluteFill key={i} style={{ opacity: l.opacity, mixBlendMode: i ? "screen" : "normal", overflow: "hidden" }}>
            <div
              style={{
                width: w,
                height: h,
                transform: `scale(${l.scale})`,
                transformOrigin: "0 0",
                filter: i ? `blur(${(l.blur / l.scale).toFixed(2)}px) brightness(${l.brightness})` : undefined,
              }}
            >
              <ThreeCanvas width={w} height={h} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} camera={{ fov, near: 0.1, far: 120 }}>
                <CameraRig position={position} target={target} fov={fov} />
                <primitive object={copies[i]} />
              </ThreeCanvas>
            </div>
          </AbsoluteFill>
        );
      })}
    </>
  );
};
