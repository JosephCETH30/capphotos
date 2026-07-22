import { drawImageCover, drawRoundedRect, ensureFontLoaded, truncateToWidth, wrapText } from "./canvasText";
import {
  COLLAGE_ASPECT_RATIO,
  DEFAULT_LAYOUT_ID,
  getCollageLayoutCells,
  type CollageCell,
} from "@/data/collage-layouts";

export type CaphotoStyle = "frame" | "overlay";
export type OverlayTemplateId = "classic" | "split" | "center" | "minimal";

export const DEFAULT_OVERLAY_TEMPLATE: OverlayTemplateId = "classic";

export interface ComposeCaphotoOptions {
  images: ImageBitmap[];
  /** Which collage arrangement to use when images.length > 1 — see src/data/collage-layouts.ts. */
  collageLayoutId?: string;
  caption: string;
  brandName: string;
  modelName: string;
  spec?: string;
  captionFontFamily: string;
  style: CaphotoStyle;
  /** Only used when style === "overlay". Defaults to "classic". */
  overlayTemplate?: OverlayTemplateId;
  /** Target output width in px. Output height is derived from the artwork's own aspect ratio. */
  frameWidth: number;
}

const CAPTION_MAX_LINES = 2;
const INFO_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", ui-sans-serif, system-ui, sans-serif';

interface TextMetrics {
  captionFontSize: number;
  captionLineHeight: number;
  infoFontSize: number;
  infoLineHeight: number;
  captionFontFamily: string;
}

export async function composeCaphoto({
  images,
  collageLayoutId,
  caption,
  brandName,
  modelName,
  spec,
  captionFontFamily,
  style,
  overlayTemplate = DEFAULT_OVERLAY_TEMPLATE,
  frameWidth,
}: ComposeCaphotoOptions): Promise<HTMLCanvasElement> {
  const isCollage = images.length > 1;
  const hasBorder = style === "frame";

  const metrics: TextMetrics = {
    captionFontSize: Math.round(frameWidth * 0.038),
    captionLineHeight: 0,
    infoFontSize: Math.max(10, Math.round(frameWidth * 0.024)),
    infoLineHeight: 0,
    captionFontFamily,
  };
  metrics.captionLineHeight = Math.round(metrics.captionFontSize * 1.28);
  metrics.infoLineHeight = Math.round(metrics.infoFontSize * 1.4);

  await ensureFontLoaded(captionFontFamily, metrics.captionFontSize);

  const sidePadding = hasBorder ? Math.round(frameWidth * 0.03) : 0;
  const artworkWidth = frameWidth - sidePadding * 2;
  const artworkHeight = isCollage
    ? Math.round(artworkWidth / COLLAGE_ASPECT_RATIO)
    : Math.round(artworkWidth / (images[0].width / images[0].height));

  const measureCanvas = document.createElement("canvas");
  const measureCtx = measureCanvas.getContext("2d")!;

  const trimmedCaption = caption.trim();
  const infoTextRaw = spec ? `${brandName} ${modelName} · ${spec}` : `${brandName} ${modelName}`;

  const collageCells = isCollage
    ? getCollageLayoutCells(images.length, collageLayoutId ?? DEFAULT_LAYOUT_ID[images.length])
    : [];

  if (hasBorder) {
    return composeFrameStyle({
      images,
      collageCells,
      frameWidth,
      sidePadding,
      artworkWidth,
      artworkHeight,
      trimmedCaption,
      infoTextRaw,
      metrics,
      measureCtx,
    });
  }

  return composeOverlayStyle({
    images,
    collageCells,
    frameWidth,
    artworkWidth,
    artworkHeight,
    trimmedCaption,
    infoTextRaw,
    metrics,
    measureCtx,
    template: overlayTemplate,
  });
}

function drawArtwork(
  ctx: CanvasRenderingContext2D,
  images: ImageBitmap[],
  cells: CollageCell[],
  x: number,
  y: number,
  width: number,
  height: number
): void {
  if (images.length === 1) {
    ctx.drawImage(images[0], x, y, width, height);
    return;
  }

  images.forEach((image, index) => {
    const cell = cells[index];
    if (!cell) return;
    drawImageCover(
      ctx,
      image,
      x + cell.x * width,
      y + cell.y * height,
      cell.w * width,
      cell.h * height
    );
  });
}

