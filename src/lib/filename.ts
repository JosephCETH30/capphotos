const UNSAFE_FILENAME_CHARS = /[/\\?%*:|"<>]/g;

export function toDownloadFilename(name: string | null | undefined, fallbackId: string): string {
  const trimmed = name?.trim();
  if (!trimmed) return `caphoto-${fallbackId}.jpg`;
  const safe = trimmed.replace(UNSAFE_FILENAME_CHARS, "-").replace(/\s+/g, " ").slice(0, 100);
  return `${safe}.jpg`;
}
