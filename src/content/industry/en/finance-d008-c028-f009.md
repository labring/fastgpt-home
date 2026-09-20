---
title: Citation Sources and Traceability for Thermal Coal Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c028-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Thermal Coal
meta_description: Thermal coal-related data mainly comes from industry monitoring institutions, port shipping ledgers, railway transportation dispatch systems, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Thermal Coal Intelligent Due Diligence Reports

## What this category’s data looks like
Thermal coal-related data mainly comes from industry monitoring institutions, port shipping ledgers, railway transportation dispatch systems, and downstream power plant procurement records. The data update rhythm is mostly daily. Some origin and port data is updated weekly. Most documents are structured tables or standardized CSV files, with fixed fields including origin code, calorific value (unit: large calories per kilogram), ash content, total sulfur content, shipping volume (unit: tons), transaction price (unit: yuan per ton), and transportation batch number. Some supplementary documents include daily weather and transportation condition notes.

## What constraints do these characteristics impose on the citation and traceability link
The multi-source and batch update characteristics of thermal coal data impose multiple constraints on the citation and traceability link. Daily updated port and transaction data requires daily synchronization of the latest files. Without configured automatic incremental pull rules, outdated cited data will result. Differences in document formats from different sources require separate parsing rules for port ledgers and transportation dispatch systems. Otherwise, field matching errors will occur. Transportation batch number and origin code are core unique identifiers. If not bound to corresponding fields in the citation template, accurate traceability of the full transaction and transportation link for a single thermal coal batch will not be possible. Some weekly updated origin inventory data requires correlation verification with daily transaction data. Otherwise, traceability data mismatches will occur.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Recall Count` | `Top 8-12 entries` | Thermal coal data has many fields and requires accurate matching of core batch information. Too many recalled entries will introduce irrelevant data, while too few will fail to cover all fields required for full traceability |
| `Similarity Threshold` | `0.75-0.85` | Thermal coal’s transportation batch number and origin code are core unique matching identifiers. A threshold that is too low will match irrelevant batches, while a threshold that is too high will fail to recall associated data from the same batch |
| `Citation Source Bound Fields` | `transportation batch number, origin code` | These two fields are core unique identifiers for thermal coal traceability. They must be directly bound to their corresponding field values as traceability IDs in the citation template |
| `Incremental Pull Interval` | `24 hours` | Most core thermal coal transaction and port data is updated daily. A 24-hour pull interval ensures cited data comes from the latest batch |
| `Document Parsing Segment Length` | `800-1200 characters` | A single record in thermal coal structured documents occupies approximately 1000 characters. Adapting the segment length ensures complete field parsing |
| `Reranked Return Count` | `Top 5 entries` | Traceability data with the highest relevance to the current due diligence batch must be returned first. Limiting the number of entries after reranking simplifies report display logic |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: The ID displayed in the cited content is the knowledge base file ID, which does not match the thermal coal transportation batch number. Reason: No custom metadata binding rule is configured, and the knowledge base file ID is incorrectly output as the citation ID variable.
- Phenomenon: The temperature adjustment button does not appear after entering the variable citation configuration interface. Reason: In variable citation mode, some global parameter configuration items are hidden. Complete temperature settings before switching modes, or embed parameters via custom code blocks.
- Phenomenon: The thermal coal data cited in the due diligence report is updated with a lag, showing port shipping data from three days prior. Reason: The incremental pull interval is set too long, failing to match the daily update rhythm of thermal coal data, resulting in outdated cited data.

## How to Confirm the Configuration Is Correct
- Upload a single piece of thermal coal test data with complete traceability fields, view the parsed metadata in the knowledge base preview interface, and confirm that fields such as transportation batch number and origin code have been correctly extracted.
- Initiate a due diligence query, view the returned citation source list, and confirm that the ID attached to each citation data is the bound traceability field value, and this ID does not match the knowledge base file ID.
- View the data source synchronization log, confirm that the incremental pull operation is executed at the set interval, and the latest batch of data has been synchronized to the knowledge base.
- Adjust the similarity threshold and the number of recalled entries, initiate multiple test queries, and confirm that only thermal coal data related to the current query batch is returned, with no unrelated batch data mixed in.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
