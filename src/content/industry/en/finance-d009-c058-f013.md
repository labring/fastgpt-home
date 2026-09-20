---
title: Knowledge Base Retrieval and Recall for Minor Metal Research Report Search
slug: /en/industry/finance-d009-c058-f013
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Minor Metal Research
meta_description: Minor metal research report data primarily comes from four sources: public statistics by industry associations, spot trading platform market data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Minor Metal Research Report Search

## What the data for this category looks like
Minor metal research report data primarily comes from four sources: public statistics by industry associations, spot trading platform market data, annual reports of listed companies, and reports from specialized industry analysis institutions.
Spot data is updated daily.
Industry research reports are released weekly or monthly.
Policy documents are updated irregularly.
Most documents use PDF format.
Some documents include embedded structured tables. These tables contain fields such as product name, spot price (unit: yuan per kilogram or yuan per ton), inventory scale (unit: 10,000 tons), production capacity growth rate, supply and demand gap, and other fields.
Some scanned documents only contain image-formatted content.

## Constraints on the knowledge base retrieval and recall link
Differences in data update frequencies require the recall link to prioritize matching the latest spot data and current quarter’s research reports. The link must also distinguish the weights of historical documents and real-time data.
There are many structured fields with diverse units. Retrieval must maintain unit consistency during recall to avoid confusion over unit differences across product categories.
Scanned documents contain non-text content. The parsing link must support OCR recognition to extract valid retrieval information. Without OCR support, valid retrieval information cannot be extracted.
Research reports have a high concentration of specialized terminology. A specialized thesaurus must be configured to optimize word segmentation and improve retrieval accuracy.
Supply and demand logic varies widely across different product sub-categories. Recall results must be associated by product category to avoid cross-category confusion.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `900 seconds` | Scanned research report OCR recognition and long document parsing take a long time. Sufficient processing time must be reserved |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Adapts to the capacity requirements of single batch research report collections or multi-document uploads |
| `maxContext` | `4000–6000 characters` | Minor metal research reports are dense with specialized terminology. Sufficient context must be retained to associate semantic logic |
| `Recall Count` | `Top 8 results` | Covers relevant research reports across different sub-categories to avoid missing target information |
| `Similarity Threshold` | `0.75–0.85` | Filters results with low semantic matching. Adapts to the retrieval accuracy requirements of the professional field |
| `Reranked Return Count` | `Top 5 results` | Prioritizes displaying core research report content that best matches the retrieval intent |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. Testing against local samples is recommended before finalizing settings.

## Three Common Errors
- Issue: When calling the chat interface, returned results do not include the `sourceDocId` field. This makes it impossible to locate referenced knowledge base information. Cause: The knowledge base reference information return configuration is not enabled, or the `includeSources` flag is not included in interface request parameters.
- Issue: After uploading a scanned research report, retrieval results do not extract valid text content. Only blank or garbled text is returned. Cause: The OCR parsing configuration is not enabled, or the document format is outside the range supported by OCR.
- Issue: After adding knowledge base information via the business interface, the retrieval interface cannot find the corresponding content. Cause: The knowledge base incremental synchronization task is not triggered, or a retrieval request is made before the synchronization task is completed.

## How to Confirm Correct Configuration
- Initiate a test retrieval. Check if returned results include the `sourceDocId` field. This confirms the reference information return configuration is enabled.
- Upload a scanned research report. Wait for the parsing task to complete. Check if the parsed text content fully extracts document information. This confirms the OCR configuration is effective.
- Call the knowledge base retrieval interface. Pass a test keyword. Check if the number of returned results matches the set `Recall Count` parameter.
- View the synchronization status in the knowledge base management interface. Confirm newly added knowledge base documents have completed synchronization with no failed tasks.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
