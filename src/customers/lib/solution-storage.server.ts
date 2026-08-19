import 'server-only';

import { SystemConfig } from '@/customers/models/SystemConfig';
import {
  getUntitledSolutionFolderName,
  UNTITLED_SOLUTION_COUNTER_KEY
} from '@/customers/lib/solution-storage';

export async function allocateUntitledSolutionFolder() {
  const counter = await SystemConfig.findOneAndUpdate(
    { key: UNTITLED_SOLUTION_COUNTER_KEY },
    [
      {
        $set: {
          value: {
            $toString: {
              $add: [
                {
                  $convert: {
                    input: '$value',
                    to: 'int',
                    onError: 0,
                    onNull: 0
                  }
                },
                1
              ]
            }
          }
        }
      }
    ],
    {
      returnDocument: 'after',
      upsert: true,
      updatePipeline: true
    }
  );

  const index = Number(counter?.value || '1');
  if (!Number.isFinite(index) || index < 1) {
    throw new Error('生成案例序号失败');
  }

  const name = getUntitledSolutionFolderName(index);

  return {
    index,
    name
  };
}
