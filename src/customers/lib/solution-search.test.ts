import { describe, expect, it } from 'vitest';
import {
  ADMIN_SORT_OPTIONS,
  filterAdminSolutions,
  normalizeAdminSolutionSortBy
} from './solution-search';

describe('solution search helpers', () => {
  it('uses recently edited as the default admin sort group', () => {
    expect(ADMIN_SORT_OPTIONS[0]).toMatchObject({
      id: 'updated',
      label: '最近编辑'
    });
    expect(normalizeAdminSolutionSortBy(null)).toBe('updated');
    expect(normalizeAdminSolutionSortBy('bad')).toBe('updated');
    expect(normalizeAdminSolutionSortBy('likes')).toBe('likes');
  });

  it('sorts admin solutions by updated time by default', () => {
    const items = [
      {
        title: '旧编辑',
        description: '',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-02T00:00:00.000Z'
      },
      {
        title: '新编辑',
        description: '',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-03T00:00:00.000Z'
      }
    ];

    expect(filterAdminSolutions(items, 'all', '').map((item) => item.title)).toEqual([
      '新编辑',
      '旧编辑'
    ]);
  });
});
