import { beforeEach, describe, expect, it, vi } from 'vitest';
import CustomerInteraction from '@/customers/models/CustomerInteraction';

vi.mock('@/customers/models/CustomerInteraction', () => ({
  default: {
    collection: {
      dropIndex: vi.fn(),
    },
  },
}));

describe('customer interaction index cleanup', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('drops the legacy all-type TTL index', async () => {
    vi.mocked(CustomerInteraction.collection.dropIndex).mockResolvedValue({ ok: 1 } as never);
    const { dropLegacyCustomerInteractionTtlIndex } = await import('./customer-interaction-indexes');

    await dropLegacyCustomerInteractionTtlIndex();

    expect(CustomerInteraction.collection.dropIndex).toHaveBeenCalledWith('customer_interaction_ttl');
  });

  it('ignores missing legacy TTL indexes', async () => {
    vi.mocked(CustomerInteraction.collection.dropIndex).mockRejectedValue({ codeName: 'IndexNotFound' });
    const { dropLegacyCustomerInteractionTtlIndex } = await import('./customer-interaction-indexes');

    await expect(dropLegacyCustomerInteractionTtlIndex()).resolves.toBeUndefined();
  });
});
