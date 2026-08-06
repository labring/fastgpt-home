import { comparisonSlugs } from '@/content/competitor';

export { default, generateMetadata } from '@/app/[lang]/compare/[slug]/page';

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }));
}
