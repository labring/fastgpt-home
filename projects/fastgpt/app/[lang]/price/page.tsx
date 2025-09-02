import PFaq from '@/components/price/PFaq';
import PPlan from '@/components/price/PPlan';
import PTitle from '@/components/price/PTitle';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';

export default async function Index({ params: { lang } }: { params: { lang?: string } }) {
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
