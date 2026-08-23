export type MockAnalysisResult = {
  documentType: "identity-card";
  confidence: number;
  message: string;
};

export type AnalysisErrorResponse = {
  error: string;
};

export type AnalysisState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: MockAnalysisResult }
  | { status: "error"; message: string };
