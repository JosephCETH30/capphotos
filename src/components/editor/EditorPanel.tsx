"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Download, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PhotoUploader } from "./PhotoUploader";
import { CollagePhotoUploader, type CollagePhoto } from "./CollagePhotoUploader";
import { CollageLayoutPicker } from "./CollageLayoutPicker";
import { CameraPicker, type CameraSelection } from "./CameraPicker";
import { CaptionInput } from "./CaptionInput";
import { FontPicker } from "./FontPicker";
import { StylePicker } from "./StylePicker";
import { OverlayTemplatePicker } from "./OverlayTemplatePicker";
import { ModePicker, type EditorMode } from "./ModePicker";
import { FramePreviewCanvas } from "./FramePreviewCanvas";
import { SaveLoginPrompt } from "./SaveLoginPrompt";
import { loadImageFromFile, UploadValidationError } from "@/lib/canvas/loadImage";
import {
  composeCaphoto,
  canvasToJpegBlob,
  getFontFamilyFromCssVariable,
  DEFAULT_OVERLAY_TEMPLATE,
  type CaphotoStyle,
  type OverlayTemplateId,
} from "@/lib/canvas/compose";
import { createThumbnailDataUrl } from "@/lib/canvas/canvasText";
import {
  CAMERA_BRANDS,
  CUSTOM_MODEL_ID,
  encodeCustomModelId,
  formatCameraSpec,
  getCameraModel,
} from "@/data/cameras";
import { DEFAULT_FONT_ID, getCaptionFont } from "@/data/fonts";
import {
  DEFAULT_LAYOUT_ID,
  MAX_COLLAGE_PHOTOS,
  MIN_COLLAGE_PHOTOS,
  getCollageLayoutOptions,
} from "@/data/collage-layouts";

const EXPORT_FRAME_WIDTH = 1800;

interface EditorPanelProps {
  initialUser: User | null;
}

interface CollagePhotoState extends CollagePhoto {
  bitmap: ImageBitmap;
}

