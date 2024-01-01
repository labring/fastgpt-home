module.exports = {
  i18n: {
    defaultLocale: 'zh',
    locales: ['en', 'zh'],
    localeDetection: false
  },
  defaultNS: 'common',
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
