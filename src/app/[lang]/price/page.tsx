import PFaq from '@/components/price/PFaq';
import PPlan from '@/components/price/PPlan';
import PTitle from '@/components/price/PTitle';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';
import { getAlternates, localeMap } from '@/lib/seo';
import { Metadata } from 'next';

const titleMap: Record<string, string> = {
  zh: 'FastGPT 定价 - 选择适合你的方案',
  en: 'FastGPT Pricing - Choose Your Plan',
  ja: 'FastGPT 料金プラン - あなたに最適なプランを選択'
};

const descMap: Record<string, string> = {
  zh: 'FastGPT 提供免费开源版和多种付费方案，满足个人开发者到企业级用户的不同需求。查看定价详情，选择最适合你的 AI Agent 构建方案。',
  en: 'FastGPT offers a free open-source version and multiple paid plans for individual developers to enterprise users. View pricing details and choose the best AI Agent building plan.',
  ja: 'FastGPTは無料オープンソース版と複数の有料プランを提供し、個人開発者からエンタープライズユーザーまで対応します。料金詳細を確認して最適なプランを選択してください。'
};

export async function generateMetadata(
  { params }: { params: Promise<{ lang?: string }> }
): Promise<Metadata> {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const title = titleMap[langName] || titleMap.en;
  const description = descMap[langName] || descMap.en;
  return {
    title,
    description,
    alternates: getAlternates(langName, '/price'),
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
    }
  };
}

export default async function Index({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <div className="flex flex-col items-center gap-10 pb-10">
      <PTitle locale={dict.Pricing} />

      <PPlan langName={langName} locale={dict.Pricing} />

      <PFaq langName={langName} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(localeNames).map((lang) => ({ lang }));
}
