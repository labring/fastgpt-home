---
title: Tool Calling and Plugins for Traditional Chinese Medicine (TCM) Yield Rates
slug: /en/industry/finance-d007-c006-f008
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Traditional Chinese Medicine
meta_description: Data for daily yield and market trend reports of traditional Chinese medicine (TCM)-related financial products comes from publicly listed quotes from
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Traditional Chinese Medicine (TCM) Yield Rates

## What data for this category looks like
Data for daily yield and market trend reports of traditional Chinese medicine (TCM)-related financial products comes from publicly listed quotes from national professional TCM marketplaces, origin purchase price monitoring platforms, and public statistics released by industry associations. Data updates primarily occur at fixed daily times. Intraday price movement alerts are available for highly circulated varieties. Each data entry includes fields such as generic TCM herb name, specification grade, main producing area, daily wholesale price, terminal retail price, market circulation volume, and data update date. Wholesale and retail prices use the unit yuan per kilogram uniformly. Circulation volume uses the unit ton.

## What constraints these characteristics impose on tool calling and plugins
Tool calling for TCM yield and market trend reports in financial scenarios must adapt to the multi-source nature of TCM data. Configure multi-interface adaptation logic to connect to data sources from different markets. The update cadence of intraday movement data requires plugin polling intervals to align with market trading hours, to avoid data lag when generating daily reports. Fields include detailed dimensions such as specification grade and main producing area. Input parameters for tool calls must cover these filtering conditions. Otherwise, returned data cannot accurately match the TCM herb categories corresponding to financial products. The unified yuan per kilogram unit requires plugins to include built-in unit conversion logic, to avoid confusion with pricing units of other product categories and ensure accurate yield calculations in financial scenarios. Additionally, multi-field verification increases the probability of parameter errors. Pre-configure input parameter validity verification rules to ensure the accuracy of daily report data.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `tool_api_timeout` | `300 seconds` | TCM-related data source interface responses typically take 1-2 minutes; 300 seconds covers peak latency scenarios |
| `tool_request_retry_times` | `2-3 times` | Multi-source TCM data interfaces may experience temporary fluctuations; a small number of retries improves call success rates |
| `plugin_data_filter_rule` | Filter by specification grade and main producing area | TCM data has multiple specifications and producing area differences; precise matching is required for TCM herb categories corresponding to financial products |
| `api_key_scope` | Only authorize TCM herb data interfaces | Restrict key access scope to reduce the risk of unnecessary data leaks |
| `tool_call_max_results` | `Top 10 entries` | Single TCM data entry contains multiple fields; excessive returned results will exceed the large model context window and reduce daily report generation efficiency |
| `unit_conversion_switch` | Enabled | Unify the yuan per kilogram pricing unit to avoid confusion with pricing units of other product categories and ensure accurate yield calculation |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Tool calls return `400 InternalError.Algo.InvalidParameter` error. Cause: Required filtering parameters such as specification grade and main producing area are not correctly passed, which does not comply with the verification rules of the TCM data interface.
- Tool call results have missing fields or inconsistent units. Cause: The `unit_conversion_switch` configuration item is not enabled, and the yuan per kilogram pricing unit is not unified.
- The large model does not trigger tool calling actions. Cause: Tool calling trigger logic is not configured in the workflow, or function calling permission is not enabled for the corresponding model.

## How to confirm correct configuration
- Call the test interface, pass test parameters including specification grade and main producing area, and check whether the returned results include corresponding fields and the unit is uniformly yuan per kilogram.
- View workflow logs to confirm that tool call retry times and timeout time configurations match the preset values, with no abnormal errors.
- Trigger a simulated query to confirm that the large model automatically calls the configured tool plugin when it needs to obtain TCM yield data.
- Check API key permission settings to confirm that only TCM herb data-related interfaces are authorized, with no additional access permissions.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
