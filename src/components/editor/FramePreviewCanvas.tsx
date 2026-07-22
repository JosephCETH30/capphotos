"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  composeCaphoto,
  getFontFamilyFromCssVariable,
  type CaphotoStyle,
  type OverlayTemplateId,
} from "@/lib/canvas/compose";
import { getCaptionFont } from "@/data/fonts";

const PREVIEW_FRAME_WIDTH = 480;
const RENDER_DEBOUNCE_MS = 180;

export interface PreviewCameraInfo {
  brandName: string;
  name: string;
  spec?: string;
}

interface FramePreviewCanvasProps {
  images: ImageBitmap[];
  collageLayoutId?: string;
  caption: string;
  cameraModel: PreviewCameraInfo | null;
  style: CaphotoStyle;
  overlayTemplate: OverlayTemplateId;
  fontId: string;
  className?: string;
}

export function FramePreviewCanvas({
  images,
  collageLayoutId,
  caption,
  cameraModel,
  style,
  overlayTemplate,
  fontId,
  className,
}: FramePreviewCanvasProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (images.length === 0) return;

    let cancelled = false;
    const timeout = setTimeout(async () => {
      const captionFontFamily = getFontFamilyFromCssVariable(getCaptionFont(fontId).cssVariable);
      const canvas = await composeCaphoto({
        images,
        collageLayoutId,
        caption,
        brandName: cameraModel?.brandName ?? "Pick your camera",
        modelName: cameraModel?.name ?? "below to add its specs",
        spec: cameraModel?.spec,
        captionFontFamily,
        style,
        overlayTemplate,
        frameWidth: PREVIEW_FRAME_WIDTH,
      });
      if (cancelled) return;

      canvas.toBlob(
        (blob) => {
          if (cancelled || !blob) return;
          const url = URL.createObjectURL(blob);
          if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = url;
          setAspectRatio(canvas.width / canvas.height);
          setPreviewUrl(url);
        },
        "image/jpeg",
        0.85
      );
    }, RENDER_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [images, collageLayoutId, caption, cameraModel, style, overlayTemplate, fontId]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-[4/5] w-full max-w-[420px] items-center justify-center rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground",
          className
        )}
      >
        Your photo will appear here
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-[420px]", className)}>
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- client-generated blob: URL, not an optimizable asset
        <img
          src={previewUrl}
          alt="Live preview of your framed photo"
          className="w-full rounded-sm shadow-lg"
          style={aspectRatio ? { aspectRatio } : undefined}
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Rendering preview…
        </div>
      )}
    </div>
  );
}
