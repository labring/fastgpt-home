import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getLikedSolutionState,
  getViewedSolutionState,
  LIKED_SOLUTIONS_STATE_KEY,
  saveLikedSolutionState,
  saveViewedSolutionState,
  VIEWED_SOLUTIONS_STATE_KEY
} from './likes';

describe('solution interaction local state', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('migrates legacy liked state without preserving counts', () => {
    localStorage.setItem('liked_solutions_state', JSON.stringify({
      solutionA: {
        isLiked: true,
        count: 999,
        timestamp: 1_767_225_600_000
      }
    }));

    expect(getLikedSolutionState('solutionA')).toEqual({
      isLiked: true,
      timestamp: 1_767_225_600_000
    });

    expect(localStorage.getItem(LIKED_SOLUTIONS_STATE_KEY)).toBe(JSON.stringify({
      solutionA: {
        isLiked: true,
        timestamp: 1_767_225_600_000
      }
    }));
  });

  it('saves liked state without count data', () => {
    saveLikedSolutionState('solutionA', true);
    const savedState = JSON.parse(localStorage.getItem(LIKED_SOLUTIONS_STATE_KEY) || '{}');

    expect(savedState.solutionA).toMatchObject({ isLiked: true });
    expect(savedState.solutionA).not.toHaveProperty('count');
  });

  it('migrates legacy viewed state to read interaction state', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T12:00:00+08:00'));
    localStorage.setItem('viewed_solutions_state', JSON.stringify({
      solutionA: {
        hasViewed: true,
        count: 999,
        timestamp: new Date('2026-01-01T09:00:00+08:00').getTime()
      }
    }));

    expect(getViewedSolutionState('solutionA')).toMatchObject({
      hasViewed: true,
      lastViewedDateKey: '2026-01-01'
    });

    const savedState = JSON.parse(localStorage.getItem(VIEWED_SOLUTIONS_STATE_KEY) || '{}');
    expect(savedState.solutionA).not.toHaveProperty('count');
  });

  it('keeps previous-day view state as read history', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-02T09:00:00+08:00'));
    localStorage.setItem(VIEWED_SOLUTIONS_STATE_KEY, JSON.stringify({
      solutionA: {
        hasViewed: true,
        lastViewedDateKey: '2026-01-01',
        timestamp: new Date('2026-01-01T09:00:00+08:00').getTime()
      }
    }));

    expect(getViewedSolutionState('solutionA')).toMatchObject({
      hasViewed: true,
      lastViewedDateKey: '2026-01-01'
    });
  });

  it('saves viewed state without count data', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T12:00:00+08:00'));
    saveViewedSolutionState('solutionA', true);
    const savedState = JSON.parse(localStorage.getItem(VIEWED_SOLUTIONS_STATE_KEY) || '{}');

    expect(savedState.solutionA).toMatchObject({
      hasViewed: true,
      lastViewedDateKey: '2026-01-01'
    });
    expect(savedState.solutionA).not.toHaveProperty('count');
  });
});
