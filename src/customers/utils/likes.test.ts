import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getLikedCustomerState,
  getViewedCustomerState,
  LIKED_CUSTOMERS_STATE_KEY,
  saveLikedCustomerState,
  saveViewedCustomerState,
  VIEWED_CUSTOMERS_STATE_KEY
} from './likes';

describe('customer interaction local state', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useRealTimers();
  });

  it('migrates legacy liked state without preserving counts', () => {
    localStorage.setItem('liked_customers_state', JSON.stringify({
      customerA: {
        isLiked: true,
        count: 999,
        timestamp: 1_767_225_600_000
      }
    }));

    expect(getLikedCustomerState('customerA')).toEqual({
      isLiked: true,
      timestamp: 1_767_225_600_000
    });

    expect(localStorage.getItem(LIKED_CUSTOMERS_STATE_KEY)).toBe(JSON.stringify({
      customerA: {
        isLiked: true,
        timestamp: 1_767_225_600_000
      }
    }));
  });

  it('saves liked state without count data', () => {
    saveLikedCustomerState('customerA', true);
    const savedState = JSON.parse(localStorage.getItem(LIKED_CUSTOMERS_STATE_KEY) || '{}');

    expect(savedState.customerA).toMatchObject({ isLiked: true });
    expect(savedState.customerA).not.toHaveProperty('count');
  });

  it('migrates legacy viewed state to read interaction state', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T12:00:00+08:00'));
    localStorage.setItem('viewed_customers_state', JSON.stringify({
      customerA: {
        hasViewed: true,
        count: 999,
        timestamp: new Date('2026-01-01T09:00:00+08:00').getTime()
      }
    }));

    expect(getViewedCustomerState('customerA')).toMatchObject({
      hasViewed: true,
      lastViewedDateKey: '2026-01-01'
    });

    const savedState = JSON.parse(localStorage.getItem(VIEWED_CUSTOMERS_STATE_KEY) || '{}');
    expect(savedState.customerA).not.toHaveProperty('count');
  });

  it('keeps previous-day view state as read history', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-02T09:00:00+08:00'));
    localStorage.setItem(VIEWED_CUSTOMERS_STATE_KEY, JSON.stringify({
      customerA: {
        hasViewed: true,
        lastViewedDateKey: '2026-01-01',
        timestamp: new Date('2026-01-01T09:00:00+08:00').getTime()
      }
    }));

    expect(getViewedCustomerState('customerA')).toMatchObject({
      hasViewed: true,
      lastViewedDateKey: '2026-01-01'
    });
  });

  it('saves viewed state without count data', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T12:00:00+08:00'));
    saveViewedCustomerState('customerA', true);
    const savedState = JSON.parse(localStorage.getItem(VIEWED_CUSTOMERS_STATE_KEY) || '{}');

    expect(savedState.customerA).toMatchObject({
      hasViewed: true,
      lastViewedDateKey: '2026-01-01'
    });
    expect(savedState.customerA).not.toHaveProperty('count');
  });
});
