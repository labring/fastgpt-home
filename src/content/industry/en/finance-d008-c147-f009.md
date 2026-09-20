---
title: Citation Sources and Traceability for Papermaking Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c147-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Papermaking
meta_description: Data sources for the papermaking category mainly include public capacity and capacity utilization data from industry associations, annual or
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Papermaking Intelligent Due Diligence Reports

## What Data for This Category Looks Like
Data sources for the papermaking category mainly include public capacity and capacity utilization data from industry associations, annual or semi-annual financial reports disclosed by papermaking enterprises, pollution discharge monitoring announcements from environmental protection departments, and raw material spot market quotation information.
Update cycles vary widely. Industry association reports are released quarterly. Corporate financial reports are updated semi-annually or annually. Raw material quotes are updated daily.
Most documents are structured tables or PDF reports with fixed fields. Core fields include designed capacity, actual output, unit energy consumption, raw material consumption rate, pollution discharge concentration, and more. Units mostly follow industrial measurement standards such as tons, cubic meters, and kg/ton of finished paper.

## What Constraints These Characteristics Impose on the Citation Sources and Traceability Link
Scattered multi-source data and differentiated update cycles for the papermaking category require the traceability link to bind data release time and update cycle tags. This avoids citing expired industry reports or outdated corporate financial reports.
Structured documents have multiple fields and non-uniform measurement units. Traceability links must record original units marked by the data publisher. This prevents citation failure caused by unit conversion errors.
Multi-source cross-verification requires marking the release entity of the original data source for each cited fragment. This ensures the traceability chain of the due diligence report is verifiable.
When splitting long documents for processing, retain original paragraph page numbers and positioning information. This prevents inability to match original data sources after splitting.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8-12` | Papermaking industry due diligence reports need to cover multi-dimensional data such as production capacity, energy consumption, and raw materials. 8-12 entries can cover core information while avoiding redundancy |
| `Similarity Threshold` | `0.72-0.85` | Papermaking industry data is mostly structured professional content. A threshold that is too low will easily introduce irrelevant general industry information, while a threshold that is too high may miss accurate data for segmented product categories |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Papermaking industry financial reports or industry reports are mostly long documents with dozens of pages, requiring sufficient time to complete structured parsing and field extraction |
| `Segment Length` | `800-1200 characters` | Professional paragraphs in the papermaking industry often contain continuous production capacity and energy consumption data. 800-1200 characters can retain complete field association logic |
| `enable_source_detail` | `Enabled` | Original data source file names, release times, and paragraph positioning information must be returned to meet the traceability requirements of due diligence reports |
| `Re-ranked Return Count` | `Top 5` | Core data of the papermaking industry is concentrated in the top recall results. Retaining the top 5 entries after re-ranking can balance recall accuracy and response speed |

> The parameter values provided on this page are conventional recommendations used to determine the starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: After calling the chat interface, the returned result does not carry the `source` field or knowledge base ID. Cause: The `enable_source_detail` configuration item is not enabled, causing the system to not return traceability-related metadata.
- Phenomenon: The returned citation source points to the wrong document file name or release time. Cause: Original paragraph page numbers and positioning information are not retained when parsing long documents, causing split fragments to be mismatched with the original document.
- Phenomenon: In streaming return results, traceability information is separated from the answer text, and the corresponding relationship cannot be bound. Cause: The `detail: true` parameter is not configured, or the external call does not correctly parse the association relationship between the streaming returned `source` field and the answer fragment.

## How to Confirm Proper Configuration
- Initiate a single-round test call, check whether the returned result contains the `source` field, and confirm that the field contains file name, release time, and paragraph positioning information.
- Upload a structured financial report PDF from the papermaking industry, initiate a call, and verify whether the returned citation source matches the actual content of the uploaded document.
- Check the status of the `enable_source_detail` switch in the FastGPT configuration panel, confirm that the configuration is enabled.
- Carry the `detail: true` parameter when calling the interface, check whether the returned streaming data contains both the answer text and traceability metadata.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
