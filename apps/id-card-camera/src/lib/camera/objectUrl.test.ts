import { afterEach, describe, expect, it, vi } from "vitest";
import { createObjectUrl, revokeObjectUrl } from "./objectUrl";

describe("object URL helpers", () => {
  const createObjectURL = vi.fn();
  const revokeObjectURL = vi.fn();

  afterEach(() => {
    createObjectURL.mockReset();
    revokeObjectURL.mockReset();
    vi.unstubAllGlobals();
  });

  it("creates an object URL for a captured blob", () => {
    const blob = new Blob(["image"], { type: "image/jpeg" });
    createObjectURL.mockReturnValue("blob:captured-image");
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });

    expect(createObjectUrl(blob)).toBe("blob:captured-image");
    expect(createObjectURL).toHaveBeenCalledWith(blob);
  });

  it("revokes an existing object URL", () => {
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });

    revokeObjectUrl("blob:captured-image");

    expect(revokeObjectURL).toHaveBeenCalledWith("blob:captured-image");
  });

  it("does not revoke when no object URL exists", () => {
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });

    revokeObjectUrl(null);

    expect(revokeObjectURL).not.toHaveBeenCalled();
  });
});
