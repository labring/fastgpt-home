import { getTechCenterPaginationParams } from '@/components/tech-center/data';
import { currentSiteVariant, getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

export { default, generateMetadata } from '@/app/[lang]/tech-center/page';

export function generateStaticParams() {
  return getTechCenterPaginationParams(getDefaultLocaleForSiteVariant(currentSiteVariant));
}

export const dynamicParams = false;
