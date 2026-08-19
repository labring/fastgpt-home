import Solution from '@/customers/models/Solution';
import { isValidObjectId } from '@/customers/lib/object-id';

export function normalizeSolutionSlug(value: string) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function isValidSolutionSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export async function isSolutionSlugAvailable(
  slug: string,
  options: { excludeId?: string } = {}
) {
  const normalizedSlug = normalizeSolutionSlug(slug);
  if (!normalizedSlug) {
    return false;
  }

  const existingSolution = await Solution.exists({
    slug: normalizedSlug,
    ...(options.excludeId && isValidObjectId(options.excludeId)
      ? { _id: { $ne: options.excludeId } }
      : {})
  });

  return !existingSolution;
}
