import { describe, expect, it, vi } from 'vitest';
import {
  publishCustomerInteractionPatch,
  subscribeCustomerInteractionPatches
} from './customer-interaction-events';

describe('customer interaction events', () => {
  it('publishes interaction patches to subscribers', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeCustomerInteractionPatches(listener);

    publishCustomerInteractionPatch({
      id: 'customer-a',
      patch: {
        usage: '14',
        rawUsageCount: 14,
        hasViewed: true
      }
    });

    expect(listener).toHaveBeenCalledWith({
      id: 'customer-a',
      patch: {
        usage: '14',
        rawUsageCount: 14,
        hasViewed: true
      }
    });

    unsubscribe();
  });
});
