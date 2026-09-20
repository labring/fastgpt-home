---
title: Citation Source and Traceability for Paper Industry Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c147-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Paper Industry
meta_description: Paper industry investment research data mainly comes from industry association public reports, listed companies’ regular announcements, customs import
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Paper Industry Investment Research Knowledge Base Construction

## What the Data for This Category Looks Like
Paper industry investment research data mainly comes from industry association public reports, listed companies’ regular announcements, customs import and export statistics, and raw material spot and futures quotation platforms.
Data update frequency follows multiple tiers:
- Monthly production capacity and operating rate data is updated monthly.
- Annual industry white papers are released quarterly or annually.
- Raw material spot quotations are updated daily.
- Customs import and export data is updated weekly.
Document formats include structured Excel tables and PDF research reports. Fields cover product segmented categories such as cultural paper, packaging paper, household paper, etc., production indicator values, with units mostly ten thousand tons and yuan per ton. Some documents include analysis modules.

## Constraints for Citation Source and Traceability
The multi-source mixing, varied update frequencies, and special field units of paper industry investment research data create multiple constraints for citation traceability.
The coexistence of structured tables and unstructured research reports requires precise matching between data blocks and their original document positions during traceability. This prevents cross-document citation misalignment.
Significant differences in update frequencies across data sources require mandatory recording of data collection time in traceability information. This stops expired monthly production capacity data from being called.
Multiple types of field units require retaining original unit labels during traceability. This avoids citation deviations caused by unit conversion.
The multi-attachment associated document structure requires binding the relationship between the main research report and attached data tables during traceability. This ensures the complete source link can be traced during citation.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_top_k` | `Top 8-12 entries` | Paper industry data mostly consists of structured multi-dimensional indicators. Sufficient recall is needed to cover all relevant data sources for segmented product categories, to avoid missing key information |
| `similarity_threshold` | `0.75-0.85` | Paper industry has many professional terms. A threshold that is too low will introduce irrelevant documents, while a threshold that is too high will miss weakly relevant but accurate data sources |
| `rerank_top_n` | `Top 3-5 entries` | Relevance ranking for structured data requires more precise reranking. This prevents non-core recalled data from interfering with traceability accuracy |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300-600 seconds` | Large research report PDFs often contain multiple pages of tables and charts, which take longer to parse. A timeout will cause document parsing failure and prevent traceability |
| `UPLOAD_FILE_MAX_SIZE` | `500-1000 MB` | Some listed company annual reports or industry white papers have large file sizes. Too small a limit will prevent uploading complete data sources |
| `source_include_metadata` | `Enabled` | Metadata such as document upload time, original file name, and data source link must be retained to display complete information during traceability |

## Three Common Mistakes
- Phenomenon: Generated answer content does not match the citations from the associated knowledge base at all. The cited documents do not contain the paper industry production capacity or price data mentioned in the answer. Cause: The similarity threshold is set too high, causing recalled documents to only match surface keywords and fail to cover core data fields. At the same time, reranking is not enabled, causing irrelevant documents to be prioritized as traceability sources.
- Phenomenon: Citation sources can be displayed normally during local testing, but are empty or fail to load when accessed via published channels. Cause: The `source_include_metadata` metadata storage configuration is not enabled. Published channels cannot obtain the document metadata required for traceability, causing the citation link to break.
- Phenomenon: After connecting to WeChat Work, only the list of cited documents is returned, and no corresponding answer content is generated. Cause: The number of recalled entries is set too low. Only document metadata is recalled, but core question-and-answer context is not. This causes the model to be unable to generate valid answers, and only traceability information can be returned.

## How to Confirm the Configuration Is Correct
- Upload a structured Excel research report from the paper industry. Check if the parsed document metadata includes the original file name, upload time, and data source link, to confirm that the metadata storage configuration is effective.
- Submit a query containing keywords for paper industry segmented product categories. Check if the number of recalled documents in the system logs matches the preset recall range, to confirm that the recall configuration is working properly.
- Check the citation traceability module in the generated results. Confirm that each citation labels the original document’s source type and update time, and confirm that units and field information have not been altered.
- Switch to the published channel to submit the same query. Confirm that the citation sources can be loaded and displayed normally, to confirm that there are no issues with the traceability configuration for the publishing link.

> The parameter values provided on this page are common starting points for configuration. Actual values depend on material format, data volume, and business rules. Specific issues require separate analysis. It is recommended to test on your own samples before finalizing settings.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
