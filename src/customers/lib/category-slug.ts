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

export async function ensureCategorySlugs() {
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
}
