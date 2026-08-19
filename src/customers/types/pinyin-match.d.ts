declare module 'pinyin-match' {
  const pinyinMatch: {
    match: (input: string, keyword: string) => [number, number] | boolean;
  };
  export default pinyinMatch;
}