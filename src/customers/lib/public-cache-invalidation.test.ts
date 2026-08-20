import { beforeEach, describe, expect, it, vi } from 'vitest';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import {
  loadCustomerRevalidationRefsByCategoryId,
  loadCustomerRevalidationRefs,
  revalidateCategoryRefs,
  revalidatePublicIndexes,
  revalidateCustomerRefs,
} from './public-cache-invalidation';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

vi.mock('@/customers/lib/db', () => ({
  default: vi.fn(),
}));

vi.mock('@/customers/models/Customer', () => ({
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

  it('revalidates customer detail, semantic, markdown and category pages', () => {
    revalidateCustomerRefs({
      id: 'customer-a',
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
      '/customers/customer/customer-a',
      '/customers/customer/customer-a/markdown',
      '/customers/current-category/semantic-slug',
      '/customers/categories/current-category',
      '/customers/old-category/semantic-slug',
      '/customers/categories/old-category',
    ]);
  });

  it('falls back to ObjectId path when slug is missing', () => {
    revalidateCustomerRefs({
      id: 'customer-a',
      categorySlug: 'current-category',
    });

    expect(revalidatedPaths()).toContain('/customers/current-category/customer-a');
  });

  it('deduplicates current and previous category slug paths', () => {
    revalidateCustomerRefs({
      id: 'customer-a',
      categorySlug: 'same-category',
      previousCategorySlug: 'same-category',
    });

    expect(revalidatedPaths().filter((path) => path === '/customers/categories/same-category')).toHaveLength(1);
    expect(revalidatedPaths().filter((path) => path === '/customers/same-category/customer-a')).toHaveLength(1);
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

  it('loads customer refs with populated category slug', async () => {
    const lean = vi.fn().mockResolvedValue([
      { _id: '64b000000000000000000001', slug: 'financial-report', categoryId: { slug: 'finance' } },
      { _id: '64b000000000000000000002', categoryId: null },
    ]);
    const populate = vi.fn(() => ({ lean }));
    const select = vi.fn(() => ({ populate }));
    vi.mocked(Customer.find).mockReturnValue({ select } as never);

    await expect(loadCustomerRevalidationRefs([
      '64b000000000000000000001',
      'bad-id',
      '64b000000000000000000002',
    ])).resolves.toEqual([
      { id: '64b000000000000000000001', categorySlug: 'finance', slug: 'financial-report' },
      { id: '64b000000000000000000002', categorySlug: undefined, slug: undefined },
    ]);

    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Customer.find).toHaveBeenCalledWith({
      _id: {
        $in: ['64b000000000000000000001', '64b000000000000000000002'],
      },
      deletedAt: { $exists: true },
    });
    expect(select).toHaveBeenCalledWith('_id categoryId slug');
    expect(populate).toHaveBeenCalledWith('categoryId', 'slug');
  });

  it('loads customer refs by category id for slug rename invalidation', async () => {
    const lean = vi.fn().mockResolvedValue([
      { _id: '64b000000000000000000001', slug: 'semantic-slug', categoryId: { slug: 'new-category' } },
    ]);
    const populate = vi.fn(() => ({ lean }));
    const select = vi.fn(() => ({ populate }));
    vi.mocked(Customer.find).mockReturnValue({ select } as never);

    await expect(loadCustomerRevalidationRefsByCategoryId('64a000000000000000000001')).resolves.toEqual([
      { id: '64b000000000000000000001', categorySlug: 'new-category', slug: 'semantic-slug' },
    ]);

    expect(dbConnect).toHaveBeenCalledTimes(1);
    expect(Customer.find).toHaveBeenCalledWith({
      categoryId: '64a000000000000000000001',
      deletedAt: null,
    });
    expect(select).toHaveBeenCalledWith('_id categoryId slug');
    expect(populate).toHaveBeenCalledWith('categoryId', 'slug');
  });
});
