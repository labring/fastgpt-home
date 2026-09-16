import type { AdsCaseCard, AdsLandingPage as AdsLandingPageData } from '@/content/ads/pages';
import AdsLeadForm from '@/components/ads/AdsLeadForm';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import BrandWall from '@/components/home/BrandWall';
import SectionHeader from '@/components/home/SectionHeader';
import GradientBlobs from '@/components/home/GradientBlobs';
import FadeIn from '@/components/home/motion/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/home/motion/Stagger';
import Image from 'next/image';
import {
  ArrowUpRight,
  Clock3,
  FileText,
  Images,
  ListTree,
  MessagesSquare,
  Table2,
  Workflow
} from 'lucide-react';
import { getDictionary } from '@/lib/i18n';
import { supportedLocaleCodes } from '@/lib/locales';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';
import styles from '@/components/ads/ads.module.css';

/**
 * Bing Ads landing body, rebuilt in the homepage design language.
 *
 * Paid-traffic copy comes from the registry alone: category, H1, subtitle, the
 * three progressive paragraphs, trust line, form copy, reading links and the
 * update date render verbatim. Every other band is either a shared homepage
 * component (Navbar, Footer, SectionHeader, BrandWall, GradientBlobs, the
 * motion primitives) or a module constant in this file.
 *
 * Header and footer reuse the homepage components verbatim (client decision
 * amending ADR 0013): paid visitors get the full site chrome for trust. The
 * homepage theme scope (.home + HomeThemeFix) is what makes that chrome render
 * identically on this route.
 */

const CHECKLIST_SECTION = {
  badge: '对比清单',
  title: '这张对比表里有什么',
  subtitle: '从部署、知识库、工作流到授权边界，理清上线半年后的真实工程成本与选型痛点。'
};

/* Column labels for the per-page comparison table (registry cells carry the
   content; only the header chrome lives here). */
const COMPARE_TABLE_HEAD = {
  dimension: '对比项',
  dify: 'Dify',
  fastgpt: 'FastGPT'
};

const WHY_SECTION = {
  badge: '平台能力',
  title: '为什么选 FastGPT',
  subtitle: '四类服务：开源生态支持 · 专家咨询支持 · 搭建落地辅助 · 企业定制开发'
};

const WHY_CARDS = [
  {
    icon: ListTree,
    title: '知识库维护看得见',
    body: '一份正文可挂多条索引并各自独立编辑，训练队列失败可单条修复，检索历史可回溯，引用能定位到原文段落，解析、向量化、检索、生成的用量分阶段拆开。'
  },
  {
    icon: Workflow,
    title: '工作流能停下来等人',
    body: '流程中间需要人工确认时可暂停并原地恢复，状态可穿透子应用、工具与循环节点；代码执行走隔离沙箱。'
  },
  {
    icon: MessagesSquare,
    title: '中国企业渠道原生覆盖',
    body: '企业微信、微信公众号、个人微信、飞书、钉钉与 iframe 嵌入均为原生支持，应用也可反向发布为 MCP Server，无需自建渠道适配层。'
  }
];

/* Capability-card icons for a page-level `why` override; the order follows the
   comparison-page capability list (Skills lifecycle, agent file workspace,
   image knowledge base). */
const WHY_OVERRIDE_ICONS = [ListTree, FileText, Images];

const CASE_SECTION = {
  badge: '客户案例',
  title: '已经在跑的场景',
  subtitle: '已在金融、制造等行业关键业务场景落地，指标数据源自实际投产项目测算。'
};

/* Shared fallback cards for the published-deployments band; a page-level
   `cases` override (today: the Dify landing) replaces them with published
   customer cases from the customers surface. */
const CASE_CARDS: AdsCaseCard[] = [
  {
    image: '/images/home/cases/cases-new/案例2.webp',
    title: '研发知识助手',
    metrics: '培训周期缩短 1 周以上 · 重复咨询降低 10% · 检索耗时 30 秒'
  },
  {
    image: '/images/home/cases/cases-new/案例3.webp',
    title: '基金研报自动化',
    metrics: '自动化率超过 90% · 数据差错低于 1% · 制作耗时缩短 90%'
  },
  {
    image: '/images/home/cases/cases-new/案例4.webp',
    title: 'OA 费用报销智能审核',
    metrics: '审核提效 50% · 异常检出提升 70% · 终审错误降低 60%'
  }
];

