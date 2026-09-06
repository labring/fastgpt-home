import { getTechCenterPaginationParams } from '@/components/tech-center/data';
import { techPublishedLocaleCodes } from '@/lib/publishedLocales';
import { currentSiteVariant, getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

export { default, generateMetadata } from '../../page';

export function generateStaticParams() {
  const locales =
    currentSiteVariant === 'preview'
      ? techPublishedLocaleCodes
      : [getDefaultLocaleForSiteVariant(currentSiteVariant)];
  return locales.flatMap((lang) =>
    getTechCenterPaginationParams(lang).map((params) => ({ lang, ...params }))
  );
}

export const dynamicParams = false;
