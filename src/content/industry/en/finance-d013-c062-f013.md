---
title: Knowledge Base Retrieval and Recall for Advertising and Marketing Financing Daily Reports
slug: /en/industry/finance-d013-c062-f013
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Advertising and
meta_description: Data sources for advertising and marketing financing daily reports include public financing disclosure announcements, internal delivery daily reports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Advertising and Marketing Financing Daily Reports

## What the data for this category looks like
Data sources for advertising and marketing financing daily reports include public financing disclosure announcements, internal delivery daily reports from advertising agencies, and rate card adjustment reports from media platforms. Data is updated daily, and aggregates financing-related information from the advertising and marketing sector for the current day. Most documents are structured tables, with some being PDF-format announcement summaries. Fields include full financing entity name, financing round, financing amount (unit: ten thousand or hundred million RMB), list of investors, associated advertising delivery category, disclosure date, and media channel category.

## Constraints on knowledge base retrieval and recall from these characteristics
The predominantly structured document structure requires combined configuration of field-level precise retrieval and full-text retrieval, to prevent fuzzy matching from interfering with critical information such as financing entities and rounds. The daily update schedule requires scheduled incremental synchronization tasks, to reduce resource usage from full synchronization runs. The multi-field attribute structure requires setting exclusive retrieval weights for core fields like financing rounds and financing amounts, to improve matching accuracy. Some unstructured announcement summaries need text chunking and vectorization processing, to ensure critical information is fully extracted. Differences across multi-source data sources require deduplication rules, merging duplicate entries using financing entities and disclosure dates as identifiers.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Documents for advertising and marketing financing daily reports are mostly tables with 100-500 rows. Parsing time usually does not exceed 2 minutes, avoiding interrupting the parsing process due to timeout |
| `RECALL_TOP_K` | `Top 8-12 entries` | This category typically has tens of valid financing entries per day. Too many recalled entries increases context processing load, while too few may miss critical financing information |
| `SIMILARITY_THRESHOLD` | `0.72-0.85` | Core matching points for financing information include entities, rounds and other fields. A threshold that is too low will introduce irrelevant entries, while a threshold that is too high will filter out valid matching results |
| `RERANKER_MODEL_PATH` | `Locally deployed bge-reranker-v2-minicpm-layerwise` | This model has high semantic matching accuracy for structured text, and adapts to the field-associated retrieval needs of financing daily reports |
| `SYNC_INTERVAL_HOURS` | `24 hours` | This category is daily report data, updating once per day meets real-time requirements, avoiding frequent synchronization consuming server resources |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Multi-day daily report summary files uploaded in a single batch usually do not exceed 500 MB, avoiding upload failures due to oversized files |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are influenced by material format, data volume and business rules. Each scenario requires individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: The `rerank_result` field is empty in retrieval API responses. Cause: No deployed reranking model is bound in the knowledge base configuration, or the `use_rerank` parameter is omitted from the request body.
- Symptom: Online chat and API calls use the same knowledge base and prompt templates, but result matching accuracy differs significantly. Cause: No associated knowledge base ID is specified during API calls. The default general question-answering mode is activated instead of targeted knowledge base retrieval.
- Symptom: Financing entity name fields cannot be accurately retrieved in scanned PDF financing daily reports. Cause: OCR functionality for document parsing is not enabled, so scanned text fails to be correctly identified and chunked.

## How to Verify Successful Configuration
- Navigate to the document parsing log module in the knowledge base management page, confirm all uploaded financing daily report documents show parsing success, with no timeout or format error notifications.
- Initiate a test retrieval, enter a query containing a financing entity and round, and verify that the number of recalled results falls within the preset `RECALL_TOP_K` range.
- Call the retrieval API and check the `similarity_score` field in the returned results, confirm the value falls within the preset `SIMILARITY_THRESHOLD` interval.
- After deploying the reranking model, initiate a retrieval request with multiple candidate results, confirm the `rerank_result` field is included in the returned results and the sorting aligns with expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
