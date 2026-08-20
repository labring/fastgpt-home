import 'server-only';

import CustomerInteraction from '@/customers/models/CustomerInteraction';

const LEGACY_TTL_INDEX_NAME = 'customer_interaction_ttl';

let cleanupPromise: Promise<void> | null = null;

export async function dropLegacyCustomerInteractionTtlIndex() {
  if (!cleanupPromise) {
    cleanupPromise = CustomerInteraction.collection
      .dropIndex(LEGACY_TTL_INDEX_NAME)
      .then(() => undefined)
      .catch((error: unknown) => {
        if (
          typeof error === 'object' &&
          error !== null &&
          'codeName' in error &&
          error.codeName === 'IndexNotFound'
        ) {
          return;
        }

        if (
          error instanceof Error &&
          /index not found|ns not found/i.test(error.message)
        ) {
          return;
        }

        console.warn('Failed to drop legacy CustomerInteraction TTL index:', error);
      });
  }

  return cleanupPromise;
}
