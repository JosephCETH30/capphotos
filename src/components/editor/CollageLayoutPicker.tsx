"use client";

import { cn } from "@/lib/utils";
import { getCollageLayoutOptions, type CollageCell } from "@/data/collage-layouts";

interface CollageLayoutPickerProps {
  photoCount: number;
  value: string;
  onChange: (layoutId: string) => void;
}

function LayoutPreview({ cells }: { cells: CollageCell[] }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-muted">
      {cells.map((cell, index) => (
        <div
          key={index}
          className="absolute rounded-[1px] bg-foreground/35"
          style={{
            left: `${cell.x * 100}%`,
            top: `${cell.y * 100}%`,
            width: `${cell.w * 100}%`,
            height: `${cell.h * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export function CollageLayoutPicker({ photoCount, value, onChange }: CollageLayoutPickerProps) {
  const options = getCollageLayoutOptions(photoCount);
  if (options.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((layout) => {
        const selected = value === layout.id;
        return (
          <button
            key={layout.id}
            type="button"
            onClick={() => onChange(layout.id)}
            aria-pressed={selected}
            className={cn(
              "cursor-pointer rounded-lg border p-1.5 transition-colors",
              selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/60"
            )}
          >
            <LayoutPreview cells={layout.cells} />
            <p className="mt-1 text-center text-[10px] text-muted-foreground">{layout.label}</p>
          </button>
        );
      })}
    </div>
  );
}
