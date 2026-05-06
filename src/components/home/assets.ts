const CDN = 'https://static.step1.dev/tixzae/assets';
const LOCAL = '/images/home';

export const assets = {
  heroDashboard: `${LOCAL}/hero/kv-border.png`,
  heroBg: `${LOCAL}/hero/bg.png`,
  trustLogos: [
    `${LOCAL}/trust/logo1.png`,
    `${LOCAL}/trust/logo2.png`,
    `${LOCAL}/trust/logo3.png`,
    `${LOCAL}/trust/logo4.png`,
    `${LOCAL}/trust/logo5.svg`,
    `${LOCAL}/trust/logo6.png`
  ],
  features: {
    blocks: `${LOCAL}/product/feature1.png`,
    kb: `${LOCAL}/product/feature2.png`,
    lifecycle: `${LOCAL}/product/feature3.png`,
    production: `${LOCAL}/product/feature4.png`,
    partner: `${LOCAL}/product/feature5.png`
  },
  solutions: {
    sales: `${LOCAL}/solutions/sol1.jpg`,
    service: `${LOCAL}/solutions/sol2.jpg`,
    hr: `${LOCAL}/solutions/sol3.jpg`,
    finance: `${LOCAL}/solutions/sol4.jpg`,
  },
  cases: {
    snow: `${LOCAL}/cases/case1.png`,
    zhaozhao: `${LOCAL}/cases/case2.png`,
    lcfc: `${LOCAL}/cases/case3.png`,
    cetc: `${LOCAL}/cases/case4.png`,
    cms: `${LOCAL}/cases/case5.png`
  },
  brandWall: `${LOCAL}/brands/brand-wall.png`,
  cta: {
    globe: `${LOCAL}/cta/globe.png`
  },
  qr: {
    wechat: `${CDN}/0768b69c8927.avif`,
    feishu: `${CDN}/bbac2150ad97.avif`,
    group: `${CDN}/03578929bf2a.avif`
  }
};
