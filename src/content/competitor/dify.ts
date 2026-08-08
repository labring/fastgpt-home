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
  sourceHash: '14f928dbbfbea1bd4a90b76d32b33aca413b7edc55da32734a912b69a5bc8ae7',
  draftVersion: 'V1.2 (2026-08-08)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: 'Dify 与 FastGPT 怎么选：四种项目的分野与 POC 判据',
      localPath: 'content/competitors/dify-vs-fastgpt.md',
      section: '五段正文与内部证据',
      verifiedOn: '2026-07-20',
      version: 'V1.2',
      evidenceStatus: 'official-public'
    },
    {
      id: 'dify-docs',
      title: 'Dify official documentation',
      url: 'https://docs.dify.ai/',
      section: '官方公开资料',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-docs',
      title: 'FastGPT official documentation',
      url: 'https://doc.fastgpt.cn/',
      section: '官方公开资料',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-support-contract',
      title: 'FastGPT product knowledge base support and procurement sections',
      section: 'KB 5.4 / 6.3：原厂支持档位、交付范围与采购责任边界',
      verifiedOn: '2026-07-20',
      version: 'V1.1 fact set (2026-08-05)',
      evidenceStatus: 'contract-required'
    }
  ],
  dates: {
    sourceVerifiedOn: '2026-07-20',
    datePublished: '2026-08-04',
    dateModified: '2026-08-08',
    nextReviewOn: '2026-11-06'
  },
  asset: {
    path: '/images/compare/dify-vs-fastgpt.svg',
    alt: 'Dify 与 FastGPT 的能力、验证与选型路径示意图',
    width: 1200,
    height: 630
  },
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh', external: false, verified: true },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh', external: false, verified: true },
    { label: '官方定价页', target: '/zh/price', locale: 'zh', external: false, verified: true }
  ],
  signoffs: [
    { role: 'product', status: 'pending', signer: 'FastGPT product', timestamp: '', evidenceRef: 'pending-product-version-review' },
    { role: 'sales', status: 'pending', signer: 'FastGPT sales', timestamp: '', evidenceRef: 'pending-commercial-review' },
    { role: 'legal', status: 'pending', signer: 'FastGPT legal', timestamp: '', evidenceRef: 'pending-trademark-license-review' }
  ],
  sourceFooter: {
    source: 'Dify 与 FastGPT 双方官网、官方文档、官方仓库、官方定价页与公开发布记录',
    verifiedOn: '2026-07-20',
    version: 'Dify Cloud / Community / Enterprise；FastGPT Cloud / 社区自托管 / 托管与自托管商业版',
    updateRecord: 'V1.2（2026-08-08）重写可见文案与页面包装；价格、版本号、模板与插件数、Cloud 配额、支持档位设 90 天复核周期'
  },
  officialSources: ['https://docs.dify.ai/', 'https://doc.fastgpt.cn/']
});

export default difyComparisonPage;
