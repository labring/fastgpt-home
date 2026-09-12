import FastGPTLogo from '@/components/home/FastGPTLogo';
import { assets } from '@/components/home/assets';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import CloudEntryLink from '@/components/home/CloudEntryLink';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';
import { isContactHref } from '@/lib/consultation';
import { getDefaultLocalePath } from '@/lib/clientNavigation';
import { getGuideReviewPath } from '@/lib/guideSeo';
import { normalizeLocale } from '@/lib/locales';
import { getContactPublishedLocale } from '@/lib/publishedLocales';
import styles from './Footer.module.css';

type ColumnLink = { label: string; href: string; external?: boolean; cloudEntrySource?: string };
type Column = { title: string; items: ColumnLink[] };

type FooterT = {
  tagline: string;
  columns: {
    service: {
      title: string;
      items: { cloud: string; private: string; community: string };
    };
    links: {
      title: string;
      items: {
        docs: string;
        guide: string;
        faq: string;
        learning: string;
        cases: string;
        tech: string;
      };
    };
    partner: { title: string };
    more: { title: string; email: string; phone: string; lanqiao: string; book: string };
  };
  qr: { wechat: string; feishu: string; group: string };
  copyright: string;
};

function buildColumns(t: FooterT['columns'], locale?: string): Column[] {
  const normalizedLocale = normalizeLocale(locale);
  const faqLocale = normalizedLocale === 'zh' ? 'zh' : 'en';
  const guideLocale = normalizedLocale === 'zh' ? 'zh' : 'en';
  const techLocale = normalizedLocale === 'zh' ? 'zh' : 'en';

  return [
    {
      title: t.service.title,
      items: [
        {
          label: t.service.items.cloud,
          href: siteConfig.userUrl,
          cloudEntrySource: 'footer_cloud',
          external: true
        },
        {
          label: t.service.items.private,
          href: getDefaultLocalePath(getContactPublishedLocale(normalizedLocale), '/contact'),
          external: false
        },
        {
          label: t.service.items.community,
          href: 'https://github.com/labring/FastGPT',
          external: true
        }
      ]
    },
    {
      title: t.links.title,
      items: [
        {
          label: t.links.items.docs,
          href: 'https://doc.fastgpt.io/docs/introduction',
          external: true
        },
        {
          label: t.links.items.guide,
          href: getGuideReviewPath(guideLocale),
          external: false
        },
        {
          label: t.links.items.learning,
          href: 'https://video.fastgpt.cn/videos',
          external: true
        },
        {
          label: t.links.items.cases,
          href: normalizedLocale === 'zh' ? '/customers' : 'https://fastgpt.cn/customers',
          external: normalizedLocale !== 'zh'
        },
        {
          label: t.links.items.faq,
          href: getDefaultLocalePath(faqLocale, '/faq'),
          external: false
        },
        {
          label: t.links.items.tech,
          href: getDefaultLocalePath(techLocale, '/tech-center'),
          external: false
        }
      ]
    },
    {
      title: t.partner.title,
      items: [
        { label: 'Sealos', href: 'https://sealos.run/?s=%E9%A6%96%E9%A1%B5', external: true },
        { label: 'AI Proxy', href: 'https://sealos.run/products/aiproxy', external: true }
      ]
    },
    {
      title: t.more.title,
      items: [
        { label: t.more.email, href: 'mailto:business@fastgpt.io' },
        { label: t.more.phone, href: 'tel:4006992336' },
        { label: t.more.lanqiao, href: 'https://www.lanqiao.cn/courses/6666', external: true },
        {
          label: t.more.book,
          href: 'https://item.m.jd.com/product/10204687656446.html',
          external: true
        }
      ]
    }
  ];
}

function buildQrs(t: FooterT['qr']) {
  return [
    { label: t.wechat, src: assets.qr.wechat },
    { label: t.feishu, src: assets.qr.feishu },
    { label: t.group, src: assets.qr.group }
  ];
}

const socials: { label: string; href: string; src: string }[] = [
  {
    label: '抖音',
    href: 'https://www.douyin.com/user/MS4wLjABAAAAO6DBKtrrM1zFyOZPcvKX06PmbJlLu7GyReqRY2toeRd3-_Q7Ih6s_jAgtEou_la7?previous_page=app_code_link',
    src: '/images/home/social/douyin.svg'
  },
  {
    label: '小红书',
    href: 'https://xhslink.com/m/4b1i3KO5KxC',
    src: '/images/home/social/xhs.svg'
  },
  {
    label: 'B 站',
    href: 'https://b23.tv/bfSWLDX',
    src: '/images/home/social/bilibili.svg'
  },
  {
    label: '知乎',
    href: 'https://www.zhihu.com/people/341ddd5c4e4a320bdf06ed50121d66df',
    src: '/images/home/social/zhihu.svg'
  },
  {
    label: 'GitHub',
    href: 'https://github.com/labring/FastGPT',
    src: '/images/home/social/github.svg'
  }
];

export default function Footer({ t, locale }: { t: FooterT; locale?: string }) {
  const columns = buildColumns(t.columns, locale);
  const qrs = buildQrs(t.qr);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <FastGPTLogo size={32} />
              <span>FastGPT</span>
            </div>
            <p className={styles.tagline}>{t.tagline}</p>
          </div>
          <div className={styles.columns}>
            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <h2 className={styles.heading}>{col.title}</h2>
                <div className={styles.linkList}>
                  {col.items.map((item) => {
                    if (item.cloudEntrySource) {
                      return (
                        <CloudEntryLink
                          key={item.label}
                          source={item.cloudEntrySource}
                          targetUrl={item.href}
                          {...(item.external
                            ? { target: '_blank', rel: 'noopener noreferrer nofollow' }
                            : {})}
                          className={styles.link}
                        >
                          {item.label}
                        </CloudEntryLink>
                      );
                    }
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        data-consultation-trigger={isContactHref(item.href) ? 'true' : undefined}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer nofollow' }
                          : {})}
                        {...(isContactHref(item.href)
                          ? rybbitClickAttrs(
                              RYBBIT_EVENTS.businessConsultClick,
                              'footer_private_deploy'
                            )
                          : {})}
                        className={styles.link}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.communities}>
          {qrs.map((q) => (
            <div key={q.label} className={styles.community}>
              <span className={styles.communityLabel}>{q.label}</span>
              <div className={styles.qrFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={q.src}
                  alt={q.label}
                  draggable={false}
                  loading="lazy"
                  width={88}
                  height={88}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <div className={styles.legal}>
            <a
              href="https://github.com/labring/FastGPT"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {t.copyright.replace('{year}', String(new Date().getFullYear()))}
            </a>
            {process.env.NEXT_PUBLIC_POLICE_FILING && (
              <a
                href="https://beian.mps.gov.cn/"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {process.env.NEXT_PUBLIC_POLICE_FILING}
              </a>
            )}
            {process.env.NEXT_PUBLIC_FILING_ADDRESS && (
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {process.env.NEXT_PUBLIC_FILING_ADDRESS}
              </a>
            )}
          </div>
          <div className={styles.socials}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label={s.label}
              >
                <Image src={s.src} alt="" width={24} height={24} loading="lazy" draggable={false} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
