'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/home/Hero';
import TrustedBy from '@/components/home/TrustedBy';
import Stats from '@/components/home/Stats';
import { getCachedGitHubStars } from '@/lib/githubStarsClient';

export default function HomeHeroSection({
  stars: initialStars,
  t
}: {
  stars: number;
  t: {
    hero: Parameters<typeof Hero>[0]['t'];
    trustedBy: Parameters<typeof TrustedBy>[0]['t'];
    stats: Parameters<typeof Stats>[0]['t'];
  };
}) {
  const [stars, setStars] = useState(initialStars);

  useEffect(() => {
    const run = async () => {
      const nextStars = await getCachedGitHubStars(initialStars);
      if (nextStars !== initialStars) {
        setStars(nextStars);
      }
    };
    run();
  }, [initialStars]);

  return (
    <Hero stars={stars} t={t.hero}>
      <TrustedBy t={t.trustedBy} />
      <Stats stars={stars} t={t.stats} />
    </Hero>
  );
}
