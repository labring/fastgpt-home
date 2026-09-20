---
title: Knowledge Base Retrieval and Recall for Advertising and Marketing Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c062-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Advertising and
meta_description: Data for advertising and marketing intelligent due diligence reports primarily comes from advertiser placement ledgers, structured reports exported
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Advertising and Marketing Intelligent Due Diligence Reports

## Data characteristics of this category
Data for advertising and marketing intelligent due diligence reports primarily comes from advertiser placement ledgers, structured reports exported from third-party ad monitoring platforms, partner qualification documents, and past placement closing reports. Structured data updates on a daily basis. Qualification documents are adjusted when partners renew their agreements. Closing reports are generated after placement cycles conclude. Two types of content are included: structured fields such as placement channel, placement date, impressions, conversions, and customer acquisition cost; and unstructured content including placement strategy descriptions and effect review texts. Field units use metrics like counts, yuan, and hours, with no percentage-based expressions.

## Constraints for knowledge base retrieval and recall
Structured placement data updates daily, which requires the knowledge base to support incremental vector updates to avoid performance losses from full reprocessing. Fields have clear metric attributes, so retrieval must match field semantics and unit associations to prevent data confusion across placement scenarios. Unstructured review reports contain long text segments, so appropriate segment lengths must be supported to avoid context overflow that impacts recall accuracy. Heterogeneous documents from multiple sources (CSV, PDF, Word) require unified parsing adaptation to ensure all formatted content is correctly vectorized. A high proportion of documents from similar placement scenarios requires optimization of recall deduplication logic to reduce redundant results.

## Configuration settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `UPLOAD_FILE_MAX_SIZE` | `1000 MB` | Covers the maximum file size of most long-cycle placement closing reports, prevents large file upload failures |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Matches the parsing time required for long-text closing reports, prevents premature interruption of the parsing process |
| `Segment Length` | `800–1200 characters` | Balances context completeness and retrieval accuracy, avoids semantic dispersion from overly long segments, and prevents loss of associated information from overly short segments |
| `Recall Count` | `Top 8 results` | Balances retrieval comprehensiveness for multi-dimensional due diligence report data and result readability |
| `Similarity Threshold` | `0.72` | Filters low-relevance results, retains valid placement data and review content for advertising and marketing scenarios |
| `Incremental Update Toggle` | `Enabled` | Adapts to the daily update rhythm of structured placement data, reduces server load and ensures data timeliness |

> The parameter values provided on this page are general recommendations to serve as a starting point for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Workflow calls to knowledge base retrieval return empty content. Cause: The incremental update toggle is not enabled, and structured placement data has not completed the initial full vector synchronization, resulting in no valid matching data for retrieval.
- Text content extraction components cannot extract structured fields from knowledge base references. Cause: The "Associate knowledge base structured fields" option is not enabled in the component configuration, and only unstructured text retrieval logic is called, making field-type data unavailable.
- Long-text closing reports fail to parse after upload. Cause: The `PARSE_FILE_TIMEOUT_SECONDS` parameter is not adjusted, and parsing time exceeds the default threshold, resulting in task interruption.

## How to verify successful configuration
- Upload a typical advertising placement closing report in PDF format, check if the parsing status shows "Completed" to confirm that file parsing configuration is active.
- Trigger an incremental update for structured placement data, check if the update time of corresponding data in the knowledge base matches the current operation time to confirm that incremental update configuration is active.
- Initiate a retrieval for the placement cost field, verify that returned results include metric information for the corresponding field to confirm that field matching configuration is active.
- Adjust the similarity threshold and initiate two retrievals, compare the difference in returned result counts to confirm that threshold configuration affects retrieval results as required for the business.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
