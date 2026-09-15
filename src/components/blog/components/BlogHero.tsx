import GradientBlobs from '@/components/home/GradientBlobs';

type BlogHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function BlogHero({ eyebrow, title, description }: BlogHeroProps) {
  return (
    <section className="container relative flex flex-col items-center gap-4 bg-white px-4 pt-32 text-center sm:px-8 md:pt-48">
      <div className="pointer-events-none absolute inset-0">
        <GradientBlobs large />
      </div>

      <span className="relative rounded-full bg-white/40 px-3 py-1.5 text-xs leading-5 text-ink-sub ring-1 ring-gray-200 shadow-sm">
        {eyebrow}
      </span>
      <h1 className="relative m-0 text-4xl font-medium leading-tight text-ink md:text-6xl">
        {title}
      </h1>
      <p className="relative m-0 text-base leading-6 text-ink-sub md:text-lg md:leading-8">
        {description}
      </p>
    </section>
  );
}
