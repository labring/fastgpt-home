import { createComparisonPage } from './loader';
import type { ComparisonPage } from './types';

export const maxkbComparisonPage: ComparisonPage = createComparisonPage({
  slug: 'maxkb-vs-fastgpt',
  lang: 'zh',
  status: 'published',
  title: 'MaxKB 与 FastGPT 怎么选：采购可预测性与生产细粒度',
  description:
    '说明 MaxKB 在国内私有化交付形式与采购可预测性上的强项，对照 FastGPT 在隔离沙箱、工作流人工恢复、统一配额与图片向量检索上的差异，并给出买断与订阅按同一三年规模比较的方法。',
  keywords: ['MaxKB 对比', 'FastGPT', '私有化部署', '三年 TCO', '代码沙箱'],
  sourceFile: 'maxkb-vs-fastgpt.md',
  sourceHash: '60162fa80f25cae929f5ca60c5461d6e57760f319d2f2b42f23b28dff7bb7002',
  draftVersion: 'V1.0 (2026-07-30)',
  sourceRefs: [
    {
      id: 'draft-body',
      title: 'MaxKB 与 FastGPT 怎么选：采购可预测性与生产细粒度',
      localPath: 'content/competitors/maxkb-vs-fastgpt.md',
      section: '全文五段与事实来源页脚',
      verifiedOn: '2026-07-20',
      version: 'V1.0',
      evidenceStatus: 'official-public'
    },
    {
      id: 'maxkb-docs',
      title: 'MaxKB official documentation',
      url: 'https://maxkb.cn/docs/',
      section: '私有化交付与采购形态',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    },
    {
      id: 'fastgpt-docs',
      title: 'FastGPT official documentation',
      url: 'https://doc.fastgpt.cn/',
      section: '生产运行时与治理',
      verifiedOn: '2026-07-20',
      version: '公开稳定资料',
      evidenceStatus: 'official-public'
    }
  ],
  dates: {
    sourceVerifiedOn: '2026-07-20',
    datePublished: '2026-08-04',
    dateModified: '2026-07-30',
    nextReviewOn: '2026-10-28'
  },
  asset: {
    path: '/images/compare/maxkb-vs-fastgpt.svg',
    alt: 'MaxKB 与 FastGPT 的采购、治理、POC 与三年成本对照示意图',
    width: 1200,
    height: 630
  },
  internalLinks: [
    { label: '私有化部署边界', target: '/zh/faq/private-deployment-data-boundary', locale: 'zh', external: false, verified: true },
    { label: '开源版与商业版说明', target: '/zh/faq/open-source-vs-commercial-edition', locale: 'zh', external: false, verified: true },
    { label: 'POC 测量清单', target: '/zh/faq/poc-design-checklist', locale: 'zh', external: false, verified: true }
  ],
  signoffs: [
    { role: 'product', status: 'pending', signer: 'FastGPT product', timestamp: '', evidenceRef: 'pending-product-version-review' },
    { role: 'sales', status: 'pending', signer: 'FastGPT sales', timestamp: '', evidenceRef: 'pending-commercial-review' },
    { role: 'legal', status: 'pending', signer: 'FastGPT legal', timestamp: '', evidenceRef: 'pending-trademark-license-review' }
  ],
  sourceFooter: {
    source: 'MaxKB 与 FastGPT 双方官网、官方文档、官方仓库、官方定价页与公开发布记录',
    verifiedOn: '2026-07-20',
    version: 'MaxKB 社区自托管 / 专业版 / 企业版；FastGPT Cloud / 社区自托管 / 托管与自托管商业版',
    updateRecord: 'V1.0（2026-07-30）首次发布；授权价、维保、版本号与支持档位设 90 天复核周期'
  },
  officialSources: ['https://maxkb.cn/docs/', 'https://doc.fastgpt.cn/']
});

export default maxkbComparisonPage;
