'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import { useContactUrl } from '@/components/home/hooks/useContactUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';
import { getLanguageTargets } from '@/lib/languageNavigation';
import { staticVideos, type Video } from './videos';
import styles from './LearningCenterPage.module.css';

type HomeFooter = ComponentProps<typeof Footer>['t'];
type NavLink = { label: string; href: string };
type NavCta = { trial: string; consult: string };

const homeLanguageSwitchPaths = Object.fromEntries(
  getLanguageTargets({ pathname: '/' }).map(({ locale, href }) => [locale, href])
);

interface Announcement {
  content: string;
  enabled: boolean;
}

interface Settings {
  heroTitle: string;
  heroDescription: string;
  heroBadge: string;
}

const categoryLabels: Record<Video['category'], string> = {
  'beginner-tutorial': '新手教学',
  'technical-tutorial': '技术教程',
  deployment: '部署教程',
  'feature-intro': '功能介绍',
  operations: '基础运维',
  'industry-cases': '行业案例',
  'customer-cases': '客户案例'
};

function VideoCover({ video, compact = false }: { video: Video; compact?: boolean }) {
  const label = video.series || categoryLabels[video.category];
  const format = video.type === 'doc' ? '官方文档' : '学习中心';
  const seriesIndex = video.series?.match(/·\s*(\d+)$/)?.[1];

  return (
    <div
      className={`${styles.codeCover} ${compact ? styles.codeCoverCompact : ''} ${
        video.type === 'doc' ? styles.codeCoverDocument : ''
      }`}
      role="img"
      aria-label={`${label}：${video.title}`}
    >
      <span className={styles.codeCoverGrid} aria-hidden="true" />
      <span className={styles.codeCoverArc} aria-hidden="true" />
      <div className={styles.codeCoverTop}>
        <span className={styles.codeCoverBrand}>
          <Image src="/logo-nav.svg" alt="" width={22} height={22} />
          <span>FastGPT</span>
        </span>
        <span className={styles.codeCoverFormat}>{format}</span>
      </div>
      <div className={styles.codeCoverBody}>
        <span className={styles.codeCoverSeries}>{label}</span>
        <h4>{video.title}</h4>
      </div>
      <div className={styles.codeCoverFooter}>
        <span>FASTGPT LEARNING CENTER</span>
        {seriesIndex ? <span className={styles.codeCoverIndex}>{seriesIndex}</span> : null}
      </div>
    </div>
  );
}

