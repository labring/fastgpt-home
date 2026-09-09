import { getContactUrl } from '@/lib/contact';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

// Keep the CRM source aligned with ConsultationDialog's build-time configuration.
const CUSTOMERS_SOURCE = process.env.NEXT_PUBLIC_CUSTOMERS_SOURCE?.trim() || 'customers';

// Button-level context belongs to the business_consult_click event.
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

export function getConsultationLinkProps(context: ConsultationContext) {
  // Internal consultation links carry business source without creating an acquisition touchpoint.
  const params = new URLSearchParams({ source: CUSTOMERS_SOURCE });
  return {
    href: getContactUrl('zh', `?${params.toString()}`),
    'data-consultation-trigger': 'true',
    ...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, context.source, {
      solution_id: context.solutionId != null ? String(context.solutionId) : undefined,
      solution_title: context.solutionTitle,
      solution_slug: context.solutionSlug
    })
  };
}
