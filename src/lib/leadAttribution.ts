const VISITOR_ID_KEY = 'fastgpt_visitor_id';
const REPORTED_VISITOR_ID_KEY = 'fastgpt_reported_visitor_id';
let pendingAttributionReport: Promise<void> | undefined;

const SEARCH_HOSTS = ['google.', 'bing.', 'baidu.', 'sogou.', 'so.com', 'duckduckgo.'];
const AI_HOSTS = [
  'chatgpt.com',
  'claude.ai',
  'gemini.google.com',
  'perplexity.ai',
  'doubao.com',
  'deepseek.com',
  'kimi.moonshot.cn',
  'yuanbao.tencent.com'
];
const SOCIAL_HOSTS = [
  'weixin.qq.com',
  'zhihu.com',
  'weibo.com',
  'x.com',
  'twitter.com',
  'linkedin.com'
];
const PAID_MEDIA = new Set(['cpc', 'ppc', 'paid', 'paid_search', 'paid-social', 'paid_social']);

function includesHost(hostname: string, candidates: string[]) {
  return candidates.some((candidate) => hostname === candidate || hostname.includes(candidate));
}

function getCurrentAttribution() {
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || '';
  const utmMedium = params.get('utm_medium') || '';
  const clickId =
    params.get('gclid') ||
    params.get('msclkid') ||
    params.get('bd_vid') ||
    params.get('ttclid') ||
    '';

  let channelL1 = 'direct';
  let channelL2 = 'direct';
  let label = 'direct';
  let isPaid = false;
  let referrer = document.referrer || '';

  try {
    if (referrer && new URL(referrer).origin === window.location.origin) referrer = '';
  } catch {
    referrer = '';
  }

  if (utmSource) {
    isPaid = PAID_MEDIA.has(utmMedium.toLowerCase());
    channelL1 = isPaid ? 'paid_search' : 'referral';
    channelL2 = utmSource;
    label = `${channelL1} · ${utmSource}`;
  } else if (clickId) {
    channelL1 = 'paid_search';
    channelL2 = 'ads';
    label = 'paid_search · Ads';
    isPaid = true;
  } else if (referrer) {
    try {
      const hostname = new URL(referrer).hostname.toLowerCase();
      channelL2 = hostname.replace(/^www\./, '');
      if (includesHost(hostname, AI_HOSTS)) channelL1 = 'llm';
      else if (includesHost(hostname, SEARCH_HOSTS)) channelL1 = 'organic_search';
      else if (includesHost(hostname, SOCIAL_HOSTS)) channelL1 = 'organic_social';
      else channelL1 = 'referral';
      label = `${channelL1} · ${channelL2}`;
    } catch {
      referrer = '';
    }
  }

  const now = new Date().toISOString();
  return {
    first_touch_channel: label,
    first_touch_source: channelL2,
    first_landing_url: window.location.href,
    first_touch_at: now,
    last_touch_channel: label,
    last_touch_source: channelL2,
    channel_l1: channelL1,
    channel_l2: channelL2,
    is_paid: isPaid,
    utm_source: utmSource || null,
    utm_medium: utmMedium || null,
    utm_campaign: params.get('utm_campaign'),
    utm_term: params.get('utm_term'),
    utm_content: params.get('utm_content'),
    click_id: clickId || null,
    referrer_url: referrer || null
  };
}

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
          visitor_id: visitorId,
          ...getCurrentAttribution()
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
