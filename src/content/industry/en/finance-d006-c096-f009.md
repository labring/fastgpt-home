---
title: Citation Source and Traceability for Coke Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c096-f009
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Citation Source and Traceability for Coke Investment
meta_description: Coke-related data comes from four primary channels: Dalian Commodity Exchange futures market quotes, China Coking Industry Association industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Source and Traceability for Coke Investment Research Knowledge Base Construction

## What Data for This Category Looks Like
Coke-related data comes from four primary channels: Dalian Commodity Exchange futures market quotes, China Coking Industry Association industry reports, coastal port spot price systems, and steel mill purchase ledgers.
Update schedules include real-time futures transaction prices on trading days, daily updated port spot quotes, weekly released industry supply and demand reports, and monthly updated industrial panorama reports.
Individual documents are mostly structured tables or text with clear data annotations. Core fields include delivery grade, total sulfur content, ash content, volatile matter, crush strength M40, and wear resistance M10. Common units are percentage, yuan/ton, and kilogram/cubic meter.

## Constraints on Citation Source and Traceability
Multiple data sources require precise matching of data source identifiers. The naming of the same field may vary across channels. For example, port quotes use "total sulfur" while industry reports use "sulfur content", requiring unified mapping.
Differences in update frequencies require labeling data collection times during traceability to avoid confusion between same-day spot data and weekly report data.
Mixed structured and unstructured document formats require support for both table cell-level positioning and text paragraph-level positioning during traceability.
Professional units for core fields require unit identifiers to be included in traceability information, preventing ambiguous expressions such as "sulfur content 0.8".
References to cross-cycle data must be linked to the release cycle of the corresponding report to ensure accurate time dimensions for investment research conclusions.

## Configuration Settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `rag_top_k` | Top 15-20 results | Coke investment research data has multiple dimensions, covering futures, spot, industry reports and other data sources. An excessive number will exceed the context window, while an insufficient number will miss key industrial data |
| `similarity_threshold` | 0.72-0.85 | Coke professional terminology has high recognizability. A threshold that is too low will introduce irrelevant coal category data, while a threshold that is too high will miss valid information for different batches of the same category |
| `rerank_top_n` | Top 8-12 results | Reranking filters duplicate data across channels. The coke industry has quote information published repeatedly across multiple channels. Retaining the top 8-12 results balances comprehensiveness and accuracy |
| `citation_include_fields` | `Data Source Name, Collection Time, Unit` | The unit and collection time of coke data are core basis for investment research traceability, which must be included forcibly |
| `max_context_tokens` | 8000-12000 tokens | Coke investment research documents often contain multiple sets of table data. A larger context window can fully carry traceability information and business content |
| `enable_citation_log` | Enabled | Original document path and fragment of each citation must be retained to facilitate retrospective verification of subsequent investment research conclusions |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Misconfiguration Issues
- Symptom: Residual unremovable citation markers appear in generated content. Cause: The `show_citation` interface configuration item was not disabled. The default enabled citation rendering logic automatically appends source identifiers, and preset citation formats were not removed via template variables.
- Symptom: The number of context entries displayed on the frontend does not match the number of citations from the actual API call. Cause: Values for `rag_top_k` and `rerank_top_n` were not configured synchronously. The reranking step filters some recall results, but the frontend still displays the total number of original recalls, leading to numerical deviation.
- Symptom: "Exceeded citation limit" error prompt is triggered. Cause: The `max_citation_per_request` parameter was not set, or its value is less than the number of valid data sources currently recalled. The system will block citation requests that exceed the preset threshold.

## How to Verify Correct Configuration
- Upload a latest coke port spot price document to the knowledge base, initiate a query containing "Current Tangshan Port secondary metallurgical coke quote", and check whether the returned result carries data source name, collection time and unit information.
- View the return logs of the inference API, compare the number of citations displayed on the frontend with the length of the `citation_list` array carried in the logs, and confirm the values match.
- Manually adjust `similarity_threshold` to 0.6, initiate a query, confirm that no non-coke coal category data appears in the returned results, and verify that the threshold configuration takes effect.
- Disable the `enable_citation_log` configuration, initiate a query again, confirm that no traceability-related field records appear in the logs, and verify that the switch configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
