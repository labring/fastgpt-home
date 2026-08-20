import Category from '@/customers/models/Category';
import { withMongoRetry } from '@/customers/lib/db';
import { isValidObjectId } from '@/customers/lib/object-id';

export function normalizeCategorySlug(value: string) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function isValidCategorySlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export async function isCategorySlugAvailable(slug: string, options: { excludeId?: string } = {}) {
  const existingCategory = await Category.exists({
    slug,
    ...(options.excludeId && isValidObjectId(options.excludeId)
      ? { _id: { $ne: options.excludeId } }
      : {})
  });

  return !existingCategory;
}

// 回填是历史数据的一次性迁移，却挂在所有公开读热路径上：
// 进程内节流（5 分钟窗口只查一次），避免每次列表/详情/分类请求都空查一遍。
let slugBackfillDone = false;
let slugBackfillAt = 0;
const SLUG_BACKFILL_INTERVAL_MS = 5 * 60 * 1000;

export async function ensureCategorySlugs() {
  const now = Date.now();
  if (slugBackfillDone && now - slugBackfillAt < SLUG_BACKFILL_INTERVAL_MS) {
    return;
  }

  await withMongoRetry(async () => {
    const categories = await Category.find({
      $or: [
        { slug: { $exists: false } },
        { slug: null },
        { slug: '' }
      ]
    }).sort({ createdAt: 1 });

    let fallbackIndex = 1;

    for (const category of categories) {
      let slug = `industry-${fallbackIndex}`;

      while (!(await isCategorySlugAvailable(slug, { excludeId: category._id.toString() }))) {
        fallbackIndex += 1;
        slug = `industry-${fallbackIndex}`;
      }

      category.slug = slug;
      await category.save();
      fallbackIndex += 1;
    }
  });

  slugBackfillDone = true;
  slugBackfillAt = Date.now();
}
