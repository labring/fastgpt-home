export function rememberPreferredLanguage(value: string) {
  localStorage.setItem('preferredLang', value);
  document.cookie = `NEXT_LOCALE=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function navigateTo(path: string) {
  window.location.assign(path);
}
