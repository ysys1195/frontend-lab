import { describe, expect, it } from "vitest";
import type { CropArea } from "@/types/camera";
import { calculateCropArea } from "./calculateCropArea";

function expectCropAreaToBeCloseTo(actual: CropArea, expected: CropArea): void {
  expect(actual.x).toBeCloseTo(expected.x);
  expect(actual.y).toBeCloseTo(expected.y);
  expect(actual.width).toBeCloseTo(expected.width);
  expect(actual.height).toBeCloseTo(expected.height);
}

describe("calculateCropArea", () => {
  it("converts a guide when the video and container have the same aspect ratio", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 1920,
        videoHeight: 1080,
        containerWidth: 960,
        containerHeight: 540,
        guideX: 96,
        guideY: 54,
        guideWidth: 480,
        guideHeight: 270,
      }),
      { x: 192, y: 108, width: 960, height: 540 },
    );
  });

  it("accounts for the X offset when a landscape video covers a portrait container", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 1600,
        videoHeight: 900,
        containerWidth: 300,
        containerHeight: 600,
        guideX: 0,
        guideY: 0,
        guideWidth: 300,
        guideHeight: 600,
      }),
      { x: 575, y: 0, width: 450, height: 900 },
    );
  });

  it("accounts for the Y offset when a portrait video covers a landscape container", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 900,
        videoHeight: 1600,
        containerWidth: 600,
        containerHeight: 300,
        guideX: 0,
        guideY: 0,
        guideWidth: 600,
        guideHeight: 300,
      }),
      { x: 0, y: 575, width: 900, height: 450 },
    );
  });

  it("converts a centered guide with an X offset", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 1600,
        videoHeight: 900,
        containerWidth: 300,
        containerHeight: 600,
        guideX: 50,
        guideY: 100,
        guideWidth: 200,
        guideHeight: 400,
      }),
      { x: 650, y: 150, width: 300, height: 600 },
    );
  });

  it("converts a centered guide with a Y offset", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 900,
        videoHeight: 1600,
        containerWidth: 600,
        containerHeight: 300,
        guideX: 100,
        guideY: 50,
        guideWidth: 400,
        guideHeight: 200,
      }),
      { x: 150, y: 650, width: 600, height: 300 },
    );
  });

  it("scales a guide with different width and height", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 1280,
        videoHeight: 720,
        containerWidth: 640,
        containerHeight: 360,
        guideX: 40,
        guideY: 60,
        guideWidth: 520,
        guideHeight: 180,
      }),
      { x: 80, y: 120, width: 1040, height: 360 },
    );
  });

  it("keeps a guide at the bottom-right boundary within the source video", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 1920,
        videoHeight: 1080,
        containerWidth: 960,
        containerHeight: 540,
        guideX: 900,
        guideY: 480,
        guideWidth: 60,
        guideHeight: 60,
      }),
      { x: 1800, y: 960, width: 120, height: 120 },
    );
  });

  it("clips a guide that extends beyond the container to the source bounds", () => {
    expectCropAreaToBeCloseTo(
      calculateCropArea({
        videoWidth: 1920,
        videoHeight: 1080,
        containerWidth: 960,
        containerHeight: 540,
        guideX: -10,
        guideY: -20,
        guideWidth: 980,
        guideHeight: 580,
      }),
      { x: 0, y: 0, width: 1920, height: 1080 },
    );
  });
});
