---
title: Share and Embed for Multi-Holdings Yield Data
slug: /en/industry/finance-d007-c052-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Share and Embed for Multi-Holdings Yield Data
meta_description: The yield and market data for multi-holdings comes from the trading systems, net value accounting systems, and report platforms of each financial
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Share and Embed for Multi-Holdings Yield Data

## What does the data for this category look like
The yield and market data for multi-holdings comes from the trading systems, net value accounting systems, and report platforms of each financial business unit under the group. Full data synchronization is completed at fixed daily time periods, covering revenue accounting results for all business segments on the current day. The data structure is hierarchical and structured: the top layer includes a group summary identifier and update timestamp. Lower layers are divided by business segment, with each segment containing fields such as product unique identifier, unit yield value, cumulative yield value, and position weight. Field units follow the internal accounting standards of the business unit, and no general percentage annotations are used.

## What constraints do these characteristics impose on the share and embed workflow
Since data is stored layered by business segment, embed workflows must support query parameters filtered by segment to avoid slow loading caused by pulling full data. Since updates are completed at fixed daily time periods, share links must support configuring cache validity periods to match the data update cycle, reducing repeated requests. Since fields use internal business accounting units, embed front ends must support custom unit adaptation rules, and cannot directly use general display templates. Since the data hierarchy is deep, embed components must support configuring expansion levels to only display core data for the target segment. Additionally, since single data set size is large, share interfaces must support pagination query parameters to control the amount of data returned per request, avoiding interface timeouts.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_ttl` | `86400 seconds` | Matches the daily update cycle of the multi-holdings yield daily report, avoids pulling old data due to expired cache |
| `embed_allowed_origin` | List of domain prefixes for all business domains under the group | Restricts embed sources to ensure data is only displayed on authorized business domains |
| `embed_data_filter` | Filter by business segment ID | Adapts to the layered data structure, only returns core data for the target segment to reduce loading volume |
| `embed_max_data_size` | `5120 kilobytes` | Controls the amount of data pulled per request to avoid embed page loading timeouts |
| `embed_display_unit` | Calibrated based on actual testing | Matches the internal accounting units of the business to ensure display format meets business requirements |
| `share_persist_session` | `false` | Multi-holdings data is group-level summary data, no need to retain sessions for different users, reducing data leakage risks |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing.

## Three common configuration mistakes
- Phenomenon: Unrendered raw Markdown text appears on the embed page, impairing display quality. Cause: The Markdown rendering switch for the embed component was not disabled, or an incorrect content display mode was configured.
- Phenomenon: Fields returned by the embed page are empty, or target data is not filtered by business segment. Cause: The `embed_data_filter` parameter is not configured, or the filtering rule does not match the data hierarchy, resulting in pulling full invalid data.
- Phenomenon: The embed page loads with a timeout, or returns a 413 status code. Cause: The `embed_max_data_size` parameter is not set, or the value is too small, causing the amount of data pulled per request to exceed the interface limit.

## How to confirm that the configuration is correct
- Open the embed link, check if the returned data only contains content for the target business segment, confirming that the `embed_data_filter` configuration takes effect.
- Check the loading speed of the embed page, confirm that the amount of data pulled per request meets the business's loading expectations, corresponding to the `embed_max_data_size` configuration.
- Verify that the displayed yield unit matches the internal accounting rules of the business, confirming that the `embed_display_unit` configuration is correct.
- Check the cache update time of the embed page, confirm that it matches the data update cycle, verifying that the `share_cache_ttl` configuration is valid.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
