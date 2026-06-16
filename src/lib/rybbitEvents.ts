export const RYBBIT_EVENTS = {
  businessConsultClick: 'business_consult_click',
  cloudServiceClick: 'cloud_service_click',
  caseCenterClick: 'case_center_click',
  learningCenterClick: 'learning_center_click'
} as const;

type RybbitEventName = (typeof RYBBIT_EVENTS)[keyof typeof RYBBIT_EVENTS];
type RybbitPropValue = string | number | boolean | null | undefined;

export function rybbitClickAttrs(
  eventName: RybbitEventName,
  source: string,
  properties: Record<string, RybbitPropValue> = {}
) {
  const attrs: Record<string, string | number> = {
    'data-rybbit-event': eventName,
    'data-rybbit-prop-source': source
  };

  Object.entries(properties).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    attrs[`data-rybbit-prop-${key}`] = typeof value === 'boolean' ? String(value) : value;
  });

  return attrs;
}
