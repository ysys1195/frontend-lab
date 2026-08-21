import type { AnalysisErrorResponse, MockAnalysisResult } from "@/types/analysis";

const MOCK_ANALYSIS_RESULT: MockAnalysisResult = {
  documentType: "identity-card",
  confidence: 0.98,
  message: "画像を受け付けました。Mock解析が完了しました。",
};

function createErrorResponse(error: string, status: number) {
  const body: AnalysisErrorResponse = { error };
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return createErrorResponse("multipart/form-data形式で画像を送信してください。", 400);
  }

  const image = formData.get("image");

  if (!(image instanceof File)) {
    return createErrorResponse("画像ファイルが必要です。", 400);
  }

  if (image.size === 0) {
    return createErrorResponse("空の画像ファイルは解析できません。", 400);
  }

  if (!image.type.startsWith("image/")) {
    return createErrorResponse("画像形式のファイルを送信してください。", 415);
  }

  return Response.json(MOCK_ANALYSIS_RESULT);
}
