"use client";

import type { SolutionCardData } from "@/customers/types/solution";

const SOLUTION_INTERACTION_EVENT = "fastgpt:solution-interaction";

export type SolutionInteractionPatch = {
  id: string | number;
  patch: Pick<Partial<SolutionCardData>, "usage" | "rawUsageCount" | "hasViewed" | "likes" | "isLiked">;
};

export function publishSolutionInteractionPatch(update: SolutionInteractionPatch) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent<SolutionInteractionPatch>(SOLUTION_INTERACTION_EVENT, {
    detail: update
  }));
}

export function subscribeSolutionInteractionPatches(
  callback: (update: SolutionInteractionPatch) => void
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<SolutionInteractionPatch>).detail;
    if (!detail || typeof detail !== "object") {
      return;
    }

    callback(detail);
  };

  window.addEventListener(SOLUTION_INTERACTION_EVENT, handler);
  return () => window.removeEventListener(SOLUTION_INTERACTION_EVENT, handler);
}
