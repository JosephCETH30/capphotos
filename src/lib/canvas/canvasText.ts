export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const testLine = `${currentLine} ${word}`;
    if (ctx.measureText(testLine).width <= maxWidth) {
      currentLine = testLine;
      continue;
    }

    lines.push(currentLine);

    if (lines.length === maxLines - 1) {
      const remaining = [word, ...words.slice(i + 1)].join(" ");
      lines.push(truncateToWidth(ctx, remaining, maxWidth));
      return lines;
    }

    currentLine = word;
  }

  lines.push(currentLine);
  return lines.slice(0, maxLines).map((line) => truncateToWidth(ctx, line, maxWidth));
}

export function truncateToWidth(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  const ellipsis = "…";
  let truncated = text;
  while (truncated.length > 0 && ctx.measureText(truncated + ellipsis).width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return truncated.length > 0 ? truncated + ellipsis : ellipsis;
}

export async function ensureFontLoaded(fontFamily: string, size: number): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await document.fonts.load(`400 ${size}px ${fontFamily}`);
  } catch {
    // Fall back silently — canvas just uses the browser's default fallback font.
  }
}

/** Draws an image cropped to cover a target rect (like CSS object-fit: cover), centered. */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: ImageBitmap,
  dx: number,
  dy: number,
  dw: number,
  dh: number
): void {
  const imageAspect = image.width / image.height;
  const cellAspect = dw / dh;

  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;

  if (imageAspect > cellAspect) {
    sw = image.height * cellAspect;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / cellAspect;
    sy = (image.height - sh) / 2;
  }

  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
}

/** Draws a filled rounded rectangle, e.g. for a text "pill" background. */
export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  ctx.fill();
}

/** Renders a small JPEG data URL from a bitmap, for lightweight thumbnail previews. */
export function createThumbnailDataUrl(bitmap: ImageBitmap, maxSize = 240): string {
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.7);
}
