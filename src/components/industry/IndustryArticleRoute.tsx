import { notFound } from 'next/navigation';

import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import IndustryArticlePage from '@/components/industry/IndustryArticlePage';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getDictionary } from '@/lib/i18n';
import { getIndustryArticle, type IndustryLocale } from '@/lib/industryContent';
import { getIndustryCanonicalUrl, getIndustryLanguage } from '@/lib/industrySeo';
import { getOwnedLocaleUrl, isPreviewSite } from '@/lib/siteRouting';

export async function IndustryArticleRoute({
  locale,
  slug
}: {
  locale: IndustryLocale;
  slug: string;
}) {
  const article = getIndustryArticle(locale, slug);
  if (!article) notFound();

  const dict = await getDictionary(locale);
  const canonical = getIndustryCanonicalUrl(article);
  return (
    <div className="home industry-article-page">
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(locale) },
          { name: article.title, url: canonical }
        ]}
      />
      <ArticleJsonLd
        headline={article.title}
        description={article.metaDescription}
        url={canonical}
        inLanguage={getIndustryLanguage(locale)}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
      />
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={dict.Home.navCta}
        locale={locale}
        publishedLocales={article.publishedLocales}
        reviewLocalePaths={isPreviewSite}
      />
      <IndustryArticlePage
        article={article}
        locale={locale}
        cta={{
          eyebrow: dict.FAQ.sidebarEyebrow,
          title: dict.FAQ.sidebarTitle,
          description: dict.FAQ.sidebarDescription,
          consultLabel: dict.Home.navCta.consult,
          trialLabel: dict.FAQ.sidebarCta
        }}
      />
      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
