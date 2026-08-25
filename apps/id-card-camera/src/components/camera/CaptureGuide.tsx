import type { RefObject } from "react";
import styles from "./CaptureGuide.module.css";

type CaptureGuideProps = {
  guideRef: RefObject<HTMLDivElement | null>;
};

export function CaptureGuide({ guideRef }: CaptureGuideProps) {
  return (
    <div ref={guideRef} className={styles.guide} aria-label="身分証を合わせるガイド枠" />
  );
}
