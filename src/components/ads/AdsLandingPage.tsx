import type { AdsLandingPage as AdsLandingPageData } from '@/content/ads/pages';
import AdsLeadForm from '@/components/ads/AdsLeadForm';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { getDictionary } from '@/lib/i18n';
import { supportedLocaleCodes } from '@/lib/locales';
import { getOwnedLocaleUrl } from '@/lib/siteRouting';
import styles from '@/components/ads/ads.module.css';

/**
 * Shared second screen. Per the approved plan every /ads/ page renders the same
 * capability cards, case numbers, LOGO placeholder, reading frame and closing
 * call-to-action; per-page copy comes from the registry alone. Case numbers
 * reproduce the fastgpt.cn /contact wording verbatim.
 *
 * Header and footer reuse the homepage components verbatim (client decision
 * amending ADR 0013): paid visitors get the full site chrome for trust, while
 * the landing body keeps the approved light Arco design. The homepage theme
 * scope (.home + HomeThemeFix) is what makes the chrome render identically.
 */

const WHY_SECTION = {
  title: '为什么选 FastGPT',
  subtitle: '四类服务：开源生态支持 · 专家咨询支持 · 搭建落地辅助 · 企业定制开发'
};

const WHY_CARDS = [
  {
    title: '知识库维护看得见',
    body: '一份正文可挂多条索引并各自独立编辑，训练队列失败可单条修复，检索历史可回溯，引用能定位到原文段落，解析、向量化、检索、生成的用量分阶段拆开。'
  },
  {
    title: '工作流能停下来等人',
    body: '流程中间需要人工确认时可暂停并原地恢复，状态可穿透子应用、工具与循环节点；代码执行走隔离沙箱。'
  },
  {
    title: '中国企业渠道原生覆盖',
    body: '企业微信、微信公众号、个人微信、飞书、钉钉与 iframe 嵌入均为原生支持，应用也可反向发布为 MCP Server，无需自建渠道适配层。'
  }
];

const CASE_SECTION = {
  title: '已经在跑的场景',
  subtitle: '上述场景与数据为 fastgpt.cn 官网现有表述'
};

const CASE_CARDS = [
  { title: '研发知识助手', metrics: '培训周期缩短 1 周以上 · 重复咨询降低 10% · 检索耗时 30 秒' },
  { title: '基金研报自动化', metrics: '自动化率超过 90% · 数据差错低于 1% · 制作耗时缩短 90%' },
  { title: 'OA 费用报销智能审核', metrics: '审核提效 50% · 异常检出提升 70% · 终审错误降低 60%' }
];

const LOGO_PLACEHOLDER = {
  title: '客户 LOGO 墙',
  body: '客户 LOGO 墙：需客户提供可公开授权的 LOGO 素材后替换本区块'
};

const READING_SECTION = {
  title: '延伸阅读',
  subtitle: '同一主题的深度内容，读完再决定要不要联系'
};

const CLOSING_NOTE_SUFFIX = '：填写表单后由解决方案顾问发送，并按你的场景给出落地建议。';
const CLOSING_LEGAL_NOTE =
  '版本能力与价格以官方文档与定价页当日页面为准。提交即表示同意《隐私政策》，联系方式仅用于本次咨询的回访。';

export default async function AdsLandingPage({ page }: { page: AdsLandingPageData }) {
  const dict = await getDictionary('zh');
  const t = dict.Home;
  // The navbar derives language switch targets from the current path, which on
  // /ads/{slug} would point at nonexistent localized ad routes; pin them to the
  // localized homepages — exactly what the homepage switcher resolves to.
  const languageSwitchPaths = Object.fromEntries(
    supportedLocaleCodes.map((locale) => [locale, getOwnedLocaleUrl(locale, '/')])
  );

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
        <div className={styles.page}>
          <div className={styles.hero}>
            <div className={`${styles.wrap} ${styles.heroWrap}`}>
              <div>
                <span className={styles.kwBadge}>{page.category}</span>
                <h1 className={styles.h1}>{page.h1}</h1>
                <p className={styles.subtitle}>{page.subtitle}</p>
                {page.sections.map((section) => (
                  <div className={styles.sec} key={section.heading}>
                    <h2 className={styles.secHeading}>{section.heading}</h2>
                    <p className={styles.secBody}>{section.body}</p>
                  </div>
                ))}
                <div className={styles.trust}>
                  <b className={styles.trustLabel}>事实来源</b>
                  <span>{page.trustLine}</span>
                </div>
              </div>

              <aside className={styles.aside} id="form">
                <AdsLeadForm copy={page.form} />
              </aside>
            </div>
          </div>

          <section className={styles.block}>
            <div className={styles.wrap}>
              <h2 className={styles.blockTitle}>{WHY_SECTION.title}</h2>
              <p className={styles.blockSub}>{WHY_SECTION.subtitle}</p>
              <div className={styles.grid3}>
                {WHY_CARDS.map((card) => (
                  <div className={styles.card} key={card.title}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardBody}>{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={`${styles.block} ${styles.blockAlt}`}>
            <div className={styles.wrap}>
              <h2 className={styles.blockTitle}>{CASE_SECTION.title}</h2>
              <p className={styles.blockSub}>{CASE_SECTION.subtitle}</p>
              <div className={styles.grid3}>
                {CASE_CARDS.map((card) => (
                  <div className={styles.card} key={card.title}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.caseMetrics}>{card.metrics}</p>
                  </div>
                ))}
              </div>
              {/* Structure reserved for the customer LOGO wall; replaced once
                  publishable logo assets are delivered. */}
              <div className={styles.logoPlaceholder}>
                <b className={styles.logoPlaceholderTitle}>{LOGO_PLACEHOLDER.title}</b>
                {LOGO_PLACEHOLDER.body}
              </div>
            </div>
          </section>

          <section className={styles.block}>
            <div className={styles.wrap}>
              <h2 className={styles.blockTitle}>{READING_SECTION.title}</h2>
              <p className={styles.blockSub}>{READING_SECTION.subtitle}</p>
              <ul className={styles.reads}>
                {page.readingLinks.map((link) => (
                  <li className={styles.readsItem} key={link.url}>
                    <a className={styles.readsLink} href={link.url}>
                      {link.label}
                    </a>
                    <span className={styles.readsUrl}>{link.url}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className={styles.closing}>
            <div className={styles.wrap}>
              <h2 className={styles.closingTitle}>{page.form.title}</h2>
              <p className={styles.closingNote}>
                {page.leadMagnet}
                {CLOSING_NOTE_SUFFIX}
              </p>
              <a className={`${styles.btn} ${styles.closingButton}`} href="#form">
                {page.form.button}
              </a>
              <p className={styles.closingLegal}>{CLOSING_LEGAL_NOTE}</p>
              <p className={styles.closingLegal}>页面更新：{page.updatedAt}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer t={t.footer} locale="zh" />
    </div>
  );
}
