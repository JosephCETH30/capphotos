"use client";

import { useRef, useState } from "react";
import { CheckCircle2, ImageUp, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/canvas/loadImage";

interface PhotoUploaderProps {
  fileName: string | null;
  isProcessing: boolean;
  onFileSelected: (file: File) => void;
  onClear: () => void;
}

export function PhotoUploader({ fileName, isProcessing, onFileSelected, onClear }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) onFileSelected(file);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => !isProcessing && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isProcessing) inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragActive(false);
          if (!isProcessing) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/40",
          isProcessing && "pointer-events-none opacity-70"
        )}
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Processing your photo…</p>
          </>
        ) : fileName ? (
          <>
            <CheckCircle2 className="size-6 text-primary" />
            <p className="max-w-full truncate text-sm font-medium">{fileName}</p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <Trash2 className="size-3.5" />
              Remove photo
            </Button>
          </>
        ) : (
          <>
            <ImageUp className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">Drag & drop a photo, or click to upload</p>
            <p className="text-xs text-muted-foreground">JPEG, PNG, WebP, or HEIC · up to 50MB</p>
          </>
        )}
      </div>
    </div>
  );
}
