import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import type { PerspectiveCamera } from "three";

export const CameraRig: React.FC<{ position: [number, number, number]; target: [number, number, number]; fov?: number }> = ({
  position,
  target,
  fov,
}) => {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  useLayoutEffect(() => {
    camera.position.set(...position);
    camera.lookAt(...target);
    if (fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
};
