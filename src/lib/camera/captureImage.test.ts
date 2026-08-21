import { afterEach, describe, expect, it, vi } from "vitest";
import type { CropArea } from "@/types/camera";
import { captureImage } from "./captureImage";

const cropArea: CropArea = {
  x: 120.5,
  y: 80.25,
  width: 640.4,
  height: 403.6,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("captureImage", () => {
  it("draws the crop area to an off-screen canvas and resolves a JPEG Blob", async () => {
    const video = {} as HTMLVideoElement;
    const blob = new Blob(["captured image"], { type: "image/jpeg" });
    const drawImage = vi.fn();
    const context = { drawImage } as unknown as CanvasRenderingContext2D;
    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => context),
      toBlob: vi.fn((callback: BlobCallback) => callback(blob)),
    } as unknown as HTMLCanvasElement;
    const createElement = vi.fn(() => canvas);
    vi.stubGlobal("document", { createElement });

    await expect(captureImage({ video, cropArea })).resolves.toBe(blob);

    expect(createElement).toHaveBeenCalledWith("canvas");
    expect(canvas.width).toBe(640);
    expect(canvas.height).toBe(404);
    expect(drawImage).toHaveBeenCalledWith(
      video,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      640,
      404,
    );
    expect(canvas.toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg");
  });

  it("rejects when a 2D drawing context cannot be created", async () => {
    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => null),
    } as unknown as HTMLCanvasElement;
    vi.stubGlobal("document", { createElement: vi.fn(() => canvas) });

    await expect(
      captureImage({ video: {} as HTMLVideoElement, cropArea }),
    ).rejects.toThrow("Canvas 2D context is unavailable.");
  });

  it("rejects when the browser cannot create a Blob", async () => {
    const context = { drawImage: vi.fn() } as unknown as CanvasRenderingContext2D;
    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => context),
      toBlob: vi.fn((callback: BlobCallback) => callback(null)),
    } as unknown as HTMLCanvasElement;
    vi.stubGlobal("document", { createElement: vi.fn(() => canvas) });

    await expect(
      captureImage({ video: {} as HTMLVideoElement, cropArea }),
    ).rejects.toThrow("Failed to create a JPEG image.");
  });

  it("returns a rejected Promise when drawing fails", async () => {
    const context = {
      drawImage: vi.fn(() => {
        throw new DOMException("The video cannot be drawn.");
      }),
    } as unknown as CanvasRenderingContext2D;
    const canvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => context),
    } as unknown as HTMLCanvasElement;
    vi.stubGlobal("document", { createElement: vi.fn(() => canvas) });

    await expect(
      captureImage({ video: {} as HTMLVideoElement, cropArea }),
    ).rejects.toThrow("The video cannot be drawn.");
  });

  it("rejects a crop area that cannot produce a canvas", async () => {
    await expect(
      captureImage({
        video: {} as HTMLVideoElement,
        cropArea: { x: 0, y: 0, width: 0.4, height: 100 },
      }),
    ).rejects.toThrow("The capture area must have a positive size.");
  });
});
