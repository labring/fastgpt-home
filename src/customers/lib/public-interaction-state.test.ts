import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cookies } from 'next/headers';
import CustomerInteraction from '@/customers/models/CustomerInteraction';
import {
  getCurrentVisitorKey,
  getInteractedCustomerIdSets,
  getLikedCustomerIdSet,
} from './public-interaction-state';

vi.mock('server-only', () => ({}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('@/customers/models/CustomerInteraction', () => ({
  default: {
    find: vi.fn(),
  },
}));

function mockCookie(value?: string) {
  vi.mocked(cookies).mockResolvedValue({
    get: vi.fn(() => value ? { value } : undefined),
  } as never);
}

describe('public interaction state', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null for missing or invalid visitor keys', async () => {
    mockCookie('bad');
    await expect(getCurrentVisitorKey()).resolves.toBeNull();

    mockCookie();
    await expect(getCurrentVisitorKey()).resolves.toBeNull();
  });

  it('loads liked customer ids for the current visitor', async () => {
    mockCookie('validVisitorKey_123456789012345678901234');
    const lean = vi.fn().mockResolvedValue([
      { customerId: '64b000000000000000000001' },
      { customerId: '64b000000000000000000002' },
    ]);
    const select = vi.fn(() => ({ lean }));
    vi.mocked(CustomerInteraction.find).mockReturnValue({ select } as never);

    const likedIds = await getLikedCustomerIdSet([
      '64b000000000000000000001',
      'bad-id',
      '64b000000000000000000002',
    ]);

    expect([...likedIds]).toEqual([
      '64b000000000000000000001',
      '64b000000000000000000002',
    ]);
    expect(CustomerInteraction.find).toHaveBeenCalledWith({
      customerId: {
        $in: ['64b000000000000000000001', '64b000000000000000000002'],
      },
      visitorKey: 'validVisitorKey_123456789012345678901234',
      type: 'like',
      liked: true,
    });
    expect(select).toHaveBeenCalledWith('customerId');
  });

  it('loads liked and viewed customer ids for the current visitor', async () => {
    mockCookie('validVisitorKey_123456789012345678901234');
    const lean = vi.fn().mockResolvedValue([
      { customerId: '64b000000000000000000001', type: 'like', liked: true },
      { customerId: '64b000000000000000000002', type: 'view' },
      { customerId: '64b000000000000000000003', type: 'like', liked: false },
    ]);
    const select = vi.fn(() => ({ lean }));
    vi.mocked(CustomerInteraction.find).mockReturnValue({ select } as never);

    const state = await getInteractedCustomerIdSets([
      '64b000000000000000000001',
      '64b000000000000000000002',
      '64b000000000000000000003',
    ]);

    expect([...state.likedCustomerIds]).toEqual(['64b000000000000000000001']);
    expect([...state.viewedCustomerIds]).toEqual(['64b000000000000000000002']);
    expect(CustomerInteraction.find).toHaveBeenCalledWith({
      customerId: {
        $in: [
          '64b000000000000000000001',
          '64b000000000000000000002',
          '64b000000000000000000003',
        ],
      },
      visitorKey: 'validVisitorKey_123456789012345678901234',
      $or: [
        { type: 'like', liked: true },
        { type: 'view' },
      ],
    });
    expect(select).toHaveBeenCalledWith('customerId type liked');
  });

  it('does not query interactions when no visitor key exists', async () => {
    mockCookie();
    await expect(getLikedCustomerIdSet(['64b000000000000000000001'])).resolves.toEqual(new Set());
    expect(CustomerInteraction.find).not.toHaveBeenCalled();
  });
});
