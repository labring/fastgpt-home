---
title: Sharing and Embedding of Energy Metal Yield Rates
slug: /en/industry/finance-d007-c123-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Energy Metal Yield Rates
meta_description: Energy metal market data is sourced from China’s Shanghai Futures Exchange, London Metal Exchange, and professional industry data service providers.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Energy Metal Yield Rates

## What the data for this category looks like
Energy metal market data is sourced from China’s Shanghai Futures Exchange, London Metal Exchange, and professional industry data service providers. Two update frequencies are used: real-time market data refreshes every 5 minutes, and daily yield rate reports are compiled and released before 17:00 on each trading day. Data is presented as structured tables, including fields such as trading market identifier, product name, daily opening price, daily closing price, daily settlement price, daily price change amount, daily trading volume, and daily position volume. Price units are uniformly yuan/ton. Trading volume and position volume are measured in lots, and the unit for daily price change amount is yuan/ton.

## Constraints imposed by these characteristics on the sharing and embedding workflow
The multi-data source, multi-field, and high-frequency update characteristics of the energy metal category create clear constraints for the sharing and embedding process. Multi-data sources require specifying the corresponding data source identifier during embedding to avoid cross-market data confusion. The multi-field structure requires configuring field filtering rules to focus on core business fields and avoid information overload. High-frequency real-time market data requires setting a reasonable refresh interval that matches the data update rhythm. Batch display of daily report data requires controlling the number of items per page to ensure page loading efficiency. Additionally, unit differences across markets require configuring unified unit conversion rules during embedding to improve display consistency.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_refresh_interval` | `300 seconds` | Matches the 5-minute update rhythm of energy metal real-time market data to avoid invalid requests |
| `embed_custom_fields` | `["trading product", "closing price", "daily price change amount", "trading volume"]` | Focuses on core business fields to align with the viewing habits of industry professionals |
| `embed_data_source` | `["SHFE","LME","SMM"]` | Covers domestic and international mainstream energy metal trading data sources to ensure comprehensive data coverage |
| `embed_max_display` | `15 items` | Controls the number of items displayed per page to balance information density and page loading speed |
| `share_auth_type` | `public` | Yield rate reports are intended for public industry scenarios, allowing access without authentication to meet sharing requirements |
| `embed_unit_convert` | `enabled` | Unifies price units across different data sources to yuan/ton and eliminates display discrepancies |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common misconfigurations
- Sharing links return a 403 Forbidden error after opening. The cause is that after version 4.9.0, the default value of `share_auth_type` changed from `public` to `private`. If the configuration is not adjusted manually, unauthorized requests will be blocked, which differs from the default configuration in version 4.6.4.
- Units displayed on embedded pages are inconsistent, with both yuan/ton and USD/ton appearing. The cause is that the `embed_unit_convert` configuration is not enabled, so the price unit formats across different data sources are not unified.
- Embedded pages time out and fail to load properly. The cause is that `embed_max_display` is set to an excessively high value, exceeding the reasonable load for page rendering, leading to loading failure.

## How to verify correct configuration
- Open the configured sharing link and check whether the fields displayed on the page match the content configured in `embed_custom_fields`
- Wait for the configured refresh interval, then refresh the embedded page to confirm that the data content has been updated
- Switch the displayed trading product to confirm that the price units from different data sources are unified to the preset format
- Test accessing the sharing link without authorization to confirm that it loads normally without authentication interception

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
