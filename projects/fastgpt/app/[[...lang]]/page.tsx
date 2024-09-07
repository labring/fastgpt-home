import Header from '@/components/header/Header';
import Ability from '@/components/home/Ability';
import CTA from '@/components/home/CTA';
import FAQ from '@/components/home/FAQ';
import Feature from '@/components/home/Feature';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
// import SocialProof from '@/components/home/SocialProof';
import VideoPlayer from '@/components/home/Video';
import { defaultLocale, getDictionary, localeNames } from '@/lib/i18n';

export default async function LangHome({ params: { lang } }: { params: { lang?: string[] } }) {
  let langName = lang && lang[0] && lang[0] !== 'index' ? lang[0] : defaultLocale;
  const dict = await getDictionary(langName);

  let stars = 13 * 1000;
  try {
    const { stargazers_count } = await (
      await fetch('https://api.github.com/repos/labring/FastGPT')
    ).json();
    if (stargazers_count) {
      stars = stargazers_count;
    }
  } catch (error) { }

  return (
    <>
      <Header dict={dict} />
      <main className="flex flex-col items-center mt-12 sm:mt-14 lg:mt-20">
        {/* Hero Section */}
        <Hero locale={dict.Hero} CTALocale={dict.CTAButton} stars={stars} />
        {/* <SocialProof locale={dict.SocialProof} /> */}
        {/* Can be used to display technology stack, partners, project honors, etc. */}
        {/*<ScrollingLogos />*/}
        <VideoPlayer dict={dict} />

        <Ability id="Ability" locale={dict.Ability} langName={langName} />

        {/* USP (Unique Selling Proposition) */}
        <Feature id="Features" locale={dict.Feature} langName={langName} />

        {/* Pricing */}
        {/* <Pricing id="Pricing" locale={dict.Pricing} langName={langName} /> */}

        {/* FAQ (Frequently Asked Questions) */}
        <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />

        {/* CTA (Call to Action) */}
        <CTA locale={dict.CTA} CTALocale={dict.CTAButton} stars={stars} />
      </main>
    </>
  );
}

export async function generateStaticParams() {
  const keys = Object.keys(localeNames).map((lang) => ({ lang: [lang] }));
  return [{ lang: [''] }, ...keys];
}
