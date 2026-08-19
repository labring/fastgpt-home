import SettingsForm from '@/customers/components/admin/settings/SettingsForm';
import { getSystemSettings } from '@/app/customers/admin/actions/settings';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getSystemSettings();

  return <SettingsForm initialSettings={settings} />;
}
