import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import Category from '@/customers/models/Category';
import { getAutoCategoryColor, normalizeHexColor } from '@/customers/lib/category-color';
import { ensureCategorySlugs } from '@/customers/lib/category-slug';
import { isValidObjectId } from '@/customers/lib/object-id';
import { getInteractedCustomerIdSets } from '@/customers/lib/public-interaction-state';
import {
  DEFAULT_PUBLIC_CUSTOMER_SORT_KEY,
  PUBLIC_CUSTOMERS_PAGE_SIZE,
  normalizePositiveInteger,
  type PublicCustomerSortKey
} from '@/customers/lib/customer-pagination';
import type { SortOrder } from 'mongoose';
import { cache } from 'react';
import type { AiDirectoryEntry } from '@/customers/lib/ai-readable-directory';

type RawCustomerListItem = {
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
  isPublicCase?: boolean;
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

export interface PublishedCustomersPageOptions {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sortBy?: PublicCustomerSortKey;
  maxLimit?: number;
}

function getCustomerListSort(sortBy: PublicCustomerSortKey = DEFAULT_PUBLIC_CUSTOMER_SORT_KEY) {
  const sortMap: Record<PublicCustomerSortKey, Record<string, SortOrder>> = {
    likes: { likesCount: -1, createdAt: -1 },
    usage: { usageCount: -1, createdAt: -1 },
    time: { createdAt: -1 }
  };

  return sortMap[sortBy];
}

function mapCustomerListItem(
  s: RawCustomerListItem,
  interactionState: {
    likedCustomerIds?: Set<string>;
    viewedCustomerIds?: Set<string>;
  } = {}
) {
  const id = s._id.toString();
  const likedCustomerIds = interactionState.likedCustomerIds || new Set<string>();
  const viewedCustomerIds = interactionState.viewedCustomerIds || new Set<string>();
  const categoryName =
    (typeof s.categoryId === 'object' && s.categoryId !== null
      ? s.categoryId.name
      : undefined) ||
    s.categoryName ||
    '未知分类';

  return {
    id,
    slug: s.slug || '',
    isPublicCase: Boolean(s.isPublicCase),
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
    isLiked: likedCustomerIds.has(id),
    hasViewed: viewedCustomerIds.has(id),
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

const getCustomerDetail = cache(async (id: string, includeInteractionState: boolean) => {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const query = isValidObjectId(id)
    ? { _id: id }
    : { slug: id, deletedAt: null };

  const customer = await Customer.findOne(query)
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
      isPublicCase?: boolean;
      caseOrg?: string;
      clearanceLevel?: 'A' | 'B' | 'C' | '';
      caseNo?: number;
      citedNumbers?: string;
      relatedCustomerIds?: string[];
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

  if (!customer || !customer.isPublished) return null;

  const interactionState = includeInteractionState
    ? await getInteractedCustomerIdSets([customer._id.toString()])
    : {
        likedCustomerIds: new Set<string>(),
        viewedCustomerIds: new Set<string>(),
      };

  return {
    id: customer._id.toString(),
    categoryId:
      typeof customer.categoryId === 'object' && customer.categoryId !== null
        ? customer.categoryId._id?.toString() || customer.categoryId.toString?.() || ''
        : customer.categoryId?.toString() || '',
    categoryName:
      (typeof customer.categoryId === 'object' && customer.categoryId !== null
        ? customer.categoryId.name
        : undefined) ||
      customer.categoryName ||
      '未知分类',
    categorySlug:
      typeof customer.categoryId === 'object' && customer.categoryId !== null
        ? customer.categoryId.slug || ''
        : '',
    slug: customer.slug || '',
    categoryColor: normalizeHexColor(
      typeof customer.categoryId === 'object' && customer.categoryId !== null
        ? customer.categoryId.color
        : undefined,
      getAutoCategoryColor(
        (typeof customer.categoryId === 'object' && customer.categoryId !== null
          ? customer.categoryId.name
          : undefined) ||
          customer.categoryName ||
          ''
      )
    ),
    title: customer.title,
    description: customer.description,
    metaTitle: customer.metaTitle || '',
    metaDescription: customer.metaDescription || '',
    publishedAt: customer.publishedAt?.toISOString() || null,
    isPublicCase: Boolean(customer.isPublicCase),
    caseOrg: customer.caseOrg || '',
    clearanceLevel: customer.clearanceLevel || '',
    caseNo: customer.caseNo || 0,
    citedNumbers: customer.citedNumbers || '',
    relatedCustomerIds: customer.relatedCustomerIds || [],
    imageUrl: customer.imageUrl,
    thumbnailUrl: customer.thumbnailUrl || customer.imageUrl,
    freeUseUrl: customer.freeUseUrl || '',
    likes: customer.likesCount,
    usage: customer.formattedUsageCount || customer.usageCount.toString(),
    rawUsageCount: customer.usageCount,
    isLiked: interactionState.likedCustomerIds.has(customer._id.toString()),
    hasViewed: interactionState.viewedCustomerIds.has(customer._id.toString()),
    content: customer.content,
    createdAt: customer.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: customer.updatedAt?.toISOString() || customer.createdAt?.toISOString() || new Date().toISOString()
  };
});

/**
 * 详情页数据（含访客态 isLiked/hasViewed，基于访客 cookie）。
 * 仅用于「按访客读取」的接口/页面，**不得**用于被缓存的渲染路径。
 */
export async function getCustomerById(id: string) {
  return getCustomerDetail(id, true);
}

/**
 * 公开详情页数据（不含访客态，不读 cookie）。
 * 用于可缓存的页面渲染（ISR）与纯文本路由，保证缓存的 HTML 对所有人一致。
 */
export async function getCustomerByIdPublic(id: string) {
  return getCustomerDetail(id, false);
}

const RELATED_CUSTOMER_SELECT =
  'categoryName slug isPublicCase title description imageUrl thumbnailUrl freeUseUrl likesCount usageCount formattedUsageCount createdAt updatedAt categoryId';

/**
 * 详情页「更多案例」推荐：优先按 relatedCustomerIds 精确取相关项；
 * 若为空则回退为同分类最新内容。不读 cookie，可安全用于 ISR 渲染。
 */
export async function getRelatedCustomers(customer: {
  id?: string;
  categoryId?: string;
  relatedCustomerIds?: string[];
}) {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const relatedIds = (customer.relatedCustomerIds || [])
    .filter((id) => isValidObjectId(id))
    .filter((id) => String(id) !== String(customer.id));

  let customers: RawCustomerListItem[] = [];

  if (relatedIds.length > 0) {
    customers = await Customer.find({
      _id: { $in: relatedIds },
      isPublished: true,
      deletedAt: null,
    })
      .select(RELATED_CUSTOMER_SELECT)
      .populate('categoryId', 'name slug color')
      .lean({ virtuals: true }) as RawCustomerListItem[];
  }

  if (customers.length === 0 && customer.categoryId) {
    customers = await Customer.find({
      categoryId: customer.categoryId,
      isPublished: true,
      deletedAt: null,
      _id: { $ne: customer.id },
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .select(RELATED_CUSTOMER_SELECT)
      .populate('categoryId', 'name slug color')
      .lean({ virtuals: true }) as RawCustomerListItem[];
  }

  return customers.map((item) => mapCustomerListItem(item));
}

export async function getPublishedCustomersPage(options: PublishedCustomersPageOptions = {}) {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const page = normalizePositiveInteger(options.page, 1);
  const limit = normalizePositiveInteger(
    options.limit,
    PUBLIC_CUSTOMERS_PAGE_SIZE,
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

  const sortOptions = getCustomerListSort(options.sortBy);

  const [customers, total] = await Promise.all([
    Customer.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('categoryName slug isPublicCase title description caseNo caseOrg clearanceLevel citedNumbers imageUrl thumbnailUrl freeUseUrl likesCount usageCount helpfulCount unhelpfulCount formattedUsageCount createdAt updatedAt categoryId')
      .populate('categoryId', 'name slug color')
      .lean({ virtuals: true }) as Promise<RawCustomerListItem[]>,
    Customer.countDocuments(query)
  ]);

  const interactionState = await getInteractedCustomerIdSets(customers.map((customer) => customer._id.toString()));

  return {
    customers: customers.map((customer) => mapCustomerListItem(customer, interactionState)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getAllPublishedCustomers() {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const customers = await Customer.find({ isPublished: true, deletedAt: null })
    .sort({ createdAt: -1 })
    .select('categoryName slug isPublicCase title description caseNo caseOrg clearanceLevel citedNumbers imageUrl thumbnailUrl freeUseUrl likesCount usageCount formattedUsageCount createdAt updatedAt categoryId')
    .populate('categoryId', 'name slug color')
    .lean({ virtuals: true }) as RawCustomerListItem[];

  return customers.map((customer) => mapCustomerListItem(customer));
}

/**
 * 首页 AI 可读目录专用：只取目录/JSON-LD 所需字段，
 * 不带封面图、计数等卡片字段，避免首页每次请求全量拉取。
 */
export async function getAllPublishedCustomerDirectoryEntries(): Promise<AiDirectoryEntry[]> {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const customers = await Customer.find({ isPublished: true, deletedAt: null })
    .sort({ createdAt: -1 })
    .select('categoryName slug isPublicCase title description caseNo caseOrg clearanceLevel citedNumbers categoryId')
    .populate('categoryId', 'slug')
    .lean({ virtuals: true }) as Array<{
      _id: { toString(): string };
      categoryName?: string;
      slug?: string | null;
      isPublicCase?: boolean;
      title: string;
      description: string;
      caseNo?: number;
      caseOrg?: string;
      clearanceLevel?: 'A' | 'B' | 'C' | '';
      citedNumbers?: string;
      categoryId?: { slug?: string | null } | string | null;
    }>;

  return customers.map((s) => ({
    id: s._id.toString(),
    slug: s.slug || '',
    categorySlug:
      typeof s.categoryId === 'object' && s.categoryId !== null
        ? s.categoryId.slug || ''
        : '',
    categoryName: s.categoryName || '未知分类',
    title: s.title,
    description: s.description,
    isPublicCase: Boolean(s.isPublicCase),
    caseNo: s.caseNo || 0,
    caseOrg: s.caseOrg || '',
    clearanceLevel: (s.clearanceLevel || '') as 'A' | 'B' | 'C' | '',
    citedNumbers: s.citedNumbers || '',
  }));
}

export async function getAllPublishedCustomerDetails() {
  await dbConnect();
  await ensureCategorySlugs();
  Category.init();

  const customers = await Customer.find({ isPublished: true })
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

  return customers.map((s) => ({
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
