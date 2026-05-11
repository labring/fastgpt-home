'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Tag,
  AudioLines,
  Users,
  Headphones,
  ListChecks,
  BarChart3,
  User,
  GraduationCap,
  ClipboardCheck,
  Receipt,
  FileText,
  ShieldCheck
} from 'lucide-react';
import SectionHeader from '@/components/home/SectionHeader';
import FadeIn from '@/components/home/motion/FadeIn';
import { assets } from '@/components/home/assets';
import { CONSULT_URL } from '@/components/home/hooks/useStartUrl';

const iconByKey: Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  assistant: Tag, report: AudioLines, training: Users,
  ticket: Headphones, copy: ListChecks, insight: BarChart3,
  resume: User, policy: GraduationCap, meeting: ClipboardCheck,
  expense: Receipt, contract: FileText, dd: ShieldCheck
};
const imageByTabKey: Record<string, string> = {
  sales: assets.solutions.sales,
  service: assets.solutions.service,
  hr: assets.solutions.hr,
  finance: assets.solutions.finance
};

type SolutionsT = {
  badge: string;
  title: string;
  subtitle: string;
  consult: string;
  tabs: {
    key: string;
    label: string;
    items: { key: string; title: string; desc: string }[];
  }[];
};

export default function Solutions({ t }: { t: SolutionsT }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = t.tabs.map((tab) => ({
    ...tab,
    image: imageByTabKey[tab.key],
    items: tab.items.map((it) => ({ ...it, icon: iconByKey[it.key] }))
  }));
  const current = tabs[activeTab];

  return (
    <section className="py-[48px] px-[8px] md:py-[80px] md:px-[32px] bg-white">
      <div className="max-w-[min(92vw,960px)] md:max-w-[min(85vw,960px)] mx-auto flex flex-col" style={{ rowGap: 32 }}>
        <div className="px-[16px] md:px-0">
          <SectionHeader badge={t.badge} title={t.title} subtitle={t.subtitle} />
        </div>

        {/* Desktop (lg+): tabs with active pill + image + CTA */}
        <FadeIn delay={0.5} className="hidden lg:block">
          <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar">
            <div
              className="inline-flex items-center"
              style={{
                backgroundColor: 'rgba(245, 245, 255, 0.6)',
                border: '1px solid rgb(212, 212, 212)',
                borderRadius: 30,
                padding: 4
              }}
            >
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className="relative inline-flex items-center justify-center"
                  style={{
                    padding: '12px 20px',
                    borderRadius: 30,
                    fontSize: 12,
                    fontWeight: activeTab === i ? 500 : 400,
                    color: activeTab === i ? 'rgb(35, 35, 41)' : 'rgb(137, 137, 154)',
                    transition: 'color 0.2s'
                  }}
                >
                  {activeTab === i && (
                    <motion.span
                      layoutId="solutions-active-pill"
                      className="absolute inset-0"
                      style={{ backgroundColor: 'rgb(255, 255, 255)', borderRadius: 30, zIndex: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35, mass: 0.8 }}
                    />
                  )}
                  <span className="relative" style={{ zIndex: 1 }}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-10 items-start">
            <div className="min-w-0 grow basis-0">
              <div className="relative mb-8">
                <p className="text-[14px] font-medium text-ink-sub tracking-[-0.2px]">{current.label}</p>
              </div>

              <div className="space-y-8">
                {current.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3">
                      <Icon size={18} className="text-ink-sub mt-1 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <h4 className="t-card-title mb-1">{item.title}</h4>
                        <p className="t-card-desc">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 relative w-fit">
                <div
                  aria-hidden
                  className="pointer-events-none absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: 420,
                    height: 260,
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(60px)',
                    opacity: 0.75,
                    zIndex: 0
                  }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 220,
                      height: 220,
                      left: 20,
                      top: 20,
                      background: 'radial-gradient(circle, #FBD0DF 0%, rgba(251, 208, 223, 0) 70%)'
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 240,
                      height: 240,
                      right: 10,
                      top: 0,
                      background: 'radial-gradient(circle, #D4D6FF 0%, rgba(212, 214, 255, 0) 70%)'
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 200,
                      height: 200,
                      left: 110,
                      bottom: 0,
                      background: 'radial-gradient(circle, #EFD6FF 0%, rgba(239, 214, 255, 0) 70%)'
                    }}
                  />
                </div>
                <a
                  href={CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="relative inline-flex px-8 py-3 rounded-full text-[13px] font-medium text-white w-fit bg-btn-dark hover:opacity-90 transition-opacity"
                  style={{ zIndex: 1 }}
                >
                  {t.consult}
                </a>
              </div>
            </div>

            <div className="min-w-0 grow-[2] basis-0">
              <img src={current.image} alt={current.label} className="w-full h-auto block" />
            </div>
          </div>
        </FadeIn>

        {/* Mobile/Tablet: no tabs, no CTA. One featured solution per tab */}
        <FadeIn delay={0.5} className="lg:hidden">
          <div className="flex flex-col gap-12">
            {tabs.map((tab) => {
              const item = tab.items[0];
              return (
                <div key={tab.key} className="flex flex-col gap-4">
                  <img
                    src={tab.image}
                    alt={item.title}
                    className="w-full h-auto block rounded-xl"
                    draggable={false}
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-2 px-[8px]">
                    <h4 className="text-[16px] font-semibold leading-[24px] tracking-[-0.32px]" style={{ color: '#475569' }}>
                      {item.title}
                    </h4>
                    <p className="text-[16px] leading-[24px] tracking-[-0.16px]" style={{ color: '#475569', opacity: 0.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
