const LEGACY_DOC_PREFIX_URL_REGEX =
  /https:\/\/doc\.fastgpt\.(cn|io)\/(zh-CN|en)(?:(?=[/?#]|$)|(?=\s)|$)/;

const DOC_URL_IN_TEXT_REGEX =
  /https:\/\/doc\.fastgpt\.(?:cn|io)\/(?:zh-CN|en)(?:[^\s"'<>`\\)\]]*(?:\([^\s"'<>`\\)]*\)[^\s"'<>`\\)\]]*)?)/g;

const TRAILING_PUNCTUATION_REGEX = /[.,;:!?。，；：！？、）\]]+$/;

function normalizeDocumentationUrl(rawUrl) {
  if (typeof rawUrl !== 'string' || !rawUrl) return rawUrl;
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return rawUrl;
  }
  if (url.protocol !== 'https:' || (url.hostname !== 'doc.fastgpt.cn' && url.hostname !== 'doc.fastgpt.io')) {
    return rawUrl;
  }

  let targetHost = url.hostname;
  let nextPath = url.pathname;
  if (nextPath === '/zh-CN' || nextPath === '/zh-CN/') {
    targetHost = 'doc.fastgpt.cn';
    nextPath = '/guide/getting-started';
  } else if (nextPath.startsWith('/zh-CN/')) {
    targetHost = 'doc.fastgpt.cn';
    nextPath = nextPath.slice('/zh-CN'.length);
  } else if (nextPath === '/en' || nextPath === '/en/') {
    targetHost = 'doc.fastgpt.io';
    nextPath = '/guide/getting-started';
  } else if (nextPath.startsWith('/en/')) {
    targetHost = 'doc.fastgpt.io';
    nextPath = nextPath.slice('/en'.length);
  } else {
    return rawUrl;
  }

  url.hostname = targetHost;
  url.pathname = nextPath;
  return url.href;
}

function splitTrailingPunctuation(candidate) {
  const trailingMatch = candidate.match(TRAILING_PUNCTUATION_REGEX);
  if (!trailingMatch) return { urlPart: candidate, trailing: '' };
  return {
    urlPart: candidate.slice(0, candidate.length - trailingMatch[0].length),
    trailing: trailingMatch[0]
  };
}

function normalizeDocumentationUrlsInText(text) {
  if (typeof text !== 'string' || !text) return text;
  return text.replace(DOC_URL_IN_TEXT_REGEX, (match) => {
    const { urlPart, trailing } = splitTrailingPunctuation(match);
    return `${normalizeDocumentationUrl(urlPart)}${trailing}`;
  });
}

function findLegacyDocumentationUrls(text) {
  if (typeof text !== 'string' || !text) return [];
  const matches = [];
  for (const match of text.matchAll(DOC_URL_IN_TEXT_REGEX)) {
    const { urlPart } = splitTrailingPunctuation(match[0]);
    if (LEGACY_DOC_PREFIX_URL_REGEX.test(urlPart)) {
      matches.push(urlPart);
    }
  }
  return matches;
}

module.exports = {
  LEGACY_DOC_PREFIX_URL_REGEX,
  findLegacyDocumentationUrls,
  normalizeDocumentationUrl,
  normalizeDocumentationUrlsInText
};
