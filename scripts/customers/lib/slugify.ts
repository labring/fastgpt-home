import { pinyin } from 'pinyin-pro';

export function slugifyChineseTitle(title: string) {
  const words: string[] = [];

  // 先把英文单词/数字抽出来做占位，避免 pinyin-pro 把 Latin 字母逐字拆分
  const masked = title.replace(/[A-Za-z0-9]+/g, (match) => {
    const index = words.length;
    words.push(match.toLowerCase());
    return `\u0001${index}\u0001`;
  });

  const pinyinString = pinyin(masked, { toneType: 'none', separator: '-', v: true });
  const assembled = pinyinString.replace(/\u0001-(\d+)-\u0001/g, (_, n) => words[Number(n)]);

  return assembled
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}
