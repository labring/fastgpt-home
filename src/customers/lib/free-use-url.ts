export function getSafeFreeUseUrl(value?: string | null) {
  const trimmedUrl = value?.trim();
  if (!trimmedUrl) {
    return '';
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    return parsedUrl.protocol === 'https:' || parsedUrl.protocol === 'http:'
      ? parsedUrl.toString()
      : '';
  } catch {
    return '';
  }
}
