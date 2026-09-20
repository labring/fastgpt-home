---
title: Knowledge Base Retrieval and Recall for Coke Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c096-f013
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Coke Intelligent Due
meta_description: Coke-related data sources include public statistics from the China Coking Industry Association, coastal port spot transaction ledgers, Dalian
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Coke Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Coke-related data sources include public statistics from the China Coking Industry Association, coastal port spot transaction ledgers, Dalian Commodity Exchange delivery standard documents, and downstream steel mill monthly procurement records.
Update frequency: Spot transaction data is updated daily. Industry supply and demand analysis weekly reports are released weekly. Delivery quality standard documents remain valid long-term.
Document structure falls into three categories: spot quotation sheets, supply and demand analysis reports, and delivery quality indicator tables.
Fields include dry basis sulfur content, crush strength, wear resistance, and ash content. Corresponding units are milligrams per kilogram, drum index, drum index, and percentage respectively.

## Constraints for Knowledge Base Retrieval and Recall
The multi-source, heterogeneous nature of coke data requires recall logic to support multiple document formats, including structured tables, short quotation sheets, and long analysis reports.
Differences in data update frequencies require distinguishing time-sensitive weights during retrieval, to avoid mixing expired weekly supply and demand data with real-time spot data in recall results.
Unit differences across document fields must be normalized during the pre-retrieval processing stage. For example, unify sulfur content data from different sources to standard units, to prevent recall result deviations caused by unit mismatches.
Additionally, coke due diligence reports have high requirements for quality indicator accuracy. Authoritative documents that meet delivery standards must be prioritized for recall, to avoid non-standard data interfering with retrieval results.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `900 seconds` | Long coke documents such as monthly supply and demand analysis reports contain multiple periods of historical data and structured tables, with multiple parsing steps, requiring sufficient time to complete text splitting and structured processing |
| `Segment Length` | `1000–1200 characters` | Balance the semantic integrity of coke quality indicator tables and retrieval accuracy for long-text analysis, avoiding splitting descriptions of the same indicator into different segments |
| `Recall Count` | `Top 8` | Cover multiple types of data required for due diligence including spot, supply and demand, and delivery data, while controlling context length to avoid interfering with large model generation |
| `Similarity Threshold` | `0.75–0.85` | Coke industry terminology is highly specialized. A higher threshold filters irrelevant content while retaining matching capability for approximate terms |
| `UPLOAD_FILE_MAX_SIZE` | `2000 MB` | Support uploading large coke supply and demand reports containing multiple periods of historical data, meeting the full data import requirements for due diligence |
| `Reranked Return Count` | `Top 4` | Perform secondary sorting on recall results, prioritizing core due diligence materials such as delivery standards and real-time spot data |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Issue: `fail to create post presigned url` error occurs when uploading coke-related CSV or PDF documents. Cause: Object storage access keys and bucket permissions are not configured correctly, preventing generation of pre-signed URLs for file uploads.
- Issue: Non-target category document content is mixed into results when initiating coke due diligence retrieval. Cause: The ID of the specified coke dataset is not bound in the retrieval configuration, or the retrieval prompt does not explicitly limit the dataset scope.
- Issue: `datasetId is required for S3 files` prompt appears when importing coke spot quotation CSV files. Cause: When using S3 object storage, the target dataset ID is not filled in during the import process, preventing the system from associating the data storage location with the knowledge base collection.

## How to Confirm Configurations Are Correct
- Upload a single coke spot quotation document, check that the system parsing status shows success, with no timeout or format error prompts.
- Initiate a retrieval for coke quality indicators, verify that the sources of recall results cover the preset target dataset.
- Adjust the similarity threshold parameter, observe changes in the number and relevance of recall results, confirming that the configuration meets business requirements.
- Import a large coke supply and demand report, check that the upload progress is normal, and no file size limit exceeded error is triggered.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
