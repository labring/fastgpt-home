/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOME_URL || "https://fastgpt.in",
  generateRobotsTxt: true,
  sitemapSize: 7000,
}
