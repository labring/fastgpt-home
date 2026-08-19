'use server';

import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import { SystemConfig } from '@/customers/models/SystemConfig';
import { DEFAULT_AI_PROMPT } from '@/customers/lib/constants';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import { revalidateSolutionRefs } from '@/customers/lib/public-cache-invalidation';
import {
  getErrorMessage,
  normalizeAdminSolutionListItems
} from '@/customers/lib/admin-solution-utils';
import { requireAdminSession } from '@/customers/lib/admin-auth';
import { isValidObjectId } from '@/customers/lib/object-id';
import {
  emptyTrash as emptyTrashSolutions,
  getTrashedSolutions as getTrashedSolutionsData,
  moveSolutionToTrash as moveSolutionToTrashRecord,
  permanentlyDeleteSolutionFromTrash,
  restoreSolutionFromTrash as restoreSolutionFromTrashRecord
} from '@/customers/lib/solution-trash';
import {
  createSkeletonSolutionForAgent,
  saveSolutionForAgent,
  type SaveSolutionInput
} from '@/customers/lib/solution-admin-service';
import type { AdminSolutionListData } from '@/customers/components/admin/solution-list/types';

function revalidateSolutionViews(solutionId?: string, categorySlug?: string, slug?: string) {
  revalidateAdminRouteTree();
  revalidateSolutionRefs(solutionId ? { id: solutionId, slug, categorySlug } : []);
}

interface AdminSolutionsQuery {
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

export async function getAdminSolutions(search = '') {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    const query: AdminSolutionsQuery = { deletedAt: null };
    if (search) {
      query.$text = { $search: search };
    }

    const solutions = await Solution.find(query)
      .select('-content -mediaUrls') // 后台列表页不需要加载庞大的正文和媒体链接列表，极大优化内存和网络传输
      // 注意：由于我们在 Schema 中定义了 select: false 保护某些字段不被默认返回，
      // 但其实 helpfulCount 是普通字段，不过最好还是显式加上以防万一。
      // lean() 会返回所有数据库中存在的非 select:false 的字段。
      .populate('categoryId', 'name slug color')
      .sort(search ? { score: { $meta: 'textScore' } } : { updatedAt: -1, createdAt: -1 })
      .limit(1000) // 取消分页，获取全量数据（设置一个合理的安全上限）
      .lean();

    const serializedSolutions = JSON.parse(JSON.stringify(solutions));

    return {
      success: true,
      data: {
        items: normalizeAdminSolutionListItems(serializedSolutions) as AdminSolutionListData['items'],
        total: solutions.length
      }
    };
  } catch (error) {
    console.error('Failed to get solutions:', error);
    return { success: false, error: '获取数据失败' };
  }
}

export async function toggleSolutionPublish(id: string, isPublished: boolean) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  if (!isValidObjectId(id)) {
    return { success: false, error: '案例不存在' };
  }

  await dbConnect();
  try {
    const updatedSolution = await Solution.findByIdAndUpdate(
      id,
      { isPublished },
      { returnDocument: 'after' }
    ).populate('categoryId', 'slug');
    const category = updatedSolution?.categoryId as { slug?: string } | null | undefined;

    revalidateSolutionViews(id, category?.slug, updatedSolution?.slug);
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle publish:', error);
    return { success: false, error: '状态切换失败' };
  }
}

export async function getTrashedSolutions(search = '') {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    const data = await getTrashedSolutionsData(search);
    return { success: true as const, data: data as AdminSolutionListData };
  } catch (error) {
    console.error('Failed to get trashed solutions:', error);
    return { success: false as const, error: '获取回收站数据失败' };
  }
}

export async function moveSolutionToTrash(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    return await moveSolutionToTrashRecord(id, 'admin');
  } catch (error) {
    console.error('Failed to move solution to trash:', error);
    return { success: false as const, error: '移入回收站失败' };
  }
}

export async function restoreSolutionFromTrash(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    return await restoreSolutionFromTrashRecord(id);
  } catch (error) {
    console.error('Failed to restore solution from trash:', error);
    return { success: false as const, error: '恢复失败' };
  }
}

export async function deleteSolutionFromTrash(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  try {
    return await permanentlyDeleteSolutionFromTrash(id);
  } catch (error) {
    console.error('Failed to permanently delete solution from trash:', error);
    return { success: false as const, error: '彻底删除失败' };
  }
}

export async function clearTrash() {
  const authError = await ensureAdminAction();
  if (authError) return { ...authError, deletedCount: 0, failedIds: [] };

  try {
    return await emptyTrashSolutions();
  } catch (error) {
    console.error('Failed to clear trash:', error);
    return { success: false as const, error: '清空回收站失败', deletedCount: 0, failedIds: [] };
  }
}

export async function deleteSolution(id: string) {
  return moveSolutionToTrash(id);
}

export async function restoreSolution(id: string) {
  return restoreSolutionFromTrash(id);
}

export async function hardDeleteSolution(id: string) {
  return deleteSolutionFromTrash(id);
}

export async function clearSolutionTrash() {
  return clearTrash();
}

export async function getSolutionById(id: string) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  await dbConnect();
  try {
    const query = isValidObjectId(id)
      ? { _id: id }
      : { slug: id, deletedAt: null };

    const solution = await Solution.findOne(query)
      .populate('categoryId', 'slug')
      .lean();
    const serializedSolution = JSON.parse(JSON.stringify(solution));
    const category =
      serializedSolution?.categoryId && typeof serializedSolution.categoryId === 'object'
        ? serializedSolution.categoryId
        : null;

    return {
      success: true,
      data: serializedSolution
        ? {
            ...serializedSolution,
            categoryId: category?._id || serializedSolution.categoryId,
            categorySlug: serializedSolution.categorySlug || category?.slug
          }
        : serializedSolution
    };
  } catch (error) {
    console.error('Failed to get solution:', error);
    return { success: false, error: '获取数据失败' };
  }
}

export async function createSkeletonSolution() {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  return createSkeletonSolutionForAgent();
}

export async function saveSolution(data: SaveSolutionInput) {
  const authError = await ensureAdminAction();
  if (authError) return authError;

  return saveSolutionForAgent(data);
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
