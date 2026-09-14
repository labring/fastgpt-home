import 'server-only';

import Image from 'next/image';
import Link from 'next/link';
import { MDXContent } from '@content-collections/mdx/react';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getBlog, resolveBlogLocale } from '@/content/blog';
import { getBlogCanonicalUrl } from '@/lib/blogSeo';
import { getDictionary } from '@/lib/i18n';
import { getOwnedLocaleUrl, getReviewLocalePath } from '@/lib/siteRouting';

function getImageUrl(locale: string, thumbnail?: string) {
  if (!thumbnail) return undefined;
  return /^https?:\/\//i.test(thumbnail) ? thumbnail : getOwnedLocaleUrl(locale, thumbnail);
}

export default async function BlogArticleRoute({ locale, slug }: { locale: string; slug: string }) {
  const { contentLocale, isFallback } = resolveBlogLocale(locale);
  const post = getBlog(locale, slug);
  if (!post) return null;

  const dict = await getDictionary(locale);
  const canonical = getBlogCanonicalUrl(locale, slug);
  const dateModified = post.dateModified || post.date;
  const image = getImageUrl(locale, post.thumbnail);

  return (
    <div className="home overflow-x-hidden">
      <ArticleJsonLd
        headline={post.title}
        description={post.summary}
        image={image}
        url={canonical}
        inLanguage={contentLocale === 'zh' ? 'zh-CN' : 'en-US'}
        authorName={post.authorRecord.name}
        datePublished={post.date.toISOString()}
        dateModified={dateModified.toISOString()}
      />
      <BreadcrumbJsonLd
        items={[
          { name: dict.JsonLd.breadcrumbHome, url: getOwnedLocaleUrl(locale) },
          { name: 'Blog', url: getOwnedLocaleUrl(locale, '/blog') },
          { name: post.title, url: canonical }
        ]}
      />
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} />
      <main
        className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16"
        data-blog-locale={locale}
        data-blog-content-locale={contentLocale}
        data-blog-locale-fallback={String(isFallback)}
      >
        <div className="mb-8 text-sm text-slate-500">
          <Link href={getReviewLocalePath(locale, '/blog')} className="hover:text-blue-600">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span>{post.category}</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article>
            <header className="mb-10 border-b border-slate-200 pb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {post.category}
              </p>
              <h1 className="text-4xl font-bold leading-tight text-slate-900">{post.title}</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">{post.summary}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500">
                <span>{post.authorRecord.name}</span>
                <time dateTime={post.date.toISOString()}>{post.date.toLocaleDateString()}</time>
              </div>
            </header>
            <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">
              <MDXContent code={post.mdx} />
            </div>
          </article>
          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5">
            <Image
              src={post.authorRecord.avatar}
              alt={post.authorRecord.name}
              width={72}
              height={72}
              className="mb-4 h-[72px] w-[72px] rounded-full object-cover"
            />
            <h2 className="font-semibold text-slate-900">{post.authorRecord.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{post.authorRecord.description}</p>
          </aside>
        </div>
      </main>
      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
