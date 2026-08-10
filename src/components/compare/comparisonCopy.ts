import type { CompareLocale, ComparisonTableKind } from '@/content/competitor';

const comparisonCopy = {
  zh: {
    previewBanner: '内容预览 · 页面状态待确认',
    backLabel: '返回内容中心',
    heroEyebrow: 'FastGPT 选型指南',
    primaryHeroCta: '查看能力矩阵',
    secondaryHeroCta: '打开官方资料',
    trustStripAriaLabel: '资料核验信息',
    heroSideLabel: '选型速览',
    tocAriaLabel: '页面章节导航',
    tocLabel: '比较维度',
    coreKicker: '核心判断',
    coreTitle: '按项目约束做选择',
    contextLinksAriaLabel: '正文相关链接',
    contextLinksLabel: '相关核对',
    nextStepKicker: '继续核对',
    nextStepTitle: '查看部署与采购细节',
    nextStepDescription: '从私有化、许可和 POC 清单继续核对落地条件。',
    ctaAriaLabel: '继续核验',
    ctaKicker: 'FastGPT / compare',
    ctaTitle: '把关键指标写进验收表',
    ctaButton: '设计同条件 POC',
    officialSourceLink: '官方资料入口',
    fallbackCellLabel: '字段',
    tableLabels: {
      capability: '能力路径',
      poc: '同条件验证',
      tco: '成本与边界',
      selection: '选型判据',
      generic: '对照清单'
    },
    tableRowCount: (count: number) => `${count} 项对照`
  },
  en: {
    previewBanner: 'Preview - page status pending review',
    backLabel: 'Back to content center',
    heroEyebrow: 'FastGPT selection guide',
    primaryHeroCta: 'View capability matrix',
    secondaryHeroCta: 'Open official docs',
    trustStripAriaLabel: 'Verification details',
    heroSideLabel: 'Selection overview',
    tocAriaLabel: 'Page section navigation',
    tocLabel: 'Comparison dimensions',
    coreKicker: 'Key judgment',
    coreTitle: 'Choose by project constraints',
    contextLinksAriaLabel: 'Contextual related links',
    contextLinksLabel: 'Related checks',
    nextStepKicker: 'Keep checking',
    nextStepTitle: 'Review deployment and procurement details',
    nextStepDescription: 'Continue from private deployment, licensing, and POC checklists to verify rollout conditions.',
    ctaAriaLabel: 'Continue validation',
    ctaKicker: 'FastGPT / compare',
    ctaTitle: 'Turn key metrics into an acceptance checklist',
    ctaButton: 'Design a same-condition POC',
    officialSourceLink: 'Official source',
    fallbackCellLabel: 'Field',
    tableLabels: {
      capability: 'Capability path',
      poc: 'Same-condition validation',
      tco: 'Cost and boundaries',
      selection: 'Selection criteria',
      generic: 'Comparison checklist'
    },
    tableRowCount: (count: number) => `${count} items compared`
  }
} as const satisfies Record<
  CompareLocale,
  {
    previewBanner: string;
    backLabel: string;
    heroEyebrow: string;
    primaryHeroCta: string;
    secondaryHeroCta: string;
    trustStripAriaLabel: string;
    heroSideLabel: string;
    tocAriaLabel: string;
    tocLabel: string;
    coreKicker: string;
    coreTitle: string;
    contextLinksAriaLabel: string;
    contextLinksLabel: string;
    nextStepKicker: string;
    nextStepTitle: string;
    nextStepDescription: string;
    ctaAriaLabel: string;
    ctaKicker: string;
    ctaTitle: string;
    ctaButton: string;
    officialSourceLink: string;
    fallbackCellLabel: string;
    tableLabels: Record<ComparisonTableKind, string>;
    tableRowCount: (count: number) => string;
  }
>;

export function getComparisonCopy(locale: CompareLocale) {
  return comparisonCopy[locale];
}
