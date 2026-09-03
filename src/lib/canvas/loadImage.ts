export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // 50MB

export class UploadValidationError extends Error {}

function isHeic(file: File): boolean {
  const type = file.type.toLowerCase();
  if (type === "image/heic" || type === "image/heif") return true;
  // Some browsers/OSes report an empty MIME type for HEIC files picked from a phone.
  return type === "" && /\.hei[cf]$/i.test(file.name);
}

export function validateUploadFile(file: File): void {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new UploadValidationError("Photo is too large. Please choose a file under 50MB.");
  }
  const isAccepted = ACCEPTED_IMAGE_TYPES.includes(file.type.toLowerCase()) || isHeic(file);
  if (!isAccepted) {
    throw new UploadValidationError("Unsupported file type. Please upload a JPEG, PNG, WebP, or HEIC photo.");
  }
}

/**
 * Loads a user-selected photo into an orientation-corrected ImageBitmap.
 * HEIC/HEIF (common on iPhone) is converted to JPEG client-side first, since
 * most browsers can't decode HEIC directly via canvas/createImageBitmap.
 */
export async function loadImageFromFile(file: File): Promise<ImageBitmap> {
  validateUploadFile(file);

  let drawableFile: File | Blob = file;

  if (isHeic(file)) {
    const heic2any = (await import("heic2any")).default;
    const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.92 });
    drawableFile = Array.isArray(converted) ? converted[0] : converted;
  }

  return createImageBitmap(drawableFile, { imageOrientation: "from-image" });
}
