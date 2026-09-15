import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { resolveBlogLocale, type BlogPost } from '@/content/blog';

import { BLOG_PAGE_SIZE, toBlogListPost } from './blogPagination';
import type { BlogListPost } from './blogPagination';
import AllPostsSection from './sections/AllPostsSection';
import HighlightsSection from './sections/HighlightsSection';
import HeroSection from './sections/HeroSection';

type BlogCopy = {
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  allPosts: {
    title: string;
    filters: { all: string; product: string; engineering: string };
    categoryLabels: Record<string, string>;
    search: string;
    readMore: string;
    loadMore: string;
    end: string;
    empty: string;
  };
};

const copyMap: Record<'en' | 'zh', BlogCopy> = {
  en: {
    eyebrow: 'Blog',
    heroTitle: 'FastGPT Blog',
    heroDescription: 'Product updates, technical practices, and practical AI Agent experience',
    allPosts: {
      title: 'All posts',
      filters: { all: 'All', product: 'Product updates', engineering: 'Technical insights' },
      categoryLabels: {
        product: 'Product updates',
        engineering: 'Technical insights',
        industry: 'Industry insights'
      },
      search: 'Search posts',
      readMore: 'Read article',
      loadMore: 'Load more',
      end: 'No more posts',
      empty: 'No posts match your filters.'
    }
  },
  zh: {
    eyebrow: '博客',
    heroTitle: 'FastGPT 博客',
    heroDescription: '产品动态、技术实践与 AI Agent 落地经验',
    allPosts: {
      title: '全部文章',
      filters: { all: '全部', product: '产品上新', engineering: '技术干货' },
      categoryLabels: { product: '产品上新', engineering: '技术干货', industry: '行业洞察' },
      search: '搜索文章',
      readMore: '阅读详情',
      loadMore: '加载更多',
      end: '已经到底啦',
      empty: '暂无匹配文章。'
    }
  }
};

export default function BlogPage({
  dict,
  locale,
  posts
}: {
  dict: any;
  locale: string;
  posts: BlogPost[];
}) {
  const copy = copyMap[resolveBlogLocale(locale).contentLocale];
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
