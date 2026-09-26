---
title: Tool Calling and Plugins for Securities Yield Data
slug: /en/industry/finance-d007-c133-f008
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Securities Yield Data
meta_description: Securities yield data originates from official exchange market data APIs and compliant third-party market data service providers. Update frequency
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Securities Yield Data

## What the data for this category looks like
Securities yield data originates from official exchange market data APIs and compliant third-party market data service providers. Update frequency adjusts based on trading sessions. Real-time market snapshots are pushed every 3-15 seconds during market open on trading days. Full daily yield data updates are completed within 15 minutes after market close. Phased market data is pushed during the pre-market auction phase. Individual data records include these fields: security code, security abbreviation, trading date, previous closing price, current day’s closing price, price change percentage, daily trading volume, daily trading amount, and others. Price fields use Renminbi Yuan as the unit. Price change percentage uses percentage as the unit. Trading volume uses shares or lots as the unit. Trading amount uses Renminbi Yuan as the unit.

## Constraints on tool calling and plugins
The real-time nature, session-dependent timing, and standardized field requirements of securities yield data create multiple constraints for tool calling and plugin configuration. High-frequency real-time market updates require tool call cache durations to match trading session update intervals. This prevents returning outdated data. Data structures have minor differences across trading sessions. Return fields vary between pre-market auction, real-time intraday, and post-market closing data. Plugins must adapt to return structures across multiple scenarios. Fields such as security codes and price change percentages have fixed naming and unit specifications. Tool call parameter validation must strictly match field names and unit requirements to avoid parsing errors. No real-time market data is available during non-trading hours. Tool calls must add scenario judgment logic to return compliant prompts instead of invalid error messages.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `tool_call_timeout` | `30 seconds` | Typical response time for securities real-time market data APIs is within 10 seconds. Setting 30 seconds covers network fluctuations and avoids long-term workflow blocking |
| `plugin_cache_ttl` | `10-30 seconds` during trading hours, `3600 seconds` outside trading hours | Real-time market data updates occur every 10-15 seconds. Extended cache during trading hours leads to outdated data. No data updates occur outside trading hours, so extending cache reduces API call volume |
| `field_mapping_rule` | Direct mapping by return field name; forcibly convert price change percentage fields to percentage units | Securities yield data’s price change percentage fields default to decimal or percentage formats. Unifying units ensures correct downstream parsing and display |
| `workflow_tool_sequence` | `Execute in sequence according to node configuration order` | Securities yield reports typically require obtaining market data first, then completing formatting and output. Sequential execution ensures correct data dependency relationships |
| `non_trading_hour_fallback` | Return the prompt "Current non-trading hours, no real-time market data available" | No valid market data exists outside trading hours. Returning a compliant prompt prevents workflow exceptions and error triggers |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Issue: After configuring multiple tool nodes in a workflow, some tools fail to trigger or execute in incorrect order. Cause: The `workflow_tool_sequence` parameter is not correctly set to sequential execution mode. Default parallel execution causes data dependency relationships to fail.
- Issue: Parsing failures occur when calling MCP services related to securities market data, while MCP services for other categories operate normally. Cause: The `field_mapping_rule` is not configured to adapt to specific fields and units of securities data, causing the plugin to fail to correctly parse returned market data.
- Issue: Tool calls return timeouts or outdated market data. Cause: `tool_call_timeout` is set too short, or `plugin_cache_ttl` is set too long, without matching the update rhythm of securities market data and API response speeds.

## How to confirm correct configuration
- Manually trigger the workflow, call the tool during trading hours, verify that returned market data fields match preset information such as security code and price change percentage, and check that numerical units conform to specifications.
- Review tool call logs to confirm that `tool_call_timeout` does not trigger timeout errors, and that response times match API expectations.
- Trigger tool calls outside trading hours, verify that the returned fallback prompt content is accurate and compliant.
- Adjust the value range of the `plugin_cache_ttl` parameter, and verify that the cache will expire and the API will be called again to obtain the latest data during trading hours.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
