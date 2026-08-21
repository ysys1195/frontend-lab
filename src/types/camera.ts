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
