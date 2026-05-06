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
    <FadeIn className={`text-center flex flex-col items-center ${className}`} style={{ rowGap: 24 }}>
      <span className="inline-block px-4 py-1.5 rounded-full border border-hairline bg-white text-[12px] leading-[18px] text-ink-sub">
        {badge}
      </span>
      <h2
        className="
          text-ink font-semibold
          text-[28px] leading-[36px] tracking-[-0.56px]
          md:text-[64px] md:leading-[78px] md:tracking-[-1.92px]
        "
      >
        {title}
      </h2>
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
