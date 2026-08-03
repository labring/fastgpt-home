/**
 * 全链路渠道归因引擎（五段降级判定 · Last Non-Direct Click）
 *
 * 把每次访问唯一归到一个渠道，区分 付费 / 自然 / AI / 直接。
 * 参考《FastGPT CRM 精细分类与全链路归因方案 V1.2》，因官网无微信 OAuth，
 * 去掉微信 openid/scene 那一层（将来接公众号/小程序再补）。
 *
 * 判定优先级：
 *   ① UTM 参数存在 → 按 utm_medium 映射 Paid / Owned / Organic
 *   ② 广告 Click ID（无 UTM 时）→ 强制 Paid
 *   ③ HTTP Referrer → 搜索引擎 / AI 平台(LLM) / 社媒 / 其他外域
 *   ④ 全部失败 → Direct（兜底，永不覆盖已有归因）
 *
 * channel_l1 为 canonical key（后端 / 飞书侧做中文映射），channel_l2 为具体来源名。
 */

import { getVisitorId } from '@/lib/visitorId';

export { getVisitorId } from '@/lib/visitorId';

export type ChannelL1 =
  | 'paid_search'
  | 'paid_feed'
  | 'paid_social'
  | 'organic_search'
  | 'organic_social'
  | 'llm'
  | 'referral'
  | 'owned'
  | 'direct';

export interface TouchPoint {
  channel_l1: ChannelL1;
  channel_l2: string; // 具体来源，如 Bing / 豆包 / 知乎；无则空串
  is_paid: boolean;
  label: string; // 人类可读：l2 ? `${l1中文? no -> l1} · ${l2}` : l1（这里用 l1 key 拼，中文在后端映射）
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  click_id: string;
  referrer: string;
  landing_url: string;
  at: string; // ISO 时间
}

export interface StoredAttribution {
  visitor_id: string;
  first: TouchPoint;
  last: TouchPoint;
}

/** 表单提交时并入 body 的扁平归因字段 */
export interface AttributionPayload {
  visitor_id: string;
  first_touch_channel: string;
  first_touch_source: string;
  first_landing_url: string;
  first_touch_at: string;
  last_touch_channel: string;
  last_touch_source: string;
  channel_l1: string;
  channel_l2: string;
  is_paid: boolean;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  click_id: string;
  referrer_url: string;
}

const STORAGE_KEY = 'xs_attr';
const REPORTED_ATTRIBUTION_KEY = 'fastgpt_reported_attribution';
let pendingAttributionReport: Promise<void> | undefined;

// 域名关键词 → 来源名（取域名里命中的第一个）
const SEARCH_ENGINES: [string, string][] = [
  ['google.', 'Google'],
  ['bing.', 'Bing'],
  ['baidu.', '百度'],
  ['sogou.', '搜狗'],
  ['so.com', '360搜索'],
  ['yandex.', 'Yandex'],
  ['duckduckgo.', 'DuckDuckGo'],
  ['ecosia.', 'Ecosia']
];

const AI_PLATFORMS: [string, string][] = [
  ['chatgpt.com', 'ChatGPT'],
  ['chat.openai.com', 'ChatGPT'],
  ['openai.com', 'ChatGPT'],
  ['doubao.com', '豆包'],
  ['deepseek.com', 'DeepSeek'],
  ['gemini.google.com', 'Gemini'],
  ['bard.google.com', 'Gemini'],
  ['perplexity.ai', 'Perplexity'],
  ['kimi.com', 'Kimi'],
  ['moonshot.cn', 'Kimi'],
  ['copilot.microsoft.com', 'Copilot'],
  ['tongyi.', '通义千问'],
  ['qianwen', '通义千问'],
  ['yiyan.baidu.com', '文心一言'],
  ['metaso.cn', '秘塔'],
  ['grok.com', 'Grok'],
  ['claude.ai', 'Claude']
];

