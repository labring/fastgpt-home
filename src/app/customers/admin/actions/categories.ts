'use server';

import dbConnect from '@/customers/lib/db';
import Category from '@/customers/models/Category';
import Customer from '@/customers/models/Customer';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import {
  loadCustomerRevalidationRefsByCategoryId,
  revalidateCategoryRefs,
  revalidateCustomerRefs,
  type CategoryRevalidationRef
} from '@/customers/lib/public-cache-invalidation';
import {
  getAutoCategoryColor,
  getRandomCategoryColor,
  normalizeHexColor
} from '@/customers/lib/category-color';
import {
  ensureCategorySlugs,
  isCategorySlugAvailable,
  isValidCategorySlug,
  normalizeCategorySlug
} from '@/customers/lib/category-slug';
import { requireAdminSession } from '@/customers/lib/admin-auth';
import { isValidObjectId } from '@/customers/lib/object-id';

function revalidateCategoryViews(refs: CategoryRevalidationRef | CategoryRevalidationRef[] = []) {
  revalidateAdminRouteTree();
  revalidateCategoryRefs(refs);
}

async function ensureAdminAction() {
  if (!(await requireAdminSession())) {
    return { success: false as const, error: '请先登录后台' };
  }

  return null;
}

export async function getAdminCategories() {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    await ensureCategorySlugs();
    const categories = await Category.find()
      .sort({ order: 1, createdAt: -1 })
      .lean() as Array<{
      _id: { toString(): string };
      name: string;
      slug: string;
      order: number;
      isActive: boolean;
      color?: string | null;
    }>;

    return {
      success: true,
      data: categories.map((category) => ({
        _id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        order: category.order,
        isActive: category.isActive,
        color: normalizeHexColor(category.color, getAutoCategoryColor(category.name))
      }))
    };
  } catch (error) {
    console.error('Failed to get categories:', error);
    return { success: false, error: '获取分类失败' };
  }
}

export async function toggleCategoryStatus(id: string, isActive: boolean) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  if (!isValidObjectId(id)) {
    return { success: false, error: '分类不存在' };
  }

  await dbConnect();
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { isActive },
      { returnDocument: 'after' }
    ).select('slug');
    if (!category) {
      return { success: false, error: '分类不存在' };
    }

    // 如果是禁用操作，检查受影响的解决方案数量（仅做记录或预警用）
    if (!isActive) {
      const affected = await Customer.countDocuments({ categoryId: id, deletedAt: null });
      console.log(`Disabled category ${id}, affected customers: ${affected}`);
    }

    revalidateCategoryViews({ slug: category.slug });
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle category:', error);
    return { success: false, error: '状态切换失败' };
  }
}

export async function saveCategory(data: { id?: string; name: string; slug: string; order: number; color: string }) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    const formattedName = data.name.trim();
    const slug = normalizeCategorySlug(data.slug);

    if (!formattedName) {
      return { success: false, error: '分类名称不能为空' };
    }

    if (!slug) {
      return { success: false, error: '分类 Slug 不能为空' };
    }

    if (!isValidCategorySlug(slug)) {
      return { success: false, error: '分类 Slug 只能包含小写字母、数字和连字符' };
    }

    if (data.id && !isValidObjectId(data.id)) {
      return { success: false, error: '分类不存在' };
    }

    if (!(await isCategorySlugAvailable(slug, { excludeId: data.id }))) {
      return { success: false, error: '该分类 Slug 已存在，请更换' };
    }

    // 检查 name 唯一性
    const query: Record<string, unknown> = { name: formattedName };
    if (data.id) {
      query._id = { $ne: data.id };
    }
    const exist = await Category.findOne(query);
    if (exist) {
      return { success: false, error: '该分类名称已存在，请更换' };
    }

    if (data.id) {
      const formattedColor = normalizeHexColor(
        data.color,
        getAutoCategoryColor(formattedName)
      );
      const oldCat = await Category.findById(data.id);
      const oldSlug = oldCat?.slug;
      const customerRefs = oldSlug && oldSlug !== slug
        ? await loadCustomerRevalidationRefsByCategoryId(data.id)
        : [];
      await Category.findByIdAndUpdate(data.id, {
        name: formattedName,
        slug,
        order: data.order,
        color: formattedColor
      });

      // 如果 name 改变，同步更新所有关联的解决方案
      if (oldCat && oldCat.name !== formattedName) {
        await Customer.updateMany(
          { categoryId: data.id },
          { $set: { categoryName: formattedName } }
        );
      }
      revalidateCategoryViews({ slug, previousSlug: oldSlug });
      if (customerRefs.length > 0) {
        revalidateCustomerRefs(customerRefs.map((ref) => ({
          id: ref.id,
          categorySlug: slug,
          previousCategorySlug: oldSlug
        })));
      }
    } else {
      const formattedColor = normalizeHexColor(
        data.color,
        getRandomCategoryColor()
      );
      await Category.create({
        name: formattedName,
        slug,
        order: data.order,
        color: formattedColor,
        isActive: true
      });
      revalidateCategoryViews({ slug });
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to save category:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '保存失败'
    };
  }
}

export async function deleteCategory(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  if (!isValidObjectId(id)) {
    return { success: false, error: '分类不存在' };
  }

  await dbConnect();
  try {
    const category = await Category.findById(id).select('slug');
    if (!category) {
      return { success: false, error: '分类不存在' };
    }

    const hasCustomers = await Customer.exists({ categoryId: id, deletedAt: null });
    if (hasCustomers) {
      return { success: false, error: '该分类下存在解决方案，无法直接删除。请先转移或删除相关方案。' };
    }

    await Category.findByIdAndDelete(id);
    revalidateCategoryViews({ previousSlug: category.slug });
    return { success: true };
  } catch (error) {
    console.error('Failed to delete category:', error);
    return { success: false, error: '删除失败' };
  }
}

export async function updateCategoryOrders(orders: { id: string; order: number }[]) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    if (orders.some(({ id }) => !isValidObjectId(id))) {
      return { success: false, error: '排序数据包含无效分类 ID' };
    }

    // 使用 bulkWrite 批量更新顺序
    const ops = orders.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order } }
      }
    }));
    await Category.bulkWrite(ops);

    revalidateCategoryViews();
    return { success: true };
  } catch (error) {
    console.error('Failed to update orders:', error);
    return { success: false, error: '更新排序失败' };
  }
}
