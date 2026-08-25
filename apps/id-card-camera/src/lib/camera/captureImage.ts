import type { CropArea } from "@/types/camera";

type CaptureImageInput = {
  video: HTMLVideoElement;
  cropArea: CropArea;
};

export async function captureImage({ video, cropArea }: CaptureImageInput): Promise<Blob> {
  const outputWidth = Math.round(cropArea.width);
  const outputHeight = Math.round(cropArea.height);

  if (
    !Number.isFinite(outputWidth) ||
    !Number.isFinite(outputHeight) ||
    outputWidth <= 0 ||
    outputHeight <= 0
  ) {
    throw new Error("The capture area must have a positive size.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D context is unavailable.");
  }

  context.drawImage(
    video,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    outputWidth,
    outputHeight,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Failed to create a JPEG image."));
    }, "image/jpeg");
  });
}
