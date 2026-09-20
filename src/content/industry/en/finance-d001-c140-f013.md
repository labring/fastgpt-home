---
title: Knowledge Base Retrieval and Recall for Funding Source KYC
slug: /en/industry/finance-d001-c140-f013
page_type: Industry scenario page
article_section: KYC and AML Document Verification
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Funding Source KYC
meta_description: Funding source KYC data primarily comes from user-submitted bank transaction statements, tax returns, asset ownership certificates, scanned trade
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Funding Source KYC

## What this category of data looks like
Funding source KYC data primarily comes from user-submitted bank transaction statements, tax returns, asset ownership certificates, scanned trade contracts, and verification records generated during compliance audits. Update frequency fluctuates with user submission volume. Single document lengths vary widely: from hundreds of characters of transaction summaries to tens of thousands of characters of annual transaction ledgers. Most documents are structured tables or semi-structured transcribed text, with fields including transaction serial number, incoming amount, counterparty name, and fund purpose. Units are typically legal tender such as CNY, USD, and others.

## What constraints do these characteristics impose on the retrieval and recall link?
Wide variation in single document lengths requires implementation of an adaptive segmentation strategy to avoid truncating critical transaction information. A high proportion of structured fields, including clear fields such as transaction date, incoming amount, and counterparty name, requires balancing both precise field matching and full-text semantic retrieval needs. Fluctuating update frequencies tied to business submissions require support for incremental knowledge base synchronization to avoid resource usage from full re-scans. Formatting deviations in OCR-processed scanned documents require configuration of entity alignment rules to correct recognition errors in counterparty names and amount values, reducing recall noise.

## Configuration Recommendations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `chunkSize` | `800–1200 characters` | Funding source documents include long transaction ledgers and short summaries. This range balances segmentation completeness and contextual coherence, avoiding truncation of critical transaction fields |
| `similarityThreshold` | `0.75–0.85` | Funding source verification requires precise matching of entities such as counterparties and amounts. A threshold that is too low will introduce irrelevant recall results, while a threshold that is too high may miss compliant matching items |
| `recallTopK` | `Top 8–10 results` | Funding source verification requires cross-verification of multiple documents. Too many recall results increase audit workload, while too few fail to cover all relevant documents |
| `enableStructuredRetrieval` | `Enabled` | Funding source documents contain a large number of structured transaction fields. Enabling this option allows precise field matching, improving recall accuracy |
| `syncIncremental` | `Enabled` | Funding source submission frequency fluctuates. Incremental synchronization reduces resource consumption from full scans, adapting to real-time business update requirements |
| `parseOcrErrorCorrection` | `Calibrate by transaction fields` | OCR-transcribed transaction text often has errors in amount and counterparty fields. Calibrating these fields individually improves retrieval consistency |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: Semantic retrieval scores appear as values above 4000, outside the 0-1 range. Cause: The normalization parameter for `similarityThreshold` was not configured correctly, resulting in raw similarity scores not being scaled, and returning the model's internal raw score directly.
- Phenomenon: Occasional no search results returned during debugging, with `search_timeout` status code shown in logs. Cause: The `chunkOverlap` parameter was not adjusted for long documents, resulting in critical transaction information being truncated after segmentation, making it impossible to match valid fragments during retrieval.
- Phenomenon: The knowledge base search module is forcibly displayed in responses and cannot be hidden. Cause: The `displaySearchResult` configuration item was not disabled, or the `hideSearch` parameter was not set in the conversation chain, resulting in forced display of retrieval results.

## How to Verify Correct Configuration
- Upload a typical funding source document, verify that segmented text fully retains core fields including transaction date, amount, and counterparty, with no obvious truncation.
- Enter a query containing a specific counterparty name, confirm that the similarity scores of recall results align with business matching requirements, and adjust configuration items to optimize matching accuracy.
- Submit an incrementally updated funding source document, confirm that the knowledge base only synchronizes new content and does not trigger a full re-scan operation.
- Initiate a conversation and disable the search display switch, confirm that the knowledge base retrieval module is not included in the response.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
