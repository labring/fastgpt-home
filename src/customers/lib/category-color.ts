export const DEFAULT_CATEGORY_COLOR = '#2563EB';

const CATEGORY_COLOR_PALETTE = [
  '#2563EB',
  '#7C3AED',
  '#059669',
  '#EA580C',
  '#DC2626',
  '#0891B2',
  '#CA8A04',
  '#DB2777'
];

const HEX_COLOR_PATTERN = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

function expandShortHexColor(color: string) {
  if (color.length !== 4) {
    return color.toUpperCase();
  }

  const [, r, g, b] = color;
  return `#${r}${r}${g}${g}${b}${b}`.toUpperCase();
}

export function getAutoCategoryColor(seed: string) {
  const safeSeed = seed.trim() || 'default';
  let hash = 0;

  for (let index = 0; index < safeSeed.length; index += 1) {
    hash = (hash << 5) - hash + safeSeed.charCodeAt(index);
    hash |= 0;
  }

  return CATEGORY_COLOR_PALETTE[Math.abs(hash) % CATEGORY_COLOR_PALETTE.length];
}

export function normalizeHexColor(color?: string | null, fallback = DEFAULT_CATEGORY_COLOR) {
  const value = color?.trim();

  if (!value || !HEX_COLOR_PATTERN.test(value)) {
    return fallback;
  }

  return expandShortHexColor(value);
}

export function hexToRgba(color: string, alpha: number) {
  const normalizedColor = normalizeHexColor(color);
  const hex = normalizedColor.slice(1);
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
