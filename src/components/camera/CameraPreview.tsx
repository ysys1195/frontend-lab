import styles from "./CameraPreview.module.css";

type CameraPreviewProps = {
  onCapture: () => void;
};

export function CameraPreview({ onCapture }: CameraPreviewProps) {
  return (
    <section className={styles.preview} aria-label="カメラプレビュー">
      <div className={styles.previewArea}>
        <span className={styles.previewLabel}>カメラプレビュー</span>
        <div className={styles.guide} aria-label="身分証を合わせるガイド枠" />
      </div>
      <button className={styles.captureButton} type="button" onClick={onCapture}>
        撮影する
      </button>
    </section>
  );
}
