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
    <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-white">
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto flex flex-col" style={{ rowGap: 32 }}>
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <div className="w-full">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]" initialDelay={0.5}>
            {features.slice(0, 2).map((f) => (
              <StaggerItem key={f.title}>
                <FeatureCard {...f} tall />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] mt-[16px]" initialDelay={0.8}>
            {features.slice(2).map((f, i) => (
              <StaggerItem key={f.title}>
                <div className={i === features.slice(2).length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                  <FeatureCard {...f} />
                </div>
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
      className="rounded-[12px] md:rounded-[16px] bg-white overflow-hidden h-full flex flex-col p-[6px] md:p-[8px] gap-[12px] md:gap-[16px]"
    >
      <div className="overflow-hidden bg-white rounded-[6px] md:rounded-[8px]">
        <motion.img
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="pt-0 px-[12px] md:px-[16px] pb-[12px] md:pb-[16px]">
        <h5 className="t-feature-title mb-2">{title}</h5>
        <p className="t-card-desc" style={{ color: 'rgb(71, 85, 105)', opacity: 0.6 }}>{desc}</p>
      </div>
    </motion.div>
  );
}
