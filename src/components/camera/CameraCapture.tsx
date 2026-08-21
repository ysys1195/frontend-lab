"use client";

import { useRef, useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import { calculateCropArea } from "@/lib/camera/calculateCropArea";
import { captureImage } from "@/lib/camera/captureImage";
import { CameraPreview } from "./CameraPreview";
import { CapturedImage } from "./CapturedImage";
import styles from "./CameraCapture.module.css";

export function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const guideRef = useRef<HTMLDivElement>(null);
  const [, setCapturedImage] = useState<Blob | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const { status, error, startCamera, markCaptured } = useCamera(videoRef);

  const handleCapture = async () => {
    const video = videoRef.current;
    const preview = previewRef.current;
    const guide = guideRef.current;

    if (
      !video ||
      !preview ||
      !guide ||
      video.videoWidth <= 0 ||
      video.videoHeight <= 0
    ) {
      setCaptureError("カメラ映像の準備が完了していません。もう一度お試しください。");
      return;
    }

    const previewRect = preview.getBoundingClientRect();
    const guideRect = guide.getBoundingClientRect();

    if (previewRect.width <= 0 || previewRect.height <= 0) {
      setCaptureError("撮影範囲を取得できませんでした。もう一度お試しください。");
      return;
    }

    setCaptureError(null);
    setIsCapturing(true);

    try {
      const cropArea = calculateCropArea({
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
        containerWidth: previewRect.width,
        containerHeight: previewRect.height,
        guideX: guideRect.left - previewRect.left,
        guideY: guideRect.top - previewRect.top,
        guideWidth: guideRect.width,
        guideHeight: guideRect.height,
      });
      const blob = await captureImage({ video, cropArea });

      setCapturedImage(blob);
      markCaptured();
    } catch {
      setCaptureError("画像を撮影できませんでした。もう一度お試しください。");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <section className={styles.capture} aria-labelledby="camera-title">
      <header className={styles.header}>
        <h1 id="camera-title">身分証を撮影</h1>
        <p>身分証を明るい場所に置き、枠内に収まるように撮影してください。</p>
      </header>

      {status === "idle" && (
        <div className={styles.startPanel}>
          <div className={styles.placeholder} aria-hidden="true" />
          <button className={styles.primaryButton} type="button" onClick={startCamera}>
            カメラを起動する
          </button>
        </div>
      )}

      {(status === "requesting" || status === "previewing") && (
        <CameraPreview
          videoRef={videoRef}
          previewRef={previewRef}
          guideRef={guideRef}
          onCapture={() => void handleCapture()}
          isRequesting={status === "requesting"}
          isCapturing={isCapturing}
          captureError={captureError}
        />
      )}

      {status === "captured" && <CapturedImage onRetake={startCamera} />}

      {status === "error" && (
        <div className={styles.errorPanel} role="alert">
          <p>{error?.message}</p>
          <button className={styles.secondaryButton} type="button" onClick={startCamera}>
            もう一度試す
          </button>
        </div>
      )}
    </section>
  );
}
