import { MetadataRoute } from 'next'
import { faq } from '@/faq'
import { showFAQ } from '@/constants'

export const dynamic = 'force-static'

// 语言配置
const locales = ['en', 'zh', 'ja']

export function GET(): Response {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'
  const sitemap: MetadataRoute.Sitemap = []

  if (showFAQ) {
    console.log(`Generating FAQ sitemap with ${Object.keys(faq).length} FAQ items`)

    // 为每种语言生成FAQ详情页面
    for (const locale of locales) {
      for (const faqId of Object.keys(faq)) {
        // 对FAQ ID进行URL编码以避免XML实体问题
        const encodedFaqId = encodeURIComponent(faqId)

        sitemap.push({
          url: `${baseUrl}/${locale}/faq/${encodedFaqId}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: {
            languages: locales.reduce((acc, lang) => {
              acc[lang] = `${baseUrl}/${lang}/faq/${encodedFaqId}`
              return acc
            }, {} as Record<string, string>)
          }
        })
      }
    }

    console.log(`Generated FAQ sitemap with ${sitemap.length} URLs`)
  } else {
    console.log('FAQ feature is disabled, generating empty FAQ sitemap')
  }

  // 生成XML内容
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.map(url => `  <url>
    <loc>${url.url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${url.alternates?.languages?.en}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${url.alternates?.languages?.zh}" />
    <xhtml:link rel="alternate" hreflang="ja" href="${url.alternates?.languages?.ja}" />
    <lastmod>${(url.lastModified ? new Date(url.lastModified) : new Date()).toISOString()}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    }
  })
}