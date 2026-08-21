"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { getCameraError, getUnsupportedCameraError } from "../lib/camera/getCameraError";
import {
  CAMERA_CONSTRAINT_CANDIDATES,
  requestCameraStream,
  stopMediaStream,
} from "../lib/camera/requestCameraStream";
import type { CameraError, CameraStatus } from "@/types/camera";

export const CAMERA_CONSTRAINTS = CAMERA_CONSTRAINT_CANDIDATES[0];
export { CAMERA_CONSTRAINT_CANDIDATES, stopMediaStream };

type UseCameraResult = {
  status: CameraStatus;
  error: CameraError | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  markCaptured: () => void;
};

export function useCamera(videoRef: RefObject<HTMLVideoElement | null>): UseCameraResult {
  const [status, setStatus] = useState<CameraStatus>("idle");
  const [error, setError] = useState<CameraError | null>(null);
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
        setError(getUnsupportedCameraError());
        setStatus("error");
      }
      return;
    }

    setError(null);
    setStatus("requesting");

    try {
      const stream = await requestCameraStream(
        (constraints) => mediaDevices.getUserMedia(constraints),
        () => isMountedRef.current && requestId === requestIdRef.current,
      );

      if (!stream) {
        return;
      }

      streamRef.current = stream;
      const video = videoRef.current;

      if (!video) {
        releaseStream();
        setError(getCameraError(new Error("Camera preview is unavailable.")));
        setStatus("error");
        return;
      }

      video.srcObject = stream;
      setStatus("previewing");
    } catch (caughtError) {
      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      releaseStream();
      setError(getCameraError(caughtError));
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
