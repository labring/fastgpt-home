---
title: Tool Calling and Plugins for Securities Research Report Retrieval
slug: /en/industry/finance-d009-c133-f008
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Securities Research Report
meta_description: Securities research report data primarily comes from licensed securities firm research institutes, public offering and private equity investment
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Securities Research Report Retrieval

## What the data for this category looks like
Securities research report data primarily comes from licensed securities firm research institutes, public offering and private equity investment research teams. Update schedules follow trading days: regular reports are released after market close, and emergency industry or individual stock-related reports are pushed immediately. Document structures include modules such as core viewpoints, industry data reviews, individual stock earnings forecasts, risk warnings, and more. Fields include publishing institution, release date, investment rating, target price, earnings forecast value, and others. Target price is denominated in RMB yuan, earnings forecasts are mostly counted in ten thousand yuan or hundred million yuan, and the word count of individual documents varies widely.

## What constraints these characteristics impose on tool calling and plugins
The high-frequency update nature of research reports requires that tool calling be configured with a scheduled incremental pull logic for research report sources to avoid retrieving expired content. The multi-field structure with specific units requires that plugins preset standardized field parsing rules to ensure unified units for extracted information such as target price and investment rating. The wide variation in word count of individual documents requires that the context window for tool calling adapt to long text processing, or set a reasonable segment length during the recall phase. At the same time, core retrieval dimensions such as investment rating and earnings forecast must be explicitly bound in the trigger rules for tool calling to improve retrieval accuracy.

## How to set configurations
| Configuration Item | Recommended Value | Basis for This Value |
| --- | --- | --- |
| `recall_count` | `top 10-15` | There are large volumes of securities research reports; too many will exceed the context window, while too few will miss highly relevant content |
| `maxContext` | `8000-12000 characters` | Single in-depth research reports have a high word count, requiring adaptation to context splicing after long text recall |
| `PARSE_FILE_TIMEOUT_SECONDS` | `120 seconds` | Research report documents may contain large numbers of charts and formulas, leading to long parsing times |
| `similarity_threshold` | `0.75-0.85` | Securities research reports contain many professional terms, requiring sufficient semantic matching between retrieved content and queries |
| `tool_trigger_threshold` | `0.8` | Clear distinction between general question answering and professional research report retrieval scenarios is required to avoid non-relevant content triggering tool calls |
| `incremental_pull_interval` | `30 minutes` | Research reports are updated frequently during trading days, requiring timely synchronization of the latest research report sources |

> The parameter values provided on this page are common recommendations for starting point configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: After configuring tool calling, the AI does not trigger the research report retrieval plugin and directly generates natural language responses. Cause: The tool trigger threshold is set too high, or the trigger conditions for research report retrieval are not explicitly bound in the system prompt, causing the AI to fail to identify scenarios requiring tool calls.
- Phenomenon: In version 4.8.14, when chatting with the research report knowledge base, the <Reference> field in the system prompt is not correctly populated with research report content. Cause: Automatic recall binding for research report content is not enabled in the knowledge base configuration, or the parsing rules for the Reference tag are not set correctly.
- Phenomenon: When using the Doc2x plugin to process uploaded research report documents, the extracted content has formatting errors or missing core fields. Cause: A dedicated parsing template for securities research reports is not specified in the plugin configuration, and adaptation to the chapter structure of research reports is not performed.

## How to Confirm Proper Configuration
- Submit a query containing clear research report keywords, check whether the research report retrieval plugin is triggered, and whether natural language responses are generated directly.
- View the parsed field list from the plugin, confirm that professional fields such as target price and investment rating have been correctly extracted and have unified units.
- View the scheduled task log, confirm that the research report source has completed incremental pulls at the set interval without timeout errors.
- Adjust the query keywords to verify that the number of recalled research reports matches the set recall_count value.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
