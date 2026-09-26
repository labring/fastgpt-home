---
title: Model Access and Configuration for Cybersecurity Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c120-f012
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Model Access and Configuration for Cybersecurity Intelligent
meta_description: Data sources for cybersecurity intelligent due diligence reports include public vulnerability databases, enterprise asset scan reports, traffic logs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Access and Configuration for Cybersecurity Intelligent Due Diligence Reports

## What data looks like for this category
Data sources for cybersecurity intelligent due diligence reports include public vulnerability databases, enterprise asset scan reports, traffic logs, compliance check documents, and more. Data update frequency varies by source: public vulnerability databases update daily or in real time, while internal enterprise scan reports are generated on demand. Document structures typically include fields such as asset lists, vulnerability details (including CVE IDs, CVSS scores, impact scope), repair suggestions, compliance item check results, and others. CVE IDs are fixed-format strings, CVSS scores are numeric fields ranging from 0 to 10. A single large enterprise due diligence report can contain dozens of pages, covering heterogeneous formats such as text, tables, and screenshots.

## What constraints these characteristics impose during model access and configuration
The heterogeneous fields and long text characteristics of cybersecurity intelligent due diligence reports require model access to support semantic extraction across multiple data types. Long text content may exceed the context window of base models, so segmentation and context parameters must be adjusted to ensure information integrity. The structured characteristics of multiple fields require embedding models to retain associations between fields, avoiding semantic fragmentation. Frequently updated vulnerability data requires regular index refreshes, so automatic synchronization trigger rules must be configured. Some reports include scan results in screenshot format, so support for multi-modal data parsing and vectorization processing is needed.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `chunkSize` | 800–1200 characters | Cybersecurity reports contain long sections of vulnerability details and asset lists. Values that are too long will exceed model context limits, while values that are too short will break semantic associations |
| `embeddingModel` | Prioritize general embedding models that support long text | Due diligence reports have high text density, and long-text embedding can better retain the association between fields such as CVE IDs and CVSS scores |
| `maxContext` | 16384–32768 tokens | Single large due diligence reports have a large total word count, so a sufficient context window is required to fully load parsed segmented content |
| `rerankTopN` | Top 10–15 entries | Due diligence reports have a large number of relevant entries, and reranking filtering can improve the accuracy of returned results |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300–600 seconds | Large scan reports contain multiple logs and screenshots, so parsing takes a long time. The timeout threshold must be extended to avoid interruptions |
| `UPLOAD_FILE_MAX_SIZE` | 2048–5120 MB | Enterprise-level due diligence reports may contain multiple heterogeneous files, so the single-file upload volume must be adapted |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Configuring `embeddingModel` as `text-embedding-v3` and entering an API key results in a "no available channel" prompt in the interface. This occurs when access permissions for the model are not enabled in the corresponding platform's group permissions, or when the current group is not associated with the model's call channel.
- No "Create Model" option appears in the upper right corner of the application edit page. This happens when the platform's advanced mode is not enabled, or when the current account does not have the operational permissions to create models.
- Timeout errors occur when calling the due diligence report analysis function, or search response times are excessively long. This is caused by `chunkSize` being set too large, leading to single-segment text exceeding the model's processing limits, and unsegmented large-volume reports creating excessive parsing pressure.

## How to confirm configurations are set correctly
- Upload a small scan report containing 10 vulnerability records, and check if the number of generated parsed segments matches the character limit set by `chunkSize`.
- Enter test text containing CVE IDs and CVSS scores in the model debugging interface, and verify if the model can correctly identify and associate field information.
- Check the platform system logs to confirm that no timeout errors corresponding to `PARSE_FILE_TIMEOUT_SECONDS` have occurred.
- Initiate a full index update, and check if disk IO usage and index generation speed meet expected standards.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
