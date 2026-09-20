---
title: Form and Interaction for Coke Yield and Market Data
slug: /en/industry/finance-d007-c096-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Coke Yield and Market Data
meta_description: Coke market and yield-related data comes primarily from public futures market APIs of the Dalian Commodity Exchange and domestic bulk commodity spot
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Coke Yield and Market Data

## What this category's data looks like
Coke market and yield-related data comes primarily from public futures market APIs of the Dalian Commodity Exchange and domestic bulk commodity spot quotation platforms. Full daily data updates are completed within one hour after each trading day closes. Pre-market auction reference data is released before trading begins. Data is returned in structured JSON or CSV format, with fields including product identifier, settlement price, spot benchmark price, daily trading volume, open interest, price change from the previous trading day, and more. Price-related fields use yuan/ton as their unit. Trading and open interest fields use lots as their unit. Price change values use yuan/ton as their unit.

## Constraints on form and interaction from these characteristics
The fixed update schedule of the data source requires form automatic refreshes and request timing to align with the trading day cycle, to avoid returning expired data. All data fields have clear units. Interactive components must perform unit validation on input parameters, and block invalid input without units. Coke futures contracts follow fixed naming rules. Forms can pre-set dropdown options for commonly used main contract codes, to reduce input error rates. Data dimensions are relatively concentrated. Forms must display data grouped into futures and spot categories, to avoid interface information overload and improve operational clarity.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `form_field_unit_check` | Enabled, force unit binding | All coke data fields have clear units. Forced validation prevents invalid input |
| `workflow_cache_ttl` | 86400 seconds | Coke market data updates once daily. Cache validity matches the trading day duration, to avoid returning expired data |
| `dropdown_default_options` | List of coke main contract codes | Coke futures contracts follow fixed naming rules. Pre-setting common contracts reduces input errors |
| `CODE_RUN_TIMEOUT` | 600 seconds | Bulk commodity data API requests take time. Setting a reasonable timeout prevents workflow interruptions |
| `form_auto_refresh_trigger` | Triggered after daily trading day updates | Aligns with the data source update schedule. Triggers refreshes only after daily data updates, to reduce invalid requests |
| `api_request_retry_times` | 2 retries | Bulk commodity APIs may experience occasional fluctuations. Limited retries improve request success rates |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: In workflows on version v4.8.14, code run node inputs containing historical record fields fail validation and cannot execute. Cause: The field validation logic of this version's code run node does not accommodate input content with context identifiers.
- Symptom: Form input fields remain displayed continuously, and submissions cannot be completed. Cause: The form's required field validation switch is not enabled, or correct input format validation rules are not configured. This causes the system to always consider input invalid.
- Symptom: Calls to the bulk commodity data source API return empty data. Cause: Requests are not sent during the data source's update window, or correct identity identifiers are not included in the request headers, leading the API to reject data returns.

## How to confirm configurations are set correctly
- Manually submit form input of a numerical value without units. Check if the system displays a format error prompt, to confirm unit validation configuration is correct.
- View workflow run logs, confirm that the cache node's expiration time aligns with the data source's update cycle, and no expired data is returned.
- Call the bound bulk commodity data source API, verify that request parameters meet API requirements, and that normal coke market data is returned.
- In workflows on version v4.8.14 or later, input content containing historical records to the code run node, confirm the node can execute normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
