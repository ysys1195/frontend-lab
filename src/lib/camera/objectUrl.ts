export function createObjectUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeObjectUrl(objectUrl: string | null): void {
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }
}
