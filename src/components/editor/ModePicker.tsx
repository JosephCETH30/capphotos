"use client";

import { Image as ImageIcon, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export type EditorMode = "single" | "collage";

interface ModePickerProps {
  value: EditorMode;
  onChange: (mode: EditorMode) => void;
}

const OPTIONS: { value: EditorMode; label: string; icon: typeof ImageIcon }[] = [
  { value: "single", label: "Single photo", icon: ImageIcon },
  { value: "collage", label: "Collage", icon: LayoutGrid },
];

export function ModePicker({ value, onChange }: ModePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={selected}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors",
              selected ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:bg-muted/60"
            )}
          >
            <Icon className="size-4" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
