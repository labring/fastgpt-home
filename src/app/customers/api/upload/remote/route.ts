import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  buildS3PublicUrl,
  getMissingS3Config,
  normalizeSolutionFolderName
} from '@/customers/lib/solution-storage';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

const ALLOWED_REMOTE_HOST_PATTERNS = [
  /(^|\.)feishu\.cn$/i,
  /(^|\.)larksuite\.com$/i,
  /(^|\.)larksuitecdn\.com$/i,
  /(^|\.)feishucdn\.com$/i
];

function isAllowedRemoteHost(hostname: string) {
  return ALLOWED_REMOTE_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

function sanitizeFileStem(fileStem: string) {
  const normalized = fileStem
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'remote-media';
}

function getFileExtension(contentType: string, sourceUrl: string) {
  if (contentType.includes('png')) return 'png';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('gif')) return 'gif';
  if (contentType.includes('svg')) return 'svg';
  if (contentType.includes('mp4')) return 'mp4';
  if (contentType.includes('webm')) return 'webm';
  if (contentType.includes('quicktime')) return 'mov';
  if (contentType.includes('mpeg')) return 'mpeg';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';

  try {
    const pathname = new URL(sourceUrl).pathname;
    const match = pathname.match(/\.([a-zA-Z0-9]+)$/);
    return match?.[1]?.toLowerCase() || 'bin';
  } catch {
    return 'bin';
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(req);

    const sourceUrl = typeof body.sourceUrl === 'string' ? body.sourceUrl : '';
    const folder = typeof body.folder === 'string' ? body.folder : '未命名案例';
    const fileStem = typeof body.fileStem === 'string' ? body.fileStem : 'feishu-media';

    if (!sourceUrl) {
      return NextResponse.json({ error: 'Missing sourceUrl' }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(sourceUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid sourceUrl' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'Unsupported sourceUrl protocol' }, { status: 400 });
    }

    if (!isAllowedRemoteHost(parsedUrl.hostname)) {
      return NextResponse.json({ error: '该远程地址暂不允许转存' }, { status: 400 });
    }

    const settings = await readSystemSettings();
    const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });
    if (missingS3Config.length > 0) {
      return NextResponse.json(
        { error: `S3 配置不完整，请先补充：${missingS3Config.join('、')}` },
        { status: 500 }
      );
    }

    const remoteResponse = await fetch(parsedUrl.toString(), {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store'
    });

    if (!remoteResponse.ok) {
      return NextResponse.json(
        { error: `远程媒体下载失败 (${remoteResponse.status})` },
        { status: 502 }
      );
    }

    const contentType =
      remoteResponse.headers.get('content-type')?.split(';')[0]?.trim() ||
      'application/octet-stream';
    const extension = getFileExtension(contentType, parsedUrl.toString());
    const safeFolder = normalizeSolutionFolderName(folder);
    const key = `uploads/${safeFolder}/${Date.now()}-${sanitizeFileStem(fileStem)}.${extension}`;
    const bodyBuffer = Buffer.from(await remoteResponse.arrayBuffer());

    const s3Client = new S3Client({
      region: settings.s3_region,
      endpoint: settings.s3_endpoint,
      credentials: {
        accessKeyId: settings.s3_access_key_id,
        secretAccessKey: settings.s3_secret_access_key
      },
      forcePathStyle: true
    });

    await s3Client.send(
      new PutObjectCommand({
        Bucket: settings.s3_bucket,
        Key: key,
        Body: bodyBuffer,
        ContentType: contentType
      })
    );

    return NextResponse.json({
      success: true,
      url: buildS3PublicUrl(settings.s3_public_url, key),
      contentType
    });
  } catch (error: unknown) {
    console.error('Remote upload error:', error);
    const message = error instanceof Error ? error.message : 'Remote upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
