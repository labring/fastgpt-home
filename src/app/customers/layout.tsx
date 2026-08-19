import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/customers/components/theme-provider";
import FormModal from "@/customers/components/FormModal";
import Footer from "@/customers/components/Footer";
import { SWRProvider } from "@/customers/components/providers/SWRProvider";
import { UploadQueueProvider } from "@/customers/components/providers/UploadQueueProvider";
import { absoluteUrl } from "@/customers/lib/site-url";
import { buildSiteJsonLd } from "@/customers/lib/site-json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: "FastGPT 客户案例中心",
  description: "探索企业级 AI 解决方案。依托 FastGPT 强大的工作流引擎与知识库检索能力，我们为不同业务场景抽象出标准化、开箱即用的解决方案模板，助力企业快速落地。",
  alternates: {
    canonical: absoluteUrl('/')
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "FastGPT 客户案例中心",
    description: "探索企业级 AI 解决方案，了解行业场景、落地案例、免费 POC 验证路径与生产级交付方式。",
    url: absoluteUrl('/'),
    siteName: "FastGPT 客户案例中心",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: absoluteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: "FastGPT 客户案例中心"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "FastGPT 客户案例中心",
    description: "探索企业级 AI 解决方案，了解行业场景、落地案例、免费 POC 验证路径与生产级交付方式。",
    images: [absoluteUrl('/og-image.png')]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="preconnect" href="https://objectstorageapi.hzh.sealos.run" />
      <link rel="dns-prefetch" href="https://objectstorageapi.hzh.sealos.run" />
      <link rel="preconnect" href="https://cloud.fastgpt.cn" />
      <link rel="dns-prefetch" href="https://cloud.fastgpt.cn" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSiteJsonLd()).replace(/</g, '\\u003c') }}
      />
      <div className="customers-scope min-h-screen flex flex-col bg-surface-100 dark:bg-[#202124] text-[#2b2f36] dark:text-[#dfe1e5] transition-colors">
        <Script
          id="fastgpt-traffic-tracker"
          src="https://track.fastgpt.cn/api/script.js"
          strategy="afterInteractive"
          data-site-id="fc126799627f"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UploadQueueProvider>
            <SWRProvider>
              <div className="flex-1">
                {children}
              </div>
              <FormModal />
              <Footer />
              <Toaster
                position="top-center"
                richColors
                duration={2000}
                closeButton
                toastOptions={{
                  style: { marginTop: '64px' }
                }}
              />
            </SWRProvider>
          </UploadQueueProvider>
        </ThemeProvider>
      </div>
    </>
  );
}
