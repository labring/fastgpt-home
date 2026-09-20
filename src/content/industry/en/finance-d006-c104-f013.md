---
title: Knowledge Base Retrieval and Recall for Glass Industry Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c104-f013
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Glass Industry
meta_description: Glass investment research data originates from four main sources: common building material industry standards, batch quality inspection reports from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Glass Industry Investment Research Knowledge Base Construction

## What the data for this category looks like
Glass investment research data originates from four main sources: common building material industry standards, batch quality inspection reports from production enterprises, raw material supply chain quotation documents, and process technology manuals. Two update cycles apply: national and process standards are updated every 1–2 years. Raw material prices and batch quality inspection data are updated daily. Most documents follow three core structural types: physical parameter tables, production process descriptions, and compliance requirements. Core fields include glass thickness, light transmittance, softening point, batch number, and test date. Universal measurement units are used, such as millimeters (mm), percent (%), and degrees Celsius (℃).

## What constraints these characteristics impose on retrieval and recall
The multi-type and staggered update cycle of glass investment research data creates three constraints for the retrieval and recall process.
1.  The data includes text descriptions, precise physical parameters, and real-time quotations. Retrieval must support mixed multi-field matching, covering keyword, numerical range, and time dimension search needs.
2.  Daily updated batch quality inspection and quotation data requires incremental indexing logic. This avoids the time cost of full index reconstruction.
3.  Long process description documents are tightly linked to their associated parameters. Segmentation must preserve the connection between parameters and application scenarios. This prevents recall fragments from losing context and causing matching failures.

## How to configure the system
| Configuration Item | Recommended Range | Rationale |
| --- | --- | --- |
| `chunkSize` | 800–1200 characters | Glass process documents and parameter tables are mostly long-form text. Segments that are too long reduce recall accuracy, while segments that are too short break the link between parameters and their use cases. This range balances context completeness and retrieval efficiency. |
| `chunkOverlap` | 100–150 characters | Retains parameter associations across adjacent segments, preventing breaks in cross-segment parameter matching. This aligns with the tightly bound nature of glass industry parameters. |
| `similarityThreshold` | 0.72–0.80 | Glass industry parameters are mostly precise numerical values. A threshold that is too high filters valid matches, while a threshold that is too low introduces irrelevant results. This range meets the accuracy requirements for mixed numerical and text retrieval. |
| `recallTopK` | Top 10 results | Covers multi-source batch data and quotation information, avoiding missed valid content from daily updates. |
| `rerankTopN` | Top 3 results | Focuses on the most relevant parameters and scenario descriptions, reducing redundant data for subsequent processing. |
| `enableIncrementalIndex` | Enabled | Adapts to daily updated batch and quotation data, avoiding the time cost of full index reconstruction and ensuring data timeliness. |
| `enableNumericMatch` | Enabled | Supports range matching for numerical fields such as glass thickness and softening point, meeting the retrieval needs for precise parameters. |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material forms, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test against the platform’s own samples before finalizing settings.

## Three common configuration mistakes
- Phenomenon: Embedded glass industry process formulas in the knowledge base fail to display correctly, only plain text is output. Cause: Document parsing configuration for retaining formula structure is not enabled. Formulas are converted to plain text and lose formatting.
- Phenomenon: Retrieval and recall results fluctuate for the same query during local deployment, leading to inconsistent final responses. Cause: Configuration values for `similarityThreshold` and `recallTopK` are not fixed, or the model temperature parameter is set too high, introducing random matching logic.
- Phenomenon: Retrieval returns full data table fields instead of only matching relevant glass parameters for the query. Cause: Multi-field indexing rules are not configured, and the search range is not limited to core parameter fields. This leads to searches covering the entire data table.

## How to verify correct configuration
- Upload a test document containing glass industry process formulas and numerical parameters. Verify that parsed content retains formula formatting and parameter fields.
- Submit the same retrieval request multiple times. Check that the number of recall results and matching content are consistent, confirming that configuration parameters take effect and are fixed.
- Initiate a search for a specific glass parameter. Verify that returned results only cover document fragments matching that parameter, and do not include unrelated fields.
- Submit a search request containing real-time updated glass industry quotation keywords. Verify that recall results include the latest data sources, confirming that incremental indexing configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
