'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/home/motion/FadeIn';

type FaqItem = { title: string; content?: string; desc?: string };
type FaqT = {
  badge: string;
  badgeLink?: string;
  badgeLinkUrl?: string;
  title: string;
  subtitle?: string;
  viewMore?: string;
  viewMoreUrl?: string;
  items: FaqItem[];
};

function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-5 md:py-6 group"
        style={{ gap: 16 }}
      >
        <span
          className="text-[15px] md:text-[16px] font-medium leading-[24px] text-ink"
          style={{ flex: 1 }}
        >
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-slate-400"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4.1665V15.8332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4.1665 10H15.8332" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <p
              className="pb-5 md:pb-6 text-[14px] md:text-[15px] leading-[22px] md:leading-[24px]"
              style={{ color: 'rgb(71, 85, 105)' }}
            >
              {item.content || item.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ({ t }: { t: FaqT }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-white">
      <div className="max-w-[min(92vw,800px)] md:max-w-[min(50vw,800px)] mx-auto flex flex-col" style={{ rowGap: 40 }}>
        <FadeIn className="text-center flex flex-col items-center" style={{ rowGap: 24 }}>
          <span
            className="inline-flex flex-col md:flex-row items-center gap-0 md:gap-[12px] rounded-full border bg-white/40 text-[12px] leading-[18px]"
            style={{
              padding: '6px 12px',
              borderColor: '#e5e7eb',
              boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
              color: 'rgb(71, 85, 105)'
            }}
          >
            <span>{t.badge}</span>
            {t.badgeLink && t.badgeLinkUrl && (
              <a
                href={t.badgeLinkUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-0.5 text-primary hover:text-primary-dark"
              >
                {t.badgeLink}
              </a>
            )}
          </span>

          <h2 className="text-ink font-semibold text-[28px] leading-[36px] tracking-[-0.56px] md:text-[64px] md:leading-[78px] md:tracking-[-1.92px]">
            {t.title}
          </h2>

          {t.subtitle && (
            <p className="text-[15px] leading-[24px] tracking-[-0.15px] md:text-[20px] md:leading-[32px] md:tracking-[-0.2px]" style={{ color: '#292f38' }}>
              {t.subtitle}
            </p>
          )}
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-col" style={{ rowGap: 24 }}>
            <div className="bg-white" style={{ padding: '0 16px' }}>
              {t.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>

            {t.viewMore && t.viewMoreUrl && (
              <a
                href={t.viewMoreUrl}
                className="inline-flex items-center justify-center self-center transition-colors"
                style={{
                  height: 46,
                  padding: '0 16px',
                  borderRadius: 999,
                  border: '1px solid #d3d4d4',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'rgb(2, 6, 23)',
                  background: 'linear-gradient(#fff 0%, #f5f6f7 100%)'
                }}
              >
                {t.viewMore}
              </a>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
