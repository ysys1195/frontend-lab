"use client";

import { useRef } from "react";
import { useCamera } from "@/hooks/useCamera";
import { CameraPreview } from "./CameraPreview";
import { CapturedImage } from "./CapturedImage";
import styles from "./CameraCapture.module.css";

const errorMessage = "カメラを起動できませんでした。権限を確認して、もう一度お試しください。";

export function CameraCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { status, startCamera, markCaptured } = useCamera(videoRef);

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
          onCapture={markCaptured}
          isRequesting={status === "requesting"}
        />
      )}

      {status === "captured" && <CapturedImage onRetake={startCamera} />}

      {status === "error" && (
        <div className={styles.errorPanel} role="alert">
          <p>{errorMessage}</p>
          <button className={styles.secondaryButton} type="button" onClick={startCamera}>
            もう一度試す
          </button>
        </div>
      )}
    </section>
  );
}
