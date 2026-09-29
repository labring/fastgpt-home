---
title: FastGPT File Format and Parsing Reference (25 extensions, v4.17.0)
slug: /en/reference/file-format-support-reference
page_type: Reference data page
source: https://github.com/labring/FastGPT/tree/v4.17.0/packages/service/worker/readFile
delivery_source_type: Open-source repository parser definitions
source_type: 官方文档
meta_title: FastGPT File Format and Parsing Reference (25 extensions, v4.17.0) | FastGPT Technical Center
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 基准数据页-第2批/英文-fastgpt.io/reference/file-format-support-reference.md
source_sha256: 8ee04dfac5ef62e13eb0703b30a27621cf84c9a7189f6d1d18e16adfbbf42506
source_verified: 2026-09-14
publication_batch: W9
delivery_note: Compiled from the parser definition files in FastGPT v4.17.0, verified on 2026-09-14.
meta_description: Check FastGPT v4.17.0 file input and parser formats, required services, and the limits to verify with your own documents before ingestion.
---

# FastGPT File Format and Parsing Reference (25 extensions, v4.17.0)

This page lists the file parsing capability recorded in the repository: built-in parsers cover 8 extensions and the supplementary parser covers a further 17, 25 in total. Use it before uploading to confirm which parsing path a format takes, and when parsing fails to tell whether the cause is format support, a size ceiling, or an external parsing service.

## How the two parsing paths differ

| Path | Extensions covered | Notes |
| --- | --- | --- |
| Built-in parsers | 8 | Handled by parser functions inside the repository, with no external dependency |
| Supplementary parser | 17 | Formats the built-in parsers do not cover; converted to Markdown before ingestion |

## Formats covered by built-in parsers

| Extension | Parser function |
| --- | --- |
| `.csv` | `readCsvRawText` |
| `.docx` | `readDocsFile` |
| `.html` | `readHtmlRawText` |
| `.md` | `readFileRawText` |
| `.pdf` | `readPdfFile` |
| `.pptx` | `readPptxRawText` |
| `.txt` | `readFileRawText` |
| `.xlsx` | `readXlsxRawText` |

## Formats covered by the supplementary parser (17)

| Extension |
| --- |
| `.doc` |
| `.docm` |
| `.epub` |
| `.odp` |
| `.ods` |
| `.odt` |
| `.pot` |
| `.pps` |
| `.ppsm` |
| `.ppsx` |
| `.ppt` |
| `.pptm` |
| `.rtf` |
| `.wps` |
| `.xls` |
| `.xlsb` |
| `.xlsm` |

Extensions outside these lists are rejected, and the error message names the extension.

## Embedded-image limits in the supplementary anydoc parser

| Item | Expression in the definition | Value |
| --- | --- | --- |
| Per embedded image | `10 * 1024 * 1024` | 10,485,760 bytes (10 MiB) |
| Embedded images in total | `200 * 1024 * 1024` | 209,715,200 bytes (200 MiB) |
| Embedded image upload concurrency | `5` | 5 |

## Environment variables related to upload and parsing

| Variable | Default | Notes |
| --- | --- | --- |
| `FILE_TOKEN_KEY` | — | Secret for file reading |
| `FILE_DOMAIN` | — (deployment-specific) | File domain (also points to FastGPT service); Assign independent domain for higher security to prevent high-risk file reading from affecting main domain content |
| `SKIP_FILE_TYPE_CHECK` | `false` | Whether to skip file type validation |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600` | File parsing timeout (seconds) |
| `UPLOAD_FILE_MAX_SIZE` | `1000` | Max upload file size (MB) |
| `UPLOAD_FILE_MAX_AMOUNT` | `1000` | Max number of upload files |
| `CUSTOM_PDF_PARSE_URL` | — | Custom PDF parsing service address |
| `CUSTOM_PDF_PARSE_KEY` | — | Custom PDF parsing service secret key |
| `DOC2X_KEY` | — | Doc2x PDF parsing service secret key |
| `DATASET_PARSE_MAX_PROCESS` | `10` | Max concurrent knowledge base file parsing queue size |

## External document parsing services

| Service directory |
| --- |
| `doc2x` |
| `somark` |
| `textin` |

## Scope of this reference

The table reflects the parsing paths recorded in the repository. The following cases need separate confirmation:

- How internal differences within one extension (a scanned versus a text PDF, for example) affect the parsing result
- Availability and quota of external parsing services, which those services control
- Parsing capability added by the commercial edition, which is out of scope here
