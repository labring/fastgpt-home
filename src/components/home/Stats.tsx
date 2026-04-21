'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function useCountUp(end: number, decimals = 0, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((eased * end).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, decimals, duration]);

  return { value, ref };
}

interface StatsProps {
  stars?: number;
  t: { items: { label: string; desc: string }[] };
}

export default function Stats({ stars, t }: StatsProps) {
  const githubStarsK = stars ? parseFloat((stars / 1000).toFixed(2)) : 26;

  const stats = [
    { end: githubStarsK, decimals: 2, suffix: 'k', ...t.items[0] },
    { end: 800, decimals: 2, suffix: 'k', ...t.items[1] },
    { end: 1000, decimals: 0, suffix: '+', ...t.items[2] }
  ];

  return (
    <section className="mt-0 md:mt-6 py-10 md:py-20 bg-white">
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto">
        <div className="flex flex-col gap-10 items-center md:flex-row md:gap-0 md:items-start md:justify-between">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  end,
  decimals,
  suffix,
  label,
  desc,
  delay
}: {
  end: number;
  decimals: number;
  suffix: string;
  label: string;
  desc: string;
  delay: number;
}) {
  const { value, ref } = useCountUp(end, decimals);
  const formatted = decimals > 0 ? value.toFixed(decimals) : value.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-1 flex-col items-center text-center"
      style={{ rowGap: 24 }}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-ink-sub text-[32px] md:text-[42px] font-normal leading-[36px] md:leading-[42px] tracking-[-0.64px] md:tracking-[-0.84px]">
          {formatted}
        </span>
        <span className="text-ink-sub text-[14px] md:text-[16px] leading-[20px] md:leading-[24px]">{suffix}</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-ink text-[20px] font-medium leading-[28px] tracking-[-0.4px]">
          {label}
        </h4>
        <p className="text-ink-sub text-[16px] leading-[24px]">{desc}</p>
      </div>
    </motion.div>
  );
}
