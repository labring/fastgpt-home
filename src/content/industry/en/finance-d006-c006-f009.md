---
title: Cited Source and Traceability for Traditional Chinese Medicine Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c006-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Cited Source and Traceability for Traditional Chinese
meta_description: TCM investment research data primarily comes from the Chinese Pharmacopoeia series, local Chinese medicinal material processing specifications
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Cited Source and Traceability for Traditional Chinese Medicine Investment Research Knowledge Base Construction

## What this type of data looks like
TCM investment research data primarily comes from the Chinese Pharmacopoeia series, local Chinese medicinal material processing specifications, internal enterprise quality standards, clinical research papers, and industry standard documents.
Entries in the Chinese Pharmacopoeia include fixed fields such as nature, taste and meridian tropism, processing methods, and content detection items, with units including mg/g, ℃, and hours.
Internal enterprise documents include batch information and real-time detection data.
Clinical research papers have a multi-chapter structure, including experimental design and statistical results.
National pharmacopoeias are revised every five years. Enterprise internal data is updated quarterly. Clinical research data is updated as results are published.

## Constraints for Cited Source and Traceability Workflows
The multi-source hierarchy of TCM data (national pharmacopoeia, local standards, enterprise internal data) requires traceability to accurately associate specific versions and batches, to avoid mixing conclusions from different authoritative levels.
Long documents and multi-field structures require retaining contextual associations during segment parsing, to prevent taking content out of context.
The need for precise matching of quantitative fields such as content and processing temperature requires retrieval logic to consider both semantic and numerical features.
Differences in update cycles across sources require regular synchronization of the latest versions of authoritative documents, to ensure the timeliness of cited content.
The need to trace conclusions in investment research scenarios also requires traceability information to include specific chapters, page numbers, or paragraph locations.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | 800–1200 characters | Matches the length of a single Pharmacopoeia entry or clinical research paragraph, to avoid truncating critical information |
| `similarityThreshold` | 0.75–0.85 | Higher than general text matching thresholds, to meet the precise matching requirements of TCM quantitative fields |
| `recallTopK` | Top 6–8 results | Covers the retrieval needs for multi-source data of a single medicinal material (pharmacopoeia, local standards, enterprise data) |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300 seconds | Accommodates parsing time for long documents such as multi-volume clinical research compilations |
| `enableSourceLink` | Enabled | Associates version numbers, page numbers, and other metadata with documents, to meet the precision requirements of investment research traceability |
| `embeddingModel` | `text-embedding-3-large` | Matches the retrieval needs of complex TCM semantics and quantitative fields |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Phenomenon: Question answering results do not display version numbers, page numbers, or other traceability information of source documents, or the cited source data fields are empty. Cause: The `enableSourceLink` configuration is not enabled, or the "Retain document metadata" option was not checked when uploading the knowledge base.
- Phenomenon: The service does not respond for a long time after startup, and a 504 timeout error is returned during calls. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter was not adjusted, and the parsing time for long documents exceeds the default threshold.
- Phenomenon: Retrieved knowledge base content does not match the input question, or the original text of user-uploaded question-answer pairs cannot be output. Cause: The `similarityThreshold` is set too high or too low, or the "reply" field of question-answer pairs was not separately used as a retrieval matching item.

## How to Verify Correct Configuration
- Upload a single Chinese Pharmacopoeia entry document, and check if the parsed metadata includes fields such as version numbers and page numbers.
- Submit a test query, and check if the returned results include traceable source document links or metadata information.
- Adjust the `similarityThreshold` parameter, and verify if the matching accuracy of retrieval results across different thresholds meets expectations.
- Upload a document containing content detection data, and confirm that the retrieved results retain the original numerical values and units.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
