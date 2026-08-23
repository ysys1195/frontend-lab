import type { AnalysisErrorResponse, MockAnalysisResult } from "@/types/analysis";

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

type AnalyzeImageOptions = {
  signal?: AbortSignal;
  fetcher?: Fetcher;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isMockAnalysisResult(value: unknown): value is MockAnalysisResult {
  return (
    isRecord(value) &&
    value.documentType === "identity-card" &&
    typeof value.confidence === "number" &&
    typeof value.message === "string"
  );
}

function isAnalysisErrorResponse(value: unknown): value is AnalysisErrorResponse {
  return isRecord(value) && typeof value.error === "string";
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function analyzeImage(
  image: Blob,
  { signal, fetcher = fetch }: AnalyzeImageOptions = {},
): Promise<MockAnalysisResult> {
  const formData = new FormData();
  formData.set("image", image, "captured-image.jpg");

  let response: Response;

  try {
    response = await fetcher("/api/analyze", {
      method: "POST",
      body: formData,
      signal,
    });
  } catch (error: unknown) {
    if (signal?.aborted) {
      throw error;
    }

    throw new Error(
      "画像の解析に失敗しました。通信環境を確認して、もう一度お試しください。",
    );
  }

  const body = await readJson(response);

  if (!response.ok) {
    const message = isAnalysisErrorResponse(body)
      ? body.error
      : "画像の解析に失敗しました。もう一度お試しください。";
    throw new Error(message);
  }

  if (!isMockAnalysisResult(body)) {
    throw new Error("解析結果を正しく読み取れませんでした。もう一度お試しください。");
  }

  return body;
}
