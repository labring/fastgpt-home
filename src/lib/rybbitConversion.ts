const CONSULT_SOURCE_LABELS: Record<string, string> = {
  home_nav_consult: '首页-顶部商务咨询',
  home_nav_mobile_menu_consult: '首页-移动端菜单商务咨询',
  home_hero_consult: '首页-Banner商务咨询',
  home_solutions_consult: '首页-解决方案商务咨询',
  home_case_study_consult: '首页-客户案例商务咨询',
  home_bottom_consult: '首页-底部商务咨询',
  footer_private_deploy: '全站底部-私有化部署咨询',
  content_article_body_consult: '内容正文-商务咨询',
  tech_article_sidebar_consult: '技术文章-侧栏商务咨询',
  guide_article_sidebar_consult: '指南文章-侧栏商务咨询',
  faq_detail_sidebar_consult: 'FAQ详情-侧栏商务咨询',
  price_cloud_custom: '价格页-云服务定制版商务咨询',
  price_self_commercial: '价格页-私有化商业版商务咨询',
  enterprise_footer_consult: '企业版页面-底部商务咨询',
  home_hero: '案例中心-首页 Banner 商务咨询',
  home_bottom: '案例中心-首页底部商务咨询',
  navbar_poc: '案例中心-顶部商务咨询',
  customers_hero: '案例详情-顶部商务咨询',
  customers_sidebar: '案例详情-侧边栏商务咨询',
  customers_bottom: '案例详情-底部商务咨询',
  empty_state: '案例中心-空状态商务咨询'
};

function getRybbitConsultSourceLabel(source: string): string {
  return CONSULT_SOURCE_LABELS[source] || '其他页面-商务咨询';
}

export type RybbitConsultCapture = {
  source: string;
  entryPageUrl: string;
};

export function getCurrentCanonicalPageUrl(): string {
  if (typeof window === 'undefined') return '';
  try {
    const url = new URL(window.location.href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '';
  }
}

export function createRybbitConsultCapture(sourceId: string): RybbitConsultCapture {
  const source = getRybbitConsultSourceLabel(sourceId);
  return {
    source,
    entryPageUrl: `${source}｜${getCurrentCanonicalPageUrl()}`
  };
}
