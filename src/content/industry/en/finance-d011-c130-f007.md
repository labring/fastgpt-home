---
title: Workflow Orchestration for In-App Natural Language Retrieval of Market Data
slug: /en/industry/finance-d011-c130-f007
page_type: Industry scenario page
article_section: In-App Natural Language Search
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for In-App Natural Language Retrieval
meta_description: Market data is sourced from exchange public market APIs and compliant third-party market data aggregation services. Update frequency varies by
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for In-App Natural Language Retrieval of Market Data

## What data in this category looks like
Market data is sourced from exchange public market APIs and compliant third-party market data aggregation services. Update frequency varies by scenario: real-time latest transaction data is pushed during trading hours, and daily aggregated market documents are generated after trading hours. Documents use a structured format with fields including symbol code, symbol name, latest transaction price, price change range, total trading volume, total trading amount, data update timestamp, etc. Price unit is Renminbi yuan, total trading volume unit is shares or contract units, total trading amount unit is Renminbi yuan, and timestamps use standard UTC format.

## What these characteristics impose on workflow orchestration
The real-time update nature of market data requires workflows to set reasonable call frequency thresholds to avoid exceeding rate limits of third-party APIs. Structured field design simplifies data parsing, but fallback logic for missing fields must be configured for abnormal scenarios such as trading suspensions and market closures. Validation of data update timestamps must be embedded in workflows to ensure retrieval results use current valid market data. Differences in update rhythms between intraday and post-trading data require workflows to route to different data source APIs based on call scenarios, avoiding calls to non-real-time historical data. The high-frequency call characteristic also requires workflows to set reasonable timeout periods for nodes to prevent blocking the overall orchestration process.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `tool_call_rate_limit` | `10 times per minute` | Matches rate limits of most compliant market data APIs to avoid blocked calls |
| `workflow_timeout` | `30 seconds` | Adapts to real-time requirements of market data, triggers fallback logic for expired data after timeout |
| `mcp_route_strategy` | `Route by data timeliness` | Routes real-time market data queries to MCP APIs, routes non-real-time statistical queries to knowledge base retrieval nodes |
| `form_field_default_var_ref` | `Enable global variable reference` | Supports dynamic acquisition of preset global parameters such as symbol code and time range for sessions |
| `tool_call_timeout` | `5 seconds` | Matches typical response duration of market data APIs to prevent workflow node blocking |
| `max_returned_fields` | `Top 8 core fields` | Adapts to lightweight display requirements of in-app retrieval, reduces invalid data transmission |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: A form input node is configured with a global variable reference as the default value, and the field displays empty after running. Cause: The global variable reference permission for the form node is not enabled, or the scope of the global variable does not include the current workflow session.
- Phenomenon: A workflow calls both a knowledge base and an MCP API, but real-time market data queries return non-real-time cached data. Cause: No routing rule based on data timeliness is configured, causing all requests to be routed to the same data source.
- Phenomenon: A workflow triggers a rate limit error after calling a market data API, with status code `429`. Cause: No reasonable `tool_call_rate_limit` parameter is set, and the call frequency exceeds the API's rate limit threshold.

## How to confirm proper configuration
- Trigger a real-time market data query, check whether the correct API address and configured frequency limit are shown in the tool call log.
- Configure the global variable default value for a form input node, run the workflow and verify whether the field correctly loads the preset global parameters.
- Simulate a high-frequency call scenario, check whether the workflow triggers the rate limit fallback logic instead of terminating the process directly.
- Switch between intraday and post-trading call scenarios, verify whether the workflow automatically routes to the corresponding data source API.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
