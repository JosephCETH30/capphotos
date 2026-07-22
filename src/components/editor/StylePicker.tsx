"use client";

import { ImageIcon, SquareStack } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaphotoStyle } from "@/lib/canvas/compose";

interface StylePickerProps {
  value: CaphotoStyle;
  onChange: (style: CaphotoStyle) => void;
}

const OPTIONS: { value: CaphotoStyle; label: string; icon: typeof ImageIcon }[] = [
  { value: "frame", label: "White frame", icon: SquareStack },
  { value: "overlay", label: "Text on photo", icon: ImageIcon },
];

export function StylePicker({ value, onChange }: StylePickerProps) {
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
