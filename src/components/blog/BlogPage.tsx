import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import type { BlogPost } from '@/content/blog';

import { BLOG_PAGE_SIZE, toBlogListPost } from './blogPagination';
import { getBlogCopy } from './blogCopy';
import AllPostsSection from './sections/AllPostsSection';
import HighlightsSection from './sections/HighlightsSection';
import HeroSection from './sections/HeroSection';

export default function BlogPage({
  dict,
  locale,
  posts
}: {
  dict: any;
  locale: string;
  posts: BlogPost[];
}) {
  const copy = getBlogCopy(locale);
  const listPosts = posts.map(toBlogListPost);

  return (
    <div className="home overflow-x-hidden">
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={locale} />

      <main className="bg-white">
        <HeroSection
          eyebrow={copy.eyebrow}
          title={copy.heroTitle}
          description={copy.heroDescription}
        />
        <HighlightsSection
          posts={listPosts.slice(0, 3)}
          locale={locale}
          categoryLabels={copy.allPosts.categoryLabels}
        />
        <AllPostsSection
          posts={listPosts.slice(0, BLOG_PAGE_SIZE)}
          hasMore={listPosts.length > BLOG_PAGE_SIZE}
          locale={locale}
          copy={copy.allPosts}
        />
        <CTA t={dict.Home.cta} locale={locale} />
      </main>

      <Footer t={dict.Home.footer} locale={locale} />
    </div>
  );
}