interface FrameStyleArgs {
  images: ImageBitmap[];
  collageCells: CollageCell[];
  frameWidth: number;
  sidePadding: number;
  artworkWidth: number;
  artworkHeight: number;
  trimmedCaption: string;
  infoTextRaw: string;
  metrics: TextMetrics;
  measureCtx: CanvasRenderingContext2D;
}

function composeFrameStyle({
  images,
  collageCells,
  frameWidth,
  sidePadding,
  artworkWidth,
  artworkHeight,
  trimmedCaption,
  infoTextRaw,
  metrics,
  measureCtx,
}: FrameStyleArgs): HTMLCanvasElement {
  const { captionFontSize, captionLineHeight, infoFontSize, infoLineHeight, captionFontFamily } = metrics;
  const textMaxWidth = artworkWidth;

  let captionLines: string[] = [];
  if (trimmedCaption) {
    measureCtx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
    captionLines = wrapText(measureCtx, trimmedCaption, textMaxWidth, CAPTION_MAX_LINES);
  }

  measureCtx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  const infoText = truncateToWidth(measureCtx, infoTextRaw, textMaxWidth);

  const gapAfterArtwork = Math.round(sidePadding * 0.4);
  const gapBeforeInfo = Math.round(captionFontSize * 0.03);
  const bottomPadding = Math.round(frameWidth * 0.02);
  const captionBlockHeight = captionLines.length * captionLineHeight;
  const bottomTextHeight =
    captionBlockHeight + (captionLines.length > 0 ? gapBeforeInfo : 0) + infoLineHeight;

  const topPadding = sidePadding;
  const frameHeight = topPadding + artworkHeight + gapAfterArtwork + bottomTextHeight + bottomPadding;

  const canvas = document.createElement("canvas");
  canvas.width = frameWidth;
  canvas.height = frameHeight;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, frameWidth, frameHeight);

  drawArtwork(ctx, images, collageCells, sidePadding, topPadding, artworkWidth, artworkHeight);

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  let cursorY = topPadding + artworkHeight + gapAfterArtwork;
  if (captionLines.length > 0) {
    ctx.fillStyle = "#1a1a1a";
    ctx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
    for (const line of captionLines) {
      ctx.fillText(line, sidePadding, cursorY);
      cursorY += captionLineHeight;
    }
    cursorY += gapBeforeInfo;
  }

  ctx.fillStyle = "#8a8a8a";
  ctx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  ctx.fillText(infoText, sidePadding, cursorY);

  return canvas;
}

interface OverlayStyleArgs {
  images: ImageBitmap[];
  collageCells: CollageCell[];
  frameWidth: number;
  artworkWidth: number;
  artworkHeight: number;
  trimmedCaption: string;
  infoTextRaw: string;
  metrics: TextMetrics;
  measureCtx: CanvasRenderingContext2D;
  template: OverlayTemplateId;
}

function composeOverlayStyle({
  images,
  collageCells,
  frameWidth,
  artworkWidth,
  artworkHeight,
  trimmedCaption,
  infoTextRaw,
  metrics,
  measureCtx,
  template,
}: OverlayStyleArgs): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = frameWidth;
  canvas.height = artworkHeight;
  const ctx = canvas.getContext("2d")!;

  drawArtwork(ctx, images, collageCells, 0, 0, artworkWidth, artworkHeight);

  const drawText = OVERLAY_TEMPLATES[template];
  drawText(ctx, measureCtx, { frameWidth, artworkWidth, artworkHeight, trimmedCaption, infoTextRaw, metrics });

  return canvas;
}

interface OverlayTemplateArgs {
  frameWidth: number;
  artworkWidth: number;
  artworkHeight: number;
  trimmedCaption: string;
  infoTextRaw: string;
  metrics: TextMetrics;
}

type OverlayTemplateFn = (
  ctx: CanvasRenderingContext2D,
  measureCtx: CanvasRenderingContext2D,
  args: OverlayTemplateArgs
) => void;

function addBottomScrim(ctx: CanvasRenderingContext2D, frameWidth: number, artworkHeight: number, heightFraction: number) {
  const scrimHeight = Math.round(artworkHeight * heightFraction);
  const gradient = ctx.createLinearGradient(0, artworkHeight - scrimHeight, 0, artworkHeight);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, artworkHeight - scrimHeight, frameWidth, scrimHeight);
}

