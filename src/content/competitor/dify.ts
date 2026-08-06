import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

export const difyComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'dify-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'Dify 与 FastGPT：四种项目的选型分野',
  description:
    '从产品重心、能力对照、许可证与原厂支持三层说明两者的分野，给出插件广度优先与知识工程深度优先各应选谁的中性判据，并附六类必测指标的同条件验证表。',
  keywords: ['Dify 对比', 'FastGPT', '平台选型', '原厂支持', '开源许可证'],
  sourceFile: 'dify-vs-fastgpt.md',
  sourceHash: 'c49042c4ce7f3132d2de8fda9f13cd3c33a2677248ce16c74b472cd74549db5d',
  draftVersion: 'V1.1 (2026-08-05)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: 'Dify 与 FastGPT 怎么选：四种项目的分野与 POC 判据',
      localPath: 'content/competitors/dify-vs-fastgpt.md',
      section: '全文五段与事实来源页脚',
      verifiedOn: '2026-07-20',
      version: 'V1.1',
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
      version: 'V1.1 revision (2026-08-05)',
      evidenceStatus: 'contract-required'
    }
  ],
  dates: {
    sourceVerifiedOn: '2026-07-20',
    datePublished: '2026-08-04',
    dateModified: '2026-08-05',
    nextReviewOn: '2026-11-03'
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
    updateRecord: 'V1.0（2026-07-30）首次发布；V1.1（2026-08-05）新增原厂支持维度与合同责任说明；价格、版本号、模板与插件数、Cloud 配额、支持档位设 90 天复核周期'
  },
  officialSources: ['https://docs.dify.ai/', 'https://doc.fastgpt.cn/']
});

export default difyComparisonPage;
