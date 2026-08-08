import TechCenterPage from '@/components/tech-center/TechCenterPage';
import { TechCenterHubJsonLd } from '@/components/tech-center/TechCenterJsonLd';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { localeMap } from '@/lib/seo';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';
import { normalizeLocale } from '@/lib/locales';
import { Metadata } from 'next';

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
  zh: '面向开发与部署人员的 FastGPT 技术中心，按任务搜索 668 篇部署升级、知识库、工作流、集成与 API 内容。',
  'zh-hant': '瀏覽 FastGPT 部署升級、故障排查、知識庫、工作流節點、第三方整合與 API 技術指南。',
  en: 'Browse FastGPT guides for deployment, troubleshooting, knowledge bases, workflow nodes, integrations, and APIs.',
  ja: 'FastGPT のデプロイ、トラブルシューティング、RAG、ワークフロー、連携、API ガイドを閲覧できます。',
  ar: 'استعرض أدلة FastGPT للنشر واستكشاف الأخطاء وقواعد المعرفة وسير العمل والتكاملات وواجهات API.',
  vi: 'Khám phá hướng dẫn FastGPT về triển khai, xử lý sự cố, cơ sở tri thức, workflow, tích hợp và API.',
  th: 'ดูคู่มือ FastGPT สำหรับการติดตั้ง การแก้ปัญหา ฐานความรู้ เวิร์กโฟลว์ การเชื่อมต่อ และ API',
  id: 'Jelajahi panduan FastGPT untuk deployment, troubleshooting, knowledge base, workflow, integrasi, dan API.',
  ms: 'Terokai panduan FastGPT untuk deployment, penyelesaian masalah, knowledge base, aliran kerja, integrasi dan API.'
};

export default async function TechCenterRoute({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const locale = normalizeLocale(lang || defaultLocale);
  const dict = await getDictionary(locale);
  const title = titleMap[locale] || titleMap.en;
  const description = descriptionMap[locale] || descriptionMap.en;

  return (
    <>
      {locale === 'zh' && (
        <TechCenterHubJsonLd schema={dict.JsonLd} title={title} description={description} />
      )}
      <TechCenterPage
        locale={locale}
        links={dict.links}
        navCta={dict.Home.navCta}
        footer={dict.Home.footer}
      />
    </>
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = normalizeLocale(lang || defaultLocale);
  const title = titleMap[locale] || titleMap.en;
  const description = descriptionMap[locale] || descriptionMap.en;
  const canonical = getOwnedLocaleUrl(locale, '/tech-center');
  const baseUrl = new URL(canonical).origin;
  const indexable = locale === 'zh';

  return {
    title,
    description,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    alternates: { canonical },
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
  return Object.keys(localeNames).map((lang) => ({ lang }));
}
