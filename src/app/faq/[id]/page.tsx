import { getFaqIds } from '@/faq';
import { defaultLocale } from '@/lib/i18n';

export { default, generateMetadata } from '@/app/[lang]/faq/[id]/page';

export async function generateStaticParams() {
  return getFaqIds(defaultLocale).map((id) => ({ id }));
}

export const dynamicParams = false;
