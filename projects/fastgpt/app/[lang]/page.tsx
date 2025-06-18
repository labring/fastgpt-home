import Ability from '@/components/home/Ability';
import CTA from '@/components/home/CTA';
import FAQ from '@/components/home/FAQ';
import Feature from '@/components/home/Feature';
import Hero from '@/components/home/Hero';
// import SocialProof from '@/components/home/SocialProof';
import VideoPlayer from '@/components/home/Video';
import { defaultLocale, getDictionary } from '@/lib/i18n';
import { getGitHubStars } from '@/lib/utils';

export default async function HomePage({ params: { lang } }: { params: { lang?: string } }) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  const stars = await getGitHubStars();

  return (
    <>
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

      {/* CTA (Call to Action) Footer */}
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} stars={stars} />
    </>
  );
}
