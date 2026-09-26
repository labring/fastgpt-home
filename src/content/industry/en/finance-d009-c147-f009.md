---
title: Citation Source and Traceability for Papermaking Industry Research Reports
slug: /en/industry/finance-d009-c147-f009
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Papermaking Industry
meta_description: Data sources for papermaking industry research reports include China Paper Association public reports, research documents from securities firm light
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Papermaking Industry Research Reports

## What Data for This Category Looks Like
Data sources for papermaking industry research reports include China Paper Association public reports, research documents from securities firm light manufacturing industry research teams, regular disclosure documents of listed paper enterprises, and customs import and export trade statistics.

Update frequency varies by data type: industry association data is updated monthly, listed company announcements are updated quarterly or annually, and securities firm research reports are released alongside industry event nodes.

Documents mostly use PDF or Word formats. Their structure includes publishing institution, release date, core production and trade data fields, and trend analysis content. Data field units include tons, yuan/ton, ten thousand yuan, and similar units.

## Constraints on Citation and Traceability Workflows
The multi-source, multi-update-cycle, and structured field characteristics of papermaking industry research reports impose three constraints on citation and traceability workflows:
1.  Distinguish and label source types to avoid confusion of similar data from different institutions.
2.  Accurately match the data collection time cycle to ensure traceability results align with the industry cycle range specified in user queries.
3.  Retain paragraph anchors and page number information within documents. Structured data is concentrated in specific paragraphs, so positioning must target exact content locations instead of entire documents.

Additionally, differences in release times across sources require traceability results to display release dates to support judgment of data timeliness.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `recall_top_k` | 8-12 results | Core data of papermaking industry research reports is concentrated. Too many recall results will introduce irrelevant content, while too few will fail to cover complete industry analysis logic |
| `chunk_size` | 1000-1500 characters | Core data paragraphs of papermaking industry research reports are mostly 300-800 characters. Excessively long chunks will lead to inaccurate fragment anchors, while excessively short chunks will split complete data logic |
| `enable_page_anchor` | Enabled | Most papermaking industry research reports are in PDF format. Retaining page anchors allows precise positioning to the specific page where data is located, meeting traceability requirements |
| `source_reference_mode` | Document fragment + source institution + release date | Papermaking industry research reports have diverse source types. Both institution and release time must be labeled to distinguish data credibility |
| `PARSE_FILE_TIMEOUT_SECONDS` | 120 seconds | Single papermaking industry research report has a large number of pages, with longer parsing time than general documents. This avoids parsing failures caused by timeout |

> The parameter values provided on this page are conventional recommendations used as starting points for configuration. Actual values are affected by material format, data volume and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Issue: When calling the API to retrieve question-and-answer results for the open-source version v4.8.21, the `source_detail` field is empty. Cause: The `enable_source_reference` configuration item is not enabled, and metadata collection is not enabled when uploading to the knowledge base.
- Issue: After enabling the web search tool to obtain research report content, the returned citation sources do not label authoritative publishing channels. Cause: The `web_search_source_filter` parameter is not configured to limit search sources to official channels such as industry associations and securities firms, resulting in recall of unregulated scattered data.
- Issue: After configuring the nginx proxy, the original research report files in the knowledge base cannot be downloaded. Cause: The proxy rule does not allow the request header for the `/api/v1/kb/file/download` interface, causing the redirected link to fail to access properly.

## How to Verify Successful Configuration
- Initiate a query about papermaking industry production data, check the citation source module in returned results to confirm inclusion of publishing institution, release date and specific page number information.
- Call the knowledge base-related API to retrieve recalled fragments, check whether the returned `source_detail` field includes document metadata and paragraph anchor information.
- Access the knowledge base file download link to confirm that the redirected link can be properly opened and the corresponding research report original file can be downloaded after the proxy configuration is applied.
- Adjust the time range of the query, verify that the recalled results only include research report data matching that cycle.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
