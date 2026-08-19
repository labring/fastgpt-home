import { revalidatePath } from 'next/cache';
import {
  revalidatePublicIndexes,
  revalidateSolutionRefs
} from '@/customers/lib/public-cache-invalidation';

export function revalidateAdminRouteTree() {
  // The admin portal runs behind a dedicated `/admin` route tree, so invalidating
  // the admin layout clears router/cache state for dashboard, solution and category pages.
  revalidatePath('/customers/admin', 'layout');
}

export function revalidatePublicSolutionViews(solutionId?: string, categorySlug?: string) {
  if (solutionId) {
    revalidateSolutionRefs({ id: solutionId, categorySlug });
    return;
  }

  revalidatePublicIndexes();
}
