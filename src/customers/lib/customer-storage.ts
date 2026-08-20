export const UNTITLED_CUSTOMER_PREFIX = '未命名案例#';
export const UNTITLED_CUSTOMER_COUNTER_KEY = 'untitled_customer_counter';

export function normalizeCustomerFolderName(value: string) {
  return value
    .trim()
    .replace(/[\/\\:*?"<>|\s]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled';
}

export function getUntitledCustomerFolderName(index: number) {
  return `${UNTITLED_CUSTOMER_PREFIX}${index}`;
}

export function isUntitledCustomerName(value: string) {
  return /^未命名案例#\d+$/.test(value.trim());
}

export function buildS3PublicUrl(publicUrlBase: string, key: string) {
  const normalizedBase = publicUrlBase.replace(/\/$/, '');
  const encodedKey = key
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${normalizedBase}/${encodedKey}`;
}

export function getMissingS3Config(
  settings: {
    s3_region?: string;
    s3_endpoint?: string;
    s3_access_key_id?: string;
    s3_secret_access_key?: string;
    s3_bucket?: string;
    s3_public_url?: string;
  },
  options?: {
    requirePublicUrl?: boolean;
  }
) {
  const missing: string[] = [];

  if (!String(settings.s3_region || '').trim()) missing.push('S3 Region');
  if (!String(settings.s3_endpoint || '').trim()) missing.push('S3 Endpoint');
  if (!String(settings.s3_access_key_id || '').trim()) missing.push('S3 Access Key ID');
  if (!String(settings.s3_secret_access_key || '').trim()) missing.push('S3 Secret Access Key');
  if (!String(settings.s3_bucket || '').trim()) missing.push('S3 Bucket');
  if (options?.requirePublicUrl && !String(settings.s3_public_url || '').trim()) {
    missing.push('S3 Public URL');
  }

  return missing;
}

export function extractS3KeyFromPublicUrl(publicUrlBase: string, url: string) {
  const normalizedBase = publicUrlBase.trim().replace(/\/$/, '');
  if (!normalizedBase) {
    return null;
  }

  const prefix = `${normalizedBase}/`;

  if (!url.startsWith(prefix)) {
    return null;
  }

  const encodedKey = url.slice(prefix.length);

  try {
    return decodeURIComponent(encodedKey);
  } catch {
    return encodedKey;
  }
}
