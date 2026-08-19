import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cookies } from 'next/headers';
import SolutionInteraction from '@/customers/models/SolutionInteraction';
import {
  getCurrentVisitorKey,
  getInteractedSolutionIdSets,
  getLikedSolutionIdSet,
} from './public-interaction-state';

vi.mock('server-only', () => ({}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

vi.mock('@/customers/models/SolutionInteraction', () => ({
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

  it('loads liked solution ids for the current visitor', async () => {
    mockCookie('validVisitorKey_123456789012345678901234');
    const lean = vi.fn().mockResolvedValue([
      { solutionId: '64b000000000000000000001' },
      { solutionId: '64b000000000000000000002' },
    ]);
    const select = vi.fn(() => ({ lean }));
    vi.mocked(SolutionInteraction.find).mockReturnValue({ select } as never);

    const likedIds = await getLikedSolutionIdSet([
      '64b000000000000000000001',
      'bad-id',
      '64b000000000000000000002',
    ]);

    expect([...likedIds]).toEqual([
      '64b000000000000000000001',
      '64b000000000000000000002',
    ]);
    expect(SolutionInteraction.find).toHaveBeenCalledWith({
      solutionId: {
        $in: ['64b000000000000000000001', '64b000000000000000000002'],
      },
      visitorKey: 'validVisitorKey_123456789012345678901234',
      type: 'like',
      liked: true,
    });
    expect(select).toHaveBeenCalledWith('solutionId');
  });

  it('loads liked and viewed solution ids for the current visitor', async () => {
    mockCookie('validVisitorKey_123456789012345678901234');
    const lean = vi.fn().mockResolvedValue([
      { solutionId: '64b000000000000000000001', type: 'like', liked: true },
      { solutionId: '64b000000000000000000002', type: 'view' },
      { solutionId: '64b000000000000000000003', type: 'like', liked: false },
    ]);
    const select = vi.fn(() => ({ lean }));
    vi.mocked(SolutionInteraction.find).mockReturnValue({ select } as never);

    const state = await getInteractedSolutionIdSets([
      '64b000000000000000000001',
      '64b000000000000000000002',
      '64b000000000000000000003',
    ]);

    expect([...state.likedSolutionIds]).toEqual(['64b000000000000000000001']);
    expect([...state.viewedSolutionIds]).toEqual(['64b000000000000000000002']);
    expect(SolutionInteraction.find).toHaveBeenCalledWith({
      solutionId: {
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
    expect(select).toHaveBeenCalledWith('solutionId type liked');
  });

  it('does not query interactions when no visitor key exists', async () => {
    mockCookie();
    await expect(getLikedSolutionIdSet(['64b000000000000000000001'])).resolves.toEqual(new Set());
    expect(SolutionInteraction.find).not.toHaveBeenCalled();
  });
});
