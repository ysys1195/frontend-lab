import styles from "./CapturedImage.module.css";
import type { AnalysisState } from "@/types/analysis";

type CapturedImageProps = {
  imageUrl: string;
  analysisState: AnalysisState;
  onRetake: () => void;
};

export function CapturedImage(props: CapturedImageProps) {
  const { imageUrl, onRetake } = props;

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
