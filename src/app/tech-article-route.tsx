import type { Metadata } from 'next';
import TechArticleRoute, {
  generateMetadata as generateTechArticleMetadata
} from '@/app/[lang]/[section]/[slug]/page';
import { getTechArticle, getTechArticleOwnerParams } from '@/lib/tech-center-content';
import { currentSiteVariant, getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

type RootTechArticleParams = { slug: string };

function getLocalizedParams(params: Promise<RootTechArticleParams>, section: string) {
  return params.then(({ slug }) => {
    const defaultLocale = getDefaultLocaleForSiteVariant(currentSiteVariant);
    const preferredLocale = defaultLocale === 'zh' ? 'zh' : 'en';
    return {
      lang: getTechArticle(section, slug, preferredLocale)
        ? preferredLocale
        : preferredLocale === 'en'
          ? 'zh'
          : 'en',
      section,
      slug
    };
  });
}

export function createRootTechArticleRoute(section: string) {
  return {
    Page({ params }: { params: Promise<RootTechArticleParams> }) {
      return TechArticleRoute({ params: getLocalizedParams(params, section) });
    },
    generateMetadata({ params }: { params: Promise<RootTechArticleParams> }): Promise<Metadata> {
      return generateTechArticleMetadata({ params: getLocalizedParams(params, section) });
    },
    generateStaticParams() {
      return getTechArticleOwnerParams(section);
    }
  };
}
