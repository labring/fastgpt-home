import { getContactUrl } from '@/lib/contact';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

// 咨询链接的站点级归因来源；CRM 的 /contacts/submit 只接收该 source 字段。
// 通过构建时环境变量 NEXT_PUBLIC_CUSTOMERS_SOURCE 配置，未配置时回退为 customers。
const CUSTOMERS_SOURCE = process.env.NEXT_PUBLIC_CUSTOMERS_SOURCE?.trim() || 'customers';

// 咨询入口来源（按钮级），仅用于 Rybbit 埋点（poc_click 事件）。
type ConsultationSource =
  | 'home_hero'
  | 'home_bottom'
  | 'navbar_poc'
  | 'customers_hero'
  | 'customers_sidebar'
  | 'customers_bottom'
  | 'empty_state';

export type ConsultationContext = {
  source: ConsultationSource;
  solutionId?: string | number;
  solutionTitle?: string;
  solutionSlug?: string;
};

export function buildConsultationUrl(): string {
  // 弹窗不跳转，按钮级 utm 参数无法进入 window.location 落库，URL 只保留站点级 source。
  const params = new URLSearchParams({ source: CUSTOMERS_SOURCE });
  return getContactUrl('zh', `?${params.toString()}`);
}

export function getConsultationLinkProps(context: ConsultationContext) {
  return {
    href: buildConsultationUrl(),
    'data-consultation-trigger': 'true',
    ...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, context.source, {
      solution_id: context.solutionId != null ? String(context.solutionId) : undefined,
      solution_title: context.solutionTitle,
      solution_slug: context.solutionSlug
    })
  };
}
