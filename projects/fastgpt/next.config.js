/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  output: process.env.OUTPUT_MODE,
  pagesDir: process.env.OUTPUT_MODE === 'standalone' ? `src/standalone` : 'src/pages',
  reactStrictMode: process.env.NODE_ENV === 'development' ? false : true,
  compress: true,

  webpack(config, { isServer }) {
    config.module = {
      ...config.module,
      rules: config.module.rules.concat([
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack']
        }
      ]),
      exprContextCritical: false,
      unknownContextCritical: false
    };

    return config;
  }
};

module.exports = nextConfig;
