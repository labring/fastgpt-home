export function insertTextAtSelection(
  content: string,
  textToInsert: string,
  selectionStart: number,
  selectionEnd: number
) {
  return {
    content: `${content.substring(0, selectionStart)}${textToInsert}${content.substring(selectionEnd)}`,
    cursor: selectionStart + textToInsert.length
  };
}

export function insertMarkdownBlockAtSelection(
  content: string,
  markdown: string,
  selectionStart: number,
  selectionEnd: number
) {
  if (!markdown.trim()) {
    return {
      content,
      cursor: selectionEnd
    };
  }

  const before = content.slice(0, selectionStart);
  const after = content.slice(selectionEnd);
  const needsLeadingBreak = before.length > 0 && !before.endsWith('\n');
  const needsTrailingBreak = after.length > 0 && !after.startsWith('\n');
  const textToInsert = `${needsLeadingBreak ? '\n' : ''}${markdown}${needsTrailingBreak ? '\n' : ''}`;
  const nextContent = `${before}${textToInsert}${after}`;

  return {
    content: nextContent,
    cursor: before.length + textToInsert.length
  };
}
