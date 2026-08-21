import styles from "./CapturedImage.module.css";

type CapturedImageProps = {
  onRetake: () => void;
};

export function CapturedImage({ onRetake }: CapturedImageProps) {
  return (
    <section className={styles.result} aria-labelledby="result-title">
      <h2 id="result-title">撮影結果</h2>
      <div className={styles.imagePlaceholder} role="img" aria-label="撮影した身分証の画像" />
      <button className={styles.retakeButton} type="button" onClick={onRetake}>
        撮り直す
      </button>
    </section>
  );
}
