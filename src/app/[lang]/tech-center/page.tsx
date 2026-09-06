import TechCenterPage from '@/components/tech-center/TechCenterPage';
import { TechCenterHubJsonLd } from '@/components/tech-center/TechCenterJsonLd';
import {
  getCategoryMetaForLocale,
  getFeaturedEntryForLocale,
  getTechEntriesForLocale
} from '@/components/tech-center/data';
import { PAGE_SIZE } from '@/components/tech-center/constants';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { localeMap } from '@/lib/seo';
import {
  currentSiteVariant,
  getDefaultLocaleForSiteVariant,
  getLocaleHreflang,
  getOwnedLocaleUrl,
  getReviewLocalePath
} from '@/lib/siteRouting';
import { normalizeLocale } from '@/lib/locales';
import { techPublishedLocaleCodes, type TechPublishedLocale } from '@/lib/publishedLocales';
import { toTechSearchEntry } from '@/components/tech-center/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTechCenterPagePath } from '@/lib/technicalRouting';

type RouteParams = Promise<{ lang?: string; page?: string }>;

function getPageNumber(value: string | undefined, totalEntries: number) {
  if (value === undefined) return 1;
  const page = Number(value);
  if (
    !/^[1-9]\d*$/.test(value) ||
    !Number.isSafeInteger(page) ||
    page < 2 ||
    page > Math.ceil(totalEntries / PAGE_SIZE)
  ) {
    notFound();
  }
  return page;
}

function getPageTitle(locale: string, page: number) {
  const title = titleMap[locale] || titleMap.en;
  return page === 1 ? title : `${title} | ${locale === 'zh' ? `第 ${page} 页` : `Page ${page}`}`;
}

const titleMap: Record<string, string> = {
  zh: 'FastGPT 技术中心｜部署、升级、排错与 API 指南',
  'zh-hant': 'FastGPT 技術中心｜部署、知識庫、工作流與 API 指南',
  en: 'FastGPT Technical Center | Deployment, RAG, Workflows, and API Guides',
  ja: 'FastGPT テクニカルセンター｜デプロイ、RAG、ワークフロー、API ガイド',
  ar: 'مركز FastGPT التقني | أدلة النشر وRAG وسير العمل وواجهات API',
  vi: 'Trung tâm kỹ thuật FastGPT | Hướng dẫn triển khai, RAG, workflow và API',
  th: 'ศูนย์เทคนิค FastGPT | คู่มือการติดตั้ง RAG เวิร์กโฟลว์ และ API',
  id: 'Pusat Teknis FastGPT | Panduan deployment, RAG, workflow, dan API',
  ms: 'Pusat Teknikal FastGPT | Panduan deployment, RAG, aliran kerja dan API'
};

const descriptionMap: Record<string, string> = {
  'zh-hant': '瀏覽 FastGPT 部署升級、故障排查、知識庫、工作流節點、第三方整合與 API 技術指南。',
  en: 'Browse FastGPT guides for deployment, troubleshooting, knowledge bases, workflow nodes, integrations, and APIs.',
  ja: 'FastGPT のデプロイ、トラブルシューティング、RAG、ワークフロー、連携、API ガイドを閲覧できます。',
  ar: 'استعرض أدلة FastGPT للنشر واستكشاف الأخطاء وقواعد المعرفة وسير العمل والتكاملات وواجهات API.',
  vi: 'Khám phá hướng dẫn FastGPT về triển khai, xử lý sự cố, cơ sở tri thức, workflow, tích hợp và API.',
  th: 'ดูคู่มือ FastGPT สำหรับการติดตั้ง การแก้ปัญหา ฐานความรู้ เวิร์กโฟลว์ การเชื่อมต่อ และ API',
  id: 'Jelajahi panduan FastGPT untuk deployment, troubleshooting, knowledge base, workflow, integrasi, dan API.',
  ms: 'Terokai panduan FastGPT untuk deployment, penyelesaian masalah, knowledge base, aliran kerja, integrasi dan API.'
};

function getDescription(locale: string, totalEntries: number) {
  if (locale === 'zh') {
    return `面向开发与部署人员的 FastGPT 技术中心，按任务搜索 ${totalEntries} 篇部署升级、知识库、工作流、集成与 API 内容。`;
  }
  return descriptionMap[locale] || descriptionMap.en;
}

export default async function TechCenterRoute({ params }: { params: RouteParams }) {
  const { lang, page: pageParam } = await params;
  const locale = normalizeLocale(lang || defaultLocale);
  const dict = await getDictionary(locale);
  const localeEntries = getTechEntriesForLocale(locale);
  const page = getPageNumber(pageParam, localeEntries.length);
  const title = getPageTitle(locale, page);
  const description = getDescription(locale, localeEntries.length);
  const initialEntries = localeEntries
    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    .map(toTechSearchEntry);
  const categoryMeta = getCategoryMetaForLocale(locale);
  const featuredEntry = getFeaturedEntryForLocale(locale);

  return (
    <>
      {techPublishedLocaleCodes.includes(locale as TechPublishedLocale) &&
        localeEntries.length > 0 && (
          <TechCenterHubJsonLd
            schema={dict.JsonLd}
            title={title}
            description={description}
            locale={locale}
            page={page}
          />
        )}
      <TechCenterPage
        key={`${locale}-${page}`}
        locale={locale}
        links={dict.links}
        navCta={dict.Home.navCta}
        footer={dict.Home.footer}
        initialEntries={initialEntries}
        initialPage={page}
        featuredEntry={featuredEntry}
        categoryMeta={categoryMeta}
        totalEntries={localeEntries.length}
        languageSwitchPaths={Object.fromEntries(
          techPublishedLocaleCodes.map((lang) => [
            lang,
            currentSiteVariant === 'preview'
              ? getReviewLocalePath(lang, '/tech-center')
              : getOwnedLocaleUrl(lang, '/tech-center')
          ])
        )}
        searchIndexPath={
          locale === 'zh'
            ? '/tech-center/search-index.json'
            : `/tech-center/search-index.${locale}.json`
        }
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  const { lang, page: pageParam } = await params;
  const locale = normalizeLocale(lang || defaultLocale);
  const totalEntries = getTechEntriesForLocale(locale).length;
  const page = getPageNumber(pageParam, totalEntries);
  const title = getPageTitle(locale, page);
  const description = getDescription(locale, totalEntries);
  const hasPublishedEntries = totalEntries > 0;
  const canonical = getOwnedLocaleUrl(locale, getTechCenterPagePath(page));
  const baseUrl = new URL(canonical).origin;
  const indexable =
    techPublishedLocaleCodes.includes(locale as TechPublishedLocale) &&
    hasPublishedEntries &&
    currentSiteVariant !== 'preview';

  return {
    title,
    description,
    robots:
      currentSiteVariant === 'preview'
        ? { index: false, follow: false }
        : { index: indexable, follow: true },
    alternates: {
      canonical,
      languages: Object.fromEntries(
        (page === 1 ? techPublishedLocaleCodes : [locale]).map((publishedLocale) => [
          getLocaleHreflang(publishedLocale),
          getOwnedLocaleUrl(publishedLocale, getTechCenterPagePath(page))
        ])
      )
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: localeMap[locale] || 'en_US',
      url: canonical,
      images: [{ url: `${baseUrl}/opengraph-image.png` }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/twitter-image.png`]
    }
  };
}

export async function generateStaticParams() {
  return currentSiteVariant === 'preview'
    ? techPublishedLocaleCodes.map((lang) => ({ lang }))
    : [{ lang: getDefaultLocaleForSiteVariant(currentSiteVariant) }];
}

export const dynamicParams = false;
