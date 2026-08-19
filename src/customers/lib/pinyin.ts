type PinyinMatchModule = typeof import('pinyin-match').default;

let pinyinMatchModule: PinyinMatchModule | null = null;

export async function preloadPinyinMatch() {
  if (!pinyinMatchModule) {
    const pinyinModule = await import('pinyin-match');
    pinyinMatchModule = pinyinModule.default || pinyinModule;
  }

  return pinyinMatchModule;
}

export function pinyinIncludes(text: string, query: string) {
  if (
    pinyinMatchModule &&
    typeof pinyinMatchModule.match === 'function'
  ) {
    return !!pinyinMatchModule.match(text, query);
  }

  return text.toLowerCase().includes(query);
}
