'use client';

import { formatGitHubStarsInThousands } from '@/lib/githubStarsDisplay';

interface StatsProps {
  stars?: number;
  t: { items: { label: string; desc: string }[] };
}

export default function Stats({ stars, t }: StatsProps) {
  const githubStarsK = formatGitHubStarsInThousands(stars);

  const stats = [
    { end: githubStarsK, decimals: 2, suffix: 'k', ...t.items[0] },
    { end: 800, decimals: 2, suffix: 'k', ...t.items[1] },
    { end: 1000, decimals: 0, suffix: '+', ...t.items[2] }
  ];

  return (
    <div className="py-[24px] md:py-[40px]">
      <div className="max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto">
        <div className="flex flex-col gap-[32px] items-center md:flex-row md:gap-0 md:items-start md:justify-between">
          {stats.map((stat, i) => (
            <StatItem key={`${stat.label}-${stat.end}`} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function StatItem({
  end,
  decimals,
  suffix,
  label,
  desc
}: {
  end: number;
  decimals: number;
  suffix: string;
  label: string;
  desc?: string;
  /** Kept for caller compatibility; stats render statically without entrance animation. */
  delay?: number;
}) {
  // Final value rendered directly so static HTML is complete and visible without JS.
  const formatted = decimals > 0 ? end.toFixed(decimals) : end.toLocaleString('en-US');

  return (
    <div
      className="flex flex-1 flex-col items-center text-center"
      style={{ rowGap: 24 }}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-[42px] font-normal leading-[42px] tracking-[-0.84px]" style={{ color: '#475569' }}>
          {formatted}
        </span>
        <span className="text-ink-sub text-[12px] md:text-[16px] leading-[18px] md:leading-[24px]">{suffix}</span>
      </div>
      <div className="flex flex-col items-center" style={{ rowGap: 24 }}>
        <p className="m-0 text-ink text-[16px] md:text-[20px] font-medium leading-[24px] md:leading-[28px] tracking-[-0.32px] md:tracking-[-0.4px]">
          {label}
        </p>
        {desc && (
          <p className="text-ink-sub text-[12px] md:text-[16px] leading-[18px] md:leading-[24px]">{desc}</p>
        )}
      </div>
    </div>
  );
}
