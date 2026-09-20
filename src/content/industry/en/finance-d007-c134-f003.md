---
title: Sharing and Embedding of Condiment Yield Data
slug: /en/industry/finance-d007-c134-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Condiment Yield Data
meta_description: Data sources for condiment category market data include public market databases for the food and beverage industry, offline retail terminal monitoring
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Condiment Yield Data

## What does this category’s data look like?
Data sources for condiment category market data include public market databases for the food and beverage industry, offline retail terminal monitoring systems, and publicly disclosed operating data from brand owners. Updates occur daily, and are completed within one hour after the day’s retail transaction data is finalized. Each data entry contains: category identifier, product name, packaging specification, same-day terminal transaction average price, channel classification, weekly average price comparison value, and monthly average price comparison value. The unit for transaction average price is yuan/500 grams. Comparison values are dimensionless relative values, and percentage-based descriptions are not used.

## What constraints do these characteristics impose on sharing and embedding?
Condiment products have diverse packaging specifications. Transaction average prices vary significantly across different specifications. Therefore, sharing and embedding workflows must support filter parameters such as specification and channel to ensure accurate data display. The daily update rhythm requires embedded components to use a cache expiration time synchronized with the data source to prevent expired data from being displayed. Multi-dimensional comparison fields require embedding configurations to support custom display fields to avoid displaying redundant full content. Additionally, multi-source data access requires cross-origin access permission configuration. Without this, data loading fails when embedded into third-party pages.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `SHARE_LINK_EXPIRE_HOURS` | `24 hours` | Matches the daily update rhythm of condiment daily reports, ensuring shared content always uses the latest data |
| `embed_allow_domains` | `["your-website.com"]` | Restricts embedding permissions to only allow the owned domain to use the embedding component, preventing unauthorized calls |
| `max_embed_cache_seconds` | `3600 seconds` | Balances data timeliness and interface request pressure, aligned with the data source update frequency |
| `embed_custom_fields` | `["product name", "packaging specification", "same-day transaction average price", "weekly average price comparison value"]` | Focuses on core display dimensions of condiment data, avoiding redundant fields that disrupt reading |
| `api_share_enable` | `Enabled` | Supports embedding into owned business systems via API interfaces, adapting to multiple deployment scenarios |
| `share_filter_params` | `["spec", "channel"]` | Adapts to the filtering needs of condiments with multiple specifications and channels, improving the accuracy of shared content |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common configuration mistakes
- Phenomenon: When calling the API for embedding, some queries fail to return matching condiment data, with empty results or a 404 status code. Cause: The corresponding filter parameters are not configured in `share_filter_params`, causing the API to fail to match the specification or channel conditions requested by the user.
- Phenomenon: The embedded component loads but returns no data for a long time, and the developer console displays a cross-origin access error. Cause: The domain name of the embedded page is not configured in `embed_allow_domains`, triggering the browser's cross-origin access restrictions.
- Phenomenon: The shared link displays yesterday's condiment data when opened. Cause: `max_embed_cache_seconds` is not configured, or the set cache time exceeds the data source update interval, resulting in loading expired cached data.

## How to verify correct configuration
- Access the generated shared link. Confirm the link’s expiration prompt matches the configured `SHARE_LINK_EXPIRE_HOURS` to verify the expiration logic is active.
- Review network requests in the embedded page’s developer console. Confirm cross-origin requests are not blocked to validate the domain name configuration.
- Wait for the data source to complete the day’s data update. Refresh the embedded component, then check if displayed data matches the latest day’s data to confirm the cache configuration aligns with the update rhythm.
- Call the API interface with different spec and channel parameters. Check if returned data matches the filter conditions to validate the filter parameter configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
