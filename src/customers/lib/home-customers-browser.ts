import type { Customer } from '@/customers/components/CustomerCard';

interface IdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => number;
}

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: (deadline: IdleDeadline) => void,
    options?: { timeout?: number }
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function warmCustomerImages(customers: Customer[], warmedImageUrls: Set<string>) {
  if (typeof window === 'undefined') {
    return;
  }

  customers.slice(0, 4).forEach((customer) => {
    const src = customer.thumbnailUrl || customer.imageUrl;

    if (!src || warmedImageUrls.has(src)) {
      return;
    }

    warmedImageUrls.add(src);
    const image = new Image();
    image.decoding = 'async';
    (image as HTMLImageElement & { fetchPriority?: 'low' | 'auto' | 'high' }).fetchPriority = 'low';
    image.src = src;
  });
}

export function scrollToElementWithNavbarOffset(element: HTMLElement | null, navbarHeight = 84) {
  if (!element) {
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

export function scheduleIdlePrefetch(callback: () => void) {
  const idleWindow = window as IdleWindow;

  if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
    const idleId = idleWindow.requestIdleCallback(callback, { timeout: 2500 });
    return () => idleWindow.cancelIdleCallback?.(idleId);
  }

  const timeoutId = window.setTimeout(callback, 800);
  return () => window.clearTimeout(timeoutId);
}
