---
title: Multi-turn Dialogue and Prompting for Advertising and Marketing ROI
slug: /en/industry/finance-d007-c062-f005
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompting for Advertising and
meta_description: Daily report data on return on investment (ROI) and market trends in the financial advertising and marketing field comes from background reports of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompting for Advertising and Marketing ROI

## What the data for this category looks like
Daily report data on return on investment (ROI) and market trends in the financial advertising and marketing field comes from background reports of financial institution advertising campaign management systems, third-party advertising monitoring APIs, and media bidding market data sources. Full data for the previous calendar day is generated at fixed daily times; some real-time bidding channels support hourly incremental updates. The document structure is a multi-dimensional layered table, including fields such as advertising channel identifier, campaign ID, impressions, clicks, conversions, cost per conversion, total campaign spend, actual revenue amount, and more. For units, count-type fields use "times" as the unit, amount-type fields use "yuan" as the unit, and cost per conversion uses "yuan per conversion" as the unit.

## What constraints these characteristics impose on multi-turn dialogue and prompting
Cross-channel data sources in financial advertising and marketing have inconsistent statistical calibers, requiring multi-turn dialogue to gradually guide users to align with each channel's identifier rules to avoid data confusion. Differences in update rhythms across channels require specifying the data time range clearly in prompts, such as limiting queries to "yesterday" or "last 1 hour" market data, to prevent the model from mixing statistical results from different periods. The multi-dimensional structure of layered tables requires multi-turn dialogue to filter step-by-step in the order of advertising channel, campaign, and creative, to avoid overloading the context window with too many dimensions at once. Explicit binding of fields and units requires prompts to mandate that returned results include the unit for each corresponding field, to prevent missing or mixed units.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `maxContext` | `8000–12000 characters` | Multi-turn dialogue for advertising and marketing data needs to retain multiple batches of channel report data to avoid context truncation |
| `Recall count` | `Top 8–12 entries` | Daily advertising and marketing report data has many dimensions; too many recalled entries will cause context redundancy, while too few will fail to cover core metrics |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Advertising and marketing daily reports have large document sizes, requiring a longer timeout for the parsing process |
| `prompt_template` | `Sort out ROI data step-by-step according to the user-specified time range and channel dimensions, and attach the unit of each corresponding field to the returned results` | Match the layered query requirements of advertising and marketing data, clarify the return format |
| `maxTokens` | `2000–3000 characters` | Daily advertising and marketing report results need to fully display multi-dimensional indicators to avoid truncation of key information |
| `Recall similarity threshold` | `0.75–0.85` | Need to filter out historical report data irrelevant to the current query, while retaining comparative data of the same dimension |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common mistakes
- When calling the `Text Content Extraction` plugin node, a format error prompt is returned. The cause is that the matching rules for extracted fields are not clearly specified in the prompt, causing the plugin to fail to correctly identify target data in chat history.
- A `504 Gateway Timeout` status code appears during workflow execution. The cause is that the parsing timeout configuration for advertising and marketing daily reports is set too short, not matching the parsing duration corresponding to the document size.
- The unit of ROI data returned in multi-turn dialogue is missing. The cause is that the prompt does not mandate attaching field units, causing the model to omit unit information.

## How to confirm proper configuration
- Initiate a dialogue containing a multi-dimensional data query, check that the context window retains complete historical interaction information without truncation.
- Trigger workflow execution for data extraction, observe whether the returned results of the plugin node include all specified fields and conform to the expected format.
- View the knowledge base recall log, confirm that the recalled documents match the current query's dimensions and time range, with no irrelevant content.
- Test multi-round follow-up questioning scenarios, check whether the model can gradually adjust query dimensions while maintaining context consistency.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
