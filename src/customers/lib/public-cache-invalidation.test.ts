import { beforeEach, describe, expect, it, vi } from 'vitest';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import {
  loadSolutionRevalidationRefsByCategoryId,
  loadSolutionRevalidationRefs,
  revalidateCategoryRefs,
  revalidatePublicIndexes,
  revalidateSolutionRefs,
} from './public-cache-invalidation';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/customers/lib/db', () => ({
  default: vi.fn(),
}));

vi.mock('@/customers/models/Solution', () => ({
  default: {
    find: vi.fn(),
  },
}));

function revalidatedPaths() {
  return vi.mocked(revalidatePath).mock.calls.map(([path]) => path);
}

describe('public cache invalidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('revalidates public index surfaces', () => {
    revalidatePublicIndexes();

    expect(revalidatedPaths()).toEqual([
      '/customers',
      '/customers/categories',
      '/customers/sitemap.xml',
      '/customers/llms.txt',
      '/customers/llms-full.txt',
    ]);
  });

  it('revalidates solution detail, semantic, markdown and category pages', () => {
    revalidateSolutionRefs({
      id: 'solution-a',
      slug: 'semantic-slug',
      categorySlug: 'current-category',
      previousCategorySlug: 'old-category',
    });

    expect(revalidatedPaths()).toEqual([
      '/customers',
      '/customers/categories',
      '/customers/sitemap.xml',
      '/customers/llms.txt',
      '/customers/llms-full.txt',
      '/customers/solution/solution-a',
      '/customers/solution/solution-a/markdown',
      '/customers/current-category/semantic-slug',
      '/customers/categories/current-category',
      '/customers/old-category/semantic-slug',
      '/customers/categories/old-category',
    ]);
  });

  it('falls back to ObjectId path when slug is missing', () => {
    revalidateSolutionRefs({
      id: 'solution-a',
      categorySlug: 'current-category',
    });

    expect(revalidatedPaths()).toContain('/customers/current-category/solution-a');
  });

  it('deduplicates current and previous category slug paths', () => {
    revalidateSolutionRefs({
      id: 'solution-a',
      categorySlug: 'same-category',
      previousCategorySlug: 'same-category',
    });

    expect(revalidatedPaths().filter((path) => path === '/customers/categories/same-category')).toHaveLength(1);
    expect(revalidatedPaths().filter((path) => path === '/customers/same-category/solution-a')).toHaveLength(1);
  });

  it('revalidates category refs including old slugs', () => {
    revalidateCategoryRefs([
      { slug: 'new-category', previousSlug: 'old-category' },
      { slug: 'new-category' },
    ]);

    expect(revalidatedPaths()).toEqual([
      '/customers',
      '/customers/categories',
      '/customers/sitemap.xml',
      '/customers/llms.txt',
      '/customers/llms-full.txt',
      '/customers/categories/new-category',
      '/customers/categories/old-category',
    ]);
  });

  it('loads solution refs with populated category slug', async () => {
    const lean = vi.fn().mockResolvedValue([
      { _id: '64b000000000000000000001', slug: 'financial-report', categoryId: { slug: 'finance' } },
      { _id: '64b000000000000000000002', categoryId: null },
    ]);
    const populate = vi.fn(() => ({ lean }));
    const select = vi.fn(() => ({ populate }));
    vi.mocked(Solution.find).mockReturnValue({ select } as never);

    await expect(loadSolutionRevalidationRefs([
      '64b000000000000000000001',
      'bad-id',
      '64b000000000000000000002',
    ])).resolves.toEqual([
      { id: '64b000000000000000000001', categorySlug: 'finance', slug: 'financial-report' },
      { id: '64b000000000000000000002', categorySlug: undefined, slug: undefined },
    ]);

    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Solution.find).toHaveBeenCalledWith({
      _id: {
        $in: ['64b000000000000000000001', '64b000000000000000000002'],
      },
      deletedAt: { $exists: true },
    });
    expect(select).toHaveBeenCalledWith('_id categoryId slug');
    expect(populate).toHaveBeenCalledWith('categoryId', 'slug');
  });

  it('loads solution refs by category id for slug rename invalidation', async () => {
    const lean = vi.fn().mockResolvedValue([
      { _id: '64b000000000000000000001', slug: 'semantic-slug', categoryId: { slug: 'new-category' } },
    ]);
    const populate = vi.fn(() => ({ lean }));
    const select = vi.fn(() => ({ populate }));
    vi.mocked(Solution.find).mockReturnValue({ select } as never);

    await expect(loadSolutionRevalidationRefsByCategoryId('64a000000000000000000001')).resolves.toEqual([
      { id: '64b000000000000000000001', categorySlug: 'new-category', slug: 'semantic-slug' },
    ]);

    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Solution.find).toHaveBeenCalledWith({
      categoryId: '64a000000000000000000001',
      deletedAt: null,
    });
    expect(select).toHaveBeenCalledWith('_id categoryId slug');
    expect(populate).toHaveBeenCalledWith('categoryId', 'slug');
  });
});
