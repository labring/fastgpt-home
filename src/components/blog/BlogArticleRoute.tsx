import 'server-only';

import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getBlog, getRelatedBlogs } from '@/content/blog';
import { getDictionary } from '@/lib/i18n';

import { toBlogListPost } from './blogPagination';
import { getBlogCopy } from './blogCopy';
import ArticleLayoutSection from './sections/ArticleLayoutSection';

export default async function BlogArticleRoute({ locale, slug }: { locale: string; slug: string }) {
  const post = getBlog(locale, slug);
  if (!post) return null;
  const dict = await getDictionary(locale);
  const copy = getBlogCopy(locale);
  const relatedPosts = getRelatedBlogs(post).map(toBlogListPost);
  const categoryLabels = copy.allPosts.categoryLabels;

  return (
    <div className="home overflow-x-clip">
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} />

      <main className="bg-white text-slate-950">
        <ArticleLayoutSection
          post={post}
          locale={locale}
          backLabel={copy.article.back}
          categoryLabel={categoryLabels[post.category]}
          formatDate={(date) =>
            new Intl.DateTimeFormat(copy.article.dateLocale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(date)
          }
          relatedPosts={relatedPosts}
          relatedTitle={copy.article.related}
          relatedReadMoreLabel={copy.allPosts.readMore}
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
