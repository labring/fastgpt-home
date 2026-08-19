import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import Category from '@/customers/models/Category';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';
import { isValidObjectId } from '@/customers/lib/object-id';
import { getInteractedSolutionIdSets } from '@/customers/lib/public-interaction-state';
import {
  DEFAULT_PUBLIC_SOLUTION_SORT_KEY,
  PUBLIC_SOLUTIONS_PAGE_SIZE,
  normalizePositiveInteger,
  type PublicSolutionSortKey
} from '@/customers/lib/solution-pagination';
import type { SortOrder } from 'mongoose';

type RawSolutionListItem = {
  _id: { toString(): string };
  categoryId?:
    | {
        _id?: { toString(): string };
        name?: string;
        slug?: string | null;
        color?: string | null;
        toString?: () => string;
      }
    | string
    | null;
  categoryName?: string;
  slug?: string | null;
  contentType?: 'solution' | 'case';
  caseNo?: number;
  caseOrg?: string;
  clearanceLevel?: 'A' | 'B' | 'C' | '';
  citedNumbers?: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  likesCount: number;
  usageCount: number;
  helpfulCount?: number;
  unhelpfulCount?: number;
  formattedUsageCount?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildKeywordSearchQuery(search: string) {
  const keywords = search
    .split(/\s+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  if (keywords.length === 0) {
    return null;
  }

  return {
    $and: keywords.map((keyword) => {
      const regex = new RegExp(escapeRegExp(keyword), 'i');

      return {
        $or: [
          { title: regex },
          { description: regex },
          { categoryName: regex }
        ]
      };
    })
  };
}

export interface PublishedSolutionsPageOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: PublicSolutionSortKey;
  maxLimit?: number;
}

function getSolutionListSort(sortBy: PublicSolutionSortKey = DEFAULT_PUBLIC_SOLUTION_SORT_KEY) {
  const sortMap: Record<PublicSolutionSortKey, Record<string, SortOrder>> = {
    likes: { likesCount: -1, createdAt: -1 },
    usage: { usageCount: -1, createdAt: -1 },
    time: { createdAt: -1 }
  };

  return sortMap[sortBy];
}

function mapSolutionListItem(
  s: RawSolutionListItem,
  interactionState: {
    likedSolutionIds?: Set<string>;
    viewedSolutionIds?: Set<string>;
  } = {}
) {
  const id = s._id.toString();
  const likedSolutionIds = interactionState.likedSolutionIds || new Set<string>();
  const viewedSolutionIds = interactionState.viewedSolutionIds || new Set<string>();
  const categoryName =
    (typeof s.categoryId === 'object' && s.categoryId !== null
      ? s.categoryId.name
      : undefined) ||
    s.categoryName ||
    '未知分类';

  return {
    id,
    slug: s.slug || '',
    contentType: s.contentType || 'solution',
    caseNo: s.caseNo || 0,
    caseOrg: s.caseOrg || '',
    clearanceLevel: (s.clearanceLevel || '') as 'A' | 'B' | 'C' | '',
    citedNumbers: s.citedNumbers || '',
    categoryId:
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId._id?.toString() || s.categoryId.toString?.() || ''
        : s.categoryId?.toString() || '',
    categoryName,
    categorySlug:
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId.slug || ''
        : '',
    categoryColor: normalizeHexColor(
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId.color
        : undefined,
      getAutoCategoryColor(categoryName)
    ),
    title: s.title,
    description: s.description,
    imageUrl: s.imageUrl,
    thumbnailUrl: s.thumbnailUrl || s.imageUrl,
    freeUseUrl: s.freeUseUrl || '',
    likes: s.likesCount,
    usage: s.formattedUsageCount || s.usageCount.toString(),
    rawUsageCount: s.usageCount,
    isLiked: likedSolutionIds.has(id),
    hasViewed: viewedSolutionIds.has(id),
    helpfulCount: s.helpfulCount || 0,
    unhelpfulCount: s.unhelpfulCount || 0,
    createdAt: s.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: s.updatedAt?.toISOString() || s.createdAt?.toISOString() || new Date().toISOString()
  };
}

export async function getCategories() {
  await dbConnect();
  await ensureCategorySlugs();
  const categories = await Category.find({ isActive: true })
    .select('name slug order color _id') // 优化点：只查询需要的字段
    .sort({ order: 1 })
    .lean() as Array<{
      _id: { toString(): string };
      name: string;
      slug: string;
      color?: string | null;
    }>;

  return categories.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    slug: c.slug,
    color: normalizeHexColor(c.color, getAutoCategoryColor(c.name))
  }));
}

