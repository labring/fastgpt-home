---
title: Citation Sources and Traceability for Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c052-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Intelligent Due
meta_description: Intelligent due diligence reports source data from multiple channels: annual reports of domestic and overseas listed companies, public industrial and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Intelligent Due Diligence Reports

## What the Data for This Category Looks Like
Intelligent due diligence reports source data from multiple channels: annual reports of domestic and overseas listed companies, public industrial and commercial registration systems, related party transaction announcements disclosed by regulatory authorities, and related party ledgers collected through internal due diligence.
Annual reports are updated per fiscal year. Temporary announcements update when events like related party transactions or equity changes occur. Industrial and commercial information updates per local regulatory cycles.
Most documents use a nested multi-entity structure. They contain fields such as equity hierarchy, financial metrics, and related party transaction details for parent companies, subsidiaries, and joint ventures. Some fields include clear unit identifiers.

## Constraints on Citation and Traceability Workflows
Nested multi-entity structures require precise traceability to specific document fragments for individual entities. Avoid vague citations that only reference the parent company level.
Multi-source data needs separate traceability paths for publicly disclosed documents and internal ledgers. This ensures cited authority can be verified.
Non-fixed update cycles require retaining the original document’s disclosure timestamp during traceability. This prevents use of expired or non-effective information.
Fields with unit identifiers require retaining unit information in the traceability chain. This avoids confusion between identically named fields across different entities.
Document volumes for due diligence vary widely. Parsing and retrieving large annual reports requires longer processing cycles. This prevents traceability chain interruptions.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_top_k` | Top 10–15 results | Due to the large number of related entities in due diligence data, enough related documents must be retrieved to cover nested hierarchies |
| `source_visibility` | Configured per document category | Some internal due diligence ledgers require hiding original links, while publicly disclosed documents can have open view permissions |
| `chunk_size` | 800–1200 characters | Structured fields in due diligence reports are mostly short paragraphs. Segment length matches field length to enable precise citation fragment localization |
| `enable_multi_doc_link` | Enabled | Diversified holding data involves multi-entity nested relationships, so cross-document associated traceability must be supported |
| `parse_file_timeout_seconds` | 600 seconds | Large annual report PDF parsing takes significant time, to avoid timeout interrupting traceability workflows |
| `similarity_threshold` | 0.75–0.85 | Related data has high semantic similarity, so a reasonable threshold must be set to filter irrelevant retrieval results |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material format, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: The workspace knowledge base application only returns one citation result per request, and cannot associate documents across multiple entities. Cause: The `enable_multi_doc_link` configuration is not enabled, so only matching fragments within a single document are retrieved.
- Phenomenon: Some split question-answer pairs are written directly to the original text, and no structured citation markers are generated. Cause: The `chunk_size` is set too small, leading to truncated structured fields that cannot be recognized, or the structured document parsing mode is not enabled.
- Phenomenon: After configuring the model, testing triggers a `504 Gateway Timeout` error, and the citation function malfunctions during runtime. Cause: For FastGPT 4.8.20, a reasonable value for `parse_file_timeout_seconds` is not configured. Large annual report parsing times out, causing citation chain breaks.

## How to Confirm Proper Configuration
- Upload a diversified holding annual report and related party announcement, trigger knowledge base retrieval, and check if the citation list includes multiple documents from different sources.
- Click any citation entry, verify that the original file path, disclosure time, and field unit information are displayed.
- Configure visibility rules for different documents, and verify that the citation permissions of corresponding question-answer results meet expectations.
- Run a due diligence task with multi-entity associated queries, and check if data fragments from different documents can be correctly associated.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
