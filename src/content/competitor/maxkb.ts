import { createComparisonPage } from './loader';
import type { ComparisonPage, ComparisonPagesByLocale } from './types';

export const maxkbComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'maxkb-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'MaxKB 与 FastGPT：采购可预测性与细粒度',
  description:
    'MaxKB 与 FastGPT 的差异集中在私有化采购、知识治理、工作流恢复、渠道运营和原厂支持。按采购形态与生产细粒度要求筛选候选，用三年 TCO、同条件 POC 和合同责任矩阵完成核验。',
  heroSummary:
    '私有化交付与采购可预测性优先时，MaxKB 适合纳入候选；细粒度知识治理、工作流恢复和多渠道运营优先时，FastGPT 更匹配。',
  heroHighlights: [
    { label: 'MaxKB', value: '国内私有化交付与采购形态' },
    { label: 'FastGPT', value: '细粒度治理、工作流与多渠道运营' },
    { label: '验收重点', value: '三年 TCO、支持档位、次年维保' }
  ],
  keywords: ['MaxKB 对比', 'FastGPT', '私有化部署', '三年 TCO', '代码沙箱'],
  sourceFile: 'maxkb-vs-fastgpt.md',
  dates: {
    datePublished: '2026-08-04',
    dateModified: '2026-08-08'
  },
  asset: {
    path: '/images/compare/maxkb-vs-fastgpt.svg',
    alt: 'MaxKB 与 FastGPT 的采购、治理、POC 与三年成本对照示意图',
    width: 1200,
    height: 630
  },
  ctaCopy: {
    primaryHeroCta: '核对采购与支持边界',
    nextStepTitle: '核对买断、支持档位与次年维保',
    nextStepDescription: '从私有化边界、版本授权、POC 清单和支持责任继续核对采购条件。',
    ctaTitle: '把买断、维保与支持写进三年表',
    ctaButton: '核算三年 TCO'
  },
  trustSignals: ['核验日期 2026-07-20', '基于官方公开资料', '按同条件 POC 验收'],
  contextualLinks: [
    { label: '对比页总览', target: '/zh/compare', locale: 'zh' },
    { label: '自研与采购成本模型', target: '/zh/compare/self-build-vs-platform', locale: 'zh' }
  ],
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh' },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh' }
  ],
  officialSource: 'https://maxkb.cn/docs/'
});

export const maxkbComparisonPages: ComparisonPagesByLocale = {
  zh: maxkbComparisonPage,
  en: createComparisonPage({
    slug: 'maxkb-vs-fastgpt',
    lang: 'en',
    status: 'published',
    title: 'MaxKB vs FastGPT: Procurement vs Production Control',
    description:
      'Compare MaxKB and FastGPT on private deployment, governance, support tiers, and three-year TCO before procurement. Confirm terms with a same-condition POC.',
    heroSummary:
      'Include MaxKB as a candidate when private delivery and procurement predictability come first. Prioritize FastGPT when fine-grained knowledge governance, workflow recovery, and multi-channel operations come first.',
    heroHighlights: [
      { label: 'MaxKB', value: 'Domestic private delivery and procurement model' },
      { label: 'FastGPT', value: 'Fine-grained governance, workflows, multi-channel operations' },
      { label: 'Validation focus', value: 'Three-year TCO, support tiers, next-year maintenance' }
    ],
    keywords: ['MaxKB comparison', 'FastGPT', 'private deployment', 'three-year TCO', 'code sandbox'],
    sourceFile: 'en/maxkb-vs-fastgpt.md',
    dates: {
      datePublished: '2026-08-04',
      dateModified: '2026-08-08'
    },
    asset: {
      path: '/images/compare/maxkb-vs-fastgpt.svg',
      alt: 'Procurement, governance, POC, and three-year cost comparison diagram for MaxKB and FastGPT',
      width: 1200,
      height: 630
    },
    ctaCopy: {
      primaryHeroCta: 'Check procurement and support terms',
      nextStepTitle: 'Check buyout, support tiers, and renewal maintenance',
      nextStepDescription: 'Continue from private deployment, licensing, POC checks, and support responsibility to validate procurement terms.',
      ctaTitle: 'Put buyout, maintenance, and support into the TCO',
      ctaButton: 'Calculate the three-year TCO'
    },
    trustSignals: ['Verified on 2026-07-20', 'Based on official public sources', 'Validated through same-condition POC'],
    contextualLinks: [
      { label: 'Comparison hub', target: '/compare', locale: 'en' },
      { label: 'Dify plugin-ecosystem comparison', target: '/compare/dify-vs-fastgpt', locale: 'en' }
    ],
    internalLinks: [
      { label: 'Build-vs-buy TCO model', target: '/compare/self-build-vs-platform', locale: 'en' },
      { label: 'RAGFlow document-parsing comparison', target: '/compare/ragflow-vs-fastgpt', locale: 'en' },
      { label: 'Official pricing page', target: '/price', locale: 'en' }
    ],
    officialSource: 'https://maxkb.cn/docs/'
  })
};

export default maxkbComparisonPage;
