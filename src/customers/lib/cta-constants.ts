export const CTA_SOURCES = [
  'home_hero',
  'home_bottom',
  'navbar_poc',
  'customer_hero',
  'customer_sidebar',
  'customer_bottom',
  'empty_state',
  'footer_private_deploy'
] as const;

export type CtaSource = (typeof CTA_SOURCES)[number];

export const SOURCE_LABELS: Record<string, string> = {
  home_hero: '首页 Hero',
  home_bottom: '首页底部',
  navbar_poc: '导航栏',
  customer_hero: '方案 Hero',
  customer_sidebar: '方案侧边栏',
  customer_bottom: '方案底部',
  empty_state: '空状态引导',
  footer_private_deploy: '页脚私有化'
};

/** 各入口位置对应的按钮文案 */
export const SOURCE_BUTTON_LABELS: Record<string, string> = {
  home_hero: '免费评估场景',
  home_bottom: '申请免费 POC',
  navbar_poc: '申请 POC',
  customer_hero: '验证该方案',
  customer_sidebar: '咨询 POC 路径',
  customer_bottom: '申请免费 POC',
  empty_state: '提交需求',
  footer_private_deploy: '私有化与 POC 交付'
};

/** 主站独立商务咨询表单的 iframe 嵌入地址（专用 embed 路由，无站点导航/页脚） */
export const CONTACT_FORM_BASE_URL = 'https://fastgpt.cn/zh/contact/embed';

/** UTM 固定参数：来源统一为 customers 站 */
export const UTM_SOURCE = 'customers';
export const UTM_MEDIUM = 'referral';

/**
 * 各按钮位置 → utm_campaign 映射（按转化意图分组）：
 * - poc-application：POC 申请类（商务跟进：POC 验证）
 * - requirement-match：需求匹配类（首页空状态提需求）
 * - private-deploy：私有化咨询类（页脚入口）
 * utm_content 直接复用 CTA_SOURCES 枚举值，与站内 MongoDB 点击统计口径一致。
 */
export const SOURCE_UTM_CAMPAIGNS: Record<CtaSource, string> = {
  home_hero: 'poc-application',
  home_bottom: 'poc-application',
  navbar_poc: 'poc-application',
  customer_hero: 'poc-application',
  customer_sidebar: 'poc-application',
  customer_bottom: 'poc-application',
  empty_state: 'requirement-match',
  footer_private_deploy: 'private-deploy'
};

/** 主站商务咨询表单的选项集（与 fastgpt.cn/contact 保持一致，保证数据口径一致） */
export const CONTACT_FORM_OPTIONS = {
  usedOpenSource: ['是', '否'],
  consultationTopic: ['私有化部署', 'SaaS 版', '渠道合作', '其他'],
  projectStage: ['调研阶段/竞品对比', '立项阶段/测试使用', '采购阶段/最终决策'],
  budget: ['0-3 万元', '3-10 万元', '10-30 万元', '30-100 万元', '100 万元以上']
} as const;
