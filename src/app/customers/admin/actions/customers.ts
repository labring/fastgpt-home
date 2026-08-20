'use server';

import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { SystemConfig } from '@/customers/models/SystemConfig';
import { DEFAULT_AI_PROMPT } from '@/customers/lib/constants';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { revalidateCustomerRefs } from '@/customers/lib/public-cache-invalidation';
import {
  getErrorMessage,
  normalizeAdminCustomerListItems
} from '@/customers/lib/admin-customer-utils';
import { requireAdminSession } from '@/customers/lib/admin-auth';
import { isValidObjectId } from '@/customers/lib/object-id';
import {
  emptyTrash as emptyTrashCustomers,
  getTrashedCustomers as getTrashedCustomersData,
  moveCustomerToTrash as moveCustomerToTrashRecord,
  permanentlyDeleteCustomerFromTrash,
  restoreCustomerFromTrash as restoreCustomerFromTrashRecord
} from '@/customers/lib/customer-trash';
import {
  createSkeletonCustomerForAgent,
  saveCustomerForAgent,
  type SaveCustomerInput
} from '@/customers/lib/customer-admin-service';
import type { AdminCustomerListData } from '@/customers/components/admin/customer-list/types';

function revalidateCustomerViews(customerId?: string, categorySlug?: string, slug?: string) {
  revalidateAdminRouteTree();
  revalidateCustomerRefs(customerId ? { id: customerId, slug, categorySlug } : []);
}

interface AdminCustomersQuery {
  deletedAt: null;
  $text?: {
    $search: string;
  };
}

async function ensureAdminAction() {
  if (!(await requireAdminSession())) {
    return { success: false as const, error: '请先登录后台' };
  }

  return null;
}

export async function getAdminCustomers(search = '') {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    const query: AdminCustomersQuery = { deletedAt: null };
    if (search) {
      query.$text = { $search: search };
    }

    const customers = await Customer.find(query)
      .select('-content -mediaUrls') // 后台列表页不需要加载庞大的正文和媒体链接列表，极大优化内存和网络传输
      // 注意：由于我们在 Schema 中定义了 select: false 保护某些字段不被默认返回，
      // 但其实 helpfulCount 是普通字段，不过最好还是显式加上以防万一。
      // lean() 会返回所有数据库中存在的非 select:false 的字段。
      .populate('categoryId', 'name slug color')
      .sort(search ? { score: { $meta: 'textScore' } } : { updatedAt: -1, createdAt: -1 })
      .limit(1000) // 取消分页，获取全量数据（设置一个合理的安全上限）
      .lean();

    const serializedCustomers = JSON.parse(JSON.stringify(customers));

    return {
      success: true,
      data: {
        items: normalizeAdminCustomerListItems(serializedCustomers) as AdminCustomerListData['items'],
        total: customers.length
      }
    };
  } catch (error) {
    console.error('Failed to get customers:', error);
    return { success: false, error: '获取数据失败' };
  }
}

export async function toggleCustomerPublish(id: string, isPublished: boolean) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  if (!isValidObjectId(id)) {
    return { success: false, error: '案例不存在' };
  }

  await dbConnect();
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { isPublished },
      { returnDocument: 'after' }
    ).populate('categoryId', 'slug');
    const category = updatedCustomer?.categoryId as { slug?: string } | null | undefined;

    revalidateCustomerViews(id, category?.slug, updatedCustomer?.slug);
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle publish:', error);
    return { success: false, error: '状态切换失败' };
  }
}

export async function getTrashedCustomers(search = '') {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    const data = await getTrashedCustomersData(search);
    return { success: true as const, data: data as AdminCustomerListData };
  } catch (error) {
    console.error('Failed to get trashed customers:', error);
    return { success: false as const, error: '获取回收站数据失败' };
  }
}

export async function moveCustomerToTrash(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    return await moveCustomerToTrashRecord(id, 'admin');
  } catch (error) {
    console.error('Failed to move customer to trash:', error);
    return { success: false as const, error: '移入回收站失败' };
  }
}

export async function restoreCustomerFromTrash(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    return await restoreCustomerFromTrashRecord(id);
  } catch (error) {
    console.error('Failed to restore customer from trash:', error);
    return { success: false as const, error: '恢复失败' };
  }
}

export async function deleteCustomerFromTrash(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    return await permanentlyDeleteCustomerFromTrash(id);
  } catch (error) {
    console.error('Failed to permanently delete customer from trash:', error);
    return { success: false as const, error: '彻底删除失败' };
  }
}

export async function clearTrash() {
  const authError = await ensureAdminAction();
  if (authError) return { ...authError, deletedCount: 0, failedIds: [] };

  try {
    return await emptyTrashCustomers();
  } catch (error) {
    console.error('Failed to clear trash:', error);
    return { success: false as const, error: '清空回收站失败', deletedCount: 0, failedIds: [] };
  }
}

export async function getCustomerById(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    const query = isValidObjectId(id)
      ? { _id: id }
      : { slug: id, deletedAt: null };

    const customer = await Customer.findOne(query)
      .populate('categoryId', 'slug')
      .lean();
    const serializedCustomer = JSON.parse(JSON.stringify(customer));
    const category =
      serializedCustomer?.categoryId && typeof serializedCustomer.categoryId === 'object'
        ? serializedCustomer.categoryId
        : null;

    return {
      success: true,
      data: serializedCustomer
        ? {
            ...serializedCustomer,
            categoryId: category?._id || serializedCustomer.categoryId,
            categorySlug: serializedCustomer.categorySlug || category?.slug
          }
        : serializedCustomer
    };
  } catch (error) {
    console.error('Failed to get customer:', error);
    return { success: false, error: '获取数据失败' };
  }
}

export async function createSkeletonCustomer() {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  return createSkeletonCustomerForAgent();
}

export async function saveCustomer(data: SaveCustomerInput) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  return saveCustomerForAgent(data);
}

export async function getAiSystemPrompt() {
  const authError = await ensureAdminAction();
  if (authError) return DEFAULT_AI_PROMPT;

  try {
    await dbConnect();
    let config = await SystemConfig.findOne({ key: 'ai_system_prompt' });

    // 自动将默认值写入数据库（如果不小心被清空，或初次运行）
    if (!config) {
      config = await SystemConfig.create({
        key: 'ai_system_prompt',
        value: DEFAULT_AI_PROMPT
      });
    }

    return config.value;
  } catch (error) {
    console.error('Failed to get system prompt:', error);
    return DEFAULT_AI_PROMPT;
  }
}

export async function saveAiSystemPrompt(prompt: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    await dbConnect();
    await SystemConfig.findOneAndUpdate(
      { key: 'ai_system_prompt' },
      { value: prompt },
      { upsert: true, returnDocument: 'after' }
    );
    return { success: true };
  } catch (error: unknown) {
    console.error('Failed to save system prompt:', error);
    return { success: false, error: getErrorMessage(error, '保存失败') };
  }
}
