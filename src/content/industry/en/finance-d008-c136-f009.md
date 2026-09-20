---
title: Citation Sources and Traceability for Precious Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c136-f009
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Precious Metals
meta_description: Public market data originates from the Shanghai Gold Exchange, London Bullion Market Association. Industry supply, demand and inventory data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Precious Metals Intelligent Due Diligence Reports

## What the data for this category looks like
Public market data originates from the Shanghai Gold Exchange, London Bullion Market Association. Industry supply, demand and inventory data originates from the China Gold Association, World Gold Council and other professional institutions. Update schedule: spot real-time quotes update every 10-15 minutes. Weekly inventory reports are released every Friday. Monthly supply and demand reports are updated at the start of each month.

Document structure includes structured market data fields and unstructured analysis reports. Structured data includes fields such as contract code, product name, purity, pricing unit and more. Unstructured reports include core data tables and analysis paragraphs. Pricing units are mostly yuan/gram or US dollars/ounce. Purity is identified by standard labels such as Au9999, Ag9999.

## What constraints do these characteristics impose on the "citation sources and traceability" link
The difference in update schedules between real-time quotes and periodic reports requires distinguishing data timeliness tags during traceability, to avoid mixing historical and latest data. Dispersed data from multiple sources requires adding unique identifiers for each data source, to ensure citations can be traced back to the corresponding institution and release time.

Unique units and purity fields for precious metals require mandatory inclusion in traceability information, to avoid unit confusion or category misjudgment. The coexistence of structured and unstructured document structures requires configuring different traceability positioning rules for different data formats: structured data is associated with specific interface fields, and unstructured reports mark paragraph positions and page numbers.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `topK` | `Top 10-15 entries` | Single precious metals data has large information volume; excessive recall will exceed context window limits |
| `similarityThreshold` | `0.65-0.75` | Precious metals market prices are sensitive to fluctuations; low-correlation recall content must be filtered to avoid interfering with due diligence analysis |
| `rerankTopN` | `Top 5-8 entries` | High-correlation sub-category data must be retained, while controlling the total length of citations per round |
| `Citation Source Identification Fields` | `["source", "update_time", "unit", "purity"]` | Precious metals-specific fields such as data source, update time, pricing unit and purity must be included to ensure complete traceability |
| `Maximum Length of Single Citation` | `800-1200 characters` | Adapts to the paragraph length of precious metals industry reports to avoid truncation of critical data |
| `Traceability Information Switch` | `Enabled` | Complete source and positioning information must be included in citation results to meet the traceability requirements of due diligence reports |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to conduct tests on your own samples before finalizing settings.

## Three Common Errors
- Phenomenon: Non-precious metal citation content appears when mixing searches for precious metals quotes and other non-ferrous metal data. Cause: No filtering rules are set for the `unit` field, resulting in recall of quote data from other categories.
- Phenomenon: An error is returned in the interface when referencing a knowledge base ID or custom variable in the application, and the log shows `400 Bad Request`. Cause: The parameter format of the `Citation Source Identification Fields` is not configured correctly, resulting in variable parsing failure.
- Phenomenon: After adjusting `similarityThreshold` to the minimum and `topK` to the maximum, the number of recalled content does not increase. Cause: The total number of valid precious metals data in the knowledge base is insufficient, or the recall upper limit configuration after reranking is not enabled.

## How to Confirm Proper Configuration
- Initiate a test query for precious metals due diligence, and check whether the `source`, `update_time`, `unit` and `purity` fields are included in the citation column of the returned results.
- Adjust `similarityThreshold` to 0.5, and verify that irrelevant recall content related to precious metals is filtered out.
- Check the knowledge base parsing logs to confirm that each uploaded precious metals report has automatically generated a version number and associated it with the corresponding citation.
- Test referencing custom variables, and confirm that no parameter parsing errors appear in the returned results.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
