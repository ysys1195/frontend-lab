import type { CameraError, CameraErrorType } from "@/types/camera";

const errorMessages: Record<CameraErrorType, string> = {
  unsupported: "このブラウザではカメラ機能を利用できません。",
  "not-allowed": "カメラの使用が許可されていません。ブラウザの設定からカメラの使用を許可してください。",
  "not-found": "利用可能なカメラが見つかりませんでした。",
  "not-readable": "カメラを起動できませんでした。他のアプリがカメラを使用していないか確認してください。",
  overconstrained: "指定した条件を満たすカメラが見つかりませんでした。",
  unknown: "カメラを起動できませんでした。時間をおいて、もう一度お試しください。",
};

const errorTypesByName: Record<string, CameraErrorType> = {
  NotAllowedError: "not-allowed",
  NotFoundError: "not-found",
  NotReadableError: "not-readable",
  OverconstrainedError: "overconstrained",
};

export function getCameraError(error: unknown): CameraError {
  const name =
    typeof error === "object" && error !== null && "name" in error && typeof error.name === "string"
      ? error.name
      : undefined;
  const type = name ? errorTypesByName[name] : undefined;

  return {
    type: type ?? "unknown",
    message: errorMessages[type ?? "unknown"],
  };
}

export function getUnsupportedCameraError(): CameraError {
  return {
    type: "unsupported",
    message: errorMessages.unsupported,
  };
}
