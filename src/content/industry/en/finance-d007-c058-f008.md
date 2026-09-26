---
title: Tool Calling and Plugins for Minor Metal Yield Rates
slug: /en/industry/finance-d007-c058-f008
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Minor Metal Yield Rates
meta_description: Minor metal market and yield rate data typically comes from public APIs of domestic non-ferrous metal industry professional spot quotation
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Minor Metal Yield Rates

## What the Data for This Category Looks Like
Minor metal market and yield rate data typically comes from public APIs of domestic non-ferrous metal industry professional spot quotation institutions and futures exchanges. Spot quotation data updates once daily. Futures contract data is pushed every 15 minutes. Data is output as structured table documents, including fields such as product code, product name, daily settlement price, daily spot average price, yesterday's settlement price, price change amount, trading unit, and quotation unit. Most quotation units use yuan per kilogram. Some high-volume products use yuan per ton as the pricing unit.

## How These Characteristics Impact Tool Calling and Plugin Workflows
The multi-source nature and differentiated update rhythm of minor metal data require the tool calling link to configure different polling and verification rules based on data source types. Product codes and quotation units vary across different data sources, so additional mapping and conversion logic must be configured to avoid chaotic data display. Single API request response durations fluctuate, so timeout parameters need to be adjusted to fit actual calling scenarios to prevent unintended request interruptions. The need for multi-source data comparison and verification also requires plugins to integrate abnormal data filtering capabilities to ensure the accuracy of yield rate calculations.

## How to Configure the Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `mcpserver.proxy.endpoint` | `http://localhost:8080` (local deployment) or `https://your-mcp-domain.com` | Matches the local or cloud-deployed MCP service address, complies with tool calling network access rules |
| `tool.polling.interval` | `600 seconds` (futures data source), `86400 seconds` (spot data source) | Matches the actual update frequency of minor metal futures and spot data, avoiding excessive requests or data lag |
| `tool.request.timeout` | `10 seconds` | Covers the average response duration of minor metal data APIs, preventing request timeout interruptions |
| `unit.auto.convert` | Enabled | Automatically unifies quotation units across different data sources, avoiding mixed display of yuan per kilogram and yuan per ton |
| `code.mapping.file` | `./metal-code-map.json` | Resolves inconsistencies in product codes across different data sources, maps external codes to unified identifiers |
| `multi.source.validate` | Enabled | Compares price deviations between spot and futures data sources, filters abnormal data |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material forms, data volume, and business rules. Specific issues require case-by-case analysis, and testing on local samples is recommended before finalizing settings.

## Three Common Mistakes
- Phenomenon: Tool calls return a `504 Gateway Timeout` error. Cause: The `tool.request.timeout` parameter was not adjusted based on the response duration of minor metal data sources, and the default timeout duration is insufficient to cover the API response cycle.
- Phenomenon: Returned minor metal price data has inconsistent units, with mixed display of yuan per kilogram and yuan per ton. Cause: The `unit.auto.convert` configuration was not enabled, and the quotation unit rules across different data sources were not unified.
- Phenomenon: The locally deployed MCP Server cannot be called by FastGPT, and logs show connection refused. Cause: `mcpserver.proxy.endpoint` was incorrectly filled as `localhost:port` without a complete HTTP address and protocol prefix.

## How to Confirm the Configuration Is Complete
- Navigate to the FastGPT tool management page, select the corresponding minor metal tool, initiate a test call, and verify if returned data fields include preset product names, prices, units, and other information.
- Review MCP Server running logs to confirm that FastGPT requests have been normally received and valid data returned, with no connection timeout or rejection errors.
- Manually modify one product code in `code.mapping.file`, observe if the identifier returned by the tool call updates synchronously, and confirm the mapping configuration takes effect.
- Compare the price data returned by the tool with real-time quotations from public data sources to confirm that unit conversion and data update frequency meet expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
