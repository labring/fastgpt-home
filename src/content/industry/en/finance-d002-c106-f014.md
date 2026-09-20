---
title: Form and Interaction for Usage Statistics All-in-One AI Platform
slug: /en/industry/finance-d002-c106-f014
page_type: Industry scenario page
article_section: Unified AI Platform and Multi-App Orchestration
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Usage Statistics All-in-One AI
meta_description: Usage statistics data is sourced from platform call chain logs, resource consumption records, and session association data. Data updates follow a
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Usage Statistics All-in-One AI Platform

## What this category's data looks like
Usage statistics data is sourced from platform call chain logs, resource consumption records, and session association data. Data updates follow a near-real-time schedule: it is aggregated at the minute level and persisted, and supports real-time query by request dimension. Data documents use a structured format, including fields such as application identifier, request timestamp, call type, resource consumption value, and associated session ID. Different indicators use different units: call count uses "times" as its unit, token consumption uses "token" as its unit, and running duration uses "seconds" as its unit.

## What constraints these characteristics impose on form and interaction
Multi-dimensional structured data requires forms to support multi-condition filtering, including dimensions such as application, time range, and call type. This avoids interface freezes caused by loading full data in a single request. The near-real-time update schedule requires interactions to provide a manual refresh button, or support configuring an automatic refresh interval. This ensures users obtain the latest usage statistics data. Differences in units for different indicators require forms to automatically adapt unit display, to avoid confusion between different types of usage statistics results. The associated session ID field requires forms to support quick jumps to the detail interface of the associated session through a single usage record, improving troubleshooting efficiency.

## How to configure settings
| Configuration Item | Recommended Value | Rationale for This Value |
| ---- | ---- | ---- |
| `statistics_refresh_interval` | `30 seconds` | Matches the near-real-time update rhythm of usage data, while reducing pressure on platform interface requests |
| `statistics_default_time_range` | `Last 24 hours` | Aligns with the routine needs of business personnel when viewing usage statistics, reducing initial filtering operations |
| `statistics_max_export_row_count` | `10000 rows` | Balances the completeness of exported data and client loading performance |
| `statistics_unit_auto_switch` | `Enabled` | Adapts unit display for different types of usage data, avoiding confusion between indicators such as call count and token consumption |
| `statistics_export_include_fields` | `Configured per business requirements` | Includes required statistical fields as needed, ensuring exported data meets business troubleshooting needs |

> The parameter values provided on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: In version 4.9.10alpha, when configuring usage statistics-related parameters, the documentation for some optional parameters is not updated synchronously, making it impossible to confirm the filling format. Cause: This version is in the alpha testing phase, and auxiliary documentation for some configuration items has not been completed.
- Phenomenon: Manually refreshing usage statistics returns a 429 status code, with an interface prompt indicating too frequent requests. Cause: The `statistics_refresh_interval` configuration value is lower than the minimum refresh interval threshold allowed by the platform, triggering rate limiting.
- Phenomenon: The exported usage statistics file lacks the associated session ID field, making it impossible to trace specific request sources. Cause: The `session_id` field is not added to the `statistics_export_include_fields` configuration item.

## How to Confirm Configuration Is Complete
- Open the usage statistics page, verify that the default displayed time range matches the preset `statistics_default_time_range` configuration.
- Manually trigger data refresh, confirm that the refreshed results match the expected filtering dimensions.
- Export usage statistics data, check that the fields included in the exported file fully match the list configured in `statistics_export_include_fields`.
- Switch between different usage statistics indicator types, verify that unit display automatically adapts to the corresponding indicator, confirming that the `statistics_unit_auto_switch` configuration has taken effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
