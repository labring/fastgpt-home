module.exports = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'zh',
    localeDetection: true
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
