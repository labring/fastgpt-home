import dbConnect from '@/customers/lib/db';
import Customer from '@/customers/models/Customer';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { readSystemSettings } from '@/customers/lib/system-settings';
import { revalidateAdminRouteTree } from '@/customers/lib/admin-cache';
import {
  loadCustomerRevalidationRefs,
  revalidateCustomerRefs,
  type CustomerRevalidationRef
} from '@/customers/lib/public-cache-invalidation';
import {
  cleanMediaUrls,
  extractMediaUrlsFromMarkdown,
  normalizeAdminCustomerListItems
} from '@/customers/lib/admin-customer-utils';
import { extractS3KeyFromPublicUrl } from '@/customers/lib/customer-storage';
import { buildThumbnailKey } from '@/customers/lib/image-thumbnail';
import { isValidObjectId } from '@/customers/lib/object-id';

export type CustomerDeleteSource = 'admin' | 'agent';

type TrashListQuery = {
  deletedAt: {
    $ne: null;
  };
  $text?: {
    $search: string;
  };
};

type TrashableCustomer = {
  _id: unknown;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  mediaUrls?: string[] | null;
  content?: string | null;
};

let cachedS3Client: S3Client | null = null;
let cachedS3Settings: string | null = null;

async function getS3Client() {
  const settings = await readSystemSettings();
  const settingsFingerprint = JSON.stringify({
    region: settings.s3_region,
    endpoint: settings.s3_endpoint,
    accessKeyId: settings.s3_access_key_id,
    secretAccessKey: settings.s3_secret_access_key
  });

  if (!cachedS3Client || cachedS3Settings !== settingsFingerprint) {
    cachedS3Client = new S3Client({
      region: settings.s3_region,
      endpoint: settings.s3_endpoint,
      credentials: {
        accessKeyId: settings.s3_access_key_id,
        secretAccessKey: settings.s3_secret_access_key
      },
      forcePathStyle: true
    });
    cachedS3Settings = settingsFingerprint;
  }

  return {
    client: cachedS3Client,
    bucket: settings.s3_bucket,
    publicUrlBase: settings.s3_public_url
  };
}

async function deleteCustomerAssets(customer: TrashableCustomer) {
  const { client, bucket, publicUrlBase } = await getS3Client();

  const urlsToDelete = [
    ...(customer.imageUrl && customer.imageUrl !== '/fastgpt.svg' ? [customer.imageUrl] : []),
    ...(customer.thumbnailUrl && customer.thumbnailUrl !== '/fastgpt.svg' ? [customer.thumbnailUrl] : []),
    ...cleanMediaUrls(customer.mediaUrls || []),
    ...extractMediaUrlsFromMarkdown(customer.content || '')
  ];

  const keysToDelete = [...new Set(urlsToDelete)]
    .map((url) => extractS3KeyFromPublicUrl(publicUrlBase, url))
    .filter((key): key is string => Boolean(key));

  // Also derive thumbnail keys from non-thumbnail keys for cleanup
  const thumbnailKeys = keysToDelete
    .map((key) => buildThumbnailKey(key))
    .filter((tKey) => !keysToDelete.includes(tKey));

  const allKeys = [...keysToDelete, ...thumbnailKeys];

  if (allKeys.length === 0) {
    return;
  }

  try {
    await Promise.all(
      allKeys.map((key) =>
        client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
      )
    );
  } catch (error) {
    console.error('Failed to delete customer assets from S3:', error);
  }
}

async function deleteTrashedCustomerDocument(id: string) {
  const result = await Customer.deleteOne({
    _id: id,
    deletedAt: { $ne: null }
  });

  return result.deletedCount === 1;
}

function revalidateTrashMutation(refs: CustomerRevalidationRef[]) {
  revalidateAdminRouteTree();
  revalidateCustomerRefs(refs);
}

export async function getTrashedCustomers(search = '') {
  await dbConnect();

  const query: TrashListQuery = {
    deletedAt: { $ne: null }
  };

  if (search) {
    query.$text = { $search: search };
  }

  const customers = await Customer.find(query)
    .select('-content -mediaUrls')
    .populate('categoryId', 'name slug color')
    .sort(search ? { score: { $meta: 'textScore' } } : { deletedAt: -1, updatedAt: -1 })
    .limit(1000)
    .lean();

  const serializedCustomers = JSON.parse(JSON.stringify(customers));

  return {
    items: normalizeAdminCustomerListItems(serializedCustomers),
    total: customers.length
  };
}

