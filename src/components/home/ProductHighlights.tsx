'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/home/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/home/motion/Stagger';
import { assets } from '@/components/home/assets';

type Item = { key: string; title: string; desc: string };
type ProductHighlightsT = {
  badge: string;
  title: string;
  subtitle: string;
  items: Item[];
};

const imageByKey: Record<string, string> = {
  blocks: assets.features.blocks,
  kb: assets.features.kb,
  lifecycle: assets.features.lifecycle,
  production: assets.features.production,
  partner: assets.features.partner
};

export default function ProductHighlights({ t }: { t: ProductHighlightsT }) {
  const features = t.items.map((it) => ({ ...it, image: imageByKey[it.key] }));

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto">
        <div className="mb-8 md:mb-10">
          <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />
        </div>

        <div className="max-w-full md:max-w-[85%] mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {features.slice(0, 2).map((f) => (
              <StaggerItem key={f.title}>
                <FeatureCard {...f} tall />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-4 md:mt-5" initialDelay={0.1}>
            {features.slice(2).map((f) => (
              <StaggerItem key={f.title}>
                <FeatureCard {...f} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  image,
  tall
}: {
  title: string;
  desc: string;
  image: string;
  tall?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group rounded-2xl bg-light-bg border border-hairline overflow-hidden h-full flex flex-col"
    >
      <div className={`${tall ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden bg-white`}>
        <motion.img
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h5 className="t-feature-title mb-2">{title}</h5>
        <p className="t-card-desc">{desc}</p>
      </div>
    </motion.div>
  );
}
