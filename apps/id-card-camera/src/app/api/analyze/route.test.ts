import { describe, expect, it } from "vitest";
import { POST } from "./route";

function createRequest(formData: FormData) {
  return new Request("http://localhost/api/analyze", {
    method: "POST",
    body: formData,
  });
}

describe("POST /api/analyze", () => {
  it("returns 400 when image is missing", async () => {
    const response = await POST(createRequest(new FormData()));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "画像ファイルが必要です。",
    });
  });

  it("returns 400 when image is not a file", async () => {
    const formData = new FormData();
    formData.set("image", "not-a-file");

    const response = await POST(createRequest(formData));

    expect(response.status).toBe(400);
  });

  it("returns 400 when image is empty", async () => {
    const formData = new FormData();
    formData.set("image", new File([], "empty.jpg", { type: "image/jpeg" }));

    const response = await POST(createRequest(formData));

    expect(response.status).toBe(400);
  });

  it("returns 415 when file is not an image", async () => {
    const formData = new FormData();
    formData.set("image", new File(["text"], "note.txt", { type: "text/plain" }));

    const response = await POST(createRequest(formData));

    expect(response.status).toBe(415);
  });

  it("returns a mock result for a valid image", async () => {
    const formData = new FormData();
    formData.set(
      "image",
      new File(["image-data"], "identity-card.jpg", { type: "image/jpeg" }),
    );

    const response = await POST(createRequest(formData));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      documentType: "identity-card",
      confidence: 0.98,
      message: "画像を受け付けました。Mock解析が完了しました。",
    });
  });
});
