import { beforeEach, describe, expect, it, vi } from 'vitest';
import SolutionInteraction from '@/customers/models/SolutionInteraction';

vi.mock('@/customers/models/SolutionInteraction', () => ({
  default: {
    collection: {
      dropIndex: vi.fn(),
    },
  },
}));

describe('solution interaction index cleanup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('drops the legacy all-type TTL index', async () => {
    vi.mocked(SolutionInteraction.collection.dropIndex).mockResolvedValue({ ok: 1 } as never);
    const { dropLegacySolutionInteractionTtlIndex } = await import('./solution-interaction-indexes');

    await dropLegacySolutionInteractionTtlIndex();

    expect(SolutionInteraction.collection.dropIndex).toHaveBeenCalledWith('solution_interaction_ttl');
  });

  it('ignores missing legacy TTL indexes', async () => {
    vi.mocked(SolutionInteraction.collection.dropIndex).mockRejectedValue({ codeName: 'IndexNotFound' });
    const { dropLegacySolutionInteractionTtlIndex } = await import('./solution-interaction-indexes');

    await expect(dropLegacySolutionInteractionTtlIndex()).resolves.toBeUndefined();
  });
});