export function EditorPanel({ initialUser }: EditorPanelProps) {
  const [user, setUser] = useState(initialUser);

  const [mode, setMode] = useState<EditorMode>("single");
  const [style, setStyle] = useState<CaphotoStyle>("frame");
  const [overlayTemplate, setOverlayTemplate] = useState<OverlayTemplateId>(DEFAULT_OVERLAY_TEMPLATE);
  const [fontId, setFontId] = useState(DEFAULT_FONT_ID);

  const [fileName, setFileName] = useState<string | null>(null);
  const [image, setImage] = useState<ImageBitmap | null>(null);
  const [collagePhotos, setCollagePhotos] = useState<CollagePhotoState[]>([]);
  const [collageLayoutId, setCollageLayoutId] = useState(DEFAULT_LAYOUT_ID[2]);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  const [caption, setCaption] = useState("");
  const [cameraSelection, setCameraSelection] = useState<CameraSelection | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  // A layout chosen for one photo count may not exist for another — derive the
  // actually-usable layout rather than resetting the user's pick destructively.
  const collageLayoutOptions = getCollageLayoutOptions(collagePhotos.length);
  const effectiveLayoutId = collageLayoutOptions.some((option) => option.id === collageLayoutId)
    ? collageLayoutId
    : (DEFAULT_LAYOUT_ID[collagePhotos.length] ?? collageLayoutId);

  const cameraModel = useMemo(() => {
    if (!cameraSelection) return null;
    if (cameraSelection.modelId === CUSTOM_MODEL_ID) {
      const brand = CAMERA_BRANDS.find((b) => b.id === cameraSelection.brandId);
      const name = cameraSelection.customModelName?.trim();
      if (!brand || !name) return null;
      return { brandName: brand.name, name, spec: undefined as string | undefined };
    }
    const model = getCameraModel(cameraSelection.brandId, cameraSelection.modelId);
    if (!model) return null;
    return { brandName: model.brandName, name: model.name, spec: formatCameraSpec(model) };
  }, [cameraSelection]);

  const images = useMemo(
    () => (mode === "single" ? (image ? [image] : []) : collagePhotos.map((p) => p.bitmap)),
    [mode, image, collagePhotos]
  );

  const hasEnoughPhotos = mode === "single" ? images.length === 1 : images.length >= MIN_COLLAGE_PHOTOS;
  const canExport = hasEnoughPhotos && Boolean(cameraModel);

  const handleModeChange = useCallback(
    (newMode: EditorMode) => {
      if (newMode === mode) return;

      if (newMode === "collage") {
        // Carry the single photo over as the collage's first slot instead of discarding it.
        if (image) {
          if (collagePhotos.length < MAX_COLLAGE_PHOTOS) {
            const previewUrl = createThumbnailDataUrl(image);
            setCollagePhotos((prev) => [{ id: crypto.randomUUID(), bitmap: image, previewUrl }, ...prev]);
          } else {
            image.close();
          }
        }
        setImage(null);
        setFileName(null);
      } else {
        // Carry the first collage photo back as the single photo instead of discarding it.
        if (collagePhotos.length > 0) {
          const [first, ...rest] = collagePhotos;
          setImage(first.bitmap);
          setFileName("Photo from collage");
          rest.forEach((p) => p.bitmap.close());
          setCollagePhotos([]);
        }
      }

      setMode(newMode);
    },
    [mode, image, collagePhotos]
  );

  const handleFileSelected = useCallback(async (file: File) => {
    setIsProcessingUpload(true);
    try {
      const bitmap = await loadImageFromFile(file);
      setImage((prev) => {
        prev?.close();
        return bitmap;
      });
      setFileName(file.name);
    } catch (error) {
      const message =
        error instanceof UploadValidationError
          ? error.message
          : "Couldn't read that photo. Please try another file.";
      toast.error(message);
    } finally {
      setIsProcessingUpload(false);
    }
  }, []);

  const handleClearPhoto = useCallback(() => {
    setImage((prev) => {
      prev?.close();
      return null;
    });
    setFileName(null);
  }, []);

  const handleCollageFileSelected = useCallback(
    async (file: File) => {
      if (collagePhotos.length >= MAX_COLLAGE_PHOTOS) return;
      setIsProcessingUpload(true);
      try {
        const bitmap = await loadImageFromFile(file);
        const previewUrl = createThumbnailDataUrl(bitmap);
        setCollagePhotos((prev) => [...prev, { id: crypto.randomUUID(), bitmap, previewUrl }]);
      } catch (error) {
        const message =
          error instanceof UploadValidationError
            ? error.message
            : "Couldn't read that photo. Please try another file.";
        toast.error(message);
      } finally {
        setIsProcessingUpload(false);
      }
    },
    [collagePhotos.length]
  );

  const handleRemoveCollagePhoto = useCallback((id: string) => {
    setCollagePhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      target?.bitmap.close();
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const renderExportCanvas = useCallback(async () => {
    if (!canExport || !cameraModel) throw new Error("Add photo(s) and pick a camera first.");
    const captionFontFamily = getFontFamilyFromCssVariable(getCaptionFont(fontId).cssVariable);
    return composeCaphoto({
      images,
      collageLayoutId: effectiveLayoutId,
      caption,
      brandName: cameraModel.brandName,
      modelName: cameraModel.name,
      spec: cameraModel.spec,
      captionFontFamily,
      style,
      overlayTemplate,
      frameWidth: EXPORT_FRAME_WIDTH,
    });
  }, [canExport, cameraModel, images, effectiveLayoutId, caption, fontId, style, overlayTemplate]);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    try {
      const canvas = await renderExportCanvas();
      const blob = await canvasToJpegBlob(canvas);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `caphoto-${Date.now()}.jpg`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Photo downloaded.");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't generate your photo. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [renderExportCanvas]);

  const handleSave = useCallback(async () => {
    if (!user || !cameraSelection) return;
    setIsSaving(true);
    try {
      const canvas = await renderExportCanvas();
      const blob = await canvasToJpegBlob(canvas);
      const supabase = createClient();
      const photoId = crypto.randomUUID();
      const imagePath = `${user.id}/${photoId}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("photos")
        .upload(imagePath, blob, { contentType: "image/jpeg", upsert: false });
      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase.from("photos").insert({
        id: photoId,
        user_id: user.id,
        caption: caption.trim(),
        camera_brand_id: cameraSelection.brandId,
        camera_model_id:
          cameraSelection.modelId === CUSTOM_MODEL_ID
            ? encodeCustomModelId(cameraSelection.customModelName?.trim() ?? "Custom")
            : cameraSelection.modelId,
        image_path: imagePath,
      });
      if (insertError) {
        await supabase.storage.from("photos").remove([imagePath]);
        throw insertError;
      }

      toast.success("Saved to your dashboard.");
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save your photo. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [user, cameraSelection, caption, renderExportCanvas]);

  const helperMessage = !canExport
    ? mode === "collage" && images.length > 0 && images.length < MIN_COLLAGE_PHOTOS
      ? `Add at least ${MIN_COLLAGE_PHOTOS} photos to build a collage.`
      : images.length > 0
        ? "Pick a camera brand & model to finish your photo."
        : null
    : null;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
      <Card className="w-full lg:max-w-md">
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-1.5">
            <Label>Type</Label>
            <ModePicker value={mode} onChange={handleModeChange} />
          </div>

          {mode === "single" ? (
            <PhotoUploader
              fileName={fileName}
              isProcessing={isProcessingUpload}
              onFileSelected={handleFileSelected}
              onClear={handleClearPhoto}
            />
          ) : (
            <>
              <CollagePhotoUploader
                photos={collagePhotos}
                isProcessing={isProcessingUpload}
                onFileSelected={handleCollageFileSelected}
                onRemove={handleRemoveCollagePhoto}
              />
              {collageLayoutOptions.length > 0 && (
                <div className="grid gap-1.5">
                  <Label>Layout</Label>
                  <CollageLayoutPicker
                    photoCount={collagePhotos.length}
                    value={effectiveLayoutId}
                    onChange={setCollageLayoutId}
                  />
                </div>
              )}
            </>
          )}

          <div className="grid gap-1.5">
            <Label>Style</Label>
            <StylePicker value={style} onChange={setStyle} />
          </div>

          {style === "overlay" && (
            <div className="grid gap-1.5">
              <Label>Text layout</Label>
              <OverlayTemplatePicker value={overlayTemplate} onChange={setOverlayTemplate} />
            </div>
          )}

          <CameraPicker value={cameraSelection} onChange={setCameraSelection} />
          <CaptionInput value={caption} onChange={setCaption} />

          <div className="grid gap-1.5">
            <Label>Caption font</Label>
            <FontPicker value={fontId} onChange={setFontId} />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full shrink"
              disabled={!canExport || isDownloading}
              onClick={handleDownload}
            >
              {isDownloading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
              Download
            </Button>
            {user && (
              <Button
                type="button"
                className="w-full shrink"
                disabled={!canExport || isSaving}
                onClick={handleSave}
              >
                {isSaving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                Save to dashboard
              </Button>
            )}
          </div>
          {helperMessage && <p className="text-xs text-muted-foreground">{helperMessage}</p>}
        </CardContent>
      </Card>

      <div className="order-first flex w-full flex-1 flex-col items-center gap-4 lg:order-none lg:sticky lg:top-20">
        <FramePreviewCanvas
          images={images}
          collageLayoutId={effectiveLayoutId}
          caption={caption}
          cameraModel={cameraModel}
          style={style}
          overlayTemplate={overlayTemplate}
          fontId={fontId}
        />
        {!user && images.length > 0 && <SaveLoginPrompt />}
      </div>
    </div>
  );
}
