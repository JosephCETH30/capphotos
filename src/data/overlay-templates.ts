import type { OverlayTemplateId } from "@/lib/canvas/compose";

export interface OverlayTemplateOption {
  id: OverlayTemplateId;
  label: string;
  description: string;
}

export const OVERLAY_TEMPLATE_OPTIONS: OverlayTemplateOption[] = [
  { id: "classic", label: "Classic", description: "Caption + camera centered at the bottom" },
  { id: "split", label: "Split", description: "Caption bottom-left, camera bottom-right" },
  { id: "center", label: "Center", description: "Caption centered, low opacity" },
  { id: "minimal", label: "Minimal", description: "Small caption top, camera tag bottom-right" },
];
