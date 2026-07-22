"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CAPTION_FONTS, getCaptionFont, type CaptionFont } from "@/data/fonts";

interface FontPickerProps {
  value: string;
  onChange: (fontId: string) => void;
}

const VISIBLE_COUNT = 3;

function FontCard({
  font,
  selected,
  onClick,
}: {
  font: CaptionFont;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex h-14 cursor-pointer flex-col items-center justify-center rounded-lg border px-1 text-sm transition-colors",
        selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/60"
      )}
    >
      <span
        className="max-w-full truncate text-lg leading-none"
        style={{ fontFamily: `var(${font.cssVariable})` }}
      >
        {font.label}
      </span>
    </button>
  );
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const visibleFonts = CAPTION_FONTS.slice(0, VISIBLE_COUNT);
  const moreFonts = CAPTION_FONTS.slice(VISIBLE_COUNT);
  const hasMore = moreFonts.length > 0;
  const selectedInMore = moreFonts.some((font) => font.id === value);

  return (
    <div className="grid grid-cols-4 gap-2">
      {visibleFonts.map((font) => (
        <FontCard
          key={font.id}
          font={font}
          selected={value === font.id}
          onClick={() => onChange(font.id)}
        />
      ))}

      {hasMore && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <button
                type="button"
                aria-pressed={selectedInMore}
                className={cn(
                  "flex h-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border px-1 text-center transition-colors",
                  selectedInMore
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/60"
                )}
              />
            }
          >
            <MoreHorizontal className="size-4" />
            <span className="max-w-full truncate text-[11px]">
              {selectedInMore ? getCaptionFont(value).label : "More fonts"}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2" align="end">
            <div className="grid grid-cols-2 gap-2">
              {moreFonts.map((font) => (
                <FontCard
                  key={font.id}
                  font={font}
                  selected={value === font.id}
                  onClick={() => {
                    onChange(font.id);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
