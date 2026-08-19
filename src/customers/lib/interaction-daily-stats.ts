import InteractionDailyStat from '@/customers/models/InteractionDailyStat';
import { getDateKey } from '@/customers/lib/dashboard-analytics';

export async function incrementDailyInteraction(
  field: 'views' | 'likesDelta',
  amount = 1
) {
  if (amount === 0) {
    return;
  }

  const dateKey = getDateKey();

  await InteractionDailyStat.findOneAndUpdate(
    { dateKey },
    {
      $setOnInsert: { dateKey },
      $inc: { [field]: amount }
    },
    {
      upsert: true,
      returnDocument: 'after',
      setDefaultsOnInsert: true
    }
  );
}
