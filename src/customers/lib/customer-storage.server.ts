import 'server-only';

import { SystemConfig } from '@/customers/models/SystemConfig';
import {
  getUntitledCustomerFolderName,
  UNTITLED_CUSTOMER_COUNTER_KEY
} from '@/customers/lib/customer-storage';

export async function allocateUntitledCustomerFolder() {
  const counter = await SystemConfig.findOneAndUpdate(
    { key: UNTITLED_CUSTOMER_COUNTER_KEY },
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

  const name = getUntitledCustomerFolderName(index);

  return {
    index,
    name
  };
}
