export const CAMERA_CONSTRAINT_CANDIDATES: readonly MediaStreamConstraints[] = [
  {
    audio: false,
    video: {
      facingMode: {
        ideal: "environment",
      },
      width: {
        ideal: 1920,
      },
      height: {
        ideal: 1080,
      },
    },
  },
  {
    audio: false,
    video: {
      facingMode: {
        ideal: "environment",
      },
    },
  },
  {
    audio: false,
    video: true,
  },
];

type GetUserMedia = (constraints: MediaStreamConstraints) => Promise<MediaStream>;

function hasErrorName(error: unknown, name: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    typeof error.name === "string" &&
    error.name === name
  );
}

export function isConstraintFallbackError(error: unknown): boolean {
  return hasErrorName(error, "OverconstrainedError");
}

export function stopMediaStream(stream: MediaStream | null): void {
  stream?.getTracks().forEach((track) => {
    track.stop();
  });
}

export async function requestCameraStream(
  getUserMedia: GetUserMedia,
  isRequestActive: () => boolean = () => true,
): Promise<MediaStream | null> {
  for (let index = 0; index < CAMERA_CONSTRAINT_CANDIDATES.length; index += 1) {
    if (!isRequestActive()) {
      return null;
    }

    try {
      const stream = await getUserMedia(CAMERA_CONSTRAINT_CANDIDATES[index]);

      if (!isRequestActive()) {
        stopMediaStream(stream);
        return null;
      }

      return stream;
    } catch (error) {
      if (!isRequestActive()) {
        return null;
      }

      const hasFallback = index < CAMERA_CONSTRAINT_CANDIDATES.length - 1;
      if (!hasFallback || !isConstraintFallbackError(error)) {
        throw error;
      }
    }
  }

  return null;
}
