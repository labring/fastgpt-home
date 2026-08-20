import Customer from '@/customers/models/Customer';
import { isValidObjectId } from '@/customers/lib/object-id';

export function normalizeCustomerSlug(value: string) {
  return (value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function isValidCustomerSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export async function isCustomerSlugAvailable(
  slug: string,
  options: { excludeId?: string } = {}
) {
  const normalizedSlug = normalizeCustomerSlug(slug);
  if (!normalizedSlug) {
    return false;
  }

  const existingCustomer = await Customer.exists({
    slug: normalizedSlug,
    ...(options.excludeId && isValidObjectId(options.excludeId)
      ? { _id: { $ne: options.excludeId } }
      : {})
  });

  return !existingCustomer;
}
