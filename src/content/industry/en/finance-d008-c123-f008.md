---
title: Tool Calling and Plugins for Energy Metals Intelligent Due Diligence Reports
slug: /en/industry/finance-d008-c123-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Energy Metals Intelligent Due
meta_description: Data sources for the energy metals industry include domestic nonferrous metal industry association reports, futures exchange market data, customs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Energy Metals Intelligent Due Diligence Reports

## What data for this category looks like
Data sources for the energy metals industry include domestic nonferrous metal industry association reports, futures exchange market data, customs import and export declarations, and quarterly financial reports of leading mining enterprises. Data update frequencies fall into three categories:
- Futures market data is updated real-time per trading day
- Supply and demand forecast data is updated monthly
- Inventory and import and export data is updated weekly

Each due diligence report document includes sections for spot prices, futures contract quotes, monthly supply and demand balance sheets, import and export volumes, and production capacity data of leading enterprises. Fields and units follow domestic industry standards: prices use yuan/ton or ten thousand yuan/ton, production capacity and inventory use tons or ten thousand tons, and import and export volumes use kilograms or ten thousand tons.

## What constraints these characteristics impose on tool calling and plugins
Energy metals data sources are scattered. Multiple independent MCP plugins must be called to retrieve different dimensions of content. Multiple sets of parameters must be combined in the workflow.
Update frequencies vary widely across different data sources. Differentiated call cycles must be set for different data types. This avoids frequent calls to outdated data. It also prevents missed real-time market quotes.
Individual due diligence report documents are lengthy. Retrieval can produce redundant results. A reranking model must be configured to streamline results.
Additionally, units differ between domestic and international data sources. Unit conversion logic must be added to plugins. This ensures consistent data formats.

## How to set configurations

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `recall_count` | 8–12 entries | Energy metals due diligence data covers multiple dimensions including prices, inventory, supply and demand. Sufficient retrieval results must be recalled to cover core dimensions |
| `similarity_threshold` | 0.75–0.85 | Filter low-relevance general industry data, retain market and supply and demand content directly related to energy metal targets |
| `rerank_return_num` | 3–5 entries | Reduce the length of long retrieval results, avoid overloading the model, and focus on core data |
| `mcp_call_timeout` | 300 seconds | Reserve sufficient request response time when calling data sources across futures exchanges, customs, and industry associations |
| `multi_param_prompt` | "Please supplement {target name}, {statistical cycle}, {data type}, in standard JSON format" | Energy metals due diligence requires multi-dimensional parameters. Structured prompts guide users to supplement required parameters |
| `unit_auto_convert` | Enabled | Unify unit differences between domestic and international data sources, convert international market USD/pound to the domestic standard yuan/ton |

> The parameter values provided on this page are general recommendations used as a starting point for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: A missing parameter error pops up when calling MCP in the workflow, or the returned due diligence data lacks core dimensions such as supply and demand and prices. Cause: The multi-parameter guiding prompt is not configured, and users are not guided to supplement the multiple required parameters required for MCP calls.
- Phenomenon: A 504 timeout status code appears after calling MCP, and the workflow execution is interrupted. Cause: The `mcp_call_timeout` configuration is not adjusted. The default timeout period is insufficient to complete requests across multiple industry data sources.
- Phenomenon: After the knowledge base retrieves a long document, the results are redundant and not sorted by relevance. Cause: The `rerank_return_num` parameter is not configured, or the parameter setting is unreasonable, causing the reranking model to not be triggered.

## How to confirm the configuration is complete
- Perform a single MCP call test, enter the specified energy metal target and statistical cycle, and verify that the returned results include the preset required parameters.
- Upload an energy metals monthly supply and demand balance sheet to the knowledge base, and check whether the reranking logic is triggered and streamlined core data is returned after retrieval.
- View the detailed logs of plugin calls, and confirm that the units of different data sources have been uniformly converted to the preset standard units.
- After configuring the multi-parameter guiding prompt, trigger an MCP call in the workflow, and check whether the system actively guides the supplement of missing required parameters.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
