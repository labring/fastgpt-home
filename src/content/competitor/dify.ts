import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

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
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh' },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh' },
    { label: '官方定价页', target: '/zh/price', locale: 'zh' }
  ],
  officialSource: 'https://docs.dify.ai/'
});

export default difyComparisonPage;
