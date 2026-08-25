import type { AnalysisState } from "@/types/analysis";
import styles from "./CapturedImage.module.css";

type AnalysisStatusProps = {
  state: AnalysisState;
};

export function AnalysisStatus({ state }: AnalysisStatusProps) {
  const isLoading = state.status === "idle" || state.status === "loading";

  return (
    <section
      className={styles.analysis}
      aria-labelledby="analysis-title"
      aria-live="polite"
      aria-busy={isLoading}
    >
      <h3 id="analysis-title">Mock解析結果</h3>

      {isLoading && <p className={styles.loading}>画像を解析しています…</p>}

      {state.status === "success" && (
        <div className={styles.analysisSuccess}>
          <p>{state.result.message}</p>
          <dl className={styles.analysisDetails}>
            <div>
              <dt>書類種別</dt>
              <dd>身分証</dd>
            </div>
            <div>
              <dt>信頼度</dt>
              <dd>{Math.round(state.result.confidence * 100)}%</dd>
            </div>
          </dl>
        </div>
      )}

      {state.status === "error" && (
        <p className={styles.analysisError} role="alert">
          {state.message}
        </p>
      )}
    </section>
  );
}
