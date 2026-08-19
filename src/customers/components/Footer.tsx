"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { openCtaModal } from "@/customers/lib/cta";
import { withBasePath } from "@/customers/lib/base-path";

const qrCodeImages = [
  {
    label: "官方公众号（微信）",
    src: withBasePath("/images/footer/qr-wechat-official.avif"),
    alt: "官方公众号（微信）"
  },
  {
    label: "官方社群（飞书）",
    src: withBasePath("/images/footer/qr-feishu-community.avif"),
    alt: "官方社群（飞书）"
  },
  {
    label: "官方社群（微信）",
    src: withBasePath("/images/footer/qr-wechat-community.avif"),
    alt: "官方社群（微信）"
  }
] as const;

const socialLinks = [
  {
    href: "https://www.douyin.com/user/MS4wLjABAAAAO6DBKtrrM1zFyOZPcvKX06PmbJlLu7GyReqRY2toeRd3-_Q7Ih6s_jAgtEou_la7?previous_page=app_code_link",
    label: "抖音",
    iconSrc: withBasePath("/images/home/social/douyin.svg")
  },
  {
    href: "https://xhslink.com/m/4b1i3KO5KxC",
    label: "小红书",
    iconSrc: withBasePath("/images/home/social/xhs.svg")
  },
  {
    href: "https://b23.tv/bfSWLDX",
    label: "B 站",
    iconSrc: withBasePath("/images/home/social/bilibili.svg")
  },
  {
    href: "https://www.zhihu.com/people/341ddd5c4e4a320bdf06ed50121d66df",
    label: "知乎",
    iconSrc: withBasePath("/images/home/social/zhihu.svg")
  },
  {
    href: "https://github.com/labring/FastGPT",
    label: "GitHub",
    iconSrc: withBasePath("/images/home/social/github.svg")
  }
] as const;

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/customers/admin') || pathname === '/customers/login') {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-[#202124] py-8 md:py-10 border-t border-[#dee0e3] dark:border-[#373c43]">
      <div className="mx-auto px-4 md:px-8 lg:px-0" style={{ maxWidth: 1280, width: '100%' }}>
        <div className="flex flex-col items-center" style={{ rowGap: 32, width: '100%' }}>
          <div
            className="flex flex-col lg:flex-row lg:items-start w-full items-start"
            style={{ columnGap: 32, rowGap: 40 }}
          >
            <div className="flex flex-col w-full lg:w-auto" style={{ rowGap: 16, flex: '1 0 0', alignItems: 'flex-start' }}>
              <div className="flex items-center" style={{ columnGap: 4 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="FastGPT">
                  <path d="M13.1962 6.66125C13.1962 5.77652 12.9235 4.91165 12.4125 4.17602C11.9015 3.44039 11.1752 2.86704 10.3254 2.52846C9.47563 2.18989 8.54057 2.1013 7.63846 2.27391C6.73635 2.44651 5.90771 2.87255 5.25733 3.49815C4.60694 4.12375 4.16403 4.92082 3.98459 5.78856C3.80515 6.65629 3.89724 7.55572 4.24923 8.37311C4.60121 9.1905 5.19728 9.88914 5.96205 10.3807C6.72682 10.8722 7.62595 11.1346 8.54573 11.1346V6.66125H13.1962Z" fill="url(#paint0_linear_307_36451)" />
                  <path d="M18.105 6.66125C18.105 6.07381 17.9971 5.49212 17.7876 4.94939C17.578 4.40667 17.2708 3.91353 16.8836 3.49815C16.4964 3.08277 16.0367 2.75326 15.5308 2.52846C15.0248 2.30366 14.4826 2.18795 13.935 2.18795C13.3874 2.18795 12.8451 2.30366 12.3392 2.52846C11.8332 2.75327 11.3735 2.81377 10.9863 3.49815C10.5991 3.81354 10.2919 4.40667 10.0824 4.94939C9.87281 5.49212 9.76495 6.07381 9.76495 6.66125L18.105 6.66125Z" fill="url(#paint1_linear_307_36451)" />
                  <path d="M17.34 13.832C17.34 13.3329 17.2543 12.8388 17.0877 12.3777C16.9212 11.9167 16.6771 11.4977 16.3694 11.1448C16.0617 10.792 15.6964 10.512 15.2944 10.3211C14.8924 10.1301 14.4615 10.0318 14.0263 10.0318V13.832H17.34Z" fill="url(#paint2_linear_307_36451)" />
                  <path d="M8.54557 12.4614C7.93486 12.4614 7.33012 12.5667 6.7659 12.7714C6.20167 12.9761 5.68901 13.276 5.25717 13.6542C4.82533 14.0324 4.48277 14.4814 4.24906 14.9755C4.01535 15.4696 3.89507 15.9992 3.89507 16.534C3.89507 17.0688 4.01535 17.5984 4.24906 18.0925C4.48277 18.5866 4.82533 19.0356 5.25717 19.4137C5.68901 19.7919 6.20167 20.0919 6.7659 20.2966C7.33013 20.5012 7.93486 20.6066 8.54557 20.6066L8.54557 12.4614Z" fill="url(#paint3_linear_307_36451)" />
                  <path d="M8.54563 6.48408L8.54563 16.4893L3.89499 16.4893L3.89499 6.48408H8.54563Z" fill="url(#paint4_linear_307_36451)" />
                  <path d="M14.0755 6.66051L8.49284 6.66051L8.49284 2.18794L14.0755 2.18794V6.66051Z" fill="url(#paint5_linear_307_36451)" />
                  <path d="M14.0755 13.8305H10.986V10.0318L14.0755 10.0318V13.8305Z" fill="url(#paint6_linear_307_36451)" />
                  <defs>
                    <linearGradient id="paint0_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                    <linearGradient id="paint4_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                    <linearGradient id="paint5_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                    <linearGradient id="paint6_linear_307_36451" x1="11" y1="2.18794" x2="11" y2="20.6066" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#326DFF" />
                      <stop offset="1" stopColor="#8EAEFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-gray-900 dark:text-[#f1f3f5]" style={{ fontFamily: '"PingFang SC", "PingFang SC Placeholder", sans-serif', fontSize: 18, fontWeight: 600, letterSpacing: '0.15px', lineHeight: '26px' }}>FastGPT</span>
              </div>
              <p className="text-gray-700 dark:text-[#aeb4bc] m-0" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 18, fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.01em' }}>
                企业级AI生产力引擎
              </p>
            </div>
            <div className="flex flex-col w-full lg:w-auto" style={{ rowGap: 32 }}>
              <div className="flex flex-col md:flex-row md:flex-wrap" style={{ columnGap: 10, rowGap: 24 }}>
                <div className="flex flex-col w-full md:w-[150px]" style={{ rowGap: 10, alignItems: 'flex-start' }}>
                  <h4 className="text-gray-900 dark:text-[#f1f3f5] m-0 text-left w-full" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em' }}>
                    服务
                  </h4>
                  <a href="https://cloud.fastgpt.cn" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>云服务</a>
	                  <button
	                    type="button"
	                    onClick={() => openCtaModal({
	                      source: 'footer_private_deploy',
	                      title: '私有化与 POC 交付咨询',
	                      subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，协助评估私有化部署、免费 POC 验证与生产环境交付路径。'
	                    })}
	                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
	                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>私有化与 POC 交付</button>
                  <a href="https://github.com/labring/FastGPT" target="_blank" rel="noopener noreferrer nofollow"
                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>社区版</a>
                  <a href="https://doc.fastgpt.cn/docs/introduction" target="_blank" rel="noopener noreferrer nofollow"
                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>文档中心</a>
                </div>
                <div className="flex flex-col w-full md:w-[150px]" style={{ rowGap: 10, alignItems: 'flex-start' }}>
                  <h4 className="text-gray-900 dark:text-[#f1f3f5] m-0 text-left w-full" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em' }}>
                    生态伙伴
                  </h4>
                  <a href="https://sealos.run/?s=%E9%A6%96%E9%A1%B5" target="_blank" rel="noopener noreferrer nofollow"
                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>Sealos</a>
                  <a href="https://sealos.run/aiproxy/?s=AiProxy" target="_blank" rel="noopener noreferrer nofollow"
                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>AI Proxy</a>
                </div>
                <div className="flex flex-col w-full md:w-[220px]" style={{ rowGap: 10, alignItems: 'flex-start' }}>
                  <h4 className="text-gray-900 dark:text-[#f1f3f5] m-0 text-left w-full" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em' }}>
                    更多信息
                  </h4>
                  <span className="text-gray-700 dark:text-[#aeb4bc]" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left', width: '100%' }}>邮箱：Dennis@sealos.io</span>
                  <a href="https://www.lanqiao.cn/courses/6666" target="_blank" rel="noopener noreferrer nofollow"
                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>蓝桥云课 x FastGPT教程</a>
                  <a href="https://item.m.jd.com/product/10204687656446.html" target="_blank" rel="noopener noreferrer nofollow"
                    className="hover:text-gray-900 dark:hover:text-[#f1f3f5] text-ink-sub dark:text-[#aeb4bc] transition-colors"
                    style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em', textAlign: 'left' }}>FastGPT官方教材（纸质书）</a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:flex-wrap" style={{ columnGap: 10, rowGap: 16 }}>
                {qrCodeImages.map((item) => (
                  <div key={item.label} className="flex flex-col" style={{ rowGap: 10, width: 150, alignItems: 'flex-start' }}>
                    <span className="text-gray-700 dark:text-[#aeb4bc]" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 16, fontWeight: 400, lineHeight: '22px', letterSpacing: '-0.01em' }}>
                      {item.label}
                    </span>
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="80px"
                        loading="lazy"
                        unoptimized
                        className="select-none object-contain rounded-md border border-gray-100 dark:border-[#373c43]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-gray-100 dark:bg-[#373c43]" />
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between w-full" style={{ rowGap: 16 }}>
            <div className="flex flex-wrap justify-center md:justify-start items-center text-center md:text-left" style={{ columnGap: 24, rowGap: 8 }}>
              <span className="text-gray-600 dark:text-[#8f959e]" style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 15, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.01em' }}>
                Copyright &copy; 2026{' '}
                <a href="https://github.com/labring/FastGPT" target="_blank" rel="noopener noreferrer nofollow" className="hover:opacity-70 transition-opacity text-inherit">labring</a>
              </span>
              <a href="https://beian.mps.gov.cn/" target="_blank" rel="noopener noreferrer nofollow" className="hover:opacity-70 transition-opacity text-gray-600 dark:text-[#8f959e]"
                style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 15, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.01em' }}>浙公网安备33011002017871号</a>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer nofollow" className="hover:opacity-70 transition-opacity text-gray-600 dark:text-[#8f959e]"
                style={{ fontFamily: '"Inter", "Inter Placeholder", sans-serif', fontSize: 15, fontWeight: 400, lineHeight: '20px', letterSpacing: '-0.01em' }}>粤ICP备2023048773号</a>
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={item.label}
                  className="transition-transform hover:scale-110 block relative"
                  style={{ width: 24, height: 24 }}
                >
                  <Image
                    src={item.iconSrc}
                    alt=""
                    fill
                    sizes="24px"
                    loading="lazy"
                    className="select-none dark:invert dark:opacity-80 object-contain"
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
