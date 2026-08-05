import { faq } from '@/faq';

export { default, generateMetadata } from '@/app/[lang]/faq/[id]/page';

export async function generateStaticParams() {
  return Object.keys(faq).map((id) => ({ id }));
}

export const dynamicParams = false;
