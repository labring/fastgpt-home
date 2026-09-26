---
title: Multi-turn Dialogue and Prompt Engineering for Coke Investment Research Knowledge Base Construction
slug: /en/industry/finance-d006-c096-f005
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Coke
meta_description: Coke industry data primarily comes from monthly supply and demand reports released by the China Coal Industry Association, daily listed prices from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Coke Investment Research Knowledge Base Construction

## What This Category of Data Looks Like
Coke industry data primarily comes from monthly supply and demand reports released by the China Coal Industry Association, daily listed prices from spot markets in major producing areas, weekly inventory reports from futures exchange delivery warehouses, and steel plant procurement ledgers. Update cycles are divided into three categories: daily updates (spot prices, futures settlement prices), weekly updates (producing area inventory, freight data), and monthly updates (industry supply and demand balance sheets). Document formats are mainly PDF industry reports and structured tables. Core fields include price per ton (unit: yuan/ton), sulfur content, ash content, and delivery warehouse storage capacity (unit: 10,000 tons). Some long documents include upstream and downstream industry chain linkage data.

## Constraints on Multi-turn Dialogue and Prompt Engineering
Data update frequencies vary significantly. Multi-turn dialogue must recall the latest spot prices and inventory data in real time, and cannot rely on static caching. Professional fields and units require strict standardization. Prompts must explicitly specify units such as yuan/ton and percentage to avoid ambiguous results. Data from multiple sources has different calibers. Multi-turn interactions must guide users to clarify their data source type. Long documents are common. Multi-turn conversation context must reserve sufficient space to accommodate multiple retrieved documents to avoid content overflow.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `maxContext` | `8000–12000 characters` | Single documents related to coke are relatively long, and multi-turn dialogue needs to retain multi-round interaction context and cross-source data from multiple retrievals |
| `recallTopK` | `Top 10–15 results` | Coke data sources cover multiple channels including spot, futures, and industry reports, so a sufficient number of results must be retrieved to cover different calibers |
| `similarityThreshold` | `0.72–0.80` | Terminology similarity between coke and other coal categories is high, so low-relevance non-coke data must be filtered, while retaining relevant content with different calibers |
| `reRankTopN` | `Top 5–8 results` | Retrieved results need to be streamlined to avoid overloading multi-turn conversation context, while retaining core producing area prices, futures settlement prices, and inventory data |
| `promptTemplate` | `Organize results in the format of "producing area + category + indicator + unit", clearly mark data source and update time` | Units for coke data are uniformly yuan/ton, percentage, etc., to avoid ambiguity and help users trace data calibers |
| `conversationTimeout` | `60 seconds` | Real-time data queries require fast response. Timeouts will cause users to resubmit requests and degrade interaction experience |

> The parameter values provided on this page are standard recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- The symptom is a `Request Timeout` error in dialogue responses. The cause is failing to set `conversationTimeout` to a reasonable duration adapted to real-time spot data queries, causing the large model to exceed the preset threshold when retrieving multiple long documents.
- The symptom is other coal category data mixed into retrieved results. The cause is setting `similarityThreshold` too low, failing to filter non-coke general coal documents, leading to retrieval of low-relevance content.
- The symptom is price data returned by dialogue without unit labels. The cause is failing to require unified use of yuan/ton as the price unit in `promptTemplate`, leading to ambiguous data calibers in results.

## How to Verify Correct Configuration
- Upload a latest coke producing area spot weekly report, start a multi-turn dialogue to ask for ton prices of each producing area in the previous week, and verify that the returned results include correct producing areas, prices, and units.
- Adjust `similarityThreshold` to 0.75, start a mixed query containing "coal" and "coke", and verify that the proportion of coke-related content in retrieved results meets expectations.
- Launch three consecutive dialogue rounds, asking for spot prices, futures settlement prices, and inventory data respectively, and verify that the context retains the query keywords and results from the first two rounds.
- Check the conversation log to confirm that `conversationTimeout` does not trigger timeout errors, and that each dialogue response duration stays within a reasonable range.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
