import 'server-only';

import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getBlog, getRelatedBlogs, resolveBlogLocale } from '@/content/blog';
import { getDictionary } from '@/lib/i18n';

import { toBlogListPost } from './blogPagination';
import ArticleLayoutSection from './sections/ArticleLayoutSection';

const copyMap = {
  en: {
    back: 'Back to blog',
    related: 'Related posts',
    readMore: 'Read article',
    categories: {
      product: 'Product updates',
      engineering: 'Technical insights',
      industry: 'Industry insights'
    },
    articleDate: (date: Date) =>
      new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
        date
      )
  },
  zh: {
    back: '返回',
    related: '相关文章',
    readMore: '阅读详情',
    categories: {
      product: '产品上新',
      engineering: '技术干货',
      industry: '行业洞察'
    },
    articleDate: (date: Date) =>
      new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(
        date
      )
  }
} as const;

export default async function BlogArticleRoute({ locale, slug }: { locale: string; slug: string }) {
  const localeResolution = resolveBlogLocale(locale);
  const post = getBlog(locale, slug);
  if (!post) return null;
  const dict = await getDictionary(locale);
  const copy = copyMap[localeResolution.contentLocale];
  const relatedPosts = getRelatedBlogs(post).map(toBlogListPost);
  const categoryLabels = copy.categories;

  return (
    <div className="home overflow-x-clip">
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} />

      <main className="bg-white text-slate-950">
        <ArticleLayoutSection
          post={post}
          locale={locale}
          backLabel={copy.back}
          categoryLabel={categoryLabels[post.category]}
          formatDate={copy.articleDate}
          relatedPosts={relatedPosts}
          relatedTitle={copy.related}
          relatedReadMoreLabel={copy.readMore}
          relatedCategoryLabels={categoryLabels}
          cta={{
            title: dict.FAQ.sidebarTitle,
            description: dict.FAQ.sidebarDescription,
            consultLabel: dict.Home.navCta.consult,
            trialLabel: dict.FAQ.sidebarCta
          }}
        />
        <CTA t={dict.Home.cta} locale={locale} />
      </main>

      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
