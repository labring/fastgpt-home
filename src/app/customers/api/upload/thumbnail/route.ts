import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  buildS3PublicUrl,
  extractS3KeyFromPublicUrl,
  getMissingS3Config
} from '@/customers/lib/customer-storage';
import {
  shouldGenerateThumbnail,
  generateThumbnail,
  buildThumbnailKey
} from '@/customers/lib/image-thumbnail';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(req);
    const fileUrl = typeof body.fileUrl === 'string' ? body.fileUrl.trim() : '';

    if (!fileUrl) {
      return NextResponse.json({ error: 'Missing fileUrl' }, { status: 400 });
    }

    const settings = await readSystemSettings();
    const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });
    if (missingS3Config.length > 0) {
      return NextResponse.json(
        { error: `S3 配置不完整，请先补充：${missingS3Config.join('、')}` },
        { status: 500 }
      );
    }

    const key = extractS3KeyFromPublicUrl(settings.s3_public_url!, fileUrl);
    if (!key) {
      return NextResponse.json({ error: '无法解析 S3 文件地址' }, { status: 400 });
    }

    const s3Client = new S3Client({
      region: settings.s3_region,
      endpoint: settings.s3_endpoint,
      credentials: {
        accessKeyId: settings.s3_access_key_id,
        secretAccessKey: settings.s3_secret_access_key,
      },
      forcePathStyle: true,
    });

    // Download the original image from S3
    const getResponse = await s3Client.send(new GetObjectCommand({
      Bucket: settings.s3_bucket,
      Key: key,
    }));

    const contentType = getResponse.ContentType || 'image/jpeg';
    if (!shouldGenerateThumbnail(contentType)) {
      return NextResponse.json({ thumbnailUrl: fileUrl });
    }

    if (!getResponse.Body) {
      return NextResponse.json({ error: '文件内容为空' }, { status: 500 });
    }

    const bodyBuffer = Buffer.from(await getResponse.Body.transformToByteArray());

    const thumbnailBuffer = await generateThumbnail(bodyBuffer, contentType);
    const thumbnailKey = buildThumbnailKey(key);

    await s3Client.send(new PutObjectCommand({
      Bucket: settings.s3_bucket,
      Key: thumbnailKey,
      Body: thumbnailBuffer,
      ContentType: 'image/webp',
    }));

    const thumbnailUrl = buildS3PublicUrl(settings.s3_public_url!, thumbnailKey);

    return NextResponse.json({ success: true, thumbnailUrl });
  } catch (error: unknown) {
    console.error('Thumbnail generation error:', error);
    const message = error instanceof Error ? error.message : 'Thumbnail generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
