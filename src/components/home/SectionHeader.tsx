'use client';

import FadeIn from '@/components/home/motion/FadeIn';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  pillBg?: 'light' | 'white';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  className = ''
}: SectionHeaderProps) {
  return (
    <FadeIn className={`text-center ${className}`}>
      <span className="inline-block px-4 py-1.5 rounded-full border border-hairline bg-white text-[12px] leading-[18px] text-ink-sub">
        {badge}
      </span>
      <div className="my-4 md:my-5">
        <h2
          className="
            text-ink font-semibold
            text-[28px] leading-[36px] tracking-[-0.56px]
            md:text-[64px] md:leading-[78px] md:tracking-[-1.92px]
          "
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p
          className="
            text-ink-sub
            text-[15px] leading-[24px] tracking-[-0.15px]
            md:text-[20px] md:leading-[32px] md:tracking-[-0.2px]
          "
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
