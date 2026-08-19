import { NextRequest, NextResponse } from 'next/server';
import { requireAdminApi } from '@/customers/lib/admin-api';
import { deleteAssetUrls } from '@/customers/lib/solution-asset-gc';
import { readJsonRecord } from '@/customers/lib/request-json';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'GC failed';
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const { urls } = await readJsonRecord(req);

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ success: true, message: 'No urls to delete' });
    }

    const gcResult = await deleteAssetUrls(
      urls.filter((url): url is string => typeof url === 'string'),
      { includeDerivedThumbnails: false }
    );

    if (gcResult.deletedCount === 0) {
      return NextResponse.json({ success: true, message: 'No valid S3 urls to delete' });
    }

    console.log(`[GC] Deleted abandoned S3 objects:`, gcResult.deletedKeys);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('[GC] Error deleting abandoned files:', error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
