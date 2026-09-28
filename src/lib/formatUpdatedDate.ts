export function formatUpdatedDate(date: string, locale: string) {
  if (locale === 'zh') {
    const [year, month, day] = date.split('-').map(Number);
    return `更新于 ${year}年${month}月${day}日`;
  }
  return `Last updated ${new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(`${date}T00:00:00Z`))}`;
}
