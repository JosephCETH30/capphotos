"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CAPTION_MAX_LENGTH } from "@/lib/validation";

interface CaptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CaptionInput({ value, onChange }: CaptionInputProps) {
  const remaining = CAPTION_MAX_LENGTH - value.length;

  return (
    <div className="grid gap-1.5">
      <Label htmlFor="caption">Caption</Label>
      <Textarea
        id="caption"
        placeholder="Golden hour on the coast…"
        value={value}
        maxLength={CAPTION_MAX_LENGTH}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="resize-none"
      />
      <p className={cn("text-right text-xs text-muted-foreground", remaining <= 10 && "text-destructive")}>
        {remaining} characters left
      </p>
    </div>
  );
}
