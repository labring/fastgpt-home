---
title: Multi-turn Dialogue and Prompt Engineering for Coke Financial Report Analysis
slug: /en/industry/finance-d014-c096-f005
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Multi-turn Dialogue and Prompt Engineering for Coke
meta_description: Coke-related financial report data mainly comes from annual and quarterly reports publicly disclosed by coking enterprises, monthly supply and demand
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Multi-turn Dialogue and Prompt Engineering for Coke Financial Report Analysis

## What the data for this category looks like
Coke-related financial report data mainly comes from annual and quarterly reports publicly disclosed by coking enterprises, monthly supply and demand monitoring data released by industry associations, and delivery data for coke products traded on futures exchanges. Update cycles are divided into regular and irregular: annual financial reports are updated at the end of each calendar year, quarterly financial reports are updated at the end of each quarter, and industry monitoring data is updated every ten days or monthly. In document structures, coke-related modules usually include fields such as production capacity scale, total production and sales, per-ton production cost, product selling price, and gross profit margin. Units are mostly tons, yuan per ton, and ten thousand yuan.

## What constraints these characteristics impose on multi-turn dialogue and prompt engineering
The multi-source and periodic update characteristics of coke financial report data impose clear constraints on multi-turn dialogue and prompt configuration. First, data calibers differ across cycles. Multi-turn dialogue must support users specifying data time ranges. Prompts must preset time range verification logic to avoid mixing cross-period data. Second, coke business fields include professional terminology. Multi-turn dialogue must support users asking step-by-step for terminology definitions. Prompts must include standard explanation templates for industry terminology. Third, production and sales data have binding relationships with cost data. Multi-turn dialogue must link context-related data. Prompts must configure association rules for context recall.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `maxContext` | `8000–12000 characters` | Single coke financial report documents usually exceed 5000 characters. Multi-turn dialogue must retain at least two complete financial report context sets to avoid data loss from context truncation |
| `systemPrompt` | `Answer only based on coke-related financial report data. Clearly label data sources and time ranges. State when data cannot be confirmed` | Coke financial report data has multi-source caliber differences. Clearly specifying sources and time ranges avoids response deviations |
| `chatCompletionModel` | `gpt-4o-mini` or equivalent long-context model | Coke financial reports include multi-field associated data. Long-context models better handle context associations for multi-turn follow-up questions |
| `similarityThreshold` | `0.75–0.85` | Coke financial reports have many specialized fields. A threshold that is too low introduces irrelevant data. A threshold that is too high misses relevant field information |
| `recallTopK` | `Top 6–8 entries` | Coke financial report business modules include multiple associated fields. Too many recalled entries increase context redundancy. Too few miss critical data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `300 seconds` | Coke financial report documents usually include multiple tables and detailed data. Parsing takes longer. Extend the timeout to avoid parsing failures |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material format, data volume, and business rules. Analyze specific cases individually. Test on your own samples before finalizing values.

## Three common mistakes
- Issue: When calling the `/api/v1/chat/completions` interface, responses do not follow the dedicated prompt rules for coke financial report analysis, and generic AI response content appears. Cause: The dedicated prompt is not passed via the `system` role in the `messages` array. Default global configuration is used, leading to mismatched prompts.
- Issue: The conversation opening configured in the same workflow does not support language switching, and only returns content in a single language. Cause: No language recognition logic is added to the prompt configuration. No corresponding opening template is preset for different input languages.
- Issue: After uploading a markdown-format coke financial report document, image links do not include domain names, and images fail to load during dialogue. Cause: The automatic domain name completion function for markdown-format images is not enabled in the file parsing configuration. The function only applies to Word-format files.

## How to confirm proper configuration
- Initiate a test dialogue, ask for coke financial report data from a specific cycle. Verify that responses clearly label data sources and time ranges.
- Adjust the `similarityThreshold` value. Test recall result counts across different thresholds to identify the value range that meets business needs.
- Upload a single coke financial report document. Initiate multi-turn follow-up questions. Verify that the dialogue can link multiple associated business fields from the context.
- Call the `/api/v1/chat/completions` interface, pass the dedicated system prompt. Verify that the interface response follows the preset rules.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
