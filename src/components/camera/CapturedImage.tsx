import styles from "./CapturedImage.module.css";

type CapturedImageProps = {
  imageUrl: string;
  onRetake: () => void;
};

export function CapturedImage({ imageUrl, onRetake }: CapturedImageProps) {
  return (
    <section className={styles.result} aria-labelledby="result-title">
      <h2 id="result-title">撮影結果</h2>
      <img className={styles.image} src={imageUrl} alt="撮影した身分証の画像" />
      <button className={styles.retakeButton} type="button" onClick={onRetake}>
        撮り直す
      </button>
    </section>
  );
}
