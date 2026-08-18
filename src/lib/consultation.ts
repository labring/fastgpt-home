export function isContactHref(href: string): boolean {
  try {
    const url = new URL(href, 'https://fastgpt.io');
    const isRelative = !/^(?:https?:)?\/\//i.test(href);
    if (!isRelative && url.origin !== 'https://fastgpt.io') return false;
    const pathname = url.pathname.replace(/\/$/, '');
    return pathname === '/contact' || /\/contact$/.test(pathname);
  } catch {
    return href === '/contact' || href.startsWith('/contact?');
  }
}
