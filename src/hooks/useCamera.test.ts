import { describe, expect, it, vi } from "vitest";
import { CAMERA_CONSTRAINTS, stopMediaStream } from "./useCamera";

describe("CAMERA_CONSTRAINTS", () => {
  it("prefers the rear camera at 1920 by 1080", () => {
    expect(CAMERA_CONSTRAINTS).toEqual({
      audio: false,
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
    });
  });
});

describe("stopMediaStream", () => {
  it("stops every track in the stream", () => {
    const firstStop = vi.fn();
    const secondStop = vi.fn();
    const stream = {
      getTracks: () => [{ stop: firstStop }, { stop: secondStop }],
    } as unknown as MediaStream;

    stopMediaStream(stream);

    expect(firstStop).toHaveBeenCalledOnce();
    expect(secondStop).toHaveBeenCalledOnce();
  });

  it("does nothing when there is no stream", () => {
    expect(() => stopMediaStream(null)).not.toThrow();
  });
});
