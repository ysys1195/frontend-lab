import type { CalculateCropAreaInput, CropArea } from "@/types/camera";

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

export function calculateCropArea({
  videoWidth,
  videoHeight,
  containerWidth,
  containerHeight,
  guideX,
  guideY,
  guideWidth,
  guideHeight,
}: CalculateCropAreaInput): CropArea {
  const scale = Math.max(containerWidth / videoWidth, containerHeight / videoHeight);
  const displayedVideoWidth = videoWidth * scale;
  const displayedVideoHeight = videoHeight * scale;
  const offsetX = (displayedVideoWidth - containerWidth) / 2;
  const offsetY = (displayedVideoHeight - containerHeight) / 2;

  const sourceLeft = clamp((guideX + offsetX) / scale, 0, videoWidth);
  const sourceTop = clamp((guideY + offsetY) / scale, 0, videoHeight);
  const sourceRight = clamp((guideX + guideWidth + offsetX) / scale, 0, videoWidth);
  const sourceBottom = clamp((guideY + guideHeight + offsetY) / scale, 0, videoHeight);

  return {
    x: sourceLeft,
    y: sourceTop,
    width: Math.max(0, sourceRight - sourceLeft),
    height: Math.max(0, sourceBottom - sourceTop),
  };
}