export default function VideosPage({
  locale,
  navLinks,
  navCta,
  footer
}: {
  locale: string;
  navLinks: NavLink[];
  navCta: NavCta;
  footer: HomeFooter;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const contactUrl = useContactUrl(locale);
  const videos = staticVideos;
  const announcement: Announcement = { content: '', enabled: false };
  const settings: Settings = {
    heroTitle: 'FastGPT 学习中心',
    heroDescription:
      '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有视频均由官方团队精心制作。',
    heroBadge: '持续更新中'
  };

  const filteredVideos =
    activeCategory === 'all' ? videos : videos.filter((v) => v.category === activeCategory);

  const featuredVideos = videos.filter((v) => v.featured).slice(0, 4);

  const levelText = {
    beginner: '入门',
    intermediate: '中级',
    advanced: '进阶'
  };

  return (
    <div className={styles.page}>
      <HomeThemeFix />
      <div className="home">
        <Navbar
          links={navLinks}
          t={navCta}
          locale={locale}
          languageSwitchPaths={homeLanguageSwitchPaths}
        />
      </div>
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroBadge}>
              <div className={styles.heroBadgeDot}></div>
              {settings.heroBadge || '持续更新中'} · 已有 {videos.length}+ 个教程
            </div>
            <h1>{settings.heroTitle || 'FastGPT 学习中心'}</h1>
            <p>
              {settings.heroDescription ||
                '从入门到精通，系统化学习 FastGPT 的使用技巧、部署方案和最佳实践。所有视频均由官方团队精心制作。'}
            </p>
            <div className={styles.heroActions}>
              <a
                className={styles.primaryCta}
                href={contactUrl}
                data-consultation-trigger="true"
                {...rybbitClickAttrs(
                  RYBBIT_EVENTS.businessConsultClick,
                  'learning_center_hero_consult'
                )}
              >
                商务咨询 <span aria-hidden="true">→</span>
              </a>
              <Link className={styles.secondaryCta} href="/">
                了解 FastGPT
              </Link>
            </div>
          </div>
        </section>

        {/* Banner - Featured Videos & Announcement */}
        {(announcement.enabled && announcement.content) || featuredVideos.length > 0 ? (
          <section>
            <div className={styles.container}>
              {announcement.enabled && announcement.content && (
                <div className={styles.announcement}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>{announcement.content}</span>
                </div>
              )}

              {featuredVideos.length > 0 && (
                <div className={styles.featuredSection}>
                  <h2 className={styles.featuredTitle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    推荐视频
                  </h2>
                  <div className={styles.featuredGrid}>
                    {featuredVideos.map((video, index) => {
                      const isDoc = video.type === 'doc';
                      return (
                        <a
                          key={video._id || index}
                          href={video.url}
                          className={styles.featuredCard}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            className={`${styles.featuredThumb} ${isDoc ? styles.docThumb : ''}`}
                          >
                            <VideoCover video={video} compact />
                            <div className={styles.featuredOverlay}>
                              <div className={styles.featuredPlayBtn}>
                                {isDoc ? (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                  </svg>
                                ) : (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={styles.featuredInfo}>
                            <h3>{video.title}</h3>
                            <p>{video.desc}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* Videos */}
        <section>
          <div className={styles.container}>
            <div className={styles.videoCategories}>
              <button
                className={`${styles.videoCatBtn} ${activeCategory === 'all' ? styles.active : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                全部
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'beginner-tutorial' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('beginner-tutorial')}
              >
                新手教学
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'technical-tutorial' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('technical-tutorial')}
              >
                技术教学教程
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'deployment' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('deployment')}
              >
                部署教程
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'feature-intro' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('feature-intro')}
              >
                功能介绍
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'operations' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('operations')}
              >
                基础运维教程
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'industry-cases' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('industry-cases')}
              >
                行业应用案例
              </button>
              <button
                className={`${styles.videoCatBtn} ${
                  activeCategory === 'customer-cases' ? styles.active : ''
                }`}
                onClick={() => setActiveCategory('customer-cases')}
              >
                客户案例
              </button>
            </div>

            <div className={styles.videoGrid}>
              {filteredVideos.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyStateIcon}>
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div className={styles.emptyStateText}>该分类暂无视频内容</div>
                </div>
              ) : (
                filteredVideos.map((video, index) => {
                  const isDoc = video.type === 'doc';
                  return (
                    <a
                      key={index}
                      href={video.url}
                      className={styles.videoCard}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={`${styles.videoThumb} ${isDoc ? styles.docThumb : ''}`}>
                        <VideoCover video={video} compact />
                        <div className={styles.videoPlayOverlay}>
                          <div className={styles.videoPlayBtn}>
                            {isDoc ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.videoInfo}>
                        <h3>{video.title}</h3>
                        <p className={styles.videoDesc}>{video.desc}</p>
                        <div className={styles.videoInfoMeta}>
                          <span
                            className={`${styles.videoLevel} ${
                              styles[
                                `level${video.level.charAt(0).toUpperCase() + video.level.slice(1)}`
                              ]
                            }`}
                          >
                            {levelText[video.level]}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section className={styles.leadCta} aria-label="商务咨询">
          <div className={styles.container}>
            <div className={styles.leadCtaInner}>
              <div>
                <span className={styles.leadCtaEyebrow}>FastGPT 商务支持</span>
                <h2>想把 AI 应用真正落地？</h2>
                <p>留下需求和联系方式，FastGPT 团队会为你提供架构建议与 POC 支持。</p>
              </div>
              <a
                className={styles.primaryCta}
                href={contactUrl}
                data-consultation-trigger="true"
                {...rybbitClickAttrs(
                  RYBBIT_EVENTS.businessConsultClick,
                  'learning_center_cta_consult'
                )}
              >
                开始咨询 <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={footer} locale={locale} />
    </div>
  );
}
