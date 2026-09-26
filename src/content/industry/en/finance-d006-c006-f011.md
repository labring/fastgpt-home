---
title: Document Parsing and Chunking for Traditional Chinese Medicine Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f011
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Document Parsing and Chunking for Traditional Chinese
meta_description: Traditional Chinese medicine investment research data mainly comes from the Pharmacopoeia of the People's Republic of China, traditional Chinese
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Document Parsing and Chunking for Traditional Chinese Medicine Investment Research Knowledge Base Construction

## What the data for this category looks like
Traditional Chinese medicine investment research data mainly comes from the Pharmacopoeia of the People's Republic of China, traditional Chinese medicine planting base monitoring reports, listed pharmaceutical company R&D documents, industry research reports, and clinical research literature. The update rhythm of data varies by source. Pharmacopoeia documents are updated every 5 years. Internal enterprise R&D documents are updated in real time with project progress. Industry research reports are released quarterly.

Document structures include structured tables (such as ingredient content tables), process-based long texts (processing specifications), and standardized fields. Fields cover scientific names of medicinal materials, properties, tastes and meridians, and active ingredient content. Units are mostly mg/g, %, or g/100g. Some documents include batch numbers and origin information.

## What constraints do these characteristics impose on the document parsing and chunking link
Pharmacopoeia documents have fixed formats that require parsing tools to retain table structures and field correspondence, to avoid misalignment of ingredient data. Active ingredient content values are bound to units. Chunking must ensure units are not split into adjacent chunks.

Long text processing procedure documents contain a large number of professional terms and step associations. Chunk length must adapt to the length of term combinations, to avoid breaking operational logic.

Batch and origin fields are often embedded in document margins or remark columns. Parsing must prioritize extracting structured fields, to prevent them from being overwritten by long text content.

Some research reports include chart data. Additional chart-to-text adaptation logic is required, to avoid loss of content comparison information.

## How to set the configurations
| Configuration Item | Recommended Setting | Rationale |
| ---- | ---- | ---- |
| `PARSE_TABLE_ENABLE` | Enabled | Traditional Chinese medicine investment research documents contain a large number of ingredient content tables and processing procedure tables, requiring retention of table structure and field correspondence |
| `CHUNK_SIZE` | 800–1200 characters | Traditional Chinese medicine professional terms are dense. Excessively long chunks will cause context logic disconnection, while excessively short chunks will split professional associated content |
| `CHUNK_OVERLAP` | 100–150 characters | Retains the front and back associations of professional terms, avoiding breaking processing steps or ingredient comparison logic |
| `PARSE_IMAGE_OCR_ENABLE` | Enabled | Some industry research reports include ingredient comparison charts, requiring OCR to extract numerical and unit information within the charts |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Adapts to the demand for uploading large files such as batch planting data and pharmacopoeia collections in traditional Chinese medicine investment research scenarios |
| `PARSE_TIMEOUT_SECONDS` | 300 seconds | Large-volume pharmacopoeia collection documents take a long time to parse, avoiding interruptions due to parsing timeout |

> The parameter values provided on this page are conventional recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: Parsing result is empty after passing in an external link. The interface shows parsing success but there is no valid text content. This issue is relatively common in FastGPT v4.8.13 and later versions. Cause: Corresponding parsing rules are not configured for the structured tables and professional term formats of traditional Chinese medicine documents, causing the parsing tool to fail to extract valid information.
- Phenomenon: After custom chunking, documents are stored in the knowledge base, and duplicate content is automatically deleted, resulting in a mismatch between custom chunk order and index. Cause: The automatic deduplication function of the knowledge base is not turned off, or the `SKIP_DUPLICATE_CHUNK` parameter is not configured correctly.
- Phenomenon: Parsing task fails, and the log shows an `ETIMEDOUT` error. Cause: `PARSE_TIMEOUT_SECONDS` is not adjusted to a value suitable for large-volume pharmacopoeia collection documents, causing parsing process timeout interruption.

## How to confirm the configuration is correct
- Upload a document containing ingredient content tables from the pharmacopoeia, check whether the parsing result retains the complete table structure and field correspondence.
- Upload a long text document containing a complete processing procedure, check whether the chunks retain step logic and do not split professional associated content.
- Upload a research report document with ingredient comparison charts, confirm whether the numerical and unit information in the charts is extracted after OCR parsing.
- Upload two traditional Chinese medicine documents with identical content, verify whether the knowledge base automatic deduplication rule takes effect as configured.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
