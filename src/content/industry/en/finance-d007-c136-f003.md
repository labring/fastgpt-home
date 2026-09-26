---
title: Sharing and Embedding of Precious Metal Yield Data
slug: /en/industry/finance-d007-c136-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Precious Metal Yield Data
meta_description: Data sources include global authoritative precious metal market services and domestic precious metal exchanges. Update frequency adjusts based on
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Precious Metal Yield Data

## What this category’s data looks like
Data sources include global authoritative precious metal market services and domestic precious metal exchanges. Update frequency adjusts based on trading hours: pushes real-time updates every 15 seconds during trading days, and updates hourly outside trading hours. The data uses a structured format, with fields including product code, pricing unit, latest quote, daily price fluctuation range, and position volume. The platform uses two categories of pricing units: yuan/gram and US dollar/ounce. Some data includes exchange rate conversion reference items. The output for the target pricing method can be called via parameters.

## What constraints these characteristics impose on sharing and embedding
The high-frequency update feature of precious metal data requires embedded components to support custom refresh intervals. Disabling this will cause quotes to disconnect from real-time market data. The multi-pricing-unit design requires sharing configurations to pre-set unit switching options, or allow recipients to specify pricing methods via parameters. This prevents misunderstandings caused by mismatched units. The large number of product varieties requires embedded configurations to support specifying specific product codes. This avoids loading redundant data from full product sets. The low-frequency update rule outside trading hours requires embedded components to add loading status prompts. This distinguishes between data delays and loading failure scenarios, and improves user experience.

## How to configure settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `share_refresh_interval` | `15 seconds` | Matches the market update frequency during precious metal trading hours to ensure data timeliness |
| `share_default_unit` | `yuan/gram` or `US dollar/ounce` | Aligns with the common pricing habits of the target audience; prioritize yuan/gram for domestic scenarios |
| `share_filter_symbol` | `Specify based on actual needs, such as AU9999` | Avoids returning full product data and reduces the loading load of embedded components |
| `share_auth_enabled` | `Enabled (supported in open-source version v4.8 and above)` | Prevents unauthorized access to sensitive financial data and complies with data security regulations |
| `share_loading_timeout` | `10 seconds` | Matches the data update delay outside trading hours to avoid triggering timeout errors prematurely |
| `share_display_fields` | `Latest quote, daily price change, position volume` | Focuses on core fields required for yield daily reports and simplifies displayed content |

> The parameter values provided on this page are all conventional recommendations used as starting points for configuration. Actual values are affected by material forms, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Embedded components return a `403 Forbidden` error after loading. The cause is that sharing identity authentication configuration is not enabled, or valid authentication parameters are not included in the embedded code.
- Embedded components experience loading timeouts. The cause is that a reasonable refresh interval is not set, or full product data is pulled without specifying filtered varieties, which increases the loading load.
- Recipients see pricing units that do not match expectations. The cause is that the default pricing unit is not configured, or parameter configuration for unit switching is not enabled.

## How to confirm configurations are correctly set
- Log in to the sharing configuration module in the FastGPT backend, and check whether set parameters such as `share_refresh_interval` and `share_default_unit` meet preset requirements.
- Copy the generated embedded code and run it in a local test environment. Verify that the displayed pricing units and product data match the configured settings.
- Access the generated sharing link using an unlogged device, and confirm that precious metal yield related data loads and displays normally.
- Simulate the scenario outside trading hours, and check whether the embedded component displays a prompt for data update delay. Confirm that no direct error is thrown.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
