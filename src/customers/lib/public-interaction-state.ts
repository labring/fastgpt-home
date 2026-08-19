import 'server-only';

import { cookies } from 'next/headers';
import { VISITOR_COOKIE_NAME, isValidVisitorKey } from '@/customers/lib/public-interaction';
import { isValidObjectId } from '@/customers/lib/object-id';
import SolutionInteraction from '@/customers/models/SolutionInteraction';

export async function getCurrentVisitorKey() {
  const cookieStore = await cookies();
  const visitorKey = cookieStore.get(VISITOR_COOKIE_NAME)?.value;

  return visitorKey && isValidVisitorKey(visitorKey) ? visitorKey : null;
}

export async function getLikedSolutionIdSet(ids: Array<string | number>) {
  const normalizedIds = [...new Set(ids.map((id) => String(id)).filter(isValidObjectId))];
  if (normalizedIds.length === 0) {
    return new Set<string>();
  }

  const visitorKey = await getCurrentVisitorKey();
  if (!visitorKey) {
    return new Set<string>();
  }

  const interactions = await SolutionInteraction.find({
    solutionId: { $in: normalizedIds },
    visitorKey,
    type: 'like',
    liked: true,
  })
    .select('solutionId')
    .lean<Array<{ solutionId?: unknown }>>();

  return new Set(interactions.map((interaction) => String(interaction.solutionId)));
}

export async function getInteractedSolutionIdSets(ids: Array<string | number>) {
  const normalizedIds = [...new Set(ids.map((id) => String(id)).filter(isValidObjectId))];
  const emptySets = {
    likedSolutionIds: new Set<string>(),
    viewedSolutionIds: new Set<string>(),
  };

  if (normalizedIds.length === 0) {
    return emptySets;
  }

  const visitorKey = await getCurrentVisitorKey();
  if (!visitorKey) {
    return emptySets;
  }

  const interactions = await SolutionInteraction.find({
    solutionId: { $in: normalizedIds },
    visitorKey,
    $or: [
      { type: 'like', liked: true },
      { type: 'view' },
    ],
  })
    .select('solutionId type liked')
    .lean<Array<{ solutionId?: unknown; type?: unknown; liked?: unknown }>>();

  return interactions.reduce(
    (sets, interaction) => {
      const solutionId = String(interaction.solutionId);

      if (interaction.type === 'like' && interaction.liked === true) {
        sets.likedSolutionIds.add(solutionId);
      }

      if (interaction.type === 'view') {
        sets.viewedSolutionIds.add(solutionId);
      }

      return sets;
    },
    emptySets
  );
}
