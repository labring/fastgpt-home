import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { readSystemSettings } from '@/customers/lib/system-settings';
import {
  buildS3PublicUrl,
  getMissingS3Config,
  normalizeCustomerFolderName
} from '@/customers/lib/customer-storage';
import { resolveUploadContentType } from '@/customers/lib/upload-content-type';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { readJsonRecord } from '@/customers/lib/request-json';

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const body = await readJsonRecord(req);
    const filename = typeof body.filename === 'string' ? body.filename : '';
    const providedContentType = typeof body.contentType === 'string' ? body.contentType : '';
    const folder = typeof body.folder === 'string' ? body.folder : '未命名案例';

    if (!filename) {
      return NextResponse.json({ error: 'Missing filename' }, { status: 400 });
    }

    const contentType = resolveUploadContentType(filename, providedContentType);

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

    const safeFolder = normalizeCustomerFolderName(folder);
    const ext = filename.split('.').pop() || 'bin';
    const key = `uploads/${safeFolder}/md-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: settings.s3_bucket,
      Key: key,
      ContentType: contentType,
    });

    // Generate a presigned URL that expires in 60 seconds
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    const fileUrl = buildS3PublicUrl(settings.s3_public_url, key);

    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (error: unknown) {
    console.error('Presign error:', error);
    const message = error instanceof Error ? error.message : 'Presign failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
