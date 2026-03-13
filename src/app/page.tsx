import Ability from '@/components/home/Ability';
import CTA from '@/components/home/CTA';
import FAQ from '@/components/home/FAQ';
import Feature from '@/components/home/Feature';
import Hero from '@/components/home/Hero';
import VideoPlayer from '@/components/home/Video';
import Header from '@/components/header/Header';
import JsonLd from '@/components/JsonLd';
import { defaultLocale, getDictionary, getConfigForLocale } from '@/lib/i18n';
import { getAlternates } from '@/lib/seo';
import { getGitHubStars } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const config = getConfigForLocale(defaultLocale);

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: getAlternates(defaultLocale, '')
  };
}

export default async function RootPage() {
  const dict = await getDictionary(defaultLocale);
  const stars = await getGitHubStars();

  return (
    <>
      <JsonLd lang={defaultLocale} />
      <Header dict={dict} CTALocale={dict.CTAButton} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        <div className="mx-4 sm:mx-6 md:mx-12 xl:mx-[60px] 2xl:max-w-7xl 2xl:mx-auto flex flex-col items-center margin-top-40">
          <Hero locale={dict.Hero} CTALocale={dict.CTAButton} stars={stars} />
          <VideoPlayer locale={dict.Video} dict={dict} />
          <Ability id="Ability" locale={dict.Ability} langName={defaultLocale} />
          <Feature id="Features" locale={dict.Feature} langName={defaultLocale} />
          <FAQ id="FAQ" locale={dict.FAQ} langName={defaultLocale} />
          <CTA locale={dict.CTA} CTALocale={dict.CTAButton} stars={stars} />
        </div>
      </main>
    </>
  );
}