async function getSolutionDetail(id: string, includeInteractionState: boolean) {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const query = isValidObjectId(id)
    ? { _id: id }
    : { slug: id, deletedAt: null };

  const solution = await Solution.findOne(query)
    .populate('categoryId', 'name slug color')
    .lean({ virtuals: true }) as {
      _id: { toString(): string };
      categoryId?:
        | {
            _id?: { toString(): string };
            name?: string;
            slug?: string | null;
            color?: string | null;
            toString?: () => string;
          }
        | string
        | null;
      categoryName?: string;
      slug?: string | null;
      title: string;
      description: string;
      metaTitle?: string;
      metaDescription?: string;
      publishedAt?: Date | null;
      contentType?: 'solution' | 'case';
      caseOrg?: string;
      clearanceLevel?: 'A' | 'B' | 'C' | '';
      caseNo?: number;
      citedNumbers?: string;
      relatedSolutionIds?: string[];
      imageUrl: string;
      thumbnailUrl?: string;
      freeUseUrl?: string;
      likesCount: number;
      usageCount: number;
      formattedUsageCount?: string;
      content: string;
      createdAt?: Date;
      updatedAt?: Date;
      isPublished: boolean;
    } | null;

  if (!solution || !solution.isPublished) return null;

  const interactionState = includeInteractionState
    ? await getInteractedSolutionIdSets([solution._id.toString()])
    : {
        likedSolutionIds: new Set<string>(),
        viewedSolutionIds: new Set<string>(),
      };

  return {
    id: solution._id.toString(),
    categoryId:
      typeof solution.categoryId === 'object' && solution.categoryId !== null
        ? solution.categoryId._id?.toString() || solution.categoryId.toString?.() || ''
        : solution.categoryId?.toString() || '',
    categoryName:
      (typeof solution.categoryId === 'object' && solution.categoryId !== null
        ? solution.categoryId.name
        : undefined) ||
      solution.categoryName ||
      '未知分类',
    categorySlug:
      typeof solution.categoryId === 'object' && solution.categoryId !== null
        ? solution.categoryId.slug || ''
        : '',
    slug: solution.slug || '',
    categoryColor: normalizeHexColor(
      typeof solution.categoryId === 'object' && solution.categoryId !== null
        ? solution.categoryId.color
        : undefined,
      getAutoCategoryColor(
        (typeof solution.categoryId === 'object' && solution.categoryId !== null
          ? solution.categoryId.name
          : undefined) ||
          solution.categoryName ||
          ''
      )
    ),
    title: solution.title,
    description: solution.description,
    metaTitle: solution.metaTitle || '',
    metaDescription: solution.metaDescription || '',
    publishedAt: solution.publishedAt?.toISOString() || null,
    contentType: solution.contentType || 'solution',
    caseOrg: solution.caseOrg || '',
    clearanceLevel: solution.clearanceLevel || '',
    caseNo: solution.caseNo || 0,
    citedNumbers: solution.citedNumbers || '',
    relatedSolutionIds: solution.relatedSolutionIds || [],
    imageUrl: solution.imageUrl,
    thumbnailUrl: solution.thumbnailUrl || solution.imageUrl,
    freeUseUrl: solution.freeUseUrl || '',
    likes: solution.likesCount,
    usage: solution.formattedUsageCount || solution.usageCount.toString(),
    rawUsageCount: solution.usageCount,
    isLiked: interactionState.likedSolutionIds.has(solution._id.toString()),
    hasViewed: interactionState.viewedSolutionIds.has(solution._id.toString()),
    content: solution.content,
    createdAt: solution.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: solution.updatedAt?.toISOString() || solution.createdAt?.toISOString() || new Date().toISOString()
  };
}

/**
 * 详情页数据（含访客态 isLiked/hasViewed，基于访客 cookie）。
 * 仅用于「按访客读取」的接口/页面，**不得**用于被缓存的渲染路径。
 */
export async function getSolutionById(id: string) {
  return getSolutionDetail(id, true);
}

/**
 * 公开详情页数据（不含访客态，不读 cookie）。
 * 用于可缓存的页面渲染（ISR）与纯文本路由，保证缓存的 HTML 对所有人一致。
 */
export async function getSolutionByIdPublic(id: string) {
  return getSolutionDetail(id, false);
}

