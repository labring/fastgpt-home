---
title: Multi-turn Dialogue and Prompt Engineering for Refinery Yield Rates
slug: /en/industry/finance-d007-c094-f005
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Refinery
meta_description: The data for the refinery yield rate category comes primarily from production logs of domestic refinery enterprises, daily quotes from bulk commodity
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Refinery Yield Rates

## What the Data for This Category Looks Like
The data for the refinery yield rate category comes primarily from production logs of domestic refinery enterprises, daily quotes from bulk commodity spot markets, and monitoring data from industry associations. Data is updated on a daily basis, with a daily yield rate report generated each day. The documents are structured tables containing the following fields:
- Feedstock type
- Average feedstock purchase price (unit: yuan/ton)
- Finished product output types
- Average ex-factory price of each finished product (unit: yuan/ton)
- Plant processing volume (unit: tons/day)
- Unit processing cost (unit: yuan/ton)
- Yield per ton of feedstock (unit: yuan/ton of feedstock)
- Plant operating duration (unit: hours/day)

Each document is 800–1200 characters in length, with strict corresponding relationships between all fields.

## What Constraints These Characteristics Impose on Multi-turn Dialogue and Prompt Engineering
The structured characteristics and daily update cadence of refinery yield rate data impose multiple constraints on multi-turn dialogue and prompt engineering configurations.
First, the data includes multiple sets of linked fields. Multi-turn dialogue must retain context to avoid repeated questions about basic information such as feedstock type and plant parameters.
Second, yield rate calculations rely on fixed field combinations. Prompts must strictly restrict the AI to only use data sources within the knowledge base, and prohibit the introduction of external information.
Third, daily updated documents have clear date attributes. Dialogue must guide the AI to explicitly specify the query date range to avoid confusion between data from different periods.
Fourth, the corresponding relationships between fields require AI responses to maintain logical consistency, with no splitting or tampering of field corresponding relationships allowed.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `maxContext` | 1200–1500 previous characters | Refinery yield rate data includes multiple sets of linked feedstock, finished product, and cost fields. Longer context can retain multiple sets of comparison parameters and avoid repeated queries of basic information |
| `recallTopK` | Top 6–8 entries | A single refinery daily report document has many fields. Too many recalled entries will introduce redundant information, while too few will fail to cover required comparison dimensions |
| `similarityThreshold` | 0.72–0.78 | Field matching accuracy for structured data is relatively high. A threshold that is too low will recall irrelevant documents, while a threshold that is too high will fail to match queries for similar feedstock types |
| `systemPrompt` | Only use refinery daily report fields provided in the knowledge base to calculate yields. Responses must clearly mark the cited date and feedstock type, and no external data may be introduced | Refinery yield rate calculations rely on fixed feedstock, cost, and selling price fields. The information source range of the AI must be strictly limited to avoid fabricated data |
| `fileParseChunkSize` | 800–1000 characters | The structured content of a single refinery daily report is relatively long. Chunk length adapts to the document structure and avoids breaking field corresponding relationships after splitting |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: The AI response includes yield calculation logic outside the knowledge base, or references fields that do not appear in the document. Cause: The `systemPrompt` was not configured to strictly limit use of only fields and data sources provided in the knowledge base.
- Phenomenon: Previous feedstock type or plant parameters are lost during multi-turn dialogue, leading to incorrect subsequent calculation results. Cause: The `maxContext` parameter was not configured correctly, and the context retention length is insufficient to cover linked information for multi-turn queries.
- Phenomenon: After embedding a dialogue page in a mini program, the top title is automatically modified and cannot be restored via interface settings. Cause: The automatic title synchronization configuration for the embedded page was not disabled, or fixed page title parameters were not specified in the embedded code.

## How to Confirm Proper Configuration
- Upload a single refinery daily report document, initiate a yield rate query for a specific feedstock and date, and verify that the response only uses field data from the document and does not introduce external information.
- Initiate two linked queries: first query the yield per ton of feedstock for a specific feedstock, then query the average ex-factory price of the corresponding finished product. Verify that the response retains the feedstock and date information from the previous query.
- Adjust the `similarityThreshold` parameter to values outside the 0.72–0.78 range, test recall results, and confirm that target documents are matched accurately within the range, while recall deviation occurs outside the range.
- Check the running logs of workflow nodes to confirm that the full content of `systemPrompt` is correctly loaded, with no missing or altered content.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
