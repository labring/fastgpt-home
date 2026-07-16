const VISITOR_ID_KEY = 'fastgpt_visitor_id';
const REPORTED_VISITOR_ID_KEY = 'fastgpt_reported_visitor_id';
let pendingAttributionReport: Promise<void> | undefined;

function createVisitorId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }
  const random = Math.random().toString(36).slice(2, 12);
  return `fg_${Date.now().toString(36)}_${random}`;
}

function getIncomingVisitorId(): string {
  try {
    return new URLSearchParams(window.location.search).get('visitor_id') || '';
  } catch {
    return '';
  }
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  try {
    localStorage.removeItem('xs_attr');
    const storedVisitorId = localStorage.getItem(VISITOR_ID_KEY);
    if (storedVisitorId) return storedVisitorId;

    const incomingVisitorId = getIncomingVisitorId();
    if (incomingVisitorId) {
      localStorage.setItem(VISITOR_ID_KEY, incomingVisitorId);
      return incomingVisitorId;
    }

    const visitorId = createVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    return visitorId;
  } catch {
    return '';
  }
}

/** 首次访问时将匿名 visitor_id 提交到 CRM；未配置地址或已提交成功时跳过。 */
export function reportAnonymousVisitor(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (pendingAttributionReport) return pendingAttributionReport;

  const crmApiUrl = process.env.NEXT_PUBLIC_CRM_API_URL?.trim().replace(/\/$/, '');
  if (!crmApiUrl) return Promise.resolve();

  pendingAttributionReport = (async () => {
    try {
      const visitorId = getVisitorId();
      if (!visitorId) return;
      if (localStorage.getItem(REPORTED_VISITOR_ID_KEY) === visitorId) return;

      const response = await fetch(`${crmApiUrl}/contacts/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          name: 'FastGPT 官网访客',
          email: 'anonymous-lead@fastgpt.io',
          message: 'FastGPT 官网匿名访客采集',
          locale: document.documentElement.lang || 'zh',
          visitor_id: visitorId
        })
      });

      if (response.ok) {
        localStorage.setItem(REPORTED_VISITOR_ID_KEY, visitorId);
      }
    } catch {
      // 归因上报失败不能影响官网访问，后续页面加载会重试。
    }
  })().finally(() => {
    pendingAttributionReport = undefined;
  });

  return pendingAttributionReport;
}
