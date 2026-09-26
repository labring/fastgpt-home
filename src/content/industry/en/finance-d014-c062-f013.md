---
title: Knowledge Base Retrieval and Recall for Advertising and Marketing Financial Report Analysis
slug: /en/industry/finance-d014-c062-f013
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Advertising and
meta_description: Advertising and marketing industry financial report data comes from public periodic disclosure documents, internal operation ledgers, and third-party
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Advertising and Marketing Financial Report Analysis

## What the data for this category looks like
Advertising and marketing industry financial report data comes from public periodic disclosure documents, internal operation ledgers, and third-party monitoring and settlement vouchers. Public financial reports are updated quarterly and annually. Internal operation ledgers are updated daily or weekly. Most documents are PDF-format periodic reports or structured Excel ledger files.
Documents include fields such as customer cooperation details, advertising channel composition, revenue breakdowns, and settlement terms. Units include RMB yuan, impressions per thousand, calendar days, and others. Some fields contain professional terminology such as CPM and ROI.

## What constraints these characteristics impose on knowledge base retrieval and recall
The multi-source and differentiated update rhythm characteristics of advertising and marketing financial reports require the knowledge base to divide permission sets by data type. It must distinguish the retrieval scope between public disclosure data and internal operation sensitive data to avoid leakage of sensitive customer information.
The diversity of fields and units requires retrieval logic to match professional terminology and unit consistency. For example, it must distinguish between "impressions per thousand" and "delivery times" to prevent unit confusion in retrieval results.
The mixed structured and unstructured document characteristics require retaining the association between core business fields and auxiliary data during chunking. This avoids breaking the contextual association between delivery details and revenue composition during retrieval.
Different update frequencies for data require configuring differentiated synchronization trigger rules. This adapts to the quarterly update rhythm of public financial reports and the daily update rhythm of internal ledgers.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_count` | Top 8-12 entries | Advertising and marketing financial reports contain multi-dimensional delivery details. Too many recalled entries will cause context redundancy, while too few will lose key customer cooperation information |
| `similarity_threshold` | 0.72-0.80 | Advertising and marketing financial reports contain a large number of professional terms. A threshold that is too low will introduce irrelevant industry-general content, while a threshold that is too high will miss relevant contract summaries |
| `chunk_length` | 800-1000 characters | Delivery detail entries in advertising and marketing financial reports are relatively long. Chunks that are too long will cause semantic fragmentation, while chunks that are too short will lose the association between core fields and auxiliary data |
| `incremental_update_trigger_cycle` | Once daily | Internal operation ledgers are updated daily, while public financial reports are updated quarterly. The cycle matches the update rhythm of both types of data |
| `semantic_retrieval_min_relevance` | Calibrated according to business scenarios | Used to filter retrieval requests unrelated to advertising and marketing financial reports. The threshold must be adjusted in combination with business requirements |
| `collection_permission_check_switch` | Enabled | Advertising and marketing financial reports contain customer sensitive information. It is necessary to limit the retrieval scope of different users via `collection_id` |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing values.

## Three common misconfigurations
- Symptom: Retrieval requests unrelated to advertising and marketing financial reports still return matching results from the knowledge base. Cause: The `semantic_retrieval_min_relevance` filtering rule is not configured, or the threshold is set below 0.65, causing low-relevance chunks to be recalled.
- Symptom: Auxiliary data such as contract notes is returned before core delivery details in retrieval results. Cause: No chunk weight parameters are configured, and core chunks containing delivery amounts and channel types are not set to a higher retrieval priority.
- Symptom: After uploading a file, it cannot be associated with the corresponding knowledge base content via `collection_id`, and retrieval returns empty results. Cause: The `collection_id` and `file_id` returned by the interface are not recorded correctly, or parameters are passed incorrectly when calling the retrieval interface.

## How to confirm configurations are correctly applied
- Upload a test segment of an advertising and marketing financial report. View the returned `collection_id` and `file_id` via the interface or UI to verify they match the upload record, confirming the association configuration is active.
- Submit a test question unrelated to advertising and marketing financial reports. Check whether a specified reply outside the knowledge base is triggered, confirming the `semantic_retrieval_min_relevance` filtering configuration is active.
- Submit a test question containing professional terminology, such as "2024 Q3 outdoor delivery revenue". Check whether returned result chunks prioritize core business fields, confirming the chunk weight configuration is active.
- Submit multiple test questions with different cycles. Check whether the knowledge base synchronizes the latest data according to the configured `incremental_update_trigger_cycle`, confirming the update rule is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