export async function getSolutions(limit: number = 20) {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const query: Record<string, unknown> = { isPublished: true, deletedAt: null };

  const solutions = await Solution.find(query)
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('categoryName slug contentType title description imageUrl thumbnailUrl freeUseUrl likesCount usageCount formattedUsageCount createdAt updatedAt categoryId') // 优化点：精确投射所需字段，不查富文本或其它长字段
    .populate('categoryId', 'name slug color')
    .lean({ virtuals: true }) as Array<{
      _id: { toString(): string };
      categoryId?:
        | {
            _id?: { toString(): string };
            name?: string;
            slug?: string | null;
            color?: string | null;
            toString?: () => string;
          }
        | string
        | null;
      categoryName?: string;
      slug?: string | null;
      title: string;
      description: string;
      imageUrl: string;
      thumbnailUrl?: string;
      freeUseUrl?: string;
      likesCount: number;
      usageCount: number;
      formattedUsageCount?: string;
      createdAt?: Date;
    }> as RawSolutionListItem[];

  const interactionState = await getInteractedSolutionIdSets(solutions.map((solution) => solution._id.toString()));

  return solutions.map((solution) => mapSolutionListItem(solution, interactionState));
}

export async function getPublishedSolutionsPage(options: PublishedSolutionsPageOptions = {}) {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const page = normalizePositiveInteger(options.page, 1);
  const limit = normalizePositiveInteger(
    options.limit,
    PUBLIC_SOLUTIONS_PAGE_SIZE,
    options.maxLimit
  );
  const skip = (page - 1) * limit;
  const query: Record<string, unknown> = { isPublished: true, deletedAt: null };
  const search = options.search?.trim();

  if (options.category && options.category !== 'all') {
    const matchedCategory = await Category.findOne({ slug: options.category }).select('_id');
    query.categoryId = matchedCategory?._id || null;
  }

  if (search) {
    Object.assign(query, buildKeywordSearchQuery(search));
  }

  const sortOptions = getSolutionListSort(options.sortBy);

  const [solutions, total] = await Promise.all([
    Solution.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('categoryName slug contentType title description caseNo caseOrg clearanceLevel citedNumbers imageUrl thumbnailUrl freeUseUrl likesCount usageCount helpfulCount unhelpfulCount formattedUsageCount createdAt updatedAt categoryId')
      .populate('categoryId', 'name slug color')
      .lean({ virtuals: true }) as Promise<RawSolutionListItem[]>,
    Solution.countDocuments(query)
  ]);

  const interactionState = await getInteractedSolutionIdSets(solutions.map((solution) => solution._id.toString()));

  return {
    solutions: solutions.map((solution) => mapSolutionListItem(solution, interactionState)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getAllPublishedSolutions() {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const solutions = await Solution.find({ isPublished: true, deletedAt: null })
    .sort({ createdAt: -1 })
    .select('categoryName slug contentType title description caseNo caseOrg clearanceLevel citedNumbers imageUrl thumbnailUrl freeUseUrl likesCount usageCount formattedUsageCount createdAt updatedAt categoryId')
    .populate('categoryId', 'name slug color')
    .lean({ virtuals: true }) as RawSolutionListItem[];

  return solutions.map((solution) => mapSolutionListItem(solution));
}

export async function getAllPublishedSolutionDetails() {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const solutions = await Solution.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .select('categoryName slug title description imageUrl thumbnailUrl freeUseUrl likesCount usageCount formattedUsageCount content createdAt updatedAt categoryId')
    .populate('categoryId', 'name slug color')
    .lean({ virtuals: true }) as Array<{
      _id: { toString(): string };
      categoryId?:
        | {
            _id?: { toString(): string };
            name?: string;
            slug?: string | null;
            color?: string | null;
            toString?: () => string;
          }
        | string
        | null;
      categoryName?: string;
      slug?: string | null;
      title: string;
      description: string;
      imageUrl: string;
      thumbnailUrl?: string;
      freeUseUrl?: string;
      likesCount: number;
      usageCount: number;
      formattedUsageCount?: string;
      content: string;
      createdAt?: Date;
      updatedAt?: Date;
    }>;

  return solutions.map((s) => ({
    id: s._id.toString(),
    slug: s.slug || '',
    categoryId:
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId._id?.toString() || s.categoryId.toString?.() || ''
        : s.categoryId?.toString() || '',
    categoryName:
      (typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId.name
        : undefined) ||
      s.categoryName ||
      '未知分类',
    categorySlug:
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId.slug || ''
        : '',
    categoryColor: normalizeHexColor(
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId.color
        : undefined,
      getAutoCategoryColor(
        (typeof s.categoryId === 'object' && s.categoryId !== null
          ? s.categoryId.name
          : undefined) ||
          s.categoryName ||
          ''
      )
    ),
    title: s.title,
    description: s.description,
    imageUrl: s.imageUrl,
    thumbnailUrl: s.thumbnailUrl || s.imageUrl,
    freeUseUrl: s.freeUseUrl || '',
    likes: s.likesCount,
    usage: s.formattedUsageCount || s.usageCount.toString(),
    rawUsageCount: s.usageCount,
    content: s.content,
    createdAt: s.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: s.updatedAt?.toISOString() || s.createdAt?.toISOString() || new Date().toISOString()
  }));
}
