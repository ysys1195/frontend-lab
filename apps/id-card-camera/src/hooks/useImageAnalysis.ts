import { useCallback, useEffect, useRef, useState } from "react";
import { analyzeImage } from "@/lib/analysis/analyzeImage";
import type { AnalysisState } from "@/types/analysis";

const INITIAL_STATE: AnalysisState = { status: "idle" };

export function useImageAnalysis() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>(INITIAL_STATE);
  const controllerRef = useRef<AbortController | null>(null);

  const resetAnalysis = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setAnalysisState(INITIAL_STATE);
  }, []);

  const startAnalysis = useCallback(async (image: Blob) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setAnalysisState({ status: "loading" });

    try {
      const result = await analyzeImage(image, { signal: controller.signal });

      if (!controller.signal.aborted) {
        setAnalysisState({ status: "success", result });
      }
    } catch (error: unknown) {
      if (!controller.signal.aborted) {
        const message =
          error instanceof Error
            ? error.message
            : "画像の解析に失敗しました。もう一度お試しください。";
        setAnalysisState({ status: "error", message });
      }
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, []);

  return { analysisState, startAnalysis, resetAnalysis };
}