const READING_SECTION = {
  badge: '深度内容',
  title: '延伸阅读',
  subtitle: '同一主题的深度内容，读完再决定要不要联系'
};

const CLOSING_NOTE_SUFFIX = '：填写表单后由解决方案顾问发送，并按你的场景给出落地建议。';
const CLOSING_LEGAL_NOTE =
  '版本能力与价格以官方文档与定价页当日页面为准。提交即表示同意《隐私政策》，联系方式仅用于本次咨询的回访。';

/* Card shadow shared by the body cards, matching the homepage card language. */
const CARD_SHADOW =
  'rgba(3, 7, 18, 0.04) 0px 2px 4px 0px, rgba(3, 7, 18, 0.08) 0px 1px 2px -1px, rgba(3, 7, 18, 0.08) 0px 0px 0px 1px';
const CONTAINER = 'max-w-[min(92vw,1300px)] md:max-w-[min(85vw,1300px)] mx-auto';
const PILL_DARK =
  'inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full border border-transparent bg-btn-dark px-8 text-[16px] font-medium tracking-[0.5px] text-white';
const PILL_LIGHT =
  'inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-full bg-btn-light-bg px-8 text-[16px] font-medium tracking-[0.5px] text-ink backdrop-blur-sm transition-colors hover:bg-white/80';

/* Decorative anchors for the three checklist cards; purely visual rhythm,
   no copy. Keys cycle if a registry page ever ships more sections. */
const SEC_ICONS = [FileText, Table2, Clock3];

