---
title: Citation Sources and Traceability for Property Management Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c100-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Property Management
meta_description: Data sources for property management intelligent due diligence reports include property qualification documents filed with housing and construction
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Property Management Intelligent Due Diligence Reports

## What data for this category looks like
Data sources for property management intelligent due diligence reports include property qualification documents filed with housing and construction authorities, daily operation and maintenance ledgers exported from campuses, archived public facility maintenance work orders, and scanned owner feedback records.

Two update cadences apply: filing documents are updated annually, while operation and maintenance ledgers are updated daily or weekly.

Document structure splits into a structured fields area and an unstructured attachments area. Structured fields include property qualification number, total campus building area, maintenance equipment list, and similar items. Unstructured attachments include inspection photos and scanned complaint records. Most fields include unit identifiers: building area uses square meters, maintenance duration uses hours.

## What constraints these characteristics impose on the citation sources and traceability workflow
Mixed structured and unstructured document structures require the traceability workflow to mark both the source documents for structured fields and the storage paths of corresponding unstructured attachments. Do not return only single source information.

Differences in update cadences across data types require configuring recall time thresholds for filing and operation and maintenance documents separately. Ensure referenced filing documents use the latest annual version, and operation documents match current cycle update records.

The presence of dedicated fields such as property service level and vacant housing percentage requires recall rules to prioritize matching associated documents for these fields. Ensure traceability information accurately corresponds to due diligence content.

## Configuration Settings
| Configuration Item | Recommended Values | Rationale |
|---|---|---|
| `recall_top_k` | 8–12 results | Matches the multi-source field requirements of property management due diligence reports, covers associated information such as qualifications, operations, and complaints |
| `similarity_threshold` | 0.72–0.80 | Balances matching accuracy for structured fields and unstructured text, filters low-relevance redundant records |
| `source_retention_days` | 365 days for filing documents, 7 days for operation and maintenance documents | Matches the update cadence of the two data types, avoids referencing expired filing versions or outdated operation records |
| `parse_segment_length` | 900–1100 characters | Adapts to the structured field length of property management documents, avoids losing logical connections between fields after splitting |
| `max_source_per_response` | 3–6 entries | Controls the number of sources per answer, prevents information overload, resolves the issue of only returning 1 citation per response |
| `enable_source_download` | Enabled | Supports document download verification during traceability, resolves issues where citations cannot be downloaded |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Each scenario requires individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: Only 1 knowledge base citation is returned per response, and it cannot be adjusted to multiple entries. Cause: The `max_source_per_response` parameter is not configured, or its value is set to 1, which does not match the multi-source requirements of due diligence reports.
- Phenomenon: An empty source list is returned when calling the knowledge base, the target knowledge base must be manually selected, and a `400 Missing Knowledge Base` error is returned during the call. Cause: The `default_knowledge_base_id` parameter is not configured, and the default property management knowledge base is not bound, resulting in no default option at startup.
- Phenomenon: Clicking a traceability link fails to download the document, or the downloaded content is empty. Cause: The `enable_source_download` configuration item is not enabled, or the `source_retention_days` setting is too short, causing traceability files to be automatically cleaned up.

## How to Confirm Proper Configuration
- Navigate to the FastGPT knowledge base configuration page. For versions 4.8.22 and above, check if the `max_source_per_response` value is set to 3–6. Initiate a test query that includes property qualification fields, and confirm that the number of citation sources below the answer matches the set value.
- Upload a latest property qualification filing document, initiate a query that includes the corresponding fields, and confirm that the traceability information marks the document's upload time and storage path.
- Click the traceability link in the answer, confirm that the corresponding document can be downloaded normally, and that the document content matches the version stored in the knowledge base.
- Adjust `similarity_threshold` to 0.75, initiate a query that includes operation and maintenance fields, and confirm that all recalled documents are high-relevance operation records or qualification files.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
