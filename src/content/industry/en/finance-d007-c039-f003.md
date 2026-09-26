---
title: Sharing and Embedding for Kitchen & Bath Appliance Yield Rates
slug: /en/industry/finance-d007-c039-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Kitchen & Bath Appliance Yield
meta_description: Yield rate-related data for kitchen and bath appliances comes primarily from the national energy efficiency label database, real-time price APIs of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Kitchen & Bath Appliance Yield Rates

## What data for this category looks like
Yield rate-related data for kitchen and bath appliances comes primarily from the national energy efficiency label database, real-time price APIs of mainstream e-commerce platforms, and official brand product parameter libraries. Market trend data updates once every hour, while energy consumption calculation data updates once per calendar day. Data is stored as structured documents, including fields such as product SKU code, product name, rated power, average daily standard usage duration, regional benchmark electricity price, monthly energy consumption cost, monthly industry average energy consumption cost, current day's selling price, 7-day selling price range lower bound, and 7-day selling price range upper bound. Corresponding units for each field are: no unit, no unit, watt, hour, yuan per kilowatt-hour, yuan, yuan, yuan, yuan, yuan.

## What constraints these characteristics impose on sharing and embedding workflows
The data characteristics of kitchen and bath appliances impose multiple constraints on sharing and embedding processes.
Market trend data updates every hour, so embedded components must support high-frequency data pulling to avoid information lag caused by static caching.
Energy consumption calculation data is tightly bound to regional benchmark electricity prices, so systems must support passing regional code parameters to adapt calculation results for different regions.
Data locates specific products via SKU codes, so sharing links must carry this parameter to return accurate content.
Multiple fields use different units, so front-end displays must apply unified conversion rules, and unit formats cannot be hard-coded.
Data includes product selling prices and energy consumption costs, so cross-domain access sources must be restricted to ensure data security.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `embed_refresh_interval` | `3600 seconds` | Matches the hourly update frequency of kitchen and bath appliance market data, avoiding display of outdated selling price and energy consumption calculation results |
| `allowed_share_params` | `sku,region_code` | Kitchen and bath appliance data locates specific products via SKU, and regional codes must be passed to adapt benchmark electricity price parameters |
| `cache_max_age` | `86400 seconds` | Adapts the daily update rhythm of energy consumption calculation data, reducing repeated computation overhead |
| `auth_type` | `token_based` | Configures identity authentication for sharing links to prevent unauthorized access to exclusive data for specific products |
| `embed_response_format` | `json_with_field_labels` | Returns standardized structured fields to facilitate front-end matching of units for display by field |
| `cross_domain_allowlist` | `*.kitchen-appliance-platform.com` | Restricts embedding sources to business domains related to kitchen and bath appliances to ensure data access security |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Issue: Shared links generated via embedding do not have identity authentication configured, allowing any visitor to view yield rate data for all kitchen and bath appliances. Cause: The `auth_type` parameter is not configured, or the custom authentication extension is not deployed when using the open-source version.
- Issue: The embedded chat window on the front end cannot return yield rate data for kitchen and bath appliances. Cause: SKU and regional code parameters are not configured in `allowed_share_params`, or cross-domain access permissions are not enabled, resulting in data requests being blocked.
- Issue: After embedding the FastGPT chat page in a mini-program, the top page title is forcibly modified and cannot be restored via configuration. Cause: The embedding code does not specify a custom title parameter, or the mini-program container blocks custom configuration for the page title by default.

## How to Confirm Configurations Are Set Correctly
- Access the generated sharing link, pass the corresponding SKU and regional code parameters, and check if the returned data fields include expected content such as product name, current day's selling price, and energy consumption calculation results.
- Adjust the `embed_refresh_interval` parameter value, wait for the corresponding duration, then refresh the embedded page to confirm whether data updates are completed as configured.
- Attempt to embed using a domain not included in the `cross_domain_allowlist`, check if an access restriction prompt is triggered, and confirm that the cross-domain configuration takes effect.
- View the browser console logs on the embedded page to confirm that no prompt messages for missing parameters or format errors appear.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
