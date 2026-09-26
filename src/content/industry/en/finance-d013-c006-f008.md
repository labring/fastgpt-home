---
title: Tool Calling and Plugins for Traditional Chinese Medicine (TCM) Financing Daily Reports
slug: /en/industry/finance-d013-c006-f008
page_type: Industry scenario page
article_section: Financing Daily Report
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Traditional Chinese Medicine
meta_description: TCM financing daily report data is primarily sourced from public corporate financing announcements, information disclosed by local equity trading
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Traditional Chinese Medicine (TCM) Financing Daily Reports

## What data for this category looks like
TCM financing daily report data is primarily sourced from public corporate financing announcements, information disclosed by local equity trading centers, and financing summaries from industry news platforms.
The update frequency is daily, covering financing project updates in the TCM sector for the current day and the past three business days.
Each daily report document contains multiple financing entries.
Each entry includes six fixed core fields: enterprise name, TCM segment classification, financing amount, financing round, investor entity, and disclosure date.
The financing amount uses a uniform unit of ten thousand RMB.
The financing round field uses standardized classifications such as angel round, Pre-A, round A, and similar categories.
The enterprise segment field labels specific TCM categories such as decoction pieces, proprietary Chinese medicines, TCM innovative drugs, and similar categories.

## Constraints imposed on tool calling and plugins by these characteristics
The daily update rhythm of TCM financing daily reports requires that the scheduled trigger configuration for tool calling be set to pull data at a fixed daily time.
The cache expiration time must match the 24-hour update cycle to avoid returning expired data.
The financing amount core field uses a ten thousand RMB unit. Tool calling parameters must add unit verification rules to prevent unit conversion errors.
The TCM segment classification field has inconsistent naming conventions. Field mapping configuration for tool calling must support custom matching to ensure accurate filtering of specified categories such as decoction pieces and proprietary Chinese medicines.
The financing round enumeration classification is fixed. Enumeration value ranges can be configured through tool parameters to reduce invalid data returns.
Each document contains multiple financing entries. Tool calling result pagination parameters must adapt to the number of entries to avoid excessive data returned in a single request.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `tool_call_timeout` | `300 seconds` | TCM financing daily report data pulling involves aggregating multi-platform interfaces; 300 seconds covers most interface response durations |
| `tool_filter_fields` | `Company Name, Traditional Chinese Medicine Track, Financing Amount, Financing Round, Disclosure Date` | Only retain core business fields to reduce redundant data returned by the tool |
| `tool_cache_expire` | `86400 seconds` | Daily report data is updated once per day; cache expiration time matches the update cycle to ensure data timeliness |
| `tool_enum_values` | `angel round, Pre-A round, round A, round B, round C, Pre-IPO` | Common financing round classifications for TCM financing; limits the tool's query scope |
| `tool_pagination_size` | `Top 20 entries` | Financing entries in a single daily report typically do not exceed 20; avoids returning excessive data to affect processing efficiency |
| `plugin_request_method` | `GET` | Most financing data interfaces are public read-only interfaces; GET requests comply with interface specifications |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: A `400 Bad Request` status code is returned when calling the TCM financing daily report plugin. Logs indicate that required fields are missing. Cause: The TCM sector filtering field is not configured in the `tool_filter_fields` parameter, causing the interface to fail to recognize requests for financing data of specified categories.
- Phenomenon: When a parent workflow calls a child workflow to process financing daily reports, nodes after the "User Selection" node of the child workflow have no execution logs. Cause: The "User Selection" node of the child workflow is set to manual trigger mode, and the parent workflow does not pass trigger parameters during the call, causing the node to block and fail to continue execution.
- Phenomenon: When configuring the DeepSeek model for tool calling, the interface prompts that no thinking content is generated. Cause: The `tool_think_output` switch is not enabled, or model tool calling adaptation configuration is not completed in FastGPT V4.8.20.

## How to confirm the configuration is complete
- Manually trigger tool calling, check if the returned data fields include preset core fields such as `企业名称` and `中药赛道` to confirm the filtering configuration takes effect.
- Check tool calling logs to confirm that the interface response duration does not exceed the `300 seconds` timeout setting, and there are no timeout error records.
- Trigger the scheduled task, check if the data pulled the next day is the latest financing daily report for the current day, to confirm the cache expiration configuration takes effect.
- Test filtering parameters for different financing rounds, confirm that returned data only includes the configured enumeration round range, with no invalid round entries.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
