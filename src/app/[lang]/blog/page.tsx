import CTA from '@/components/home/CTA';
import BlogCard from '@/components/blog/BlogCard';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { getPublishedBlogs, resolveBlogLocale } from '@/content/blog';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getAlternates, getRobotsPolicy, localeMap } from '@/lib/seo';
import { getBuildLocaleCodes } from '@/lib/siteRouting';
import { Metadata } from 'next';

const titleMap: Record<string, string> = {
  zh: 'FastGPT 博客 - AI 知识与行业洞察',
  'zh-hant': 'FastGPT 部落格 - AI 知識與產業洞察',
  en: 'FastGPT Blog - AI Insights and Knowledge',
  ja: 'FastGPT ブログ - AI に関する知見',
  ar: 'مدونة FastGPT - رؤى الذكاء الاصطناعي',
  vi: 'Blog FastGPT - Kiến thức và góc nhìn AI',
  th: 'บล็อก FastGPT - ความรู้และมุมมองด้าน AI',
  id: 'Blog FastGPT - Wawasan dan pengetahuan AI',
  ms: 'Blog FastGPT - Wawasan dan pengetahuan AI'
};

const descMap: Record<string, string> = {
  zh: '阅读 FastGPT 关于 AI Agent、企业知识库和智能应用的知识与行业洞察。',
  'zh-hant': '閱讀 FastGPT 關於 AI Agent、企業知識庫與智慧應用的知識與產業洞察。',
  en: 'Explore FastGPT insights on AI Agents, enterprise knowledge bases, and intelligent applications.',
  ja: 'AI Agent、企業ナレッジベース、インテリジェントアプリケーションに関するFastGPTの知見をご覧ください。',
  ar: 'اكتشف رؤى FastGPT حول وكلاء الذكاء الاصطناعي وقواعد المعرفة المؤسسية والتطبيقات الذكية.',
  vi: 'Khám phá những góc nhìn của FastGPT về AI Agent, cơ sở tri thức doanh nghiệp và ứng dụng thông minh.',
  th: 'สำรวจมุมมองของ FastGPT เกี่ยวกับ AI Agent ฐานความรู้สำหรับองค์กร และแอปพลิเคชันอัจฉริยะ',
  id: 'Jelajahi wawasan FastGPT tentang AI Agent, basis pengetahuan perusahaan, dan aplikasi cerdas.',
  ms: 'Terokai wawasan FastGPT tentang AI Agent, pangkalan pengetahuan perusahaan dan aplikasi pintar.'
};

const copyMap: Record<
  string,
  { eyebrow: string; title: string; description: string; empty: string }
> = {
  zh: {
    eyebrow: 'FastGPT Blog',
    title: 'AI 知识与行业洞察',
    description: '探索 AI Agent、企业知识库和智能应用的实践经验。',
    empty: '暂无已发布文章。'
  },
  en: {
    eyebrow: 'FastGPT Blog',
    title: 'AI insights for practical teams',
    description:
      'Explore practical ideas for AI Agents, enterprise knowledge bases, and intelligent applications.',
    empty: 'No published posts yet.'
  }
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const title = titleMap[langName] || titleMap.en;
  const description = descMap[langName] || descMap.en;
  return {
    title,
    description,
    alternates: getAlternates(langName, '/blog'),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: localeMap[langName] || 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    },
    robots: getRobotsPolicy(!(lang && langName === defaultLocale))
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);
  const posts = getPublishedBlogs(langName);
  const copy = copyMap[resolveBlogLocale(langName).contentLocale];

  return (
    <div className="home overflow-x-hidden">
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={langName} />

      <main>
        <section className="bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {copy.eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{copy.description}</p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={`${post.locale}/${post.slug}`} post={post} locale={langName} />
              ))}
            </div>
            {!posts.length && <p className="mt-12 text-slate-600">{copy.empty}</p>}
          </div>
        </section>
        <CTA t={dict.Home.cta} locale={langName} />
      </main>

      <Footer t={dict.Home.footer} locale={langName} />
    </div>
  );
}

export async function generateStaticParams() {
  return getBuildLocaleCodes().map((lang) => ({ lang }));
}
