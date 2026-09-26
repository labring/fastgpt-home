---
title: Workflow Orchestration for Coke Yield Rate
slug: /en/industry/finance-d007-c096-f007
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Coke Yield Rate
meta_description: Coke market data comes from domestic commodity exchange official market API and industry spot monitoring platform trading data API. Full daily data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Coke Yield Rate

## What the data for this category looks like
Coke market data comes from domestic commodity exchange official market API and industry spot monitoring platform trading data API. Full daily data updates are completed between 16:30 and 17:30 on trading days. No valid data updates occur on non-trading days. The document structure uses a standardized structured field set, including contract code, trading date, settlement price, difference between settlement price and previous trading day's settlement price, position volume, and trading volume. Field units are: none, YYYY-MM-DD format date, yuan/ton, yuan/ton, lots, lots.

## What constraints do these characteristics impose on workflow orchestration
Fixed data source update window requires scheduled trigger time to be after data update completion, to avoid pulling unupdated market data.
Valid data only exists on trading days, so workflow must configure trading day filtering logic to prevent empty data when running on non-trading days.
Fixed field structure requires workflow nodes to strictly match field names, to avoid data loss from field mismatches.
Narrow update window causes API request peaks, so workflow must set reasonable timeout and retry strategies to reduce request failure probability.
Coexistence of multiple contracts requires workflow to configure data filtering rules to focus on main contract yield calculation.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Scheduled Task Trigger Time` | `Trading day 17:40` | Matches domestic commodity exchange daily data update completion time, avoids pulling unupdated market data |
| `API Request Timeout` | `30 seconds` | Covers typical response delay of official interfaces, prevents request failure from network fluctuations |
| `Field Mapping Rules` | `Strictly match contract code, trading date, settlement price` | Corresponds to fixed field structure of data source, avoids data loss from field mismatches |
| `Data Filtering Conditions` | `Only retain main contract codes` | Filters redundant data from non-target contracts, focuses on coke main contract yield calculation |
| `Failure Retry Count` | `2 times` | Addresses temporary fluctuations of data interfaces, reduces risk of workflow interruption from single request failure |
| `Branch Trigger Logic` | `Execute only on trading days` | Matches characteristic that data source updates only on trading days, avoids empty data from running on non-trading days |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: Workflow returns empty yield data. Cause: No trading day filtering logic configured, pulled unupdated data source on non-trading days, resulting in empty fields.
- Phenomenon: Form node in workflow cannot be called by other branches. Cause: Node reuse configuration not enabled. By default, workflow nodes can only be called by the current link and cannot be reused across branches.
- Phenomenon: Workflow call returns empty value, and logs show API response has no valid data. Cause: Using v4.8.10 or later versions, nested knowledge base assistant node did not correctly configure context parameters during API call, resulting in empty results.

## How to Verify Correct Configuration
- Manually trigger the completed workflow, check node execution logs, confirm that fields returned by API request fully match preset mapping rules.
- Check historical execution records of scheduled tasks, confirm workflow runs only at the specified time on trading days.
- Simulate triggering workflow on non-trading days, confirm workflow skips data retrieval step and returns expected prompt information.
- Adjust parameters of data filtering conditions, test whether redundant data from non-target contracts can be correctly filtered.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
