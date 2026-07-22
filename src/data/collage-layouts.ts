export interface CollageCell {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CollageLayoutOption {
  id: string;
  label: string;
  cells: CollageCell[];
}

const GAP = 0.015;
const HALF = (1 - GAP) / 2;
const THIRD = (1 - 2 * GAP) / 3;
const BIG = 0.6;
const SMALL = 1 - GAP - BIG;
const SMALL_THIRD = (1 - 2 * GAP) / 3;

export const COLLAGE_LAYOUTS: Record<number, CollageLayoutOption[]> = {
  2: [
    {
      id: "side-by-side",
      label: "Side by side",
      cells: [
        { x: 0, y: 0, w: HALF, h: 1 },
        { x: HALF + GAP, y: 0, w: HALF, h: 1 },
      ],
    },
    {
      id: "stacked",
      label: "Stacked",
      cells: [
        { x: 0, y: 0, w: 1, h: HALF },
        { x: 0, y: HALF + GAP, w: 1, h: HALF },
      ],
    },
  ],
  3: [
    {
      id: "big-left",
      label: "Big left",
      cells: [
        { x: 0, y: 0, w: HALF, h: 1 },
        { x: HALF + GAP, y: 0, w: HALF, h: HALF },
        { x: HALF + GAP, y: HALF + GAP, w: HALF, h: HALF },
      ],
    },
    {
      id: "big-top",
      label: "Big top",
      cells: [
        { x: 0, y: 0, w: 1, h: HALF },
        { x: 0, y: HALF + GAP, w: HALF, h: HALF },
        { x: HALF + GAP, y: HALF + GAP, w: HALF, h: HALF },
      ],
    },
    {
      id: "even-thirds",
      label: "Even thirds",
      cells: [
        { x: 0, y: 0, w: THIRD, h: 1 },
        { x: THIRD + GAP, y: 0, w: THIRD, h: 1 },
        { x: 2 * (THIRD + GAP), y: 0, w: THIRD, h: 1 },
      ],
    },
  ],
  4: [
    {
      id: "grid",
      label: "Grid",
      cells: [
        { x: 0, y: 0, w: HALF, h: HALF },
        { x: HALF + GAP, y: 0, w: HALF, h: HALF },
        { x: 0, y: HALF + GAP, w: HALF, h: HALF },
        { x: HALF + GAP, y: HALF + GAP, w: HALF, h: HALF },
      ],
    },
    {
      id: "feature-top",
      label: "Feature + 3",
      cells: [
        { x: 0, y: 0, w: 1, h: BIG },
        { x: 0, y: BIG + GAP, w: SMALL_THIRD, h: SMALL },
        { x: SMALL_THIRD + GAP, y: BIG + GAP, w: SMALL_THIRD, h: SMALL },
        { x: 2 * (SMALL_THIRD + GAP), y: BIG + GAP, w: SMALL_THIRD, h: SMALL },
      ],
    },
    {
      id: "sidebar",
      label: "Sidebar",
      cells: [
        { x: 0, y: 0, w: BIG, h: 1 },
        { x: BIG + GAP, y: 0, w: SMALL, h: SMALL_THIRD },
        { x: BIG + GAP, y: SMALL_THIRD + GAP, w: SMALL, h: SMALL_THIRD },
        { x: BIG + GAP, y: 2 * (SMALL_THIRD + GAP), w: SMALL, h: SMALL_THIRD },
      ],
    },
  ],
};

export const DEFAULT_LAYOUT_ID: Record<number, string> = {
  2: "side-by-side",
  3: "big-left",
  4: "grid",
};

export function getCollageLayoutOptions(photoCount: number): CollageLayoutOption[] {
  return COLLAGE_LAYOUTS[photoCount] ?? [];
}

export function getCollageLayoutCells(photoCount: number, layoutId: string): CollageCell[] {
  const options = getCollageLayoutOptions(photoCount);
  const match = options.find((option) => option.id === layoutId);
  return (match ?? options[0])?.cells ?? [];
}

/** Width / height of the collage artwork area, independent of the individual photos' own aspect ratios. */
export const COLLAGE_ASPECT_RATIO = 4 / 5;

export const MIN_COLLAGE_PHOTOS = 2;
export const MAX_COLLAGE_PHOTOS = 4;
