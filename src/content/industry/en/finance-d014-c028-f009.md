---
title: Citation Sources and Traceability for Thermal Coal Financial Report Analysis
slug: /en/industry/finance-d014-c028-f009
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Citation Sources and Traceability for Thermal Coal Financial
meta_description: Thermal coal financial report-related data mainly comes from three types of sources: industry supply and demand weekly reports released by the
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Citation Sources and Traceability for Thermal Coal Financial Report Analysis

## What This Category's Data Looks Like
Thermal coal financial report-related data mainly comes from three types of sources: industry supply and demand weekly reports released by the National Energy Administration, thermal coal delivery daily reports from the Zhengzhou Commodity Exchange, and quarterly/annual financial report notes of listed coal enterprises. Data update rhythms fall into three categories: spot price data is updated daily, industry supply and demand data is updated weekly, and financial report data is disclosed quarterly or annually. Document formats include structured CSV transaction data, PDF-format industry research reports and original financial reports. Core fields include calorific value (unit: large calories per kilogram), sulfur content, ash content, flat warehouse price (unit: yuan per ton), delivery grade, etc. Some financial report notes separately mark the revenue and cost proportion of thermal coal business.

## Constraints Imposed by These Characteristics on Citation Sources and Traceability
Multi-channel data sources require clear type differentiation during traceability to avoid confusion between spot, futures and financial report data. Content with different update frequencies requires matching the corresponding time range during recall. For example, when querying quarterly financial reports, prioritize recalling financial report documents from the current quarter and earlier. In scenarios where structured data and unstructured research reports are mixed, different parsing rules need to be adapted to ensure complete extraction of professional fields. Fields exclusive to thermal coal such as calorific value and delivery grade require precise matching of category identifiers during traceability to prevent confusion with data from other coal categories such as coking coal. At the same time, the units corresponding to the fields must be marked to avoid ambiguity in professional terminology.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Knowledge Base Recall Count` | Top 8 entries | Thermal coal financial report data includes structured transaction data and unstructured research reports. 8 entries can cover core information from different sources |
| `Similarity Threshold` | 0.72–0.78 | There are many professional terms for thermal coal. A threshold that is too low will introduce irrelevant data from other coal categories, while a threshold that is too high will miss detailed parameters |
| `Document Chunk Length` | 1000–1200 characters | Adapts to the paragraph length of financial report notes and industry research reports, retaining complete professional fields such as calorific value and price |
| `Source Data Annotation Switch` | Enabled | Automatically annotate data source type, update time and field units to ensure complete traceability information |
| `Parsing Timeout` | 600 seconds | Large financial report PDFs take a long time to parse, avoiding parsing failures caused by mid-task interruptions |
| `Reranked Return Count` | Top 3 entries | Prioritize displaying the most relevant core financial report data, avoiding information overload that affects reading |

> The parameter values provided on this page are common starting points for configuration. The actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Errors
- Phenomenon: Recall results mix financial report data of other coal categories such as coking coal. Cause: No precise matching rule set for thermal coal exclusive fields, and the `similarity threshold` is set too low.
- Phenomenon: Traceability information does not mark data update time or field units. Cause: The `source data annotation switch` is not enabled, and no automatic unit supplement rule is configured for professional fields.
- Phenomenon: Parsed financial report documents lack core parameters such as thermal coal calorific value. Cause: The `document chunk length` is set too short, truncating professional parameter paragraphs in financial report notes and leading to incomplete parsing.

## How to Verify Correct Configuration
- Upload a PDF of the financial report of a listed thermal coal enterprise and a thermal coal delivery data document from the Zhengzhou Commodity Exchange, run the parsing task, and check whether the parsed document automatically annotates the source type, update time and field units.
- Initiate the query "2024 Q3 thermal coal financial report calorific value data", check whether the recall results only include thermal coal-related data with no content from other coal categories.
- Adjust the `similarity threshold` to 0.75, test the query "thermal coal flat warehouse price", and check whether the relevance of the recall results meets expectations.
- View the traceability information of the recall results, confirm that each result is marked with complete source, time and unit information.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
