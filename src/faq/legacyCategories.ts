import type { FaqItem } from './zh';

export const legacyCategoryLabels = {
  en: {
    'data-and-document-processing': 'Data & Document Processing',
    'deployment-and-security': 'Deployment & Security',
    'content-and-creativity': 'Content & Creativity',
    'industry-applications': 'Industry Applications',
    'concepts-and-selection': 'Concepts & Selection',
    'office-and-collaboration-automation': 'Office & Collaboration Automation',
    'platform-value-and-trends': 'Platform Value & Trends',
    'integration-and-development': 'Integration & Development',
    'customer-service-and-support': 'Customer Service & Support',
  },
  zh: {
    'data-and-document-processing': '数据与文档处理',
    'deployment-and-security': '部署与安全',
    'content-and-creativity': '内容创作',
    'industry-applications': '行业应用',
    'concepts-and-selection': '概念与选型',
    'office-and-collaboration-automation': '办公与协作自动化',
    'platform-value-and-trends': '平台价值与趋势',
    'integration-and-development': '集成与开发',
    'customer-service-and-support': '客户服务与支持',
  },
} as const;

export type LegacyCategoryId = keyof typeof legacyCategoryLabels.en;

// Populated only by an explicitly approved category batch.
export const legacyFaqCategoryIds: Record<string, LegacyCategoryId> = {};

export function applyLegacyCategoryOverlay(
  data: Record<string, FaqItem>,
  locale: 'en' | 'zh',
): Record<string, FaqItem> {
  if (Object.keys(legacyFaqCategoryIds).length === 0) return data;
  return Object.fromEntries(
    Object.entries(data).map(([id, item]) => {
      const categoryId = legacyFaqCategoryIds[id];
      const category = categoryId ? legacyCategoryLabels[locale][categoryId] : item.Category;
      return [id, category === item.Category ? item : { ...item, Category: category }];
    }),
  );
}
