import 'server-only';

import { cookies } from 'next/headers';
import { VISITOR_COOKIE_NAME, isValidVisitorKey } from '@/customers/lib/public-interaction';
import { isValidObjectId } from '@/customers/lib/object-id';
import CustomerInteraction from '@/customers/models/CustomerInteraction';

export async function getCurrentVisitorKey() {
  const cookieStore = await cookies();
  const visitorKey = cookieStore.get(VISITOR_COOKIE_NAME)?.value;

  return visitorKey && isValidVisitorKey(visitorKey) ? visitorKey : null;
}

export async function getLikedCustomerIdSet(ids: Array<string | number>) {
  const normalizedIds = [...new Set(ids.map((id) => String(id)).filter(isValidObjectId))];
  if (normalizedIds.length === 0) {
    return new Set<string>();
  }

  const visitorKey = await getCurrentVisitorKey();
  if (!visitorKey) {
    return new Set<string>();
  }

  const interactions = await CustomerInteraction.find({
    customerId: { $in: normalizedIds },
    visitorKey,
    type: 'like',
    liked: true,
  })
    .select('customerId')
    .lean<Array<{ customerId?: unknown }>>();

  return new Set(interactions.map((interaction) => String(interaction.customerId)));
}

export async function getInteractedCustomerIdSets(ids: Array<string | number>) {
  const normalizedIds = [...new Set(ids.map((id) => String(id)).filter(isValidObjectId))];
  const emptySets = {
    likedCustomerIds: new Set<string>(),
    viewedCustomerIds: new Set<string>(),
  };

  if (normalizedIds.length === 0) {
    return emptySets;
  }

  const visitorKey = await getCurrentVisitorKey();
  if (!visitorKey) {
    return emptySets;
  }

  const interactions = await CustomerInteraction.find({
    customerId: { $in: normalizedIds },
    visitorKey,
    $or: [
      { type: 'like', liked: true },
      { type: 'view' },
    ],
  })
    .select('customerId type liked')
    .lean<Array<{ customerId?: unknown; type?: unknown; liked?: unknown }>>();

  return interactions.reduce(
    (sets, interaction) => {
      const customerId = String(interaction.customerId);

      if (interaction.type === 'like' && interaction.liked === true) {
        sets.likedCustomerIds.add(customerId);
      }

      if (interaction.type === 'view') {
        sets.viewedCustomerIds.add(customerId);
      }

      return sets;
    },
    emptySets
  );
}