export default async function AdsLandingPage({ page }: { page: AdsLandingPageData }) {
  const dict = await getDictionary('zh');
  const t = dict.Home;
  // The navbar derives language switch targets from the current path, which on
  // /ads/{slug} would point at nonexistent localized ad routes; pin them to the
  // localized homepages — exactly what the homepage switcher resolves to.
  const languageSwitchPaths = Object.fromEntries(
    supportedLocaleCodes.map((locale) => [locale, getOwnedLocaleUrl(locale, '/')])
  );
  // Pages without their own capability list keep the shared three cards.
  const whyCards = page.why?.cards ?? WHY_CARDS;
  // Pages without their own case list keep the shared three cards; a page-level
  // override swaps in published customer cases with links to the detail pages.
  const caseCards = page.cases?.cards ?? CASE_CARDS;

  return (
    <div className="home overflow-x-hidden">
      <HomeThemeFix />
      <Navbar
        links={dict.links}
        t={t.navCta}
        locale="zh"
        languageSwitchPaths={languageSwitchPaths}
      />
      <main className="m-0 p-0">
        {/* First screen — homepage hero rhythm: gradient blobs behind a
            two-column row (copy + lead form). The comparison table itself
            opens the checklist band below. */}
        <section className="relative pt-[120px] pb-[48px] md:pt-[160px] md:pb-[64px] bg-white overflow-clip">
          <GradientBlobs large />
          <div className={`relative ${CONTAINER} px-[16px] md:px-[32px]`} style={{ zIndex: 1 }}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_392px] gap-[40px] lg:gap-[56px] items-start">
              <FadeIn className="flex flex-col items-start gap-[24px]" distance={22} duration={0.65}>
                <span
                  className="inline-flex h-[30px] items-center gap-[8px] rounded-full border bg-white/70 px-[12px] text-[12px] leading-[18px]"
                  style={{
                    borderColor: '#e5e7eb',
                    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
                    color: 'rgb(71, 85, 105)'
                  }}
                >
                  {page.category}
                </span>
                <h1 className="m-0 text-ink font-semibold text-[32px] leading-[42px] tracking-[-0.96px] md:text-[52px] md:leading-[68px] md:tracking-[-1.56px]">
                  {page.h1}
                </h1>
                <p
                  className="m-0 text-[16px] leading-[26px] tracking-[-0.16px] md:text-[18px] md:leading-[32px]"
                  style={{ color: '#4b5563' }}
                >
                  {page.subtitle}
                </p>
                <div className="flex w-full flex-col items-stretch gap-[12px] sm:flex-row sm:items-center sm:gap-[16px]">
                  <a href="#form" className={PILL_DARK}>
                    {page.form.button}
                  </a>
                  <a
                    href="#checklist"
                    className={PILL_LIGHT}
                    style={{ border: '1px solid rgb(209, 213, 219)' }}
                  >
                    {CHECKLIST_SECTION.title}
                  </a>
                </div>
                <div className="flex max-w-[640px] items-start gap-[10px] rounded-[12px] border border-[#e5e7eb] bg-white/70 px-[16px] py-[12px]">
                  <span
                    className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-btn-dark"
                    aria-hidden="true"
                  />
                  <p className="m-0 text-[13px] leading-[20px]" style={{ color: 'rgb(71, 85, 105)' }}>
                    <b className="mr-[6px] font-semibold text-ink">事实来源</b>
                    {page.trustLine}
                  </p>
                </div>
              </FadeIn>

              <aside className="w-full" id="form">
                <FadeIn distance={18} delay={0.12} duration={0.6}>
                  <AdsLeadForm copy={page.form} />
                </FadeIn>
              </aside>
            </div>
          </div>
        </section>

        {/* Checklist: the three registry paragraphs, verbatim. */}
        <section
          className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-light-bg"
          id="checklist"
        >
          <div className={`${CONTAINER} flex flex-col gap-8 md:gap-12`}>
            <SectionHeader
              badge={CHECKLIST_SECTION.badge}
              title={CHECKLIST_SECTION.title}
              subtitle={page.checklistSubtitle ?? CHECKLIST_SECTION.subtitle}
            />
            {page.comparisonTable && (
              <FadeIn className="flex flex-col gap-[12px]" distance={20} duration={0.6}>
                <div className={styles.tableScroll}>
                  <table className={styles.compareTable}>
                    <thead>
                      <tr>
                        <th scope="col">{COMPARE_TABLE_HEAD.dimension}</th>
                        <th scope="col">{COMPARE_TABLE_HEAD.dify}</th>
                        <th scope="col">{COMPARE_TABLE_HEAD.fastgpt}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page.comparisonTable.rows.map((row) => (
                        <tr key={row.dimension}>
                          <th scope="row">{row.dimension}</th>
                          <td>{row.dify}</td>
                          <td>{row.fastgpt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Provenance line travels with the table: paid visitors get
                    the verification date and the source in the same view. */}
                <p className={styles.tableSource}>
                  {page.comparisonTable.sourceNote}
                  <a href={page.comparisonTable.sourceUrl}>{page.comparisonTable.sourceLabel}</a>
                </p>
              </FadeIn>
            )}
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-[16px]"
              initialDelay={0.15}
            >
              {page.sections.map((section, index) => {
                const Icon = SEC_ICONS[index % SEC_ICONS.length];
                return (
                  <StaggerItem className="h-full" key={section.heading} distance={26}>
                    <div
                      className="flex h-full flex-col gap-[12px] rounded-[12px] md:rounded-[16px] bg-white p-[24px] md:p-[28px]"
                      style={{ boxShadow: CARD_SHADOW }}
                    >
                      <span
                        className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-card-bg text-ink"
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <h3 className="t-card-title m-0">{section.heading}</h3>
                      <p className="t-card-desc m-0">{section.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Platform capabilities — the homepage card grid. A page-level `why`
            (today: the comparison landing page) swaps the three cards for its
            own capability list and adds the Dify-side verdict line. */}
        <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-white">
          <div className={`${CONTAINER} flex flex-col gap-8 md:gap-12`}>
            <SectionHeader
              badge={WHY_SECTION.badge}
              title={page.why?.title ?? WHY_SECTION.title}
              subtitle={page.why?.subtitle ?? WHY_SECTION.subtitle}
            />
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-[16px]"
              initialDelay={0.15}
            >
              {whyCards.map((card, index) => {
                const Icon = 'icon' in card ? card.icon : WHY_OVERRIDE_ICONS[index];
                return (
                  <StaggerItem className="h-full" key={card.title} distance={26}>
                    <div
                      className="flex h-full flex-col gap-[12px] rounded-[12px] md:rounded-[16px] p-[24px] md:p-[28px]"
                      style={{ background: 'rgb(248, 250, 252)', boxShadow: CARD_SHADOW }}
                    >
                      <span
                        className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] bg-white text-ink"
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <h3 className="t-card-title m-0">{card.title}</h3>
                      <p className="t-card-desc m-0">{card.body}</p>
                      {'verdict' in card && card.verdict && (
                        <p className={styles.cardVerdict}>
                          <span className={styles.cardVerdictLabel}>Dify 侧</span>
                          {card.verdict}
                        </p>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Published deployments — the same case figures the site already
            carries, restyled as homepage case cards. */}
        <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-light-bg">
          <div className={`${CONTAINER} flex flex-col gap-8 md:gap-12`}>
            <SectionHeader
              badge={page.cases?.badge ?? CASE_SECTION.badge}
              title={page.cases?.title ?? CASE_SECTION.title}
              subtitle={page.cases?.subtitle ?? CASE_SECTION.subtitle}
            />
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-[16px]"
              initialDelay={0.15}
            >
              {caseCards.map((card) => {
                const body = (
                  <>
                    <div
                      className={`relative overflow-hidden rounded-[10px] bg-card-bg ${
                        page.cases ? 'aspect-[640/334]' : 'aspect-[3/1]'
                      }`}
                    >
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 400px, 92vw"
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-[8px] px-[4px] pb-[8px]">
                      {'org' in card && card.org && (
                        <span className="text-[12px] leading-[18px]" style={{ color: '#64748b' }}>
                          {card.org}
                        </span>
                      )}
                      <h3 className="t-card-title m-0">{card.title}</h3>
                      <p className="m-0 text-[13px] leading-[20px]" style={{ color: '#475569' }}>
                        {card.metrics}
                      </p>
                    </div>
                  </>
                );
                const cardClass =
                  'flex h-full flex-col gap-[16px] rounded-[12px] md:rounded-[16px] bg-white p-[16px]';
                return (
                  <StaggerItem className="h-full" key={card.title} distance={26}>
                    {'url' in card && card.url ? (
                      <a
                        href={card.url}
                        className={`${cardClass} transition-colors hover:bg-light-bg`}
                        style={{ boxShadow: CARD_SHADOW }}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={cardClass} style={{ boxShadow: CARD_SHADOW }}>
                        {body}
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        <BrandWall t={t.brandWall} />

        {/* Deep reads — the three registry links. */}
        <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-white">
          <div className={`${CONTAINER} flex flex-col gap-8 md:gap-12`}>
            <SectionHeader
              badge={READING_SECTION.badge}
              title={READING_SECTION.title}
              subtitle={READING_SECTION.subtitle}
            />
            <ul className="m-0 grid list-none grid-cols-1 gap-[16px] p-0 md:grid-cols-3">
              {page.readingLinks.map((link, index) => (
                <FadeIn
                  as="li"
                  className="h-full"
                  key={link.url}
                  distance={16}
                  delay={index * 0.06}
                  duration={0.55}
                >
                  {/* The label stays the anchor's own leading text (the
                      decorative arrow is positioned absolutely) so the link
                      reads as one sentence in the exported HTML. */}
                  <a
                    href={link.url}
                    className="relative flex h-full flex-col gap-[10px] rounded-[16px] bg-light-bg p-[20px] pr-[44px] md:p-[24px] md:pr-[48px] transition-colors hover:bg-white"
                    style={{ boxShadow: CARD_SHADOW }}
                  >
                    {link.label}
                    <ArrowUpRight
                      className="absolute right-[20px] top-[20px] text-ink-sub"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </a>
                </FadeIn>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing call-to-action — homepage CTA card language. */}
        <section className="py-[48px] px-[16px] md:py-[80px] md:px-[32px] bg-light-bg">
          <FadeIn className="mx-auto w-full max-w-[min(92vw,1024px)]" distance={20} duration={0.6}>
            <div
              className="flex flex-col items-center gap-[20px] rounded-[24px] bg-white px-[24px] py-[40px] text-center md:px-[64px] md:py-[56px]"
              style={{ boxShadow: CARD_SHADOW }}
            >
              <h2 className="m-0 text-ink font-semibold text-[22px] leading-[30px] tracking-[-0.44px] md:text-[36px] md:leading-[48px] md:tracking-[-0.72px]">
                {page.form.title}
              </h2>
              <p className="m-0 max-w-[720px] text-[15px] leading-[26px] md:text-[16px]" style={{ color: '#475569' }}>
                {page.leadMagnet}
                {CLOSING_NOTE_SUFFIX}
              </p>
              <a href="#form" className={PILL_DARK}>
                {page.form.button}
              </a>
              <p className="m-0 max-w-[720px] text-[12px] leading-[20px]" style={{ color: '#64748b' }}>
                {CLOSING_LEGAL_NOTE}
              </p>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer t={t.footer} locale="zh" />
    </div>
  );
}