function addTopScrim(ctx: CanvasRenderingContext2D, frameWidth: number, heightFraction: number, artworkHeight: number) {
  const scrimHeight = Math.round(artworkHeight * heightFraction);
  const gradient = ctx.createLinearGradient(0, 0, 0, scrimHeight);
  gradient.addColorStop(0, "rgba(0,0,0,0.5)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, frameWidth, scrimHeight);
}

function withTextShadow(ctx: CanvasRenderingContext2D, frameWidth: number, draw: () => void) {
  ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
  ctx.shadowBlur = Math.round(frameWidth * 0.012);
  ctx.shadowOffsetY = Math.round(frameWidth * 0.002);
  draw();
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
}

/** Caption + camera info stacked and centered at the bottom, over a gradient scrim. */
const drawClassicTemplate: OverlayTemplateFn = (ctx, measureCtx, { frameWidth, artworkWidth, artworkHeight, trimmedCaption, infoTextRaw, metrics }) => {
  const { captionFontSize, captionLineHeight, infoFontSize, infoLineHeight, captionFontFamily } = metrics;
  const bottomMargin = Math.round(frameWidth * 0.035);
  const textMaxWidth = Math.round(artworkWidth * 0.84);

  let captionLines: string[] = [];
  if (trimmedCaption) {
    measureCtx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
    captionLines = wrapText(measureCtx, trimmedCaption, textMaxWidth, CAPTION_MAX_LINES);
  }
  measureCtx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  const infoText = truncateToWidth(measureCtx, infoTextRaw, textMaxWidth);

  addBottomScrim(ctx, frameWidth, artworkHeight, 0.3);

  const gapBeforeInfo = Math.round(captionFontSize * 0.03);
  const captionBlockHeight = captionLines.length * captionLineHeight;
  const bottomTextHeight =
    captionBlockHeight + (captionLines.length > 0 ? gapBeforeInfo : 0) + infoLineHeight;

  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  const textX = frameWidth / 2;
  let cursorY = artworkHeight - bottomMargin - bottomTextHeight;

  withTextShadow(ctx, frameWidth, () => {
    if (captionLines.length > 0) {
      ctx.fillStyle = "#ffffff";
      ctx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
      for (const line of captionLines) {
        ctx.fillText(line, textX, cursorY);
        cursorY += captionLineHeight;
      }
      cursorY += gapBeforeInfo;
    }
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
    ctx.fillText(infoText, textX, cursorY);
  });
};

/** Caption bottom-left, camera info bottom-right, sharing the same baseline. */
const drawSplitTemplate: OverlayTemplateFn = (ctx, measureCtx, { frameWidth, artworkWidth, artworkHeight, trimmedCaption, infoTextRaw, metrics }) => {
  const { captionFontSize, captionLineHeight, infoFontSize, infoLineHeight, captionFontFamily } = metrics;
  const padX = Math.round(frameWidth * 0.045);
  const bottomMargin = Math.round(frameWidth * 0.035);
  const captionMaxWidth = Math.round(artworkWidth * 0.56);
  const infoMaxWidth = Math.round(artworkWidth * 0.34);

  let captionLines: string[] = [];
  if (trimmedCaption) {
    measureCtx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
    captionLines = wrapText(measureCtx, trimmedCaption, captionMaxWidth, CAPTION_MAX_LINES);
  }
  measureCtx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  const infoText = truncateToWidth(measureCtx, infoTextRaw, infoMaxWidth);

  addBottomScrim(ctx, frameWidth, artworkHeight, 0.26);

  const captionBlockHeight = captionLines.length * captionLineHeight;
  ctx.textBaseline = "top";

  withTextShadow(ctx, frameWidth, () => {
    if (captionLines.length > 0) {
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
      let cursorY = artworkHeight - bottomMargin - captionBlockHeight;
      for (const line of captionLines) {
        ctx.fillText(line, padX, cursorY);
        cursorY += captionLineHeight;
      }
    }

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
    ctx.fillText(infoText, frameWidth - padX, artworkHeight - bottomMargin - infoLineHeight);
  });
};

/** Caption centered in the middle of the photo at low opacity; camera info tucked in the bottom-right corner. */
const drawCenterTemplate: OverlayTemplateFn = (ctx, measureCtx, { frameWidth, artworkWidth, artworkHeight, trimmedCaption, infoTextRaw, metrics }) => {
  const { captionFontSize, captionLineHeight, infoFontSize, infoLineHeight, captionFontFamily } = metrics;
  const padX = Math.round(frameWidth * 0.045);
  const bottomMargin = Math.round(frameWidth * 0.035);
  const captionMaxWidth = Math.round(artworkWidth * 0.8);

  let captionLines: string[] = [];
  if (trimmedCaption) {
    measureCtx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
    captionLines = wrapText(measureCtx, trimmedCaption, captionMaxWidth, CAPTION_MAX_LINES);
  }
  measureCtx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  const infoText = truncateToWidth(measureCtx, infoTextRaw, Math.round(artworkWidth * 0.42));

  const captionBlockHeight = captionLines.length * captionLineHeight;
  const captionStartY = Math.round(artworkHeight / 2 - captionBlockHeight / 2);

  if (captionLines.length > 0) {
    const bandPadding = captionLineHeight * 0.7;
    const bandTop = captionStartY - bandPadding;
    const bandHeight = captionBlockHeight + bandPadding * 2;
    const gradient = ctx.createLinearGradient(0, bandTop, 0, bandTop + bandHeight);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.3)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, bandTop, frameWidth, bandHeight);
  }

  ctx.textBaseline = "top";

  withTextShadow(ctx, frameWidth, () => {
    if (captionLines.length > 0) {
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255,255,255,0.72)";
      ctx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
      let cursorY = captionStartY;
      for (const line of captionLines) {
        ctx.fillText(line, frameWidth / 2, cursorY);
        cursorY += captionLineHeight;
      }
    }

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
    ctx.fillText(infoText, frameWidth - padX, artworkHeight - bottomMargin - infoLineHeight);
  });
};

