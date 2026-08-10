import { createComparisonPage } from './loader';
import type { ComparisonPage, ComparisonPagesByLocale } from './types';

export const difyComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'dify-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'Dify 与 FastGPT：四种项目的选型分野',
  description:
    'Dify 与 FastGPT 的差异集中在插件生态、知识工程、企业渠道、许可证和原厂支持。按项目的生态依赖与知识库运营要求筛选候选，再用同条件 POC 核对能力与交付责任。',
  heroSummary:
    '团队依赖全球插件和海外协作生态时，Dify 更匹配；知识库长期运营、文件型 Agent 与中国企业渠道是核心时，FastGPT 更匹配。',
  heroHighlights: [
    { label: 'Dify', value: '全球插件与海外协作生态' },
    { label: 'FastGPT', value: '知识工程、文件型 Agent 与中国渠道' },
    { label: '验收重点', value: '关键集成、知识库维护、责任矩阵' }
  ],
  keywords: ['Dify 对比', 'FastGPT', '平台选型', '原厂支持', '开源许可证'],
  sourceFile: 'dify-vs-fastgpt.md',
  dates: {
    datePublished: '2026-08-04',
    dateModified: '2026-08-08'
  },
  asset: {
    path: '/images/compare/dify-vs-fastgpt.svg',
    alt: 'Dify 与 FastGPT 的能力、验证与选型路径示意图',
    width: 1200,
    height: 630
  },
  ctaCopy: {
    primaryHeroCta: '核对插件与 SSO 边界',
    nextStepTitle: '核对插件、SSO 与采购边界',
    nextStepDescription: '从插件依赖、单点登录、审计和定价入口继续核对交付条件。',
    ctaTitle: '把生态依赖写进验收表',
    ctaButton: '设计插件生态 POC'
  },
  trustSignals: ['核验日期 2026-07-20', '基于官方公开资料', '按同条件 POC 验收'],
  contextualLinks: [
    { label: '对比页总览', target: '/zh/compare', locale: 'zh' },
    { label: '复杂文档解析对照', target: '/zh/compare/ragflow-vs-fastgpt', locale: 'zh' }
  ],
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh' },
    { label: '官方定价页', target: '/zh/price', locale: 'zh' }
  ],
  officialSource: 'https://docs.dify.ai/'
});

export const difyComparisonPages: ComparisonPagesByLocale = {
  zh: difyComparisonPage,
  en: createComparisonPage({
    slug: 'dify-vs-fastgpt',
    lang: 'en',
    status: 'published',
    title: 'Dify vs FastGPT: Plugin Ecosystem vs Knowledge Ops',
    description:
      'Compare Dify and FastGPT on plugins, knowledge ops, licensing, channels, and support. Use a same-condition POC to choose with evidence and acceptance criteria.',
    heroSummary:
      'Choose Dify when the team depends on a global plugin ecosystem and an overseas collaboration stack. Choose FastGPT when long-term knowledge-base operations, file-based Agents, and Chinese enterprise channels are core constraints.',
    heroHighlights: [
      { label: 'Dify', value: 'Global plugins and overseas collaboration' },
      { label: 'FastGPT', value: 'Knowledge engineering, file-based Agents, Chinese channels' },
      { label: 'Validation focus', value: 'Key integrations, knowledge operations, responsibility matrix' }
    ],
    keywords: ['Dify comparison', 'FastGPT', 'platform selection', 'vendor support', 'open source license'],
    sourceFile: 'en/dify-vs-fastgpt.md',
    dates: {
      datePublished: '2026-08-04',
      dateModified: '2026-08-08'
    },
    asset: {
      path: '/images/compare/dify-vs-fastgpt.svg',
      alt: 'Capability, validation, and selection path diagram for Dify and FastGPT',
      width: 1200,
      height: 630
    },
    ctaCopy: {
      primaryHeroCta: 'Check plugin and SSO fit',
      nextStepTitle: 'Check plugins, SSO, and procurement boundaries',
      nextStepDescription: 'Continue from ecosystem dependencies, SSO, audit needs, and pricing to validate delivery conditions.',
      ctaTitle: 'Turn ecosystem dependencies into POC checks',
      ctaButton: 'Design the plugin-ecosystem POC'
    },
    trustSignals: ['Verified on 2026-07-20', 'Based on official public sources', 'Validated through same-condition POC'],
    contextualLinks: [
      { label: 'Comparison hub', target: '/compare', locale: 'en' },
      { label: 'MaxKB procurement comparison', target: '/compare/maxkb-vs-fastgpt', locale: 'en' }
    ],
    internalLinks: [
      { label: 'RAGFlow document-parsing comparison', target: '/compare/ragflow-vs-fastgpt', locale: 'en' },
      { label: 'Build-vs-buy TCO model', target: '/compare/self-build-vs-platform', locale: 'en' },
      { label: 'Official pricing page', target: '/price', locale: 'en' }
    ],
    officialSource: 'https://docs.dify.ai/'
  })
};

export default difyComparisonPage;
