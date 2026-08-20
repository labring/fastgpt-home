import { revalidatePath } from 'next/cache';

export function revalidateAdminRouteTree() {
  // The admin portal runs behind a dedicated `/admin` route tree, so invalidating
  // the admin layout clears router/cache state for dashboard, customer and category pages.
  revalidatePath('/customers/admin', 'layout');
}
