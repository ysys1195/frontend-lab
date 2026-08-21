import { describe, expect, it, vi } from "vitest";
import {
  CAMERA_CONSTRAINT_CANDIDATES,
  isConstraintFallbackError,
  requestCameraStream,
} from "./requestCameraStream";

function createError(name: string): Error {
  const error = new Error(name);
  error.name = name;
  return error;
}

function createStream(): { stream: MediaStream; stop: ReturnType<typeof vi.fn> } {
  const stop = vi.fn();
  const stream = {
    getTracks: () => [{ stop }],
  } as unknown as MediaStream;

  return { stream, stop };
}

describe("CAMERA_CONSTRAINT_CANDIDATES", () => {
  it("relaxes camera constraints in stages", () => {
    expect(CAMERA_CONSTRAINT_CANDIDATES).toEqual([
      {
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      },
      {
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
        },
      },
      {
        audio: false,
        video: true,
      },
    ]);
  });
});

describe("isConstraintFallbackError", () => {
  it("only accepts OverconstrainedError", () => {
    expect(isConstraintFallbackError(createError("OverconstrainedError"))).toBe(true);
    expect(isConstraintFallbackError(createError("NotAllowedError"))).toBe(false);
    expect(isConstraintFallbackError(new Error("unknown"))).toBe(false);
  });
});

describe("requestCameraStream", () => {
  it("falls back in order until a camera stream is available", async () => {
    const { stream } = createStream();
    const firstError = createError("OverconstrainedError");
    const secondError = createError("OverconstrainedError");
    const getUserMedia = vi
      .fn<(constraints: MediaStreamConstraints) => Promise<MediaStream>>()
      .mockRejectedValueOnce(firstError)
      .mockRejectedValueOnce(secondError)
      .mockResolvedValueOnce(stream);

    await expect(requestCameraStream(getUserMedia)).resolves.toBe(stream);
    expect(getUserMedia).toHaveBeenCalledTimes(3);
    expect(getUserMedia.mock.calls.map(([constraints]) => constraints)).toEqual(
      CAMERA_CONSTRAINT_CANDIDATES,
    );
  });

  it.each(["NotAllowedError", "NotFoundError", "NotReadableError", "AbortError"])(
    "does not retry %s",
    async (name) => {
      const error = createError(name);
      const getUserMedia = vi
        .fn<(constraints: MediaStreamConstraints) => Promise<MediaStream>>()
        .mockRejectedValue(error);

      await expect(requestCameraStream(getUserMedia)).rejects.toBe(error);
      expect(getUserMedia).toHaveBeenCalledOnce();
    },
  );

  it("throws the error from the final fallback", async () => {
    const errors = [
      createError("OverconstrainedError"),
      createError("OverconstrainedError"),
      createError("OverconstrainedError"),
    ];
    const getUserMedia = vi
      .fn<(constraints: MediaStreamConstraints) => Promise<MediaStream>>()
      .mockRejectedValueOnce(errors[0])
      .mockRejectedValueOnce(errors[1])
      .mockRejectedValueOnce(errors[2]);

    await expect(requestCameraStream(getUserMedia)).rejects.toBe(errors[2]);
    expect(getUserMedia).toHaveBeenCalledTimes(3);
  });

  it("does not start another fallback after the request becomes inactive", async () => {
    let isActive = true;
    const getUserMedia = vi.fn<(constraints: MediaStreamConstraints) => Promise<MediaStream>>(
      async () => {
        isActive = false;
        throw createError("OverconstrainedError");
      },
    );

    await expect(requestCameraStream(getUserMedia, () => isActive)).resolves.toBeNull();
    expect(getUserMedia).toHaveBeenCalledOnce();
  });

  it("stops a stream that resolves after the request becomes inactive", async () => {
    let resolveStream: ((stream: MediaStream) => void) | undefined;
    const pendingStream = new Promise<MediaStream>((resolve) => {
      resolveStream = resolve;
    });
    const getUserMedia = vi.fn(() => pendingStream);
    const { stream, stop } = createStream();
    let isActive = true;

    const result = requestCameraStream(getUserMedia, () => isActive);
    isActive = false;
    resolveStream?.(stream);

    await expect(result).resolves.toBeNull();
    expect(stop).toHaveBeenCalledOnce();
  });
});
