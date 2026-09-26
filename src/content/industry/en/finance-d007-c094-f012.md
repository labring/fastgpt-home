---
title: Model Integration and Configuration for Refinery Yield Rates
slug: /en/industry/finance-d007-c094-f012
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Model Integration and Configuration for Refinery Yield Rates
meta_description: Refinery yield rate data is primarily sourced from internal manufacturing execution system (MES) production logs, bulk commodity spot market API
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Integration and Configuration for Refinery Yield Rates

## What the data for this category looks like
Refinery yield rate data is primarily sourced from internal manufacturing execution system (MES) production logs, bulk commodity spot market API interfaces, and customs import raw material quotation data. The data update cadence is daily T+1, covering full processing information for the previous calendar day. The data uses a structured format, including fields such as device ID, raw material type, raw material input volume, various product output volumes, raw material purchase unit price, product sales average price, processing energy consumption, and total daily processing revenue. Field units include tons, yuan, kilowatt-hours, and others.

## Constraints during model integration and configuration
Multi-source data access requires configuring cross-source data pulling and alignment rules to prevent field mismatches between internal logs and external market data. The daily update cadence requires that scheduled sync task trigger times strictly align with the daily report update cycle, to avoid pulling old or incompletely updated data. The large number of structured fields and inconsistent units require configuring field mapping and unit unification rules to ensure accurate subsequent yield rate calculations. Additionally, multi-field linked calculation logic requires recalling a sufficient number of associated data to prevent calculation failures due to insufficient recalled fields.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `DATA_SOURCE_TYPE` | `structured + external_api` | Refinery yield rate data includes internal structured production log data and external bulk commodity market API data |
| `SCHEDULE_SYNC_INTERVAL` | `86400 seconds` | Refinery yield rate daily reports are updated daily, so latest data must be synced per calendar day |
| `PARSE_STRUCTURED_TIMEOUT` | `300 seconds` | A single batch of refinery production data has many fields, so sufficient parsing time must be reserved |
| `FIELD_MAPPING_RULE` | `Map after unifying units` | Refinery data includes fields with multiple units such as tons, yuan, kilowatt-hours, so units must be unified before field alignment |
| `RECALL_TOP_K` | `Top 12 entries` | Refinery yield rate calculations rely on at least 8 core fields, so a sufficient number of associated data must be recalled |
| `API_REQUEST_TIMEOUT` | `60 seconds` | External market API response times vary, so a reasonable timeout must be set to avoid pull failures |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing.

## Three common configuration mistakes
- Phenomenon: The time output by the local model does not match the actual server time. Cause: No local model time synchronization parameter is configured, causing the model to use its own system time zone and time.
- Phenomenon: Frequent `408 Request Timeout` errors are returned when calling external market APIs. Cause: The `API_REQUEST_TIMEOUT` value is set too short to complete full cross-source data pulling.
- Phenomenon: The refinery yield rate field returned by the model is empty. Cause: No `FIELD_MAPPING_RULE` is configured to align fields between internal logs and external market data, causing core calculation fields to not be correctly recalled.

## How to confirm successful configuration
- Review data sync logs to confirm pull times align with refinery daily report update cycles, adjust scheduled sync configurations until they meet business requirements.
- Perform field mapping verification to check whether units and types of all core fields are unified, adjust mapping rules until no abnormal prompts appear.
- Initiate a test call to confirm that the number and type of fields recalled by the model meet yield rate calculation requirements, adjust the number of recalled entries configuration until requirements are met.
- Verify the local model's time output to confirm it matches the current server time, adjust time synchronization configurations until they match.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
