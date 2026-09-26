---
title: Knowledge Base Retrieval and Recall for Securities Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c133-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Securities
meta_description: Data sources for securities intelligent due diligence reports include public announcements of listed companies, periodic financial reports, industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Securities Intelligent Due Diligence Reports

## What data for this category looks like
Data sources for securities intelligent due diligence reports include public announcements of listed companies, periodic financial reports, industry research reports, and compliance documents released by regulatory authorities. Data update rhythms vary: periodic financial reports are updated on a fixed quarterly and annual basis. Temporary announcements and regulatory documents are released in real time alongside events. Industry research reports are updated irregularly.

Document structure is divided into structured reports (such as balance sheets, income statements, containing fields like stock code, company name, revenue amount) and unstructured text (such as announcement explanations, research report analyses). The unit for amount fields is mostly ten thousand yuan or hundred million yuan. Fields such as shareholding ratio and rating use percentage format.

## What constraints these characteristics impose on knowledge base retrieval and recall
Securities due diligence report data is multi-source and heterogeneous, with inconsistent update rhythms and highly specialized fields. This creates multiple constraints for knowledge base retrieval and recall.

Multi-source data must be split into structured reports and unstructured text, with separate parsing rules configured. This avoids splitting that disrupts subject associations in structured data.

A strategy combining incremental update and full update must be used for real-time temporary announcements and fixed-cycle financial reports. This ensures the timeliness of recalled data.

Differences in field units and formats require matching field rules during retrieval. This prevents recall deviations caused by unit confusion.

Scenarios with mixed long documents and short texts require adjustments to chunking and recall parameters. This balances information completeness and retrieval efficiency.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `chunk_size` | 800–1200 characters | Securities due diligence documents contain long paragraphs and structured tables. 800–1200 characters retains semantic integrity and avoids splitting that disrupts financial report subject associations |
| `recall_top_k` | Top 10–15 entries | Securities due diligence covers multi-source data including announcements, financial reports, and research reports. 10–15 entries covers core information while avoiding redundancy |
| `similarity_threshold` | 0.75–0.85 | Securities data is highly specialized. A threshold above 0.75 filters low-match irrelevant content and retains retrieval accuracy |
| `PARSE_FILE_TIMEOUT_SECONDS` | 300–600 seconds | Parsing large annual report PDF files takes significant time. 300 seconds or more prevents parsing failures caused by timeouts |
| `enable_field_filter` | Enabled | Securities data includes dedicated fields such as stock code and release date. Field filtering narrows the recall scope and improves accuracy |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Single compliance annual report PDF files often reach hundreds of MB. 500 MB covers the upload needs of most due diligence documents |

> The parameter values provided on this page are common recommended starting points for configuration work. Actual values are influenced by material form, data volume, and business rules. Specific issues require analysis on a case-by-case basis. It is recommended to test using internal samples before finalizing settings.

## Three common mistakes
- Phenomenon: An error "No available channel for model gpt-4o-mini under the default group" is prompted when calling the retrieval function. Cause: The API key of the corresponding model has not been configured for the dedicated securities due diligence group, or group permissions have not been opened for the specified model.
- Phenomenon: Financial report chart links uploaded to the knowledge base are displayed as "input an image" in AI replies. Cause: Rich text rendering configuration has not been enabled, or cross-domain access permissions for image links have not been correctly configured.
- Phenomenon: Empty results are returned during the data processing phase after uploading due diligence files. Cause: Chunking parameters for file parsing have not been correctly configured, or the file is in an encrypted format, causing the parsing process to fail to execute normally.

## How to confirm the configuration is correct
- Upload a single quarterly financial report PDF, check the data processing log, and confirm the number of generated chunks after parsing meets expectations.
- Launch a retrieval test, enter a query containing specific company and financial report cycle information, and verify that recall results include corresponding document fragments and match the fields.
- Configure field filtering rules, enter the target stock code, and confirm that recall results only include due diligence documents associated with that code.
- Test image file upload and retrieval, and confirm that image links are correctly rendered or image content is displayed in replies.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
