import { revalidatePath } from 'next/cache';
import dbConnect from '@/customers/lib/db';
import { isValidObjectId } from '@/customers/lib/object-id';
import Solution from '@/customers/models/Solution';

export type SolutionRevalidationRef = {
  id: string;
  slug?: string | null;
  categorySlug?: string | null;
  previousCategorySlug?: string | null;
};

export type CategoryRevalidationRef = {
  slug?: string | null;
  previousSlug?: string | null;
};

type PopulatedCategoryRef = {
  slug?: string | null;
};

type SolutionRevalidationRow = {
  _id: unknown;
  categoryId?: unknown | PopulatedCategoryRef | null;
  categorySlug?: string | null;
  slug?: string | null;
};

const PUBLIC_INDEX_PATHS = [
  '/customers',
  '/customers/categories',
  '/customers/sitemap.xml',
  '/customers/llms.txt',
  '/customers/llms-full.txt',
] as const;

function normalizeNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function uniqueStrings(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function getCategorySlugFromSolution(solution: SolutionRevalidationRow) {
  const categoryId = solution.categoryId;
  if (typeof categoryId === 'object' && categoryId !== null && 'slug' in categoryId) {
    return normalizeNonEmptyString(categoryId.slug);
  }

  return normalizeNonEmptyString(solution.categorySlug);
}

export function revalidatePublicIndexes() {
  for (const path of PUBLIC_INDEX_PATHS) {
    revalidatePath(path);
  }
}

export function revalidateCategoryRefs(refs: CategoryRevalidationRef | CategoryRevalidationRef[] = []) {
  const refList = Array.isArray(refs) ? refs : [refs];
  const slugs = uniqueStrings(
    refList.flatMap((ref) => [
      normalizeNonEmptyString(ref.slug),
      normalizeNonEmptyString(ref.previousSlug),
    ])
  );

  revalidatePublicIndexes();
  for (const slug of slugs) {
    revalidatePath(`/customers/categories/${slug}`);
  }
}

export function revalidateSolutionRefs(refs: SolutionRevalidationRef | SolutionRevalidationRef[] = []) {
  const refList = Array.isArray(refs) ? refs : [refs];

  revalidatePublicIndexes();
  for (const ref of refList) {
    const id = normalizeNonEmptyString(ref.id);
    if (!id) {
      continue;
    }

    revalidatePath(`/customers/solution/${id}`);
    revalidatePath(`/customers/solution/${id}/markdown`);

    // 语义 URL 用内容 slug（不是 ObjectId）；slug 缺失时回退到 id，保持向后兼容
    const contentKey = normalizeNonEmptyString(ref.slug) || id;
    const categorySlugs = uniqueStrings([
      normalizeNonEmptyString(ref.categorySlug),
      normalizeNonEmptyString(ref.previousCategorySlug),
    ]);
    for (const slug of categorySlugs) {
      revalidatePath(`/customers/${slug}/${contentKey}`);
      revalidatePath(`/customers/categories/${slug}`);
    }
  }
}

export async function loadSolutionRevalidationRefs(ids: string[]) {
  const validIds = [...new Set(ids.map((id) => id.trim()).filter(isValidObjectId))];
  if (validIds.length === 0) {
    return [] satisfies SolutionRevalidationRef[];
  }

  await dbConnect();
  const solutions = await Solution.find({
    _id: { $in: validIds },
    deletedAt: { $exists: true },
  })
    .select('_id categoryId slug')
    .populate('categoryId', 'slug')
    .lean<SolutionRevalidationRow[]>();

  return solutions.map((solution) => ({
    id: String(solution._id),
    categorySlug: getCategorySlugFromSolution(solution),
    slug: normalizeNonEmptyString(solution.slug),
  }));
}

export async function loadSolutionRevalidationRefsByCategoryId(categoryId: string) {
  if (!isValidObjectId(categoryId)) {
    return [] satisfies SolutionRevalidationRef[];
  }

  await dbConnect();
  const solutions = await Solution.find({
    categoryId,
    deletedAt: null,
  })
    .select('_id categoryId slug')
    .populate('categoryId', 'slug')
    .lean<SolutionRevalidationRow[]>();

  return solutions.map((solution) => ({
    id: String(solution._id),
    categorySlug: getCategorySlugFromSolution(solution),
    slug: normalizeNonEmptyString(solution.slug),
  }));
}
