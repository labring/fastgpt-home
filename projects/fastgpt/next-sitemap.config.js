/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://fastgpt.in",
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
