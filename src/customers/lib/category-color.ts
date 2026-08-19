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

function getRandomPaletteIndex(max: number) {
  if (max <= 1) {
    return 0;
  }

  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const randomValues = new Uint32Array(1);
    globalThis.crypto.getRandomValues(randomValues);
    return randomValues[0] % max;
  }

  return Math.floor(Math.random() * max);
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

export function getRandomCategoryColor(excludeColor?: string | null) {
  const normalizedExcludedColor = excludeColor
    ? normalizeHexColor(excludeColor, DEFAULT_CATEGORY_COLOR)
    : null;
  const availableColors = normalizedExcludedColor
    ? CATEGORY_COLOR_PALETTE.filter((color) => color !== normalizedExcludedColor)
    : CATEGORY_COLOR_PALETTE;

  if (availableColors.length === 0) {
    return DEFAULT_CATEGORY_COLOR;
  }

  return availableColors[getRandomPaletteIndex(availableColors.length)];
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
