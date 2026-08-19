import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  buildS3PublicUrl,
  getMissingS3Config,
  normalizeSolutionFolderName
} from '@/customers/lib/solution-storage';
import { resolveUploadContentType } from '@/customers/lib/upload-content-type';
import {
  shouldGenerateThumbnail,
  generateThumbnail,
  buildThumbnailKey
} from '@/customers/lib/image-thumbnail';
import { requireAdminApi } from '@/customers/lib/admin-api';

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string || '未命名案例';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const settings = await readSystemSettings();
    const missingS3Config = getMissingS3Config(settings, { requirePublicUrl: true });
    if (missingS3Config.length > 0) {
      return NextResponse.json(
        { error: `S3 配置不完整，请先补充：${missingS3Config.join('、')}` },
        { status: 500 }
      );
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

    const safeFolder = normalizeSolutionFolderName(folder);

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split('.').pop() || 'png';
    const contentType = resolveUploadContentType(file.name, file.type);
    const key = `uploads/${safeFolder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const bucketName = settings.s3_bucket;

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }));

    const publicUrlBase = settings.s3_public_url;
    const url = buildS3PublicUrl(publicUrlBase, key);

    let thumbnailUrl = url;
    if (shouldGenerateThumbnail(contentType)) {
      try {
        const thumbnailBuffer = await generateThumbnail(buffer, contentType);
        const thumbnailKey = buildThumbnailKey(key);
        await s3Client.send(new PutObjectCommand({
          Bucket: bucketName,
          Key: thumbnailKey,
          Body: thumbnailBuffer,
          ContentType: 'image/webp',
        }));
        thumbnailUrl = buildS3PublicUrl(publicUrlBase, thumbnailKey);
        console.log('Thumbnail generated and uploaded:', thumbnailKey);
      } catch (err) {
        console.error('Thumbnail generation failed:', {
          contentType,
          originalKey: key,
          error: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined,
        });
      }
    }

    return NextResponse.json({ success: true, url, thumbnailUrl });
  } catch (error: unknown) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
