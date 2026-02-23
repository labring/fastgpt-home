import { EAdvantages, ECTA, EHero, EModels, EPartners, ESolutions } from "@/components/enterprise";
import CTA from "@/components/home/CTA";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { getAlternates } from "@/lib/seo";
import { getGitHubStars } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = 'FastGPT 企业一体机 - 软硬一体 AI 解决方案';
  const description = 'FastGPT 企业一体机，软硬一体机交付，开箱即用的大模型与 FastGPT 企业一体机，搭配 Agent 企业级服务，快速助力企业大模型应用落地。';
  return {
    title,
    description,
    alternates: getAlternates('zh', '/enterprise'),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'zh_CN'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function EnterprisePage({ params }: { params: Promise<{ lang?: string }> }) {
  const { lang } = await params;
  // const langName = lang || defaultLocale;
  const langName = 'zh';
  const dict = await getDictionary(langName);
  const stars = await getGitHubStars();

  return (
    <>
      <EHero locale={dict.Enterprise} />
      <EModels locale={dict.Enterprise} langName={langName} />
      <EAdvantages locale={dict.Enterprise} langName={langName} />
      <ESolutions langName={langName} />
      <EPartners locale={dict.Enterprise} langName={langName} />
      <ECTA locale={dict.Enterprise} />
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} stars={stars} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'zh' }];
}
