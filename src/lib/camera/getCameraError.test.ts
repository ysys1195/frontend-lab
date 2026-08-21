import { describe, expect, it } from "vitest";
import { getCameraError, getUnsupportedCameraError } from "./getCameraError";

describe("getCameraError", () => {
  it.each([
    ["NotAllowedError", "not-allowed"],
    ["NotFoundError", "not-found"],
    ["NotReadableError", "not-readable"],
    ["OverconstrainedError", "overconstrained"],
    ["OtherError", "unknown"],
  ] as const)("maps %s to %s", (name, type) => {
    const error = new Error("internal detail");
    error.name = name;

    expect(getCameraError(error)).toMatchObject({ type });
  });

  it("does not expose an unknown error message", () => {
    const error = new Error("internal detail");

    expect(getCameraError(error).message).not.toContain("internal detail");
  });
});

describe("getUnsupportedCameraError", () => {
  it("returns the unsupported browser message", () => {
    expect(getUnsupportedCameraError()).toEqual({
      type: "unsupported",
      message: "このブラウザではカメラ機能を利用できません。",
    });
  });
});
