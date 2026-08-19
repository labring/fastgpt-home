import {
  CONTACT_FORM_BASE_URL,
  SOURCE_UTM_CAMPAIGNS,
  UTM_MEDIUM,
  UTM_SOURCE,
  type CtaSource
} from '@/customers/lib/cta-constants';
import { trackRybbitEvent } from '@/customers/lib/rybbit';
import { withBasePath } from '@/customers/lib/base-path';

export type { CtaSource };

export type CtaModalContext = {
  source: CtaSource;
  title?: string;
  subtitle?: string;
  solutionId?: string | number;
  solutionTitle?: string;
  categoryName?: string;
  /** 方案语义 slug，用于 utm_term 归因（区分具体方案） */
  solutionSlug?: string;
};

export const DEFAULT_CTA_MODAL_CONTEXT: CtaModalContext = {
  source: 'home_hero',
  title: '申请免费 POC 验证',
  subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。'
};

/**
 * 组装 iframe 嵌入地址（主站专用 embed 路由 + 归因参数）。
 * 参数契约与主站 embed 页读取逻辑一致：
 * - source：提交来源标记（主站 getSubmissionSource() 直接写入提交载荷）
 * - utm_source/medium/campaign/content/term：标准 UTM 归因
 */
export function buildContactFormUrl(context: CtaModalContext): string {
  const params = new URLSearchParams({
    source: UTM_SOURCE,
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: SOURCE_UTM_CAMPAIGNS[context.source] ?? 'poc-application',
    utm_content: context.source
  });
  if (context.solutionSlug) {
    params.set('utm_term', context.solutionSlug);
  }
  return `${CONTACT_FORM_BASE_URL}?${params.toString()}`;
}

export function openCtaModal(context: CtaModalContext = DEFAULT_CTA_MODAL_CONTEXT) {
  window.dispatchEvent(new CustomEvent<CtaModalContext>('open-form-modal', { detail: context }));

  // 上报点击数据到自建 MongoDB（非阻塞，静默失败）
  fetch(withBasePath('/api/cta/click'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: context.source,
      solutionId: context.solutionId != null ? String(context.solutionId) : undefined,
      solutionTitle: context.solutionTitle,
      categoryName: context.categoryName
    })
  }).catch(() => { /* 静默失败，不影响用户体验 */ });

  // 上报到 Rybbit 分析平台
  trackRybbitEvent('poc_click', {
    source: context.source,
    solution_id: context.solutionId != null ? String(context.solutionId) : undefined,
    solution_title: context.solutionTitle
  });
}
