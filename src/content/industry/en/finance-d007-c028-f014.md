---
title: Form and Interaction for Thermal Coal Yield Rates
slug: /en/industry/finance-d007-c028-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Thermal Coal Yield Rates
meta_description: Thermal coal market data covers two categories: port spot and futures. Spot data is sourced from daily quotes of major domestic coal ports, plus
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Thermal Coal Yield Rates

## What the Data for This Category Looks Like
Thermal coal market data covers two categories: port spot and futures. Spot data is sourced from daily quotes of major domestic coal ports, plus industry statistical data from the national coal transportation and marketing association. Futures data is sourced from listed thermal coal contracts on a domestic futures exchange.

Update cadence: Futures contract market data refreshes in real time during trading days. Port spot quotes update once daily after market close. Weekly supply and demand data is released every Friday.

Individual data entries include fields such as contract/port name, delivery month/production area, quote type, quote amount, daily price change, trading volume, position volume, and statistical date. Quote amount is measured in yuan per ton. Futures trading volume is measured in lots. Spot trading volume is measured in tons. Daily price change uses yuan per ton as the measurement benchmark.

## Constraints Imposed by These Characteristics on Form and Interaction Workflows
Differences in thermal coal data sources and update rhythms require forms to distinguish between data source types and configure different refresh rules.

Futures market data has high real-time requirements, so forms must support high-frequency pulling. Spot data has a daily update attribute, so scheduled synchronization tasks must be configured.

Fields include two different units of measurement for futures and spot. The interaction interface must clearly mark the unit of each field to avoid confusion.

Delivery months are 12 standard months throughout the year. The delivery month selection option in the form must preset fixed values and prohibit open custom input to reduce input errors.

Different data sources have different update times. The interaction interface must display the data update timestamp so that personnel can clearly understand the timeliness of current data.

Trading volume and position volume have large values. Input boxes must support large integer input and add format verification to ensure input content is valid.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `dataSourceType` | `["spot_port", "futures_zce"]` | Thermal coal covers both port spot and domestic futures exchange futures data sources, so both must be configured |
| `refreshInterval` | `300 seconds` (futures), `86400 seconds` (spot) | Futures market data has high real-time requirements; spot data updates once daily, matching their respective update rhythms |
| `fixedOptionList` | `["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]` | Thermal coal futures contract delivery months are 12 standard months throughout the year, so fixed options must be preset |
| `inputValidationRule` | `{"min": 0, "unit": "元/吨"}` (quote field), `{"min": 0, "unit": "手/吨"}` (trading volume field) | Both quote and trading volume are non-negative values, and input legitimacy must be verified by matching the corresponding units |
| `updateTimeDisplay` | `true` | Data update time must be displayed to ensure timeliness transparency |
| `formFieldRequired` | `["quote amount", "statistical date"]` | Core fields cannot be missing, to avoid submitting invalid form content |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- A `quote type error` error is triggered when using knowledge base variable references for thermal coal quote fields during debug preview. Cause: The numerical type configuration of the thermal coal field was not matched, and a yuan/ton numerical variable was incorrectly referenced as a text type.
- The number of returned market data entries after form submission does not match expectations, only a small number of single entries are returned. Cause: The return quantity configuration for futures and spot data sources was not distinguished, and a unified parameter value was incorrectly used.
- Calling the thermal coal data interface fails after configuring a custom data source channel, returning a `403 Forbidden` status code. Cause: The API key for the corresponding data source was not added in the configuration, or the permission scope does not cover the thermal coal market data interface.

## How to Confirm Proper Configuration
- Open the form debug interface, select different data source types, and check whether the drop-down options only include preset delivery months and data source categories.
- Enter test content that does not match the field format, trigger the verification logic, and confirm that the system intercepts invalid input.
- Manually trigger the data synchronization task, and check whether the returned market data includes correct fields and unit markings.
- View the data update time display item, and confirm that its update frequency matches the official release rhythm of the corresponding data source.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
