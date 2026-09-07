import { getContactUrl } from '@/lib/contact';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

const UTM_SOURCE = 'customers';
const UTM_MEDIUM = 'referral';
const SOURCE_UTM_CAMPAIGNS = {
  home_hero: 'poc-application',
  home_bottom: 'poc-application',
  navbar_poc: 'poc-application',
  customers_hero: 'poc-application',
  customers_sidebar: 'poc-application',
  customers_bottom: 'poc-application',
  empty_state: 'requirement-match'
} as const;

type ConsultationSource = keyof typeof SOURCE_UTM_CAMPAIGNS;

export type ConsultationContext = {
  source: ConsultationSource;
  solutionId?: string | number;
  solutionTitle?: string;
  solutionSlug?: string;
};

export function buildConsultationUrl(context: ConsultationContext): string {
  const params = new URLSearchParams({
    source: UTM_SOURCE,
    utm_source: UTM_SOURCE,
    utm_medium: UTM_MEDIUM,
    utm_campaign: SOURCE_UTM_CAMPAIGNS[context.source],
    utm_content: context.source
  });
  if (context.solutionSlug) params.set('utm_term', context.solutionSlug);
  return getContactUrl('zh', `?${params.toString()}`);
}

export function getConsultationLinkProps(context: ConsultationContext) {
  return {
    href: buildConsultationUrl(context),
    ...rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, context.source, {
      solution_id: context.solutionId != null ? String(context.solutionId) : undefined,
      solution_title: context.solutionTitle
    })
  };
}
