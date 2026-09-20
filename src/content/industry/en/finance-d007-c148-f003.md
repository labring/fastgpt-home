---
title: Sharing and Embedding for Hotel and Catering Revenue Rate Data
slug: /en/industry/finance-d007-c148-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Hotel and Catering Revenue Rate
meta_description: Hotel and catering revenue rate and market data primarily comes from store POS cash registers, PMS hotel management systems, and back-office business
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Hotel and Catering Revenue Rate Data

## What this category of data looks like
Hotel and catering revenue rate and market data primarily comes from store POS cash registers, PMS hotel management systems, and back-office business ledgers. A daily report is generated after business closes each day, with full synchronization completed the following early morning. Each daily report document is grouped by store and business hours, and includes fields such as store code, business date, total revenue, number of in-store guests, table turnover times, and per capita consumption. Monetary fields use RMB as the unit, guest count fields use person-times as the unit, and table turnover uses times as the unit. No additional aggregated statistics fields are included.

## What constraints these characteristics impose on the sharing and embedding process
Structured daily report data for hotel and catering has characteristics of multiple fields, grouping by store, and fixed daily updates. These characteristics create multiple constraints for the sharing and embedding process:
- Support custom display fields to avoid redundant information interfering with reading
- Set cache periods to match the data update rhythm, preventing display of expired business data
- Support passing store ID parameters for targeted display, adapting to multi-store chain scenarios
- Retain the native unit formats for fields such as revenue and guest count, avoiding information confusion
- Configure access permission checks for shared internal business data, limiting unauthorized access

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `share_cache_ttl` | `86400 seconds` | Matches the daily update rhythm of hotel and catering daily reports, avoiding display of expired data |
| `iframe_show_avatar` | `Enabled` | Adapts to display specifications for conversation scenarios, aligning with user usage habits |
| `iframe_show_thinking` | `Disabled` | The hotel and catering revenue rate broadcast scenario does not require displaying the thinking process, simplifying the interface |
| `share_custom_title` | `Store Revenue Rate Daily Report` | Clarifies the scenario positioning, replacing the default generic name |
| `share_permission_type` | `Login Verification` | Internal business data requires restricting unauthorized access to ensure data security |
| `iframe_custom_fields` | `Total Revenue, In-store Guest Count, Per Capita Consumption` | Focuses on core revenue rate related metrics, reducing redundant information display |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The shared link or embedded window displays the default platform name instead of the custom name. Cause: The `share_custom_title` parameter is not configured, and the system default title is used.
- Phenomenon: A `permission denied` error pops up when calling the voice function on the embedded page. Cause: The `share_permission_type` is not configured as open permission, or no audio permission statement is added to the embedded page, causing the browser to block the voice request.
- Phenomenon: The embedded iframe fails to display the application avatar or user avatar, with compatibility issues on some browsers. Cause: The `iframe_show_avatar` configuration is not enabled, or the embedded page does not set correct cross-domain access headers, causing some browsers to block avatar resource loading.

## How to confirm the configuration is complete
- Open the shared link, check that the page title matches the custom set Store Revenue Rate Daily Report, confirming the title configuration takes effect.
- Attempt to call the voice broadcast function on the embedded page, confirm no permission error pops up, and check that the permission configuration and cross-domain settings match the scenario requirements.
- View the conversation area on the embedded page, confirm that avatars display normally, and check that the avatar display configuration is enabled.
- Wait for one data update cycle, then refresh the embedded page, confirm that the displayed business data uses the latest date, and check that the cache configuration matches the data update rhythm.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
