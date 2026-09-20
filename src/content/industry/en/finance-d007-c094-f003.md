---
title: Sharing and Embedding of Refinery Yield Rates
slug: /en/industry/finance-d007-c094-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Refinery Yield Rates
meta_description: Refinery yield rate data comes from internal enterprise manufacturing execution systems (MES), upstream crude oil purchase ledgers, and downstream
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Refinery Yield Rates

## What this data type looks like

Refinery yield rate data comes from internal enterprise manufacturing execution systems (MES), upstream crude oil purchase ledgers, and downstream refined oil and chemical product listing quotation systems. The update rhythm is daily, with full previous-day data aggregation completed each early morning.

Each data record includes: device code, raw material type, processing batch, average raw material purchase price, each product output volume, unit processing cost, and unit raw material profit amount. Field units are as follows: average raw material purchase price is yuan/ton, processing cost is yuan/ton, output volume is cubic meters/ton of raw material, and unit raw material profit amount is yuan/ton of raw material.

## What constraints these characteristics impose on sharing and embedding

Daily data updates require embedded dashboards to use a fixed refresh interval matching the data update cycle, to avoid displaying expired previous-day data.

Multi-dimensional device and batch fields require embedded components to support passing filter parameters by device code and raw material type. Without this support, accurate yield rate data for target refinery units cannot be displayed.

Unit raw material profit amount is a refinery-specific non-standard business field. Embedded components must support custom field mapping to bind platform generic fields to refinery business fields.

Data sources involve internal enterprise systems. Corresponding cross-origin whitelists must be configured during embedding to ensure front-end pages can normally pull data interfaces.

Each data record has many fields. Embedded components must support custom display fields to avoid information overload on the page.

## How to configure settings

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedRefreshInterval` | `86400 seconds` | Matches the daily update cycle of refinery yield rates, to avoid invalid refreshes or display of expired data |
| `embedAllowedOrigins` | `["https://your-company-domain.com"]` | Configure cross-origin access whitelists to ensure front-end embedded pages can normally pull back-end data interfaces |
| `embedFieldWhitelist` | `["deviceCode", "rawMaterialType", "unitProfit"]` | Filter non-core fields, only display key indicators required for refinery business: device code, raw material type, unit profit, and similar metrics |
| `embedCustomParams` | `{"filterBy": "deviceCode"}` | Support passing filter parameters by device code to accurately display yield rate data for target refinery units |
| `embedLanguage` | `zh-CN` or `en-US` | Adapt language requirements for different usage scenarios to meet multi-language display needs |
| `embedProxyUrl` | `https://your-proxy-domain.com/api` | Resolve cross-origin access restrictions to ensure internally deployed embedded pages can normally pull data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration errors

- Mixed Chinese and English display language on embedded pages, with some business fields not switched to the target language. This occurs when the `embedLanguage` parameter is not configured correctly, or the parameter value is not bound to all rendering modules.
- Voice input function on password-free embedded pages malfunctions: the timing panel always shows 00:00 when long-pressing for input, and there is no response after submitting input content. This occurs when a reasonable timeout threshold for `embedVoiceInputTimeout` is not configured, and cross-origin proxies do not permit transmission requests for voice data.
- Preset refinery device filter parameters in password-free embedded links do not take effect, with the page displaying full data instead of target unit data. This occurs when the filter field passing rules are not correctly configured in `embedCustomParams`, or the field name does not match the parameter name of the back-end interface.

## How to confirm configuration is complete

- Open the embedded preview page, check that the refresh interval matches the data update cycle, confirm no expired data is displayed.
- Pass preset device code parameters, check that the page only displays yield rate data for the corresponding refinery unit, confirm filter parameters take effect.
- Switch language settings, check that all interface elements and business fields match the target language, confirm language configuration takes effect.
- View browser console network request logs, confirm cross-origin requests are not blocked, confirm data interface pulling works normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
