import { describe, expect, it, vi } from 'vitest';
import {
  publishSolutionInteractionPatch,
  subscribeSolutionInteractionPatches
} from './solution-interaction-events';

describe('solution interaction events', () => {
  it('publishes interaction patches to subscribers', () => {
    const listener = vi.fn();
    const unsubscribe = subscribeSolutionInteractionPatches(listener);

    publishSolutionInteractionPatch({
      id: 'solution-a',
      patch: {
        usage: '14',
        rawUsageCount: 14,
        hasViewed: true
      }
    });

    expect(listener).toHaveBeenCalledWith({
      id: 'solution-a',
      patch: {
        usage: '14',
        rawUsageCount: 14,
        hasViewed: true
      }
    });

    unsubscribe();
  });
});
