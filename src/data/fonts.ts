export interface CaptionFont {
  id: string;
  label: string;
  cssVariable: string;
}

export const CAPTION_FONTS: CaptionFont[] = [
  { id: "caveat", label: "Caveat", cssVariable: "--font-caveat" },
  { id: "kalam", label: "Kalam", cssVariable: "--font-kalam" },
  { id: "pacifico", label: "Pacifico", cssVariable: "--font-pacifico" },
  { id: "dancing-script", label: "Dancing Script", cssVariable: "--font-dancing-script" },
  { id: "great-vibes", label: "Great Vibes", cssVariable: "--font-great-vibes" },
  { id: "satisfy", label: "Satisfy", cssVariable: "--font-satisfy" },
  { id: "permanent-marker", label: "Permanent Marker", cssVariable: "--font-permanent-marker" },
  { id: "indie-flower", label: "Indie Flower", cssVariable: "--font-indie-flower" },
  { id: "shadows-into-light", label: "Shadows Into Light", cssVariable: "--font-shadows-into-light" },
  { id: "amatic-sc", label: "Amatic SC", cssVariable: "--font-amatic-sc" },
  { id: "sacramento", label: "Sacramento", cssVariable: "--font-sacramento" },
  { id: "homemade-apple", label: "Homemade Apple", cssVariable: "--font-homemade-apple" },
];

export const DEFAULT_FONT_ID = "caveat";

export function getCaptionFont(id: string): CaptionFont {
  return CAPTION_FONTS.find((font) => font.id === id) ?? CAPTION_FONTS[0];
}
