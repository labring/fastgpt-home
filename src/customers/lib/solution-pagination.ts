export const PUBLIC_SOLUTIONS_PAGE_SIZE = 15;
export const PUBLIC_SOLUTIONS_MAX_PAGE_SIZE = 60;

export const PUBLIC_SOLUTION_SORT_KEYS = ['usage', 'likes', 'time'] as const;

export type PublicSolutionSortKey = (typeof PUBLIC_SOLUTION_SORT_KEYS)[number];

export const DEFAULT_PUBLIC_SOLUTION_SORT_KEY: PublicSolutionSortKey = 'usage';

export function isPublicSolutionSortKey(value: string | null): value is PublicSolutionSortKey {
  return PUBLIC_SOLUTION_SORT_KEYS.includes(value as PublicSolutionSortKey);
}

export function normalizePositiveInteger(
  value: string | number | null | undefined,
  fallback: number,
  max = Number.MAX_SAFE_INTEGER
) {
  const parsed = typeof value === 'number' ? value : Number.parseInt(value || '', 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(Math.trunc(parsed), max);
}
