export type CameraStatus = "idle" | "requesting" | "previewing" | "captured" | "error";

export type CameraErrorType =
  | "unsupported"
  | "not-allowed"
  | "not-found"
  | "not-readable"
  | "overconstrained"
  | "unknown";

export type CameraError = {
  type: CameraErrorType;
  message: string;
};

export type CalculateCropAreaInput = {
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
  guideX: number;
  guideY: number;
  guideWidth: number;
  guideHeight: number;
};

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};
