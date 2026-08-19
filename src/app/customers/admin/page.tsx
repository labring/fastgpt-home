import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  redirect('/customers/admin/customers');
}
