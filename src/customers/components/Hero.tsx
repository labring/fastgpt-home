'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import * as m from 'framer-motion/m';
import GradientBlobs from '@/components/home/GradientBlobs';
import { StatItem } from '@/components/home/Stats';
import { useStartUrl } from '@/components/home/hooks/useStartUrl';
import { formatGitHubStars } from '@/lib/githubStarsDisplay';
import { getCachedGitHubStars } from '@/lib/githubStarsClient';
import { getConsultationLinkProps } from '@customers/lib/consultation';

const GITHUB_URL = 'https://github.com/labring/FastGPT';

// 把「100+ / 50W+」这类展示字符串拆成 StatItem 需要的数值与后缀，复用主页滚动数字动效。
function parseStatValue(value: string) {
  const match = value.trim().match(/^([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { end: 0, suffix: '', decimals: 0 };
  const end = parseFloat(match[1].replace(/,/g, ''));
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  return { end, suffix: match[2] || '', decimals };
}

export default function Hero({
  overviewStats,
  stars
}: {
  overviewStats: { value: string; label: string; desc?: string }[];
  stars: number;
}) {
  const startUrl = useStartUrl();
  const [currentStars, setCurrentStars] = useState(stars);

  // 与主站首页 Hero 保持一致：浏览器运行时再 fetch 一次 GitHub Stars，
  // 覆盖 server 构建时可能的 fallback 值（构建环境拿不到 GitHub API 时）。
  useEffect(() => {
    const run = async () => {
      const nextStars = await getCachedGitHubStars(stars);
      if (nextStars !== stars) setCurrentStars(nextStars);
    };
    run();
  }, [stars]);

  const githubStarsLabel = formatGitHubStars(currentStars);
  const stats = overviewStats;
  const consultationLink = getConsultationLinkProps({ source: 'home_hero' });

  return (
    <section className="relative pt-[120px] pb-[48px] md:pt-[160px] md:pb-[48px] bg-white overflow-hidden">
      {/* 蓝紫渐变光斑：复用 home 的 GradientBlobs，large 尺寸与主页 Hero 一致 */}
      <GradientBlobs large colors={['#D4D6FF', '#C6DBFF', '#EFD6FF', '#B3D4FF']} />

      <div className="relative flex flex-col gap-[32px] md:gap-[50px]" style={{ zIndex: 1 }}>
        <div className="relative max-w-[min(92vw,1300px)] mx-auto flex flex-col items-center text-center gap-[50px] md:gap-[32px] px-[16px] md:px-[32px]">
          {/* GitHub 徽章（入场淡入） */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-[12px] h-[30px] px-[8px] rounded-full border border-[#e5e7eb] bg-white/70"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-ink"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="text-[12px] leading-[18px]" style={{ color: 'rgb(71, 85, 105)' }}>
              Github Stars {githubStarsLabel}
            </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-0.5 text-[12px] text-primary hover:text-primary-dark leading-[18px]"
            >
              关注我们
              <ArrowUpRight size={14} />
            </a>
          </m.div>

          {/* 品牌行 + 主标题 */}
          <div className="flex flex-col items-center">
            <m.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                color: 'rgb(78, 88, 130)'
              }}
              className="text-[40px] leading-[38px] tracking-[-1.2px] mb-[16px] md:mb-0 md:text-[58px] md:leading-[78px] md:tracking-[-1.74px]"
            >
              FastGPT
            </m.p>
            <h1 className="text-ink text-[40px] leading-[52px] tracking-[-1.2px] md:text-[58px] md:leading-[78px] md:tracking-[-1.74px] font-semibold">
              企业级 AI 解决方案
            </h1>
          </div>

          {/* 副标题（入场淡入） */}
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="w-full text-[18px] leading-[26px] md:leading-[32px] tracking-[-0.18px] max-w-xl"
            style={{ color: '#4b5563' }}
          >
            依托 FastGPT
            工作流引擎与知识库检索能力，我们将高频业务场景沉淀为标准化、可验证、可交付的 AI
            解决方案，帮助企业从场景评估、POC 验证到生产环境上线高效落地。
          </m.p>

          {/* CTA（入场淡入 + 按钮 hover/tap 缩放） */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center w-full sm:w-auto gap-[32px] sm:gap-8"
            data-hero-cta
          >
            <m.a
              {...consultationLink}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center h-11 w-full sm:w-auto sm:min-w-[128px] px-8 rounded-full text-[16px] font-medium text-white bg-btn-dark border border-transparent tracking-[0.5px]"
            >
              商务咨询
            </m.a>
            <m.a
              href={startUrl}
              rel="noopener noreferrer nofollow"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center h-11 w-full sm:w-auto sm:min-w-[128px] px-8 rounded-full text-[16px] font-medium text-ink bg-btn-light-bg tracking-[0.5px] backdrop-blur-sm hover:bg-white/80 transition-colors"
              style={{ border: '1px solid rgb(209, 213, 219)' }}
            >
              立即开始
            </m.a>
          </m.div>
        </div>

        {/* 统计条：复用主页 Stats 的 StatItem（滚动数字动效） */}
        {stats.length > 0 && (
          <div className="max-w-[min(92vw,1300px)] mx-auto w-full px-[16px] md:px-[32px]">
            <div className="flex flex-col gap-[32px] items-center md:flex-row md:gap-0 md:items-start md:justify-between">
              {stats.map((item, i) => {
                const { end, suffix, decimals } = parseStatValue(item.value);
                return (
                  <StatItem
                    key={item.label}
                    end={end}
                    decimals={decimals}
                    suffix={suffix}
                    label={item.label}
                    desc={item.desc}
                    delay={i * 0.12}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
