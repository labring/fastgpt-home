---
title: Document Parsing and Chunking for ID Card KYC
slug: /en/industry/finance-d001-c142-f011
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Document Parsing and Chunking for ID Card KYC
meta_description: ID card data originates from public security household registration systems, offline branch scan archives, or user self-uploads via online channels.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Document Parsing and Chunking for ID Card KYC

## What This Type of Data Looks Like
ID card data originates from public security household registration systems, offline branch scan archives, or user self-uploads via online channels. Updates are triggered by identity information changes, such as renewing or replacing a card. Documents are fixed-layout two-page files: the front side includes the national emblem, issuing authority, and validity period. The reverse side includes name, gender, ethnicity, date of birth, address, ID number, and personal photo.
Field formats are fixed: ID numbers consist of 18 digits, with an optional trailing X. Validity periods fall into two categories: fixed-term ranges or permanent. Addresses include hierarchical location information.

## Constraints Imposed by These Characteristics on Document Parsing and Chunking
A two-page fixed layout requires distinguishing between front and reverse content during parsing, to avoid mixing issuing authority content from the front with personal information from the reverse during chunking.
Fixed-format fields require targeted validation. For example, regex matching for ID numbers can filter invalid content from recognition errors. Scan distortion may cause format validation to fail, so a reasonable tolerance window must be retained.
Fields are concentrated and highly correlated. For example, name and ID number must be grouped into the same chunk, to avoid breaking their association after splitting.
ID documents have small physical sizes and may have low resolution. Parsing must adapt OCR recognition for low-quality images, to avoid missing edge fields.
Most uploaded files are single or two-page image formats, so flexible single/two-page parsing logic must be supported.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `enable_dual_page_parse` | Enabled | ID documents are mostly two-sided, requiring separate parsing of front and reverse content before merging chunks |
| `segment_length` | 800–1200 characters | ID card fields are concentrated. A single chunk can hold a complete set of correlated fields; excessive length will disperse correlated information |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | Single-side ID document parsing requires OCR and format validation, which takes slightly longer than standard documents |
| `ocr_threshold` | 0.65–0.75 | ID card scans may be blurry; lowering the threshold improves recognition rates for low-quality images |
| `regex_validation` | Enabled for ID number format validation | Core ID card fields have fixed formats; validation filters invalid content from parsing errors |
| `max_chunk_overlap` | 100–150 characters | Retain overlapping content when correlated fields span chunks, to avoid broken associations |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Chunked parsing results split name and ID number into separate chunks. This occurs when the `segment_length` parameter is not adjusted. The default chunk length is too small, forcing correlated fields to be split.
- The parsing API returns a 408 timeout error. This occurs when the `PARSE_FILE_TIMEOUT_SECONDS` parameter is not adjusted. The default timeout period is too short to complete ID card OCR and format validation workflows.
- The local parsing tool functions normally, but FastGPT knowledge base uploads of ID cards produce no parsing results. This occurs because `UPLOAD_FILE_ALLOWED_EXTENSIONS` is not configured to allow image format uploads, or the parsing API address is not correctly connected.

## How to Verify Correct Configuration
- Upload a complete ID card scan with both front and reverse sides, and check if the parsing result includes all core fields from both sides.
- Review parsing logs to confirm the `enable_dual_page_parse` parameter is active, with no single-page parsing markers.
- Adjust the `segment_length` parameter, then verify that chunks fully contain correlated field groups such as name and ID number.
- Simulate an API call, confirm that the parsing API returns an expected number of chunks, with no timeout or format validation failure prompts.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
