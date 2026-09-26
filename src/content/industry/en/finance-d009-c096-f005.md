---
title: Multi-turn Dialogue and Prompting for Coke Research Report Retrieval
slug: /en/industry/finance-d009-c096-f005
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Coke Research Report
meta_description: Coke research report data mainly comes from industry association monitoring data, brokerage special reports, public market data from futures
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Coke Research Report Retrieval

## What this category's data looks like
Coke research report data mainly comes from industry association monitoring data, brokerage special reports, public market data from futures exchanges, and public production information from steel mills. Update frequencies include daily spot price data, weekly industry inventory and operating rate reports, monthly supply and demand balance sheets, and quarterly strategy research reports. Document structures typically consist of four parts: core logical derivation, core indicators on the supply and demand side, price trend reviews, and future market outlook. Core fields include production capacity (unit: 10,000 tons/year), spot price (unit: yuan/ton), port inventory (unit: 10,000 tons), and statistical values related to steel mill operations.

## Constraints imposed on multi-turn dialogue and prompting by these data characteristics
Differences in data sources and statistical standards across multiple sources for coke research reports require that multi-turn dialogue first verify data sources and statistical standards to avoid mixing up indicators across reports. The difference in update frequencies between daily spot price data and monthly supply and demand reports requires that multi-turn dialogue support filtering recalled research reports by time range to avoid interference from outdated data. The diversity of units for core fields requires that prompts clearly specify unified output units to prevent misunderstandings caused by mixed units. The relatively long content of individual special research reports requires that multi-turn dialogue limit the recall length of the context window to avoid exceeding the model's processing limits.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `recallNum` | top 10-15 results | Core indicators of coke research reports are scattered across multiple documents. A sufficient number of recalls is needed to cover core dimensions including supply, demand, price, and inventory |
| `similarityThreshold` | 0.75-0.85 | A large number of coke research reports cover the same topic but use different standards. Low-similarity irrelevant reports must be filtered to retain highly matched valid information |
| `rerankTopN` | top 5-8 results | Recalled research reports must be reranked to screen the most relevant core content, avoiding redundant information interference during multi-turn dialogue |
| `contextWindowSize` | 8000-12000 characters | Individual coke special research reports have relatively long content. The context window length must be limited to adapt to the processing limits of most large language models |
| `recallTimeRange` | last 90 days | Supply and demand in the coke industry change rapidly. Research reports older than 90 days have limited reference value and can be filtered out as outdated content |
| `promptTemplate` | Always include "Must uniformly label all indicator units, prioritize research report data from the latest date" | Adapt to the unit diversity and update frequency requirements of coke research reports, and clarify output rules for multi-turn dialogue |

> The parameter values provided on this page are general recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Each situation requires separate analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: When selecting a locally deployed large language model in the debug preview interface, the actual call switches to another model. Cause: The unique identifier of the local model is not specified in the `defaultLLM` configuration item, or the model mapping configuration of the third-party transit service is incorrect.
- Phenomenon: After uploading a JSON file containing coke research reports, content truncation or parameter errors appear in dialogue. Cause: The `UPLOAD_FILE_MAX_SIZE` or `maxContext` parameters are not adjusted, exceeding the default character limit.
- Phenomenon: After associating multiple coke research report knowledge bases, the number of recalled results does not meet expectations. Cause: A reasonable total capacity threshold for associated knowledge bases is not set, or the `recallNum` configuration is lower than the total number of associated knowledge bases, resulting in insufficient recall of some knowledge bases.

## How to Confirm Configuration is Complete
- Run a single-round targeted query, and confirm that the indicator units and data time range of the returned results match the preset configuration.
- Run a continuous multi-turn dialogue, and confirm that context information is correctly carried over, with no content loss or confusion.
- Adjust the number of associated knowledge bases, and confirm that the recalled results cover all newly added target knowledge bases.
- Upload a test research report file, and confirm that the file parsing and upload process does not throw abnormal errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
