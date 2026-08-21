"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import type { CameraStatus } from "@/types/camera";

export const CAMERA_CONSTRAINTS: MediaStreamConstraints = {
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
};

type UseCameraResult = {
  status: CameraStatus;
  error: Error | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  markCaptured: () => void;
};

export function stopMediaStream(stream: MediaStream | null): void {
  stream?.getTracks().forEach((track) => {
    track.stop();
  });
}

function toCameraError(error: unknown): Error {
  return error instanceof Error ? error : new Error("カメラを起動できませんでした。");
}

export function useCamera(videoRef: RefObject<HTMLVideoElement | null>): UseCameraResult {
  const [status, setStatus] = useState<CameraStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);

  const releaseStream = useCallback(() => {
    const stream = streamRef.current;
    streamRef.current = null;

    if (videoRef.current?.srcObject === stream) {
      videoRef.current.srcObject = null;
    }

    stopMediaStream(stream);
  }, [videoRef]);

  const stopCamera = useCallback(() => {
    requestIdRef.current += 1;
    releaseStream();

    if (isMountedRef.current) {
      setError(null);
      setStatus("idle");
    }
  }, [releaseStream]);

  const startCamera = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    releaseStream();

    const mediaDevices = typeof navigator === "undefined" ? undefined : navigator.mediaDevices;
    if (!mediaDevices?.getUserMedia) {
      if (isMountedRef.current) {
        setError(new Error("このブラウザではカメラを利用できません。"));
        setStatus("error");
      }
      return;
    }

    setError(null);
    setStatus("requesting");

    try {
      const stream = await mediaDevices.getUserMedia(CAMERA_CONSTRAINTS);

      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        stopMediaStream(stream);
        return;
      }

      streamRef.current = stream;
      const video = videoRef.current;

      if (!video) {
        releaseStream();
        setError(new Error("カメラプレビューを表示できませんでした。"));
        setStatus("error");
        return;
      }

      video.srcObject = stream;
      setStatus("previewing");
    } catch (caughtError) {
      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      setError(toCameraError(caughtError));
      setStatus("error");
    }
  }, [releaseStream, videoRef]);

  const markCaptured = useCallback(() => {
    requestIdRef.current += 1;
    releaseStream();
    setStatus("captured");
  }, [releaseStream]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestIdRef.current += 1;
      releaseStream();
    };
  }, [releaseStream]);

  return { status, error, startCamera, stopCamera, markCaptured };
}
