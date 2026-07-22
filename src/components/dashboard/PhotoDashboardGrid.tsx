"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Camera, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhotoCard } from "./PhotoCard";
import type { DashboardPhoto } from "@/types/photo";

interface PhotoDashboardGridProps {
  initialPhotos: DashboardPhoto[];
}

export function PhotoDashboardGrid({ initialPhotos }: PhotoDashboardGridProps) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [query, setQuery] = useState("");

  function handleDeleted(id: string) {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  function handleRenamed(id: string, name: string | null) {
    setPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, name } : photo)));
  }

  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((photo) => (photo.name ?? "").toLowerCase().includes(q));
  }, [photos, query]);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center">
        <Camera className="size-8 text-muted-foreground" />
        <p className="font-medium">No saved photos yet</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Edit a photo and save it to your dashboard to see it here.
        </p>
        <Button nativeButton={false} render={<Link href="/" />}>
          Create a photo
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative sm:max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search your photos…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="rounded-xl border border-dashed py-10 text-center text-sm text-muted-foreground">
          No photos match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} onDeleted={handleDeleted} onRenamed={handleRenamed} />
          ))}
        </div>
      )}
    </div>
  );
}
