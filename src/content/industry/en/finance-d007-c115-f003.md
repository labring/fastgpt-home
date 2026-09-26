---
title: Sharing and Embedding for Crop Farming Yield and Profitability Data
slug: /en/industry/finance-d007-c115-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Crop Farming Yield and
meta_description: Crop farming yield and profitability data is primarily sourced from publicly available monitoring datasets released by the Ministry of Agriculture and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Crop Farming Yield and Profitability Data

## What this type of data looks like
Crop farming yield and profitability data is primarily sourced from publicly available monitoring datasets released by the Ministry of Agriculture and Rural Affairs and agricultural and rural departments of major producing regions, as well as planting income statistical reports published by industry associations. There are two update frequency tiers: Crop-specific data for major producing regions updates weekly, while national comprehensive data updates every two weeks. Documents are organized by crop types including wheat, rice, corn, vegetables, and others. Each category includes fields such as planting cost structure, per-mu input, per-mu output, and per-mu net profit. All monetary fields use the unit yuan per mu, and no relative proportion fields are included.

## What constraints do these characteristics impose on sharing and embedding
The multi-source update nature of crop farming yield and profitability data requires sharing and embedding configurations to support parameters for specifying data update cycles, to avoid mixing data from different cycles. Since all monetary fields use yuan per mu as the unit, unit descriptions must be consistently added during embedded display, otherwise it may lead to misunderstandings about profit levels. There are many crop classification dimensions, so sharing links must support parameters for filtering by crop type, otherwise the default return of full-category data will not match segmented use cases. Different data sources have different update cycles, so the embedded cache duration must match the update rhythm of the corresponding data source, to avoid displaying expired data.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale for This Value |
| --- | --- | --- |
| `share_need_login` | `false` | Crop farming yield and profitability data is publicly monitored data, no user login is required for access, which matches the default configuration starting from version 4.9.0 |
| `share_qrcode_enabled` | `true` (scenarios requiring verification), `false` (purely public scenarios) | Can switch login verification methods based on scenario requirements, replacing simple non-login verification to meet some compliance requirements |
| `iframe_embed_enabled` | `true` | Supports embedded display on external platforms, matching the scenario-based dissemination needs of crop farming data |
| `share_cache_ttl` | `604800 seconds` (major producing region data), `1209600 seconds` (national data) | Matches the update cycle of the corresponding data source, avoiding display of expired data |
| `share_allowed_filters` | `["crop_type", "data_period"]` | Supports filtering by crop type and data update cycle, matching the multi-classification usage needs of crop farming data |
| `share_show_source_info` | `true` | Ensures traceability of publicly available data sources, complying with the regulatory requirements for agricultural data disclosure |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing the configuration.

## Three common configuration errors
- Issue: Sharing links prompt for login, or no non-login sharing option is available. Cause: `share_need_login` was incorrectly set to `true`, or the version is older than 4.9.0; older versions enable identity authentication by default.
- Issue: Embedded iframes fail to load data normally, and the console returns a 403 status code. Cause: The target domain name was not added to the `iframe_allow_list` configuration item, or `iframe_embed_enabled` was set to `false`.
- Issue: Sharing links do not trigger the WeChat QR code login window. Cause: The `share_qrcode_enabled` configuration item was not enabled, or relevant secret key parameters for WeChat QR code login were not configured.

## How to verify successful configuration
- Open the sharing link, check that the login verification method matches the configured `share_need_login` and `share_qrcode_enabled` parameters.
- Copy the sharing link and add preset filter parameters, verify that data can be filtered by crop type and data cycle, matching the configuration of `share_allowed_filters`.
- Embed an iframe into a test domain page, check that data loads normally and the console shows no 403 or higher-level errors, verifying the configuration of `iframe_embed_enabled` and `iframe_allow_list`.
- Wait for the configured cache duration, refresh the embedded page, check that the data has been updated to the latest version, matching the configuration of `share_cache_ttl`.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
