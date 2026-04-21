'use client';

import { motion } from 'framer-motion';
import { Zap, Rocket, Trophy, FolderKanban } from 'lucide-react';
import SectionHeader from '@/components/home/SectionHeader';
import { StaggerContainer, StaggerItem } from '@/components/home/motion/Stagger';

const iconByKey: Record<string, typeof Zap> = {
  community: Zap,
  consult: Rocket,
  deploy: Trophy,
  custom: FolderKanban
};

type ServicesT = {
  badge: string;
  title: string;
  subtitle: string;
  items: { key: string; title: string; desc: string }[];
};

export default function Services({ t }: { t: ServicesT }) {
  const services = t.items.map((it) => ({ ...it, icon: iconByKey[it.key] ?? Zap }));

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-[min(92vw,1200px)] md:max-w-[min(75vw,1200px)] mx-auto">
        <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16 mt-10 md:mt-16">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-card-bg flex items-center justify-center mb-5"
                  >
                    <Icon size={22} className="text-ink" strokeWidth={1.8} />
                  </motion.div>
                  <div className='mb-2'><h4 className="t-card-title">{s.title}</h4></div>
                  <p className="t-card-desc">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
