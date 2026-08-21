export type MockAnalysisResult = {
  documentType: "identity-card";
  confidence: number;
  message: string;
};

export type AnalysisErrorResponse = {
  error: string;
};
