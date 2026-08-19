import 'server-only';

import SolutionInteraction from '@/customers/models/SolutionInteraction';

const LEGACY_TTL_INDEX_NAME = 'solution_interaction_ttl';

let cleanupPromise: Promise<void> | null = null;

export async function dropLegacySolutionInteractionTtlIndex() {
  if (!cleanupPromise) {
    cleanupPromise = SolutionInteraction.collection
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

        console.warn('Failed to drop legacy SolutionInteraction TTL index:', error);
      });
  }

  return cleanupPromise;
}
