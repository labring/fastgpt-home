export const PUBLIC_CUSTOMERS_PAGE_SIZE = 15;
export const PUBLIC_CUSTOMERS_MAX_PAGE_SIZE = 60;

export const PUBLIC_CUSTOMER_SORT_KEYS = ['usage', 'likes', 'time'] as const;

export type PublicCustomerSortKey = (typeof PUBLIC_CUSTOMER_SORT_KEYS)[number];

export const DEFAULT_PUBLIC_CUSTOMER_SORT_KEY: PublicCustomerSortKey = 'usage';

export function isPublicCustomerSortKey(value: string | null): value is PublicCustomerSortKey {
  return PUBLIC_CUSTOMER_SORT_KEYS.includes(value as PublicCustomerSortKey);
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
