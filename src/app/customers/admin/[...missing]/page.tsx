import { redirect } from 'next/navigation';

export default function MissingAdminPage() {
  redirect('/customers/admin');
}
