import type { RefObject } from "react";
import { CaptureGuide } from "./CaptureGuide";
import styles from "./CameraPreview.module.css";

type CameraPreviewProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  previewRef: RefObject<HTMLDivElement | null>;
  guideRef: RefObject<HTMLDivElement | null>;
  onCapture: () => void;
  isRequesting: boolean;
  isCapturing: boolean;
  captureError: string | null;
};

export function CameraPreview({
  videoRef,
  previewRef,
  guideRef,
  onCapture,
  isRequesting,
  isCapturing,
  captureError,
}: CameraPreviewProps) {
  return (
    <section className={styles.preview} aria-label="カメラプレビュー">
      <div ref={previewRef} className={styles.previewArea}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          playsInline
          muted
          aria-label="カメラプレビュー"
        />
        {isRequesting && <span className={styles.previewLabel}>カメラを起動しています…</span>}
        {captureError && (
          <span className={styles.previewLabel} role="alert">
            {captureError}
          </span>
        )}
        <CaptureGuide guideRef={guideRef} />
        <button
          className={styles.captureButton}
          type="button"
          onClick={onCapture}
          disabled={isRequesting || isCapturing}
        >
          {isCapturing ? "撮影中…" : "撮影する"}
        </button>
      </div>
    </section>
  );
}
