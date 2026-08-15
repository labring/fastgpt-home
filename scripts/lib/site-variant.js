const assert = require('node:assert/strict');
const siteRoutingManifest = require('../../src/config/site-routing.json');

const siteVariants = Object.keys(siteRoutingManifest.siteVariants);
const localeCodes = Object.keys(siteRoutingManifest.locales);

function validateManifest() {
  for (const variant of ['cn', 'io', 'preview']) {
    assert(siteVariants.includes(variant), `Missing Site Variant: ${variant}`);
    assert(
      localeCodes.includes(siteRoutingManifest.siteVariants[variant].defaultLocale),
      `Invalid default locale for Site Variant: ${variant}`
    );
  }

  for (const [code, locale] of Object.entries(siteRoutingManifest.locales)) {
    assert(['cn', 'io'].includes(locale.owner), `Invalid locale owner for ${code}`);
    assert(locale.hreflang, `Missing hreflang for ${code}`);
    assert(['ltr', 'rtl'].includes(locale.dir), `Invalid direction for ${code}`);
  }
}

validateManifest();

function stripTrailingSlash(value) {
  return value.replace(/\/$/, '');
}

function resolveSiteVariant(env = process.env) {
  const configured = (env.NEXT_PUBLIC_SITE_VARIANT || '').trim();
  if (configured) {
    if (siteVariants.includes(configured)) return configured;
    throw new Error(`Invalid NEXT_PUBLIC_SITE_VARIANT: ${configured}`);
  }

  const homeUrl = env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.cn';
  return new URL(homeUrl).hostname.endsWith('.cn') ? 'cn' : 'io';
}

function getDefaultLocale(variant) {
  const config = siteRoutingManifest.siteVariants[variant];
  if (!config) throw new Error(`Invalid Site Variant: ${variant}`);
  return config.defaultLocale;
}

function getPublishedLocaleCodes(variant) {
  if (variant === 'preview') return [...localeCodes];
  if (!siteVariants.includes(variant)) throw new Error(`Invalid Site Variant: ${variant}`);
  return localeCodes.filter((code) => siteRoutingManifest.locales[code].owner === variant);
}

function getProductionBaseUrls(env = process.env) {
  return {
    cn: stripTrailingSlash(env.NEXT_PUBLIC_CN_HOME_URL || 'https://fastgpt.cn'),
    io: stripTrailingSlash(env.NEXT_PUBLIC_IO_HOME_URL || 'https://fastgpt.io')
  };
}

function getCanonicalBaseUrl(variant, env = process.env) {
  const baseUrls = getProductionBaseUrls(env);
  return variant === 'cn' ? baseUrls.cn : baseUrls.io;
}

if (require.main === module) {
  assert.equal(resolveSiteVariant({ NEXT_PUBLIC_SITE_VARIANT: 'cn' }), 'cn');
  assert.equal(resolveSiteVariant({ NEXT_PUBLIC_HOME_URL: 'https://fastgpt.io' }), 'io');
  assert.throws(() => resolveSiteVariant({ NEXT_PUBLIC_SITE_VARIANT: 'invalid' }));
  assert.equal(getCanonicalBaseUrl('preview', {}), 'https://fastgpt.io');
  assert.deepEqual(getPublishedLocaleCodes('cn'), ['zh']);
  assert.equal(getPublishedLocaleCodes('preview').length, localeCodes.length);
  console.log('Site Variant checks passed');
}

module.exports = {
  getCanonicalBaseUrl,
  getDefaultLocale,
  getPublishedLocaleCodes,
  getProductionBaseUrls,
  localeCodes,
  resolveSiteVariant,
  siteVariants,
  stripTrailingSlash
};
