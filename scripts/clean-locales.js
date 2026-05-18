const fs = require('fs');
const path = require('path');

const LOCALES = ['zh', 'zh-hant', 'en', 'ja', 'ar', 'vi', 'th', 'id', 'ms'];
const LOCALE_DIR = path.join(process.cwd(), 'src/locales');

const ALLOWED_TOP_LEVEL_KEYS = new Set([
  'links',
  'Pricing',
  'FAQ',
  'CTA',
  'CTAButton',
  'Home',
  'Enterprise',
  'NotFound',
  'JsonLd'
]);

const ALLOWED_PRICING_KEYS = new Set([
  'badge',
  'popular',
  'cloud',
  'self',
  'annual',
  'pay10',
  'upgrade',
  'contact',
  'allFeatures',
  'moreFeatures',
  'moreFeaturesLink',
  'monthPriceFormat',
  'monthUnit',
  'chooseVersion',
  'freeUse',
  'monthly',
  'yearPriceFormat',
  'yearUnit',
  'aiCredits',
  'faq'
]);

function readLocale(locale) {
  const filePath = path.join(LOCALE_DIR, `${locale}.json`);
  return {
    filePath,
    data: JSON.parse(fs.readFileSync(filePath, 'utf8'))
  };
}

function removeUnknownKeys(object, allowedKeys) {
  const removed = [];

  for (const key of Object.keys(object)) {
    if (!allowedKeys.has(key)) {
      removed.push(key);
      delete object[key];
    }
  }

  return removed;
}

function listLeafPaths(value, prefix = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => listLeafPaths(item, `${prefix}[${index}]`));
  }

  if (value && typeof value === 'object') {
    return Object.keys(value).flatMap((key) =>
      listLeafPaths(value[key], prefix ? `${prefix}.${key}` : key)
    );
  }

  return [prefix];
}

function diffPaths(basePaths, targetPaths) {
  const base = new Set(basePaths);
  const target = new Set(targetPaths);

  return {
    missing: [...base].filter((item) => !target.has(item)),
    extra: [...target].filter((item) => !base.has(item))
  };
}

const cleaned = new Map();
const removedByLocale = new Map();

for (const locale of LOCALES) {
  const { filePath, data } = readLocale(locale);
  const removed = [];

  for (const key of removeUnknownKeys(data, ALLOWED_TOP_LEVEL_KEYS)) {
    removed.push(key);
  }

  if (data.Pricing) {
    for (const key of removeUnknownKeys(data.Pricing, ALLOWED_PRICING_KEYS)) {
      removed.push(`Pricing.${key}`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
  cleaned.set(locale, data);
  removedByLocale.set(locale, removed);
}

const baseLocale = LOCALES[0];
const basePaths = listLeafPaths(cleaned.get(baseLocale)).sort();
let hasSchemaMismatch = false;

for (const locale of LOCALES.slice(1)) {
  const paths = listLeafPaths(cleaned.get(locale)).sort();
  const { missing, extra } = diffPaths(basePaths, paths);

  if (missing.length || extra.length) {
    hasSchemaMismatch = true;
    console.error(`Locale schema mismatch: ${locale} vs ${baseLocale}`);
    if (missing.length) console.error(`Missing in ${locale}:\n${missing.join('\n')}`);
    if (extra.length) console.error(`Extra in ${locale}:\n${extra.join('\n')}`);
  }
}

if (hasSchemaMismatch) {
  process.exit(1);
}

for (const locale of LOCALES) {
  const removed = removedByLocale.get(locale);
  if (removed.length) {
    console.log(`${locale}: removed ${removed.join(', ')}`);
  } else {
    console.log(`${locale}: no invalid keys`);
  }
}

console.log('Locale files cleaned and schema-checked.');
