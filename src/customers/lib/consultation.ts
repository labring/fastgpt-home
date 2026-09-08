import { getContactUrl } from '@/lib/contact';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

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

export function buildConsultationUrl(_context: ConsultationContext): string {
  // Internal CTA context is not a new acquisition touchpoint.
  return getContactUrl('zh', '?source=customers');
}

export function getConsultationLinkProps(context: ConsultationContext) {
  return {
    href: buildConsultationUrl(context),
    ...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, context.source, {
      solution_id: context.solutionId != null ? String(context.solutionId) : undefined,
      solution_title: context.solutionTitle,
      solution_slug: context.solutionSlug
    })
  };
}
