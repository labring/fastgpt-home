import JsonLd from '@/components/JsonLd';
import { defaultLocale, getDictionary } from '@/lib/i18n';

export default async function RootFAQLayout({ children }: { children: React.ReactNode }) {
  const dict = await getDictionary(defaultLocale);

  return (
    <>
      <JsonLd lang={defaultLocale} schema={dict.JsonLd} />
      {children}
    </>
  );
}
