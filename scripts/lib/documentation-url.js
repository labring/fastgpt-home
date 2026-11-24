const LEGACY_DOC_PREFIX_REGEX =
  /https:\/\/doc\.fastgpt\.(?:cn|io)\/(zh-CN|en)(?![A-Za-z0-9._~%-])/g;

function normalizeDocumentationUrls(text) {
  if (typeof text !== 'string' || !text) return text;
  return text.replace(
    LEGACY_DOC_PREFIX_REGEX,
    (_, locale) => `https://doc.fastgpt.${locale === 'zh-CN' ? 'cn' : 'io'}`
  );
}

function findLegacyDocumentationUrls(text) {
  if (typeof text !== 'string' || !text) return [];
  return [...text.matchAll(LEGACY_DOC_PREFIX_REGEX)].map((match) => match[0]);
}

module.exports = {
  LEGACY_DOC_PREFIX_REGEX,
  findLegacyDocumentationUrls,
  normalizeDocumentationUrl: normalizeDocumentationUrls,
  normalizeDocumentationUrlsInText: normalizeDocumentationUrls
};
