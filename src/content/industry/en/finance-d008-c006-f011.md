---
title: Document Parsing and Chunking for Traditional Chinese Medicine Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c006-f011
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Document Parsing and Chunking for Traditional Chinese
meta_description: Data sources for traditional Chinese medicine (TCM) intelligent due diligence reports include official standard documents released by the National
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Document Parsing and Chunking for Traditional Chinese Medicine Intelligent Due Diligence Reports

## What the data for this category looks like
Data sources for traditional Chinese medicine (TCM) intelligent due diligence reports include official standard documents released by the National Pharmacopoeia Committee, planting records from Chinese herbal medicine cultivation bases, production records from decoction piece manufacturing enterprises, inspection reports from third-party testing institutions, and circulation data reports from industry associations.
Official standards are revised on a fixed cycle, internal enterprise reports are updated annually or quarterly, and third-party inspection reports are released with each sampling batch.
Documents are mostly mixed-format, including plain text descriptions, multi-page structured tables, scanned PDF files, and documents with embedded process formulas.
Fields include cultivation base information, harvest date, active ingredient content, heavy metal and pesticide residue limits, and some fields come with legal measurement units.

## What constraints these characteristics impose on the "document parsing and chunking" link
Mixed-format documents require the parsing module to support OCR transcription, table structured extraction, and formula restoration to avoid losing the layout association of detection data.
Fields with legal units must retain complete field units such as "active ingredient content + mg/kg" during chunking, and the indicator and unit cannot be split.
The document length varies widely, ranging from a few pages to hundreds of pages, so a variable-length chunking strategy must be adopted to avoid truncating key detection batch information.
When official standards and internal enterprise reports are mixed in a document, the document source tag must be identified to ensure that data is not merged across types during chunking.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_OCR_ENABLE` | Set to `true` | Adapt to scanned Chinese herbal medicine inspection report formats, restore printed and handwritten detection data |
| `PARSE_TABLE_STRUCTURE` | Set to `true` | Retain the row and column structure of TCM ingredient inspection tables, avoid misalignment between fields and units |
| `MAX_CHUNK_SIZE` | Set to `800–1200 characters` | Adapt to the length of detection data blocks in TCM due diligence reports, avoid splitting complete detection information for a single batch |
| `CHUNK_OVERLAP_RATIO` | Set to `0.15–0.2` | Retain detection batch association between adjacent chunks, avoid losing data context across chunks |
| `PARSE_TIMEOUT_SECONDS` | Set to `600 seconds` | Adapt to the parsing duration of single due diligence reports with hundreds of pages, avoid mid-process timeout interruptions |
| `UPLOAD_FILE_PARALLEL_LIMIT` | Set to `5–8` | Adapt to parallel upload and parsing of multiple PDF/docx due diligence reports, improve batch processing efficiency |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing.

## Three common mistakes
- Issue: After uploading multiple TCM due diligence PDF files, the parsing status of some files shows `408 Request Timeout`. Cause: The `PARSE_TIMEOUT_SECONDS` parameter was not adjusted, and the parsing duration of a single thousand-page report exceeded the default threshold.
- Issue: In the chunking results, heavy metal residue detection data for a single batch is split into two independent chunks, and the corresponding active ingredient indicators cannot be associated. Cause: The `MAX_CHUNK_SIZE` value is too small, truncating the complete detection data block.
- Issue: When importing TCM due diligence documents from an internal collaborative documentation site, the extracted content is empty. Cause: The internal domain whitelist was not configured, so the parsing module cannot access the internal document source and fails to pull content.

## How to confirm the configuration is correct
- A scanned TCM inspection report is uploaded. The parsing result is verified to retain structured table information and OCR transcribed content, confirming that the `PARSE_OCR_ENABLE` and `PARSE_TABLE_STRUCTURE` parameters are active.
- A document containing multiple batches of inspection data is imported. The chunking result is checked to ensure complete inspection entries for a single batch are not split, confirming that the `MAX_CHUNK_SIZE` and `CHUNK_OVERLAP_RATIO` values are adapted to the data length.
- Multiple due diligence documents in different formats are batch uploaded. All tasks are confirmed to complete parsing within the set timeout threshold, verifying the configuration of `PARSE_TIMEOUT_SECONDS` and `UPLOAD_FILE_PARALLEL_LIMIT`.
- After internal access permissions are configured, due diligence content from an internal document source is imported. Complete page data is confirmed to be extractable normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