export async function moveCustomerToTrash(id: string, deletedSource: CustomerDeleteSource) {
  if (!isValidObjectId(id)) {
    return { success: false as const, error: '案例不存在或已在回收站中' };
  }

  await dbConnect();
  const refs = await loadCustomerRevalidationRefs([id]);

  const result = await Customer.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: {
        deletedAt: new Date(),
        deletedSource
      }
    },
    { new: true }
  );

  if (!result) {
    return { success: false as const, error: '案例不存在或已在回收站中' };
  }

  revalidateTrashMutation(refs);
  return { success: true as const };
}

export async function moveCustomersToTrash(ids: string[], deletedSource: CustomerDeleteSource) {
  await dbConnect();

  const normalizedIds = [...new Set(ids.filter(Boolean))];
  if (normalizedIds.length === 0) {
    return { success: false as const, error: '请提供要删除的案例 ID 列表' };
  }

  const validIds = normalizedIds.filter(isValidObjectId);
  if (validIds.length === 0) {
    return {
      success: true as const,
      deletedCount: 0,
      failedIds: normalizedIds
    };
  }

  const existingCustomers = await Customer.find({
    _id: { $in: validIds },
    deletedAt: null
  })
    .select('_id')
    .lean<Array<{ _id: unknown }>>();

  const matchedIds = existingCustomers.map((item) => String(item._id));
  const failedIds = normalizedIds.filter((id) => !matchedIds.includes(id));

  if (matchedIds.length > 0) {
    const refs = await loadCustomerRevalidationRefs(matchedIds);
    await Customer.updateMany(
      { _id: { $in: matchedIds } },
      {
        $set: {
          deletedAt: new Date(),
          deletedSource
        }
      }
    );
    revalidateTrashMutation(refs);
  }

  return {
    success: true as const,
    deletedCount: matchedIds.length,
    failedIds
  };
}

export async function restoreCustomerFromTrash(id: string) {
  if (!isValidObjectId(id)) {
    return { success: false as const, error: '案例不存在或未在回收站中' };
  }

  await dbConnect();
  const refs = await loadCustomerRevalidationRefs([id]);

  const result = await Customer.findOneAndUpdate(
    { _id: id, deletedAt: { $ne: null } },
    {
      $set: {
        deletedAt: null,
        deletedSource: null
      }
    },
    { new: true }
  );

  if (!result) {
    return { success: false as const, error: '案例不存在或未在回收站中' };
  }

  revalidateTrashMutation(refs);
  return { success: true as const };
}

export async function permanentlyDeleteCustomerFromTrash(id: string) {
  if (!isValidObjectId(id)) {
    return { success: false as const, error: '案例不存在或未在回收站中' };
  }

  await dbConnect();
  const refs = await loadCustomerRevalidationRefs([id]);

  const customer = await Customer.findOne({
    _id: id,
    deletedAt: { $ne: null }
  }).lean<TrashableCustomer | null>();

  if (!customer) {
    return { success: false as const, error: '案例不存在或未在回收站中' };
  }

  await deleteCustomerAssets(customer);
  const deleted = await deleteTrashedCustomerDocument(id);
  if (!deleted) {
    return { success: false as const, error: '案例已变化，请刷新回收站后重试' };
  }
  revalidateTrashMutation(refs);

  return { success: true as const };
}

export async function emptyTrash() {
  await dbConnect();

  const trashedCustomers = await Customer.find({ deletedAt: { $ne: null } })
    .select('_id imageUrl thumbnailUrl mediaUrls content')
    .lean<TrashableCustomer[]>();
  const refsById = new Map(
    (await loadCustomerRevalidationRefs(trashedCustomers.map((customer) => String(customer._id)))).map((ref) => [
      ref.id,
      ref
    ])
  );

  const failedIds: string[] = [];
  const deletedRefs: CustomerRevalidationRef[] = [];
  let deletedCount = 0;

  for (const customer of trashedCustomers) {
    const id = String(customer._id);

    try {
      await deleteCustomerAssets(customer);
      const deleted = await deleteTrashedCustomerDocument(id);
      if (!deleted) {
        failedIds.push(id);
        continue;
      }

      deletedCount += 1;
      const ref = refsById.get(id);
      if (ref) {
        deletedRefs.push(ref);
      }
    } catch (error) {
      failedIds.push(id);
      console.error(`Failed to permanently delete trashed customer ${id}:`, error);
    }
  }

  if (deletedCount > 0) {
    revalidateTrashMutation(deletedRefs);
  }

  return {
    success: failedIds.length === 0,
    deletedCount,
    failedIds,
    error: failedIds.length > 0 ? '部分案例清空失败' : undefined
  };
}
