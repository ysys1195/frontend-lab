import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AnalysisStatus } from "./AnalysisStatus";

describe("AnalysisStatus", () => {
  it("shows the loading state", () => {
    const html = renderToStaticMarkup(<AnalysisStatus state={{ status: "loading" }} />);

    expect(html).toContain("画像を解析しています");
    expect(html).toContain('aria-busy="true"');
  });

  it("shows the mock result", () => {
    const html = renderToStaticMarkup(
      <AnalysisStatus
        state={{
          status: "success",
          result: {
            documentType: "identity-card",
            confidence: 0.98,
            message: "Mock解析が完了しました。",
          },
        }}
      />,
    );

    expect(html).toContain("Mock解析が完了しました。");
    expect(html).toContain("身分証");
    expect(html).toContain("98%");
    expect(html).toContain('aria-busy="false"');
  });

  it("shows an accessible error message", () => {
    const html = renderToStaticMarkup(
      <AnalysisStatus state={{ status: "error", message: "解析に失敗しました。" }} />,
    );

    expect(html).toContain('role="alert"');
    expect(html).toContain("解析に失敗しました。");
  });
});
