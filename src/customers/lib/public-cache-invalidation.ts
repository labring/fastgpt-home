import { revalidatePath } from 'next/cache';
import dbConnect from '@/customers/lib/db';
import { isValidObjectId } from '@/customers/lib/object-id';
import Customer from '@/customers/models/Customer';

export type CustomerRevalidationRef = {
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

type CustomerRevalidationRow = {
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

function getCategorySlugFromCustomer(customer: CustomerRevalidationRow) {
  const categoryId = customer.categoryId;
  if (typeof categoryId === 'object' && categoryId !== null && 'slug' in categoryId) {
    return normalizeNonEmptyString(categoryId.slug);
  }

  return normalizeNonEmptyString(customer.categorySlug);
}

export function revalidatePublicIndexes() {
  // 说明：这些索引路由目前都是 force-dynamic（首页含访客态、sitemap/llms 依赖 DB），
  // revalidatePath 对它们暂不生效；保留此入口是为了未来它们切换为 ISR 时能直接失效。
  // 真正吃到 revalidate 的是 ISR 详情页，见 revalidateCustomerRefs。
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

export function revalidateCustomerRefs(refs: CustomerRevalidationRef | CustomerRevalidationRef[] = []) {
  const refList = Array.isArray(refs) ? refs : [refs];

  revalidatePublicIndexes();
  for (const ref of refList) {
    const id = normalizeNonEmptyString(ref.id);
    if (!id) {
      continue;
    }

    revalidatePath(`/customers/customer/${id}`);
    revalidatePath(`/customers/customer/${id}/markdown`);

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

export async function loadCustomerRevalidationRefs(ids: string[]) {
  const validIds = [...new Set(ids.map((id) => id.trim()).filter(isValidObjectId))];
  if (validIds.length === 0) {
    return [] satisfies CustomerRevalidationRef[];
  }

  await dbConnect();
  const customers = await Customer.find({
    _id: { $in: validIds },
    deletedAt: { $exists: true },
  })
    .select('_id categoryId slug')
    .populate('categoryId', 'slug')
    .lean<CustomerRevalidationRow[]>();

  return customers.map((customer) => ({
    id: String(customer._id),
    categorySlug: getCategorySlugFromCustomer(customer),
    slug: normalizeNonEmptyString(customer.slug),
  }));
}

export async function loadCustomerRevalidationRefsByCategoryId(categoryId: string) {
  if (!isValidObjectId(categoryId)) {
    return [] satisfies CustomerRevalidationRef[];
  }

  await dbConnect();
  const customers = await Customer.find({
    categoryId,
    deletedAt: null,
  })
    .select('_id categoryId slug')
    .populate('categoryId', 'slug')
    .lean<CustomerRevalidationRow[]>();

  return customers.map((customer) => ({
    id: String(customer._id),
    categorySlug: getCategorySlugFromCustomer(customer),
    slug: normalizeNonEmptyString(customer.slug),
  }));
}
