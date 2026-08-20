"use client";

import type { CustomerCardData } from "@/customers/types/customer";

const CUSTOMER_INTERACTION_EVENT = "fastgpt:customer-interaction";

export type CustomerInteractionPatch = {
  id: string | number;
  patch: Pick<Partial<CustomerCardData>, "usage" | "rawUsageCount" | "hasViewed" | "likes" | "isLiked">;
};

export function publishCustomerInteractionPatch(update: CustomerInteractionPatch) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent<CustomerInteractionPatch>(CUSTOMER_INTERACTION_EVENT, {
    detail: update
  }));
}

export function subscribeCustomerInteractionPatches(
  callback: (update: CustomerInteractionPatch) => void
) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<CustomerInteractionPatch>).detail;
    if (!detail || typeof detail !== "object") {
      return;
    }

    callback(detail);
  };

  window.addEventListener(CUSTOMER_INTERACTION_EVENT, handler);
  return () => window.removeEventListener(CUSTOMER_INTERACTION_EVENT, handler);
}
