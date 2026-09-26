---
title: Knowledge Base Retrieval and Recall for Advertising and Marketing Research Knowledge Base Construction
slug: /en/industry/finance-d006-c062-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Advertising and
meta_description: Advertising and marketing research data sources include brand-owned ad campaign backend export data, third-party media monitoring platform data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Advertising and Marketing Research Knowledge Base Construction

## What this category of data looks like
Advertising and marketing research data sources include brand-owned ad campaign backend export data, third-party media monitoring platform data, publicly available industry analysis documents, and competitor public ad creative metadata.

Update cycles cover real-time (competitor creatives), hourly (campaign performance data), and weekly (industry trend analysis).

Document structures include structured campaign reports, semi-structured monitoring notes, and unstructured creative metadata files.

Fields include campaign plan ID, impressions, campaign cost, creative duration, and audience tags, with corresponding units: no specific unit, impressions, yuan, seconds, no specific unit.

## Constraints on Knowledge Base Retrieval and Recall
Real-time and hourly updated data requires the retrieval pipeline to support incremental indexing, avoiding delays caused by full reindexing.

Mixed storage of multiple document types requires the retrieval module to support both vector recall and keyword matching, covering retrieval needs for structured reports, semi-structured notes, and unstructured creative metadata.

Fields include precise campaign dimension identifiers, requiring the recall stage to support field filtering to narrow the recall scope and improve retrieval relevance.

Unstructured content in creative metadata requires targeted vectorization of text descriptions for video and graphic materials, avoiding reliance solely on filenames for retrieval.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recallTopK` | Top 15-20 entries | Advertising and marketing data includes multi-dimensional campaign fields. A sufficient candidate set must first be recalled before re-ranking and filtering to find precise matches |
| `similarityThreshold` | 0.72-0.85 | Semantic similarity differentiation for campaign performance data is relatively high. A threshold that is too low will introduce irrelevant competitor creatives, while a threshold that is too high will miss similar campaign strategies |
| `PARSE_INCREMENTAL_ENABLE` | Enabled | Ad campaign data update frequencies range from real-time to weekly. Incremental indexing avoids the time cost of full reindexing |
| `rerankTopK` | Top 5-8 entries | Research scenarios require precise matching of campaign strategies and audience tags. Retaining the top results after re-ranking meets analysis needs |
| `maxContext` | 800-1200 characters | Single entry length in campaign reports falls within this range. Excessive length will cause context overflow |
| `FIELD_FILTER_ENABLE` | Enabled | Advertising and marketing data includes precise fields such as campaign plan ID and audience tags. Filtering narrows the recall scope |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on local samples before finalizing settings.

## Three Common Mistakes
- When uploading a CSV file of ad campaign data, the interface displays "File parsing failed" with a 413 status code. The cause is that the `UPLOAD_FILE_MAX_SIZE` parameter was not adjusted. The single-file size of the ad campaign report exceeds the default limit.
- When calling variables using the `[{datasetId: xxx}]` format in a prompt, the returned results do not associate with the corresponding knowledge base data. The cause is that the platform-required variable syntax format was not used, and the dataset ID parameter was incorrectly concatenated.
- After uploading a batch of competitor creative metadata files, the status remains "Indexing" for more than one hour. The cause is that the `PARSE_INCREMENTAL_ENABLE` parameter was not enabled. Full indexing takes too long for large volumes of creative metadata sets.

## How to Verify Successful Configuration
- Upload a single file that conforms to the standard volume of a typical ad campaign document. Check whether the parsing status is completed within a reasonable duration to verify that the incremental indexing configuration is effective.
- Configure a field filtering rule in the prompt. Retrieve content from a specified campaign time period, then check whether the recalled results only include data from the corresponding time period to verify that the field filtering configuration is effective.
- Initiate a retrieval request. Check whether the similarity scores of the returned results conform to the preset interval requirements to verify that the similarity threshold configuration is effective.
- Upload a document containing image metadata. Check whether the retrieval results include relevant descriptive information about the images to verify that the multi-type document retrieval configuration is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
