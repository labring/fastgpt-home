import { MetadataRoute } from 'next'
import { faq } from '@/faq'
import { showFAQ } from '@/constants'

export const dynamic = 'force-static'

const locales = ['en', 'zh', 'ja']

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'
  const basePaths = ['', '/enterprise', '/price']
  const entries: MetadataRoute.Sitemap = []

  // 根首页
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}`]))
    }
  })

  // 各语言的基础页面
  for (const locale of locales) {
    for (const path of basePaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${path}`]))
        }
      })
    }

    // FAQ 列表页
    if (showFAQ) {
      entries.push({
        url: `${baseUrl}/${locale}/faq`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/faq`]))
        }
      })
    }
  }

  // FAQ 详情页
  if (showFAQ) {
    for (const locale of locales) {
      for (const faqId of Object.keys(faq)) {
        const encodedFaqId = encodeURIComponent(faqId)
        entries.push({
          url: `${baseUrl}/${locale}/faq/${encodedFaqId}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((l) => [l, `${baseUrl}/${l}/faq/${encodedFaqId}`])
            )
          }
        })
      }
    }
  }

  return entries
}
