import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io'

  // 生成主sitemap索引，指向拆分后的子sitemap
  const sitemapIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/sitemap-base.xml`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/sitemap-faq.xml`,
      lastModified: new Date()
    }
  ]

  console.log(`Generated sitemap index with ${sitemapIndex.length} sitemaps`)
  return sitemapIndex
}