/** A single caption line top-left over a light scrim; camera info as a small pill tag bottom-right. */
const drawMinimalTemplate: OverlayTemplateFn = (ctx, measureCtx, { frameWidth, artworkWidth, artworkHeight, trimmedCaption, infoTextRaw, metrics }) => {
  const { captionFontSize, infoFontSize, captionFontFamily } = metrics;
  const padX = Math.round(frameWidth * 0.045);
  const topMargin = Math.round(frameWidth * 0.035);
  const bottomMargin = Math.round(frameWidth * 0.03);
  const captionMaxWidth = Math.round(artworkWidth * 0.62);

  let captionLine = "";
  if (trimmedCaption) {
    measureCtx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
    captionLine = truncateToWidth(measureCtx, trimmedCaption, captionMaxWidth);
  }

  if (captionLine) {
    addTopScrim(ctx, frameWidth, 0.22, artworkHeight);
  }

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  if (captionLine) {
    withTextShadow(ctx, frameWidth, () => {
      ctx.fillStyle = "#ffffff";
      ctx.font = `400 ${captionFontSize}px ${captionFontFamily}`;
      ctx.fillText(captionLine, padX, topMargin);
    });
  }

  measureCtx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  const infoMaxWidth = Math.round(artworkWidth * 0.55);
  const infoText = truncateToWidth(measureCtx, infoTextRaw, infoMaxWidth);
  const infoTextWidth = measureCtx.measureText(infoText).width;

  const padTagX = infoFontSize * 0.6;
  const padTagY = infoFontSize * 0.45;
  const pillWidth = infoTextWidth + padTagX * 2;
  const pillHeight = infoFontSize + padTagY * 2;
  const pillX = frameWidth - padX - pillWidth;
  const pillY = artworkHeight - bottomMargin - pillHeight;

  ctx.fillStyle = "rgba(0,0,0,0.4)";
  drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2);

  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.font = `${infoFontSize}px ${INFO_FONT_STACK}`;
  ctx.fillText(infoText, pillX + padTagX, pillY + pillHeight / 2 + 0.5);
};

const OVERLAY_TEMPLATES: Record<OverlayTemplateId, OverlayTemplateFn> = {
  classic: drawClassicTemplate,
  split: drawSplitTemplate,
  center: drawCenterTemplate,
  minimal: drawMinimalTemplate,
};

export function canvasToJpegBlob(canvas: HTMLCanvasElement, quality = 0.92): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to encode image."))),
      "image/jpeg",
      quality
    );
  });
}

export function getFontFamilyFromCssVariable(cssVariable: string): string {
  if (typeof document === "undefined") return "cursive";
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
  return value || "cursive";
}
