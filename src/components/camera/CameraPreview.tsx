import type { RefObject } from "react";
import styles from "./CameraPreview.module.css";

type CameraPreviewProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  onCapture: () => void;
  isRequesting: boolean;
};

export function CameraPreview({ videoRef, onCapture, isRequesting }: CameraPreviewProps) {
  return (
    <section className={styles.preview} aria-label="カメラプレビュー">
      <div className={styles.previewArea}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          playsInline
          muted
          aria-label="カメラプレビュー"
        />
        {isRequesting && <span className={styles.previewLabel}>カメラを起動しています…</span>}
        <div className={styles.guide} aria-label="身分証を合わせるガイド枠" />
      </div>
      <button
        className={styles.captureButton}
        type="button"
        onClick={onCapture}
        disabled={isRequesting}
      >
        撮影する
      </button>
    </section>
  );
}
