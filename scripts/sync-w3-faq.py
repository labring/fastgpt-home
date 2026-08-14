#!/usr/bin/env python3
"""Regenerate or verify src/faq/w3.ts from the W3 FAQ source xlsx (items 61-90).

Default mode verifies: regenerated content equals the committed w3.ts, plus
duplicate-slug and zh/en key-collision checks. With --write, overwrites w3.ts
so the runtime snapshot is always reproducible from the source.
"""

import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

M = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
FIELD_MAP = [
    ('category', 'Category'),
    ('question', 'Question'),
    ('answer', 'Answers'),
    ('title', 'Title'),
    ('description', 'Description'),
    ('keywords', 'Keywords'),
]

ROOT = Path(__file__).resolve().parent.parent
W3_FILE = ROOT / 'src/faq/w3.ts'


def read_xlsx_rows(xlsx_path):
    with zipfile.ZipFile(xlsx_path) as z:
        root = ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
    rows = []
    for row in root.findall('.//' + M + 'sheetData/' + M + 'row'):
        cells = []
        for cell in row.findall(M + 'c'):
            value = cell.find(M + 'v')
            inline = cell.find(M + 'is')
            if value is not None:
                cells.append(value.text or '')
            elif inline is not None:
                cells.append(''.join(t.text or '' for t in inline.iter(M + 't')))
            else:
                cells.append('')
        rows.append(cells)
    header, data = rows[0], rows[1:]
    return [{key: row[index] for index, key in enumerate(header)} for row in data]


def render_ts(rows):
    lines = ["import type { FaqItem } from './zh';", "", "export const faqW3Zh: Record<string, FaqItem> = {"]
    for row in rows:
        lines.append(f"  {json.dumps(row['slug'], ensure_ascii=False)}: {{")
        for source_field, runtime_field in FIELD_MAP:
            lines.append(f"    {json.dumps(runtime_field, ensure_ascii=False)}: {json.dumps(row[source_field], ensure_ascii=False)},")
        lines.append("  },")
    lines.append("};")
    return '\n'.join(lines) + '\n'


def extract_keys(ts_path):
    source = ts_path.read_text(encoding='utf-8')
    return set(re.findall(r'^\s*"([^"]+)": \{$', source, re.M))


def main():
    write = '--write' in sys.argv
    args = [arg for arg in sys.argv[1:] if arg != '--write']
    if len(args) != 1:
        raise SystemExit(f'usage: {sys.argv[0]} <source.xlsx> [--write]')
    rows = read_xlsx_rows(args[0])
    generated = render_ts(rows)

    errors = []
    if len(rows) != 30:
        errors.append(f'expected 30 source rows, got {len(rows)}')
    slugs = [row['slug'] for row in rows]
    if len(slugs) != len(set(slugs)):
        errors.append('duplicate slugs in source xlsx')
    zh_source = (ROOT / 'src/faq/zh.ts').read_text(encoding='utf-8')
    en_keys = extract_keys(ROOT / 'src/faq/en.ts')
    zh_keys = extract_keys(ROOT / 'src/faq/zh.ts')
    for slug in slugs:
        if slug in en_keys:
            errors.append(f'slug collision with en.ts: {slug}')
        if slug in zh_keys:
            errors.append(f'slug collision with zh.ts: {slug}')
    if not re.search(r'\.\.\.faqW3Zh', zh_source):
        errors.append('zh.ts does not merge faqW3Zh')

    if write:
        W3_FILE.write_text(generated, encoding='utf-8')
        print(f'WROTE: {len(rows)} rows to {W3_FILE}')
    elif W3_FILE.read_text(encoding='utf-8') != generated:
        errors.append('w3.ts drifted from source xlsx; run with --write to regenerate')

    if errors:
        for error in errors:
            print(f'FAIL: {error}')
        raise SystemExit(1)
    print(f'PASS: {len(rows)} W3 FAQ rows match source xlsx')


if __name__ == '__main__':
    main()
