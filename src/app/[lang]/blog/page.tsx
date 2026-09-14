import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';
import GradientBlobs from '@/components/home/GradientBlobs';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getAlternates, getRobotsPolicy, localeMap } from '@/lib/seo';
import { getBuildLocaleCodes } from '@/lib/siteRouting';
import { Metadata } from 'next';

const titleMap: Record<string, string> = {
  zh: 'FastGPT 博客',
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
  zh: '产品动态、技术实践与 AI Agent 落地经验',
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

  return (
    <div className="home overflow-x-hidden">
      <HomeThemeFix />
      <Navbar links={dict.links} t={dict.Home.navCta} locale={langName} />

      <main>
        <section className="relative min-h-screen overflow-hidden bg-white">
          <div className="mx-auto relative container">
            <GradientBlobs />
          </div>
          <div className="relative z-[1] flex min-h-screen flex-col items-center justify-center px-[16px] pt-[64px] text-center">
            <h1 className="m-0 text-[48px] font-semibold leading-[1.2] tracking-[-1px] text-ink md:text-[64px]">
              FastGPT 博客
            </h1>
            <p className="mt-6 mb-0 text-[18px] leading-[30px] text-ink-sub md:text-[22px] md:leading-[34px]">
              产品动态、技术实践与 AI Agent 落地经验
            </p>
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
