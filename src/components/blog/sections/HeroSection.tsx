import BlogHero from '@/components/blog/components/BlogHero';

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function HeroSection(props: HeroSectionProps) {
  return <BlogHero {...props} />;
}