const SOCIAL: [string, string][] = [
  ['zhihu.com', '知乎'],
  ['bilibili.com', 'B站'],
  ['xiaohongshu.com', '小红书'],
  ['xhslink.com', '小红书'],
  ['weibo.c', '微博'],
  ['linkedin.com', 'LinkedIn'],
  ['twitter.com', 'X'],
  ['x.com', 'X'],
  ['facebook.com', 'Facebook'],
  ['youtube.com', 'YouTube'],
  ['douyin.com', '抖音'],
  ['weixin', '微信'],
  ['wechat', '微信']
];

function matchDomain(host: string, table: [string, string][]): string | null {
  for (const [needle, name] of table) {
    if (host.includes(needle)) return name;
  }
  return null;
}

function buildLabel(l1: ChannelL1, l2: string): string {
  return l2 ? `${l1} · ${l2}` : l1;
}

/**
 * 五段降级判定。输入当前访问的 query string 和 referrer，输出归一化渠道。
 */
export function classifyVisit(input: {
  search: string;
  referrer: string;
  landingUrl: string;
  now: string;
}): TouchPoint {
  const params = new URLSearchParams(input.search || '');
  const utm_source = params.get('utm_source') || '';
  const utm_medium = (params.get('utm_medium') || '').toLowerCase();
  const utm_campaign = params.get('utm_campaign') || '';
  const utm_term = params.get('utm_term') || '';
  const utm_content = params.get('utm_content') || '';

  const click_id =
    params.get('gclid') ||
    params.get('msclkid') ||
    params.get('bd_vid') ||
    params.get('ttclid') ||
    '';

  const base = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    click_id,
    referrer: input.referrer || '',
    landing_url: input.landingUrl,
    at: input.now
  };

  const make = (l1: ChannelL1, l2: string, is_paid: boolean): TouchPoint => ({
    channel_l1: l1,
    channel_l2: l2,
    is_paid,
    label: buildLabel(l1, l2),
    ...base
  });

  // ① UTM 参数存在即覆盖一切
  if (utm_source || utm_medium) {
    const l2 = utm_source || '(unknown)';
    if (/cpc|ppc|paid|sem|cpm|adwords/.test(utm_medium)) {
      return make('paid_search', l2, true);
    }
    if (/feed|display|banner/.test(utm_medium)) {
      return make('paid_feed', l2, true);
    }
    if (/social/.test(utm_medium)) {
      return make('paid_social', l2, true);
    }
    if (/email|edm|newsletter/.test(utm_medium)) {
      return make('owned', l2, false);
    }
    if (/affiliate|partner|referral/.test(utm_medium)) {
      return make('referral', l2, false);
    }
    // 带 UTM 但 medium 未知：按 source 是不是搜索引擎兜底
    if (matchDomain(utm_source.toLowerCase(), SEARCH_ENGINES)) {
      return make('organic_search', l2, false);
    }
    return make('referral', l2, false);
  }

  // ② 广告 Click ID（无 UTM）
  if (click_id) {
    if (params.get('gclid')) return make('paid_search', 'Google Ads', true);
    if (params.get('msclkid')) return make('paid_search', 'Bing Ads', true);
    if (params.get('bd_vid')) return make('paid_search', '百度 SEM', true);
    if (params.get('ttclid')) return make('paid_feed', '巨量引擎', true);
  }

  // ③ HTTP Referrer 分类
  const ref = (input.referrer || '').toLowerCase();
  if (ref) {
    let host = '';
    try {
      host = new URL(input.referrer).hostname.toLowerCase();
    } catch {
      host = ref;
    }
    // 同站跳转不算来源（站内导航）——交由调用方过滤，这里只判外域信号
    const ai = matchDomain(host, AI_PLATFORMS);
    if (ai) return make('llm', ai, false);
    const se = matchDomain(host, SEARCH_ENGINES);
    if (se) return make('organic_search', se, false);
    const so = matchDomain(host, SOCIAL);
    if (so) return make('organic_social', so, false);
    return make('referral', host, false);
  }

  // ④ 兜底 Direct
  return make('direct', '', false);
}

