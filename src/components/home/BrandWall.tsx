'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/home/SectionHeader';

type BrandWallT = { badge: string; title: string; subtitle: string };

export default function BrandWall({ t }: { t: BrandWallT }) {
  return (
    <section className="pt-8 md:pt-10 bg-white">
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto text-center">
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />
      </div>
      <div className="bg-light-bg">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8 md:mt-12 max-w-[min(92vw,1000px)] md:max-w-[min(70vw,1000px)] mx-auto py-10 md:py-20"
        >
          <img
            src="/images/home/brands/brand-wall.png"
            alt={t.title}
            loading="lazy"
            className="w-full select-none object-contain"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
