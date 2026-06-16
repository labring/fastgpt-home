import FastGPTLogo from '@/components/home/FastGPTLogo';
import { assets } from '@/components/home/assets';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import CloudEntryLink from '@/components/home/CloudEntryLink';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

type ColumnLink = { label: string; href: string; external?: boolean; cloudEntrySource?: string };
type Column = { title: string; width: number; items: (ColumnLink | { label: string })[] };

type FooterT = {
  tagline: string;
  columns: {
    service: {
      title: string;
      items: { cloud: string; private: string; community: string; docs: string };
    };
    partner: { title: string };
    more: { title: string; email: string; lanqiao: string; book: string };
  };
  qr: { wechat: string; feishu: string; group: string };
  copyright: string;
};

function buildColumns(t: FooterT['columns']): Column[] {
  return [
    {
      title: t.service.title,
      width: 150,
      items: [
        {
          label: t.service.items.cloud,
          href: siteConfig.userUrl,
          cloudEntrySource: 'footer_cloud',
          external: true
        },
        {
          label: t.service.items.private,
          href: 'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?hide_S=1&prefill_S=C2',
          external: true
        },
        { label: t.service.items.community, href: 'https://github.com/labring/FastGPT', external: true },
        { label: t.service.items.docs, href: 'https://doc.fastgpt.io/docs/introduction', external: true }
      ]
    },
    {
      title: t.partner.title,
      width: 150,
      items: [
        { label: 'Sealos', href: 'https://sealos.run/?s=%E9%A6%96%E9%A1%B5', external: true },
        { label: 'AI Proxy', href: 'https://sealos.run/aiproxy/?s=AiProxy', external: true }
      ]
    },
    {
      title: t.more.title,
      width: 220,
      items: [
        { label: t.more.email },
        { label: t.more.lanqiao, href: 'https://www.lanqiao.cn/courses/6666', external: true },
        { label: t.more.book, href: 'https://item.m.jd.com/product/10204687656446.html', external: true }
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

// Tokens lifted directly from Framer CSS presets (ns4tgy / 1obu4np / 1gev9pt)
const linkStyle = {
  fontFamily: '"Inter", "Inter Placeholder", sans-serif',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '-0.01em',
} as const;

const headingStyle = {
  ...linkStyle,
  color: 'rgb(2, 6, 23)'
} as const;

const subtitleStyle = {
  fontFamily: '"Inter", "Inter Placeholder", sans-serif',
  fontSize: 18,
  fontWeight: 400,
  lineHeight: '28px',
  letterSpacing: '-0.01em',
  color: 'rgb(41, 47, 56)',
  margin: 0
} as const;

const legalStyle = {
  fontFamily: '"Inter", "Inter Placeholder", sans-serif',
  fontSize: 15,
  fontWeight: 400,
  lineHeight: '20px',
  letterSpacing: '-0.01em',
  color: 'rgb(41, 47, 56)'
} as const;

export default function Footer({ t }: { t: FooterT }) {
  const columns = buildColumns(t.columns);
  const qrs = buildQrs(t.qr);
  return (
    <footer className="bg-white py-8 md:py-10">
      <div
        className="mx-auto px-4 md:px-8 lg:px-0"
        style={{
          maxWidth: 1280,
          width: '100%'
        }}
      >
        {/* Container: column flex, gap 32, max-width 1280 */}
        <div className="flex flex-col items-center" style={{ rowGap: 32, width: '100%' }}>
          {/* Row: brand left / link-cols + QR right (space-between).
              Mobile: fully vertical stack, brand left-aligned. */}
          <div
            className="flex flex-col lg:flex-row lg:items-start w-full items-start"
            style={{ columnGap: 32, rowGap: 40 }}
          >
            {/* Brand — flex: 1, column, gap 32 */}
            <div
              className="flex flex-col w-full lg:w-auto"
              style={{ rowGap: 16, flex: '1 0 0', alignItems: 'flex-start' }}
            >
              {/* Logo + name row, gap 4 */}
              <div className="flex items-center" style={{ columnGap: 4 }}>
                <FastGPTLogo size={22} />
                <span
                  style={{
                    fontFamily: '"PingFang SC", "PingFang SC Placeholder", sans-serif',
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: '0.15px',
                    lineHeight: '26px',
                    color: 'rgb(2, 6, 23)'
                  }}
                >
                  FastGPT
                </span>
              </div>
              <p style={subtitleStyle}>{t.tagline}</p>
            </div>

            {/* Right side: 3-link-cols row atop, QR row below, gap 32.
                Mobile: link cols and QRs all stack vertically (no flex-wrap). */}
            <div className="flex flex-col w-full lg:w-auto" style={{ rowGap: 32 }}>
              {/* 3 link columns — vertical on mobile, row on md+ */}
              <div className="flex flex-col md:flex-row md:flex-wrap" style={{ columnGap: 10, rowGap: 24 }}>
                {columns.map((col) => (
                  <div
                    key={col.title}
                    className={`flex flex-col w-full ${col.width === 220 ? 'md:w-[220px]' : 'md:w-[150px]'}`}
                    style={{ rowGap: 10, alignItems: 'flex-start' }}
                  >
                    <h4 style={{ ...headingStyle, margin: 0, textAlign: 'left', width: '100%' }}>
                      {col.title}
                    </h4>
                    {col.items.map((item) => {
                      if ('href' in item) {
                        if (item.cloudEntrySource) {
                          return (
                            <CloudEntryLink
                              key={item.label}
                              source={item.cloudEntrySource}
                              targetUrl={item.href}
                              {...(item.external
                                ? { target: '_blank', rel: 'noopener noreferrer nofollow' }
                                : {})}
                              className="hover:text-black  text-ink-sub"
                              style={{ ...linkStyle, textAlign: 'left' }}
                            >
                              {item.label}
                            </CloudEntryLink>
                          );
                        }

                        return (
                          <a
                            key={item.label}
                            href={item.href}
                            {...(item.external
                              ? { target: '_blank', rel: 'noopener noreferrer nofollow' }
                              : {})}
                            {...(item.href.includes('feishu.cn')
                              ? rybbitClickAttrs(RYBBIT_EVENTS.businessConsultClick, 'footer_private_deploy')
                              : {})}
                            className="hover:text-black  text-ink-sub"
                            style={{ ...linkStyle, textAlign: 'left' }}

                          >
                            {item.label}
                          </a>
                        );
                      }
                      return (
                        <span
                          key={item.label}
                          style={{ ...linkStyle, textAlign: 'left', width: '100%' }}
                        >
                          {item.label}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* QR row — vertical on mobile, row on md+ */}
              <div className="flex flex-col md:flex-row md:flex-wrap" style={{ columnGap: 10, rowGap: 16 }}>
                {qrs.map((q) => (
                  <div
                    key={q.label}
                    className="flex flex-col"
                    style={{ rowGap: 10, width: 150, alignItems: 'flex-start' }}
                  >
                    <span style={{ ...linkStyle }}>{q.label}</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={q.src}
                      alt={q.label}
                      className="select-none object-contain"
                      draggable={false}
                      loading="lazy"
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 6,
                        border: '1px solid rgb(241, 245, 249)'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider: 1px, full width, rgb(241, 245, 249) */}
          <div
            style={{
              width: '100%',
              height: 1,
              backgroundColor: 'rgb(241, 245, 249)'
            }}
          />

          {/* Bottom row: legal left / socials right on desktop, fully centered
              column-stack on mobile. */}
          <div
            className="flex flex-col items-center md:flex-row md:items-center md:justify-between w-full"
            style={{ rowGap: 16 }}
          >
            <div className="flex flex-wrap justify-center md:justify-start items-center text-center md:text-left" style={{ columnGap: 24, rowGap: 8 }}>
              <span style={legalStyle}>
                {t.copyright} ©{new Date().getFullYear()}{' '}
                <a
                  href="https://github.com/labring/FastGPT"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'inherit' }}
                >
                  labring
                </a>
              </span>
              {process.env.NEXT_PUBLIC_POLICE_FILING && (
                <a
                  href="https://beian.mps.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:opacity-70 transition-opacity"
                  style={legalStyle}
                >
                  {process.env.NEXT_PUBLIC_POLICE_FILING}
                </a>
              )}
              {process.env.NEXT_PUBLIC_FILING_ADDRESS && (
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hover:opacity-70 transition-opacity"
                  style={legalStyle}
                >
                  {process.env.NEXT_PUBLIC_FILING_ADDRESS}
                </a>
              )}
            </div>

            <div className="flex items-center" style={{ columnGap: 16 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={s.label}
                  className="transition-transform hover:scale-110"
                  style={{ width: 24, height: 24, display: 'block' }}
                >
                  <Image
                    src={s.src}
                    alt=""
                    width={24}
                    height={24}
                    loading="lazy"
                    className="select-none"
                    draggable={false}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