function safeGet(): StoredAttribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredAttribution;
  } catch {
    return null;
  }
}

/**
 * 每次页面加载调用：首访写 first_touch（永不变），每访更新 last_touch（Direct 不覆盖）。
 * 同站 referrer 视为站内导航，按 Direct 处理（不污染 last_touch）。
 */
export function trackVisit(): void {
  if (typeof window === 'undefined') return;
  try {
    const visitor_id = getVisitorId();
    const now = new Date().toISOString();
    let referrer = document.referrer || '';
    // 站内跳转：referrer 与当前同 origin → 当作无来源，避免把站内点击记成 Referral
    try {
      if (referrer && new URL(referrer).origin === window.location.origin) {
        referrer = '';
      }
    } catch {
      /* ignore */
    }

    const current = classifyVisit({
      search: window.location.search,
      referrer,
      landingUrl: window.location.href,
      now
    });

    const stored = safeGet();

    // first_touch：只在第一次写入
    const first = stored?.first ?? current;

    // last_touch：Last Non-Direct Click —— 非 Direct 才更新；Direct 不覆盖已有
    let last = stored?.last ?? current;
    if (current.channel_l1 !== 'direct') {
      last = current;
    }

    const next: StoredAttribution = { visitor_id, first, last };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* 归因失败绝不影响页面 */
  }
}

/** 表单提交时取扁平归因字段；无数据时返回全空（后端按 Direct 兜底）。 */
export function getAttributionPayload(): AttributionPayload {
  const empty: AttributionPayload = {
    visitor_id: '',
    first_touch_channel: '',
    first_touch_source: '',
    first_landing_url: '',
    first_touch_at: '',
    last_touch_channel: '',
    last_touch_source: '',
    channel_l1: '',
    channel_l2: '',
    is_paid: false,
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    click_id: '',
    referrer_url: ''
  };
  if (typeof window === 'undefined') return empty;

  const stored = safeGet();
  const visitor_id = getVisitorId();
  if (!stored) return { ...empty, visitor_id };

  const { first, last } = stored;
  return {
    visitor_id,
    first_touch_channel: first.label,
    first_touch_source: first.channel_l2 || first.channel_l1,
    first_landing_url: first.landing_url,
    first_touch_at: first.at,
    last_touch_channel: last.label,
    last_touch_source: last.channel_l2 || last.channel_l1,
    // 主归因（看源头不看落点）取首次触点
    channel_l1: first.channel_l1,
    channel_l2: first.channel_l2,
    is_paid: first.is_paid,
    utm_source: first.utm_source,
    utm_medium: first.utm_medium,
    utm_campaign: first.utm_campaign,
    utm_term: first.utm_term,
    utm_content: first.utm_content,
    click_id: first.click_id,
    referrer_url: first.referrer
  };
}

/** 归因变化时将匿名访客提交到 CRM；未配置地址或当前快照已提交成功时跳过。 */
export function reportAnonymousAttribution(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (pendingAttributionReport) return pendingAttributionReport;

  const crmApiUrl = process.env.NEXT_PUBLIC_CRM_API_URL?.trim().replace(/\/$/, '');
  if (!crmApiUrl) return Promise.resolve();

  pendingAttributionReport = (async () => {
    try {
      trackVisit();
      const attribution = getAttributionPayload();
      if (!attribution.visitor_id) return;
      const attributionSnapshot = JSON.stringify(attribution);
      if (localStorage.getItem(REPORTED_ATTRIBUTION_KEY) === attributionSnapshot) return;

      const response = await fetch(`${crmApiUrl}/visitors/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          locale: document.documentElement.lang || 'zh',
          ...attribution
        })
      });

      if (response.ok) {
        localStorage.setItem(REPORTED_ATTRIBUTION_KEY, attributionSnapshot);
      }
    } catch {
      // 归因上报失败不能影响官网访问，后续页面加载会重试。
    }
  })().finally(() => {
    pendingAttributionReport = undefined;
  });

  return pendingAttributionReport;
}
