"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeletePhotoDialog } from "./DeletePhotoDialog";
import { RenamePhotoDialog } from "./RenamePhotoDialog";
import { getCameraLabel } from "@/lib/camera-label";
import { toDownloadFilename } from "@/lib/filename";
import type { DashboardPhoto } from "@/types/photo";

interface PhotoCardProps {
  photo: DashboardPhoto;
  onDeleted: (id: string) => void;
  onRenamed: (id: string, name: string | null) => void;
}

export function PhotoCard({ photo, onDeleted, onRenamed }: PhotoCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const cameraLabel = getCameraLabel(photo.camera_brand_id, photo.camera_model_id);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      const res = await fetch(photo.signedUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = toDownloadFilename(photo.name, photo.id);
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't download this photo.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <Card className="gap-0 overflow-hidden py-0">
      {/* eslint-disable-next-line @next/next/no-img-element -- signed Supabase Storage URL, not a static asset */}
      <img
        src={photo.signedUrl}
        alt={photo.caption || "Saved photo"}
        className="aspect-[4/5] w-full bg-muted object-cover"
      />
      <div className="flex flex-col gap-1 p-3">
        <p
          className={cn(
            "truncate text-sm font-medium",
            !photo.name?.trim() && "text-muted-foreground italic"
          )}
        >
          {photo.name?.trim() || "Untitled photo"}
        </p>
        {photo.caption && <p className="truncate text-xs text-muted-foreground">{photo.caption}</p>}
        <p className="truncate text-xs text-muted-foreground">{cameraLabel}</p>
        <div className="mt-2 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Download className="size-3.5" />
            )}
            Download
          </Button>
          <div className="flex items-center gap-1">
            <RenamePhotoDialog photo={photo} onRenamed={onRenamed} />
            <DeletePhotoDialog photo={photo} onDeleted={onDeleted} />
          </div>
        </div>
      </div>
    </Card>
  );
}
