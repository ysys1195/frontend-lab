import { describe, expect, it, vi } from "vitest";
import { analyzeImage } from "./analyzeImage";

const mockResult = {
  documentType: "identity-card",
  confidence: 0.98,
  message: "画像を受け付けました。Mock解析が完了しました。",
} as const;

describe("analyzeImage", () => {
  it("posts the captured blob as the image field", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json(mockResult));
    const image = new Blob(["image-data"], { type: "image/jpeg" });

    await expect(analyzeImage(image, { fetcher })).resolves.toEqual(mockResult);

    expect(fetcher).toHaveBeenCalledOnce();
    const [url, init] = fetcher.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/analyze");
    expect(init.method).toBe("POST");
    expect(init.body).toBeInstanceOf(FormData);

    const formData = init.body as FormData;
    const sentImage = formData.get("image");
    expect(sentImage).toBeInstanceOf(File);
    expect((sentImage as File).type).toBe("image/jpeg");
    expect((sentImage as File).size).toBe(image.size);
  });

  it("uses the API error message for an unsuccessful response", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      Response.json({ error: "画像ファイルが必要です。" }, { status: 400 }),
    );

    await expect(analyzeImage(new Blob(["image"]), { fetcher })).rejects.toThrow(
      "画像ファイルが必要です。",
    );
  });

  it("uses a fallback message when an error response is not JSON", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("error", { status: 500 }));

    await expect(analyzeImage(new Blob(["image"]), { fetcher })).rejects.toThrow(
      "画像の解析に失敗しました。もう一度お試しください。",
    );
  });

  it("rejects an invalid successful response", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ status: "completed" }));

    await expect(analyzeImage(new Blob(["image"]), { fetcher })).rejects.toThrow(
      "解析結果を正しく読み取れませんでした。もう一度お試しください。",
    );
  });
});
