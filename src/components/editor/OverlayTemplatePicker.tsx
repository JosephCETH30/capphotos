"use client";

import { cn } from "@/lib/utils";
import type { OverlayTemplateId } from "@/lib/canvas/compose";
import { OVERLAY_TEMPLATE_OPTIONS } from "@/data/overlay-templates";

interface OverlayTemplatePickerProps {
  value: OverlayTemplateId;
  onChange: (id: OverlayTemplateId) => void;
}

function TemplatePreview({ id }: { id: OverlayTemplateId }) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3px] bg-gradient-to-br from-slate-400 to-slate-600">
      {id === "classic" && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute inset-x-[15%] bottom-[22%] h-[10%] rounded-[1px] bg-white/90" />
          <div className="absolute inset-x-[25%] bottom-[12%] h-[7%] rounded-[1px] bg-white/60" />
        </>
      )}
      {id === "split" && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-[15%] left-[10%] h-[10%] w-[38%] rounded-[1px] bg-white/90" />
          <div className="absolute right-[10%] bottom-[15%] h-[7%] w-[22%] rounded-[1px] bg-white/60" />
        </>
      )}
      {id === "center" && (
        <>
          <div className="absolute inset-x-0 top-[38%] h-[24%] bg-black/25" />
          <div className="absolute inset-x-[18%] top-[42%] h-[9%] rounded-[1px] bg-white/70" />
          <div className="absolute inset-x-[28%] top-[54%] h-[7%] rounded-[1px] bg-white/50" />
          <div className="absolute right-[10%] bottom-[10%] h-[6%] w-[24%] rounded-[1px] bg-white/60" />
        </>
      )}
      {id === "minimal" && (
        <>
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/45 to-transparent" />
          <div className="absolute top-[10%] left-[10%] h-[8%] w-[40%] rounded-[1px] bg-white/90" />
          <div className="absolute right-[10%] bottom-[10%] h-[9%] w-[30%] rounded-full bg-black/45" />
        </>
      )}
    </div>
  );
}

export function OverlayTemplatePicker({ value, onChange }: OverlayTemplatePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {OVERLAY_TEMPLATE_OPTIONS.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={selected}
            className={cn(
              "cursor-pointer rounded-lg border p-1.5 text-left transition-colors",
              selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted/60"
            )}
          >
            <TemplatePreview id={option.id} />
            <p className="mt-1 text-center text-xs font-medium">{option.label}</p>
          </button>
        );
      })}
    </div>
  );
}
