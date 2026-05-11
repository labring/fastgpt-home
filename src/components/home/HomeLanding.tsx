import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import TrustedBy from '@/components/home/TrustedBy';
import Stats from '@/components/home/Stats';
import ProductHighlights from '@/components/home/ProductHighlights';
import Solutions from '@/components/home/Solutions';
import CaseStudies from '@/components/home/CaseStudies';
import BrandWall from '@/components/home/BrandWall';
import Services from '@/components/home/Services';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';
import Footer from '@/components/home/Footer';

// Shared landing body used by both the root `/` and `/[lang]` home routes.
// Keeps the component tree in one place so the two page entries only have to
// resolve their locale/dict and pass data in.
export default function HomeLanding({
  dict,
  stars
}: {
  dict: any;
  stars: number;
}) {
  const t = dict.Home;
  return (
    <div className="home overflow-x-hidden">
      <HomeThemeFix />
      <Navbar links={dict.links} t={t.navCta} />
      <main className="m-0 p-0">
        <Hero stars={stars} t={t.hero}>
          <TrustedBy t={t.trustedBy} />
          <Stats stars={stars} t={t.stats} />
        </Hero>
        <ProductHighlights t={t.productHighlights} />
        <Solutions t={t.solutions} />
        <CaseStudies t={t.cases} />
        <BrandWall t={t.brandWall} />
        <Services t={t.services} />
        <FAQ t={t.faq} />
        <CTA t={t.cta} />
      </main>
      <Footer t={t.footer} />
    </div>
  );
}
