import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import ComparisonPage from '@/components/compare/ComparisonPage';
import { comparisonSlugs, getComparisonPage } from '@/content/competitor';
import { getDictionary } from '@/lib/i18n';
import { getCompareAlternates, getCompareCanonicalUrl } from '@/lib/seo';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';

export default async function CompetitorComparisonPage({
  params
}: {
  params: Promise<{ lang?: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const langName = lang || 'zh';
  if (langName !== 'zh') notFound();
  const page = getComparisonPage(slug);
  if (!page) notFound();
  const dict = await getDictionary('zh');
  const canonical = getCompareCanonicalUrl(page.slug);
  const siteBaseUrl = (process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io').replace(/\/$/, '');

  return (
    <div className="home overflow-x-hidden comparison-page-shell">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: `${siteBaseUrl}${getDefaultLocalePath('zh')}` },
          { name: page.title, url: canonical }
        ]}
      />
      <ArticleJsonLd
        headline={page.title}
        description={page.description}
        image={`https://fastgpt.cn${page.asset.path}`}
        url={canonical}
        inLanguage="zh-CN"
        datePublished={page.status === 'published' ? page.dates.datePublished : undefined}
        dateModified={page.dates.dateModified}
      />
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} />
      <main className="comparison-page">
        <ComparisonPage page={page} homeLabel="返回内容中心" />
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ lang: 'zh', slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const langName = lang || 'zh';
  const page = getComparisonPage(slug);
  if (!page || langName !== 'zh') {
    return { title: 'Comparison page not found', robots: { index: false, follow: false } };
  }
  const canonical = getCompareCanonicalUrl(page.slug);
  const image = `https://fastgpt.cn${page.asset.path}`;
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: getCompareAlternates(page.slug),
    robots: page.status === 'published' ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: canonical,
      locale: 'zh_CN',
      publishedTime: page.status === 'published' ? page.dates.datePublished : undefined,
      modifiedTime: page.dates.dateModified,
      images: [{ url: image, width: page.asset.width, height: page.asset.height, alt: page.asset.alt }]
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [image]
    }
  };
}
