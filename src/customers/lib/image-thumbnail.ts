import sharp from 'sharp';

export const THUMBNAIL_WIDTH = 640;
export const THUMBNAIL_QUALITY = 80;

const SKIP_CONTENT_TYPES = new Set(['image/svg+xml', 'image/gif', 'image/svg']);

export function shouldGenerateThumbnail(contentType: string): boolean {
  const baseType = contentType?.split(';')[0]?.trim().toLowerCase();
  if (!baseType) return false;
  return !SKIP_CONTENT_TYPES.has(baseType);
}

export async function generateThumbnail(
  buffer: Buffer,
  contentType: string,
): Promise<Buffer> {
  const baseType = contentType?.split(';')[0]?.trim().toLowerCase() || 'image/jpeg';

  let pipeline = sharp(buffer);

  // SVG needs special handling to rasterize
  if (baseType === 'image/svg+xml' || baseType === 'image/svg') {
    pipeline = pipeline.resize({ width: THUMBNAIL_WIDTH });
  } else {
    pipeline = pipeline.resize({ width: THUMBNAIL_WIDTH, withoutEnlargement: true });
  }

  return pipeline.webp({ quality: THUMBNAIL_QUALITY }).toBuffer();
}

export function buildThumbnailKey(originalKey: string): string {
  const lastDot = originalKey.lastIndexOf('.');
  if (lastDot === -1) return `${originalKey}_thumb.webp`;
  return `${originalKey.slice(0, lastDot)}_thumb.webp`;
}
