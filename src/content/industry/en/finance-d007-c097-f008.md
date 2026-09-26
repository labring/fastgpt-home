---
title: Tool Calling and Plugins for Coking Coal Yield Rates
slug: /en/industry/finance-d007-c097-f008
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Coking Coal Yield Rates
meta_description: Coking coal market and yield rate data has two sources: futures data from official public APIs of the Dalian Commodity Exchange, and spot data from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Coking Coal Yield Rates

## What the data for this category looks like
Coking coal market and yield rate data has two sources: futures data from official public APIs of the Dalian Commodity Exchange, and spot data from daily price summaries of major domestic coal ports.
Update schedule: Futures market data is pushed every 10 minutes during trading days. A daily settlement report is generated after each day’s market close. Spot prices are updated once daily.
The data is provided as structured JSON, including fields such as contract code, spot reference price, futures settlement price, daily price change, trading volume, position volume, and region name.
Price fields use yuan/ton as the unit. Trading volume is measured in lots. Position volume is measured in contracts.

## What constraints these characteristics impose on tool calling and plugins
The multi-source and multi-dimensional characteristics of coking coal data impose clear constraints on tool calling and plugin configuration.
Two separate API call paths must be configured: one for futures market data and one for spot daily reports. Real-time pull and batch pull scenarios must be distinguished to avoid data confusion.
The region dimension field requires plugins to support passing region filter parameters. Without this support, full data is returned, which does not match specific production area business requirements.
Futures contract codes follow a fixed format. Parameter validation rules matching the corresponding regular expression must be configured to prevent invalid requests.
High-frequency market data updates require plugin scheduled task intervals to align with the update rhythm, to avoid pulling duplicate or expired data.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `plugin_api_base_url` | Futures API `https://api.dce.com/market/v1`, Spot API `https://coalport.market/v1` | Coking coal futures and spot data come from official and vertical data sources respectively, so separate call paths must be configured |
| `request_interval` | `600 seconds` | Coking coal futures market data updates every 10 minutes. This interval avoids frequent calls triggering rate limits |
| `param_validation_regex` | `^JM\d{4}$` | Coking coal futures contract codes use the standard format `JM+year+month`. This regular expression validates parameter legality |
| `plugin_timeout` | `30 seconds` | Official API response time is usually under 15 seconds. This value reserves a reasonable buffer time |
| `return_field_filter` | `["contract_code","spot_reference_price","futures_settle_price","daily_price_change"]` | Only retain core fields required for yield rate calculation, reducing data transmission and processing overhead |
| `auth_type` | `api_key` | Both data source APIs use API key authentication. This configuration completes valid request verification |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- Symptom: `InternalError.Algo.InvalidParameter` error occurs when starting the project, and the MongoDB connection is normal. Cause: The passed contract code does not match the `^JM\d{4}$` validation rule, triggering parameter validation failure.
- Symptom: Region fields in returned results are empty or contain full production area data. Cause: The `region_code` parameter is not configured, or an invalid region code is passed, causing the API to skip filtering.
- Symptom: Scheduled pull tasks frequently trigger rate limits. Cause: `request_interval` is set to less than 600 seconds, exceeding the official API call frequency limit.

## How to Confirm Correct Configuration
- Enter a correctly formatted coking coal contract code in the plugin debug panel, initiate a single call, and check that the returned result contains the preset core fields.
- View plugin call logs, confirm that the interval between each request is no less than 600 seconds, and no 429 status codes are returned.
- Modify the `region_code` parameter to a specified production area code, and check that the returned result only contains data for the corresponding region.
- Start the scheduled trigger task, wait for one update cycle, and check that the daily report data added to the knowledge base matches the expected format.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
