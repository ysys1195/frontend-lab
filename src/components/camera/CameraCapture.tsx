"use client";

import { useState } from "react";
import { CameraPreview } from "./CameraPreview";
import { CapturedImage } from "./CapturedImage";
import styles from "./CameraCapture.module.css";

type CameraStatus = "idle" | "previewing" | "captured" | "error";

const errorMessage = "カメラを起動できませんでした。権限を確認して、もう一度お試しください。";

export function CameraCapture() {
  const [status, setStatus] = useState<CameraStatus>("idle");

  const startPreview = () => {
    setStatus("previewing");
  };

  const showCapturedImage = () => {
    setStatus("captured");
  };

  const retake = () => {
    setStatus("previewing");
  };

  const retry = () => {
    setStatus("idle");
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
          <button className={styles.primaryButton} type="button" onClick={startPreview}>
            カメラを起動する
          </button>
        </div>
      )}

      {status === "previewing" && (
        <CameraPreview onCapture={showCapturedImage} />
      )}

      {status === "captured" && <CapturedImage onRetake={retake} />}

      {status === "error" && (
        <div className={styles.errorPanel} role="alert">
          <p>{errorMessage}</p>
          <button className={styles.secondaryButton} type="button" onClick={retry}>
            もう一度試す
          </button>
        </div>
      )}
    </section>
  );
}
