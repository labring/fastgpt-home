---
title: Multi-turn Dialogue and Prompt Engineering for Advertising and Marketing Research Knowledge Base Construction
slug: /en/industry/finance-d006-c062-f005
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Advertising
meta_description: Data sources for advertising and marketing research include advertising placement ledgers, real-time media monitoring reports, competitor placement
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Advertising and Marketing Research Knowledge Base Construction

## What the data for this category looks like
Data sources for advertising and marketing research include advertising placement ledgers, real-time media monitoring reports, competitor placement material libraries, industry marketing research reports, and more. Update rhythms vary widely: placement execution data updates T+1, industry research reports update weekly or monthly, and the material library adds new entries in real time as new placements go live.
Document structures typically include fields such as placement date, media channel, material format, impression volume, click volume, conversion volume, budget spend, and others. Field units include counts, yuan, seconds, and more. Each document usually covers details for a single channel’s placement within one cycle.

## What constraints do these characteristics impose on multi-turn dialogue and prompt engineering?
The multi-dimensionality and varied update rhythms of advertising and marketing research data create multiple constraints for multi-turn dialogue and prompt configuration.
Cross-turn queries across multiple placement cycles require retaining complete time and channel context. Without this context, the AI may confuse placement metrics from different periods.
Real-time updated placement data requires regular context refreshes to avoid using outdated historical data.
The multi-field document structure requires prompts to explicitly specify the query field scope. This prevents the AI from generating fabricated content with no corresponding data.
Cross-media data source coverage requires the retrieval step to account for characteristics of different channels. This avoids retrieval results skewed towards a single media type.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `max_context_tokens` | `10000–14000` | Advertising and marketing research documents include multi-period placement data and multi-dimensional fields. A long context can retain complete business context for cross-turn queries |
| `recall_count` | `Top 6–10 entries` | Advertising and marketing data dimensions cover placement channels, material formats, conversion data, and more. Sufficient recall volume can cover needs of different segmented queries |
| `similarity_threshold` | `0.72–0.82` | There are many competing product placement cases in the same category in advertising and marketing. A threshold is needed to filter irrelevant retrieval results with low similarity |
| `chunk_size` | `1200–1800 characters` | The logic of single-group fields in advertising and marketing placement reports is usually concentrated within 1000 characters. Segmentation preserves complete business units |
| `rag_timeout` | `70–100 seconds` | Advertising and marketing data sources include cross-media real-time monitoring data. The retrieval process needs to traverse multiple data source APIs |
| `enable_global_variable` | `Enabled` | Advertising and marketing research requires reusing global business parameters such as placement cycles and core channels to improve consistency in multi-turn dialogue |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three common misconfigurations
- Phenomenon: Knowledge base retrieval results do not match the current query, and the AI’s reply is off-topic. Cause: The `similarity_threshold` is set too low, and a large number of irrelevant historical placement data is retrieved, leading to context pollution.
- Phenomenon: Deviations occur in placement data for cross-period queries in multi-turn dialogue. Cause: The `max_context_tokens` is insufficient, and the time range parameter from the previous query is not retained, leading the AI to confuse placement data from different periods.
- Phenomenon: No results are returned after the prompt calls the MCP tool. Cause: The interface permissions for the advertising and marketing data source are not configured in `mcp_config`, or the trigger conditions for calling the MCP are not explicitly specified in the prompt.

## How to confirm the configuration is complete
- Initiate a cross-turn query that includes multiple placement cycles and media channels, and verify whether the AI’s reply retains the time range parameter from the previous round.
- Adjust the value of `similarity_threshold`, test retrieval results under different thresholds, and confirm that the matching degree between the returned placement data and the query topic meets business expectations.
- Configure global variable calling logic in the prompt, initiate a query that includes global parameters, and verify whether the AI’s reply correctly substitutes the variable values.
- Call the configured MCP tool to query advertising and marketing monitoring data, and verify that the results returned by the tool are consistent with the content of the actual data source.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
