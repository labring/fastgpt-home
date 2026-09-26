---
title: Tool Calling and Plugins for Coke Financial Report Analysis
slug: /en/industry/finance-d014-c096-f008
page_type: Industry scenario page
article_section: Financial Statement Analysis and Reporting
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Coke Financial Report Analysis
meta_description: Coke-related financial report data mainly comes from monthly industry reports released by the China Coking Industry Association, daily settlement data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Coke Financial Report Analysis

## What the data for this category looks like
Coke-related financial report data mainly comes from monthly industry reports released by the China Coking Industry Association, daily settlement data of coke futures from the Shanghai Futures Exchange, quarterly and annual periodic reports of domestic listed coke companies, and spot market quotes from major production areas across the country.
Update schedule: Spot quotes are updated daily. Industry association reports are released 1 to 2 calendar days later. Listed company financial reports are updated on a quarterly and annual cycle.
Document structure: Each data document includes fields such as core transaction prices, capacity utilization rate, raw material cost proportion, import and export volume, and inventory level. Price fields use yuan/ton as the unit. Capacity and inventory fields use ten thousand tons as the unit. Percentage fields have no additional unit suffix.

## Constraints on tool calling and plugins
The multi-source nature and differentiated update rhythm of coke data require tool calling plugins to support connecting multiple data sources simultaneously and pulling the latest data by priority.
The daily update feature of spot data requires that tool request timeout periods not be too long, to avoid overall process blocking caused by interface response delays.
There are differences in field naming across different data sources. For example, "coke average price" in industry reports corresponds to "settlement price" in futures markets. Plugins need to establish unified field mapping rules to prevent large models from mixing up data sources.
In addition, the quarterly nature of financial report data requires that clear time range parameters must be specified when calling tools. Otherwise, redundant cross-cycle data will be returned, increasing the processing cost of large models.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
|---|---|---|
| `mcp_input_param_template` | `{"query_date": "YYYY-MM-DD", "data_category": "spot/industry/financial"}` | Coke data requires clear query time and type to avoid returning irrelevant cycle or category data |
| `tool_request_timeout` | `30 seconds` | Coke spot data is updated frequently. An overly long timeout will lead to request backlog and affect overall process efficiency |
| `field_mapping_rule` | `{"avg_price": "焦炭现货均价(元/吨)", "utilization_rate": "炼焦产能开工率(%)", "export_volume": "焦炭出口量(万吨)"}` | There are differences in field naming across different data sources. Unified mapping ensures that large models obtain structured data in standard format |
| `workflow_tool_split_threshold` | `0.7` | Threshold for distinguishing knowledge base recall and tool calling triggers, to avoid repeated calls or missed tool triggering scenarios |
| `max_retries` | `2 times` | Some data sources have temporary interface fluctuations. Retries can reduce the failure rate of single calls |
| `data_source_priority` | `["spot", "industry_report", "financial_report"]` | Sort data sources by user demand priority, prioritize returning more timely spot data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Misconfigurations
- Phenomenon: After configuring `mcp_input_param_template`, input parameter variables are not correctly replaced during invocation, and empty data is returned. Reason: Variables are not wrapped in the `{{var_name}}` format in the template, so the plugin cannot recognize the input parameter placeholders.
- Phenomenon: The large model does not trigger tool calling, and only returns general industry analysis content. Reason: Keywords related to coke financial report analysis (such as "coke spot price", "coking capacity") are not added to the tool trigger word library, or `workflow_tool_split_threshold` is set too high, causing the large model to give priority to using knowledge base content and not calling tools.
- Phenomenon: The units of results returned by tool calling are inconsistent. Some data is displayed as "yuan" instead of "yuan/ton" as the unit. Reason: Unit mapping in `field_mapping_rule` is not configured, and the plugin directly uses the original field units of the data source, causing the large model to be unable to process data uniformly.

## How to Verify Proper Configuration
- Enter the FastGPT tool management page, view the configured MCP plugin, confirm that the variable format of `mcp_input_param_template` conforms to the `{{var_name}}` specification, and there are no syntax errors.
- Initiate a test query, specify a clear query date and data type, and check that the field names and units of the returned results are completely consistent with the configured `field_mapping_rule`.
- Adjust `workflow_tool_split_threshold` to 0.6 and 0.8, initiate test queries respectively, confirm that the probability of tool calling triggering meets expectations, with no over-triggering or under-triggering.
- View the tool calling logs, confirm that after the `tool_request_timeout` is set, the proportion of timeout errors meets expectations, and the retry mechanism triggers normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
