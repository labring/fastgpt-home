---
title: Sharing and Embedding of Packaging and Printing Yield Rates
slug: /en/industry/finance-d007-c029-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Packaging and Printing Yield Rates
meta_description: Packaging and printing industry yield rate data draws from three primary sources: public industry association monitoring systems, upstream raw
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Packaging and Printing Yield Rates

## What the data for this category looks like
Packaging and printing industry yield rate data draws from three primary sources: public industry association monitoring systems, upstream raw material supplier quotation databases, and aggregated order ledgers from downstream customers. The system releases full-category summary content for the previous day on a T+1 daily update cycle. Documents group content by segmented categories including corrugated boxes, flexible plastic packaging, metal packaging, and others. Each group includes fields such as product code, raw material cost, ex-factory quotation, unit gross profit, and average daily production capacity utilization rate. Raw material cost uses the unit yuan per kilogram, ex-factory quotation uses yuan per square meter, unit gross profit uses yuan per piece, and no percentage-based statistical indicators are included.

## What constraints these characteristics impose on sharing and embedding
Multi-source aggregated data sources require embedded configurations to use unified data standards. This prevents field discrepancies across different data sources from harming display accuracy. The T+1 update cycle requires embedded components to support scheduled refresh. Without this, components display outdated data that lags behind industry updates. The multi-category grouping and multi-unit field structure requires embedded configurations to support segmented category filtering and custom unit display parameters. Without these, configurations cannot adapt to packaging and printing segmented scenarios. Daily report content needs to support specified date sharing parameters. This ensures shared content matches the viewing scenario. A data source attribution display item must be configured to meet industry data usage compliance requirements.

## How to Set Configurations

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `custom_embed_params` | `category: carton packaging, display unit: CNY per piece` | Adapts to the display requirements of segmented packaging and printing categories and multi-unit fields, filters irrelevant data |
| `refresh_rate` | `86400 seconds` | Matches the T+1 update cycle of packaging and printing yield rate daily reports, supports scheduled refresh logic for v4.8.10 and later versions |
| `allowed_embed_origins` | `["*.packaging-print.com"]` | Limits the scope of embedded domain names to ensure compliance with data usage regulations |
| `display_selected_fields` | `product code, raw material cost, factory quotation, unit gross profit, average daily capacity utilization rate` | Matches the standard field structure of packaging and printing daily reports, simplifies core displayed content |
| `enable_date_filter` | `true` | Supports sharing daily reports for specified dates, adapts to the conventional viewing logic of industry daily reports |
| `show_data_source` | `true` | Forces display of the data source attribution statement, complies with usage specifications for public industry data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: The embedded page returns a 403 Forbidden status code and fails to load content. Cause: The `allowed_embed_origins` parameter is not configured, or the configured domain name does not match the actual embedded site.
- Phenomenon: The data displayed by the embedded component does not match the latest content of the current day's industry daily report. Cause: The `refresh_rate` configuration value is less than 86400 seconds, or scheduled refresh is not enabled, resulting in cached data not being updated in a timely manner.
- Phenomenon: The browser console prompts that set-cookie is blocked, and session status cannot be maintained. Cause: The embedded iframe is not configured with the `sameSite` attribute as `none` and HTTPS is not enabled, or the embedded site and FastGPT deployment domain have excessive cross-domain scope. This issue requires additional cross-domain proxy configuration in v4.8.10 and later versions.

## How to Verify Correct Configuration
- Open the embedded page, check that the displayed fields match the configured `display_selected_fields`, with no extra or missing content.
- Switch to a non-configured embedded domain name, verify that the cross-domain restriction is active, and the embedded content cannot be loaded normally.
- Select a daily report parameter for a specified date, verify that `enable_date_filter` works correctly, and displays packaging and printing data for the corresponding date.
- Wait one full calendar day, check that the embedded component's data has updated to the latest T+1 daily report data.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
