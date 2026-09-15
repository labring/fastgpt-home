import BlogListPage from '@/components/blog/BlogPage';
import { getPublishedBlogs } from '@/content/blog';
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
  return <BlogListPage dict={dict} locale={langName} posts={posts} />;
}

export async function generateStaticParams() {
  return getBuildLocaleCodes().map((lang) => ({ lang }));
}
