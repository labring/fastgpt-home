import { NextRequest } from 'next/server';
import { requireAdminApiAccess } from '@/customers/lib/admin-auth';

export async function requireAdminApi(request: NextRequest | Request) {
  return requireAdminApiAccess(request);
}
