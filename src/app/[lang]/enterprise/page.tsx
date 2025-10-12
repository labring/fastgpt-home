import { EAdvantages, ECTA, EHero, EModels, EPartners, ESolutions } from "@/components/enterprise";
import CTA from "@/components/home/CTA";
import { defaultLocale, getDictionary } from "@/lib/i18n";
import { getGitHubStars } from "@/lib/utils";

export default async function EnterprisePage({ params: { lang } }: { params: { lang?: string } }) {
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
