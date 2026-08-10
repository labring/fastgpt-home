import { createComparisonPage } from './loader';
import type { ComparisonPage, ComparisonPagesByLocale } from './types';

export const selfBuildComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'self-build-vs-platform',
  lang: 'zh',
  status: 'published',
  title: '自研或直接跑开源与用平台怎么选：四组必算成本',
  description:
    '自研或直接跑开源与平台方案的差异在长期人力、运行时、安全治理、运维升级和原厂支持。用同一份三年需求清单核算人天、基础设施、许可与服务责任，再决定自建或采购。',
  heroSummary:
    '已有平台工程团队并追求底层控制时，自研或直接跑开源更有空间；希望快速上线并获得成熟运行时、升级路径与支持渠道时，平台方案更匹配。',
  heroHighlights: [
    { label: '自研 / 开源', value: '底层控制与团队自运维' },
    { label: '平台方案', value: '现成运行时、升级路径与原厂支持' },
    { label: '验收重点', value: '三年 TCO、故障恢复、迁移成本' }
  ],
  keywords: ['自研成本', '三年 TCO', '平台工程', '原厂支持', '开源自托管'],
  sourceFile: 'self-build-vs-platform.md',
  dates: {
    datePublished: '2026-08-04',
    dateModified: '2026-08-08'
  },
  asset: {
    path: '/images/compare/self-build-vs-platform.svg',
    alt: '自研与平台方案的解析、运行时、安全和运维成本结构示意图',
    width: 1200,
    height: 630
  },
  ctaCopy: {
    primaryHeroCta: '核算自研长期成本',
    nextStepTitle: '核算平台工程、运维和升级成本',
    nextStepDescription: '从人力、运行时、安全治理、回滚与支持边界继续核对三年预算。',
    ctaTitle: '把平台工程人天算进预算',
    ctaButton: '建立三年成本表'
  },
  trustSignals: ['核验日期 2026-07-20', '基于官方公开资料', '按同条件 POC 验收'],
  contextualLinks: [
    { label: '对比页总览', target: '/zh/compare', locale: 'zh' },
    { label: '采购与支持边界对照', target: '/zh/compare/maxkb-vs-fastgpt', locale: 'zh' }
  ],
  internalLinks: [
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh' },
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh' }
  ],
  officialSource: 'https://doc.fastgpt.cn/'
});

export const selfBuildComparisonPages: ComparisonPagesByLocale = {
  zh: selfBuildComparisonPage,
  en: createComparisonPage({
    slug: 'self-build-vs-platform',
    lang: 'en',
    status: 'published',
    title: 'Self-Build vs Platform: Three-Year Build-vs-Buy TCO',
    description:
      'Compare self-build, open source, and platform options across labor, runtime, security, operations, upgrades, and support over three years. Keep TCO auditable.',
    heroSummary:
      'Self-building or running open source directly gives more room when a platform engineering team already exists and wants deep control. A platform solution fits teams that need fast launch, a mature runtime, an upgrade path, and support channels.',
    heroHighlights: [
      { label: 'Self-build / open source', value: 'Deep control and self-managed operations' },
      { label: 'Platform solution', value: 'Ready runtime, upgrade path, vendor support' },
      { label: 'Validation focus', value: 'Three-year TCO, failure recovery, migration cost' }
    ],
    keywords: ['self-build cost', 'three-year TCO', 'platform engineering', 'vendor support', 'open source self-hosting'],
    sourceFile: 'en/self-build-vs-platform.md',
    dates: {
      datePublished: '2026-08-04',
      dateModified: '2026-08-08'
    },
    asset: {
      path: '/images/compare/self-build-vs-platform.svg',
      alt: 'Cost-structure diagram for self-build and platform options across parsing, runtime, security, and operations',
      width: 1200,
      height: 630
    },
    ctaCopy: {
      primaryHeroCta: 'Model build-vs-buy cost',
      nextStepTitle: 'Model labor, runtime, security, and upgrade cost',
      nextStepDescription: 'Continue from platform engineering, operations, rollback, and support boundaries to validate the three-year budget.',
      ctaTitle: 'Put platform-engineering labor into the budget',
      ctaButton: 'Build the three-year cost table'
    },
    trustSignals: ['Verified on 2026-07-20', 'Based on official public sources', 'Validated through same-condition POC'],
    contextualLinks: [
      { label: 'Comparison hub', target: '/compare', locale: 'en' },
      { label: 'Dify plugin-ecosystem comparison', target: '/compare/dify-vs-fastgpt', locale: 'en' }
    ],
    internalLinks: [
      { label: 'MaxKB procurement comparison', target: '/compare/maxkb-vs-fastgpt', locale: 'en' },
      { label: 'RAGFlow document-parsing comparison', target: '/compare/ragflow-vs-fastgpt', locale: 'en' },
      { label: 'Official pricing page', target: '/price', locale: 'en' }
    ],
    officialSource: 'https://doc.fastgpt.cn/'
  })
};

export default selfBuildComparisonPage;
