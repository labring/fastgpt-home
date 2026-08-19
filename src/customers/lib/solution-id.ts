import dbConnect from '@/customers/lib/db';
import Solution from '@/customers/models/Solution';
import { isValidObjectId } from '@/customers/lib/object-id';

/**
 * 公共接口的 id 参数既可能是 MongoDB ObjectId，也可能是语义化 slug。
 * 统一解析为 ObjectId，解析失败返回 null。
 */
export async function resolveSolutionObjectId(id: string) {
  if (isValidObjectId(id)) {
    return id;
  }

  await dbConnect();

  const solution = await Solution.findOne({ slug: id, deletedAt: null })
    .select('_id')
    .lean();

  return solution ? solution._id.toString() : null;
}
