import { describe, expect, it } from 'vitest';
import {
  formatAttachmentFileSize,
  getAttachmentExtension,
  getAttachmentFileName,
  getAttachmentIconPath
} from './media';

describe('markdown media helpers', () => {
  it('prefers explicit attachment names and decodes URL path names', () => {
    expect(getAttachmentFileName('/files/report.pdf', ' 自定义.pdf ')).toBe('自定义.pdf');
    expect(getAttachmentFileName('https://cdn.test/%E6%96%B9%E6%A1%88.xlsx')).toBe('方案.xlsx');
  });

  it('detects extensions and maps known icons', () => {
    expect(getAttachmentExtension('Report.PDF')).toBe('pdf');
    expect(getAttachmentIconPath('Report.PDF')).toBe('/customers/文件类型icon/pdf.svg');
    expect(getAttachmentIconPath('archive.zip')).toBe('/customers/文件类型icon/fastgpt-withtext.svg');
  });

  it('formats attachment sizes with stable units', () => {
    expect(formatAttachmentFileSize('512')).toBe('512 B');
    expect(formatAttachmentFileSize(String(9 * 1024))).toBe('9.0 KB');
    expect(formatAttachmentFileSize(String(12 * 1024))).toBe('12 KB');
    expect(formatAttachmentFileSize(String(2.5 * 1024 * 1024))).toBe('2.5 MB');
    expect(formatAttachmentFileSize('bad')).toBe('未知大小');
  });
});
