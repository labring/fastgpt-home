---
title: Sharing and Embedding for Power Grid Equipment Yield Rates
slug: /en/industry/finance-d007-c110-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Power Grid Equipment Yield Rates
meta_description: Power grid equipment-related yield and market data comes from public market APIs for the power grid equipment sub-sector. Data updates are completed
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Power Grid Equipment Yield Rates

## What the data for this category looks like
Power grid equipment-related yield and market data comes from public market APIs for the power grid equipment sub-sector. Data updates are completed after the close of each trading day, with no new data on non-trading days. Each data entry includes the following fields: symbol code, full underlying name, previous trading day settlement price, current day average transaction price, current day yield rate, and current day trading volume.
Symbol code is a 6-digit numeric string. The unit for average transaction price is yuan per share. The unit for trading volume is shares. Current day yield rate is a dimensionless value retained to four decimal places. The maximum number of data entries per single page returned by the API is a fixed value. Use pagination parameters to retrieve full data.

## Constraints Imposed by These Characteristics on Sharing and Embedding
The fixed update schedule of the data source requires the refresh cycle of the embedded component to match the trading day update window, to avoid displaying expired or unupdated data. The single-page data entry limit requires the embedded component to be configured with pagination controls, limiting the amount of data loaded at one time to prevent page load timeouts. Fields include dimensionless yield values and trading data with multiple units. Unified format conversion rules must be configured during embedding to ensure displayed values and units conform to industry display conventions. The lack of new data on non-trading days requires the embedded component to be configured with empty state prompts, to avoid displaying blank or incorrect placeholder content. Sharing scenarios filtered by symbol code require embedding parameters to support carrying symbol code as a query condition.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `refresh_interval` | `86400 seconds` | Matches the daily update cycle of the data source, avoids repeated requests for invalid data |
| `page_size` | `50 entries` | Matches the single-page entry limit of the data source, prevents interface limit error responses |
| `format_convert_rule` | `Retain 4 decimal places, display uniformly in the format "X.XXXX"` | Ensures consistent display of dimensionless yield values and trading data with multiple units |
| `empty_state_template` | `No latest yield data available on non-trading days` | Adapts to scenarios with no data on non-trading days, avoids displaying blank content |
| `share_param_whitelist` | `["symbol"]` | Only allows carrying symbol code as a sharing parameter, ensures accuracy of shared content |
| `embed_timeout` | `10000 milliseconds` | Limits the loading duration of the embedded component, prevents page freezes or unresponsiveness |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Share links without login return 403 errors when opened in Trident kernel browsers. The cause is that the Trident kernel does not support the cross-origin request verification mechanism of some modern browsers, leading to interruption of the identity verification process.
- Embedded components display inconsistent yield values and trading data units. The cause is that no unified format conversion rules are configured, and the native unitless or multi-unit format of the data source is used directly for display.
- Scheduled refresh embedded components continue to fail to load on non-trading days. The cause is that no skip refresh logic is set for non-trading days, and repeated requests to data-free interfaces lead to timeouts.

## How to Confirm Correct Configuration
- Open the preview page of the embedded component, load test trading day data, and check whether the displayed value format and units conform to industry standard display logic.
- Generate a sharing link carrying the specified symbol code, open the link and confirm that only the yield and trading data of the corresponding underlying asset are displayed, with no irrelevant content.
- Switch to a non-trading day environment, open the embedded component or sharing link, and confirm that the preset empty state prompt content is displayed.
- Adjust the refresh cycle of the embedded component to match the data source update time window, wait for the corresponding time period, and confirm that the component automatically refreshes and loads the latest data.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
