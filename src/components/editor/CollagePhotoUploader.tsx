"use client";

import { useRef } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/canvas/loadImage";
import { MAX_COLLAGE_PHOTOS, MIN_COLLAGE_PHOTOS } from "@/data/collage-layouts";

export interface CollagePhoto {
  id: string;
  previewUrl: string;
}

interface CollagePhotoUploaderProps {
  photos: CollagePhoto[];
  isProcessing: boolean;
  onFileSelected: (file: File) => void;
  onRemove: (id: string) => void;
}

export function CollagePhotoUploader({
  photos,
  isProcessing,
  onFileSelected,
  onRemove,
}: CollagePhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canAddMore = photos.length < MAX_COLLAGE_PHOTOS;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
          e.target.value = "";
        }}
      />
      <div className="grid grid-cols-4 gap-2">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg border">
            {/* eslint-disable-next-line @next/next/no-img-element -- client-generated thumbnail, not a static asset */}
            <img src={photo.previewUrl} alt="" className="size-full object-cover" />
            <button
              type="button"
              onClick={() => onRemove(photo.id)}
              className="absolute top-1 right-1 flex size-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            >
              <X className="size-3" />
              <span className="sr-only">Remove photo</span>
            </button>
          </div>
        ))}
        {canAddMore && (
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/40",
              isProcessing && "pointer-events-none opacity-70"
            )}
          >
            {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
            <span className="text-[11px]">Add</span>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {photos.length}/{MAX_COLLAGE_PHOTOS} photos · add at least {MIN_COLLAGE_PHOTOS} to build a
        collage
      </p>
    </div>
  );
}
