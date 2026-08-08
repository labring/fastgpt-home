import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

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
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh' },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh' }
  ],
  officialSource: 'https://maxkb.cn/docs/'
});

export default maxkbComparisonPage;
