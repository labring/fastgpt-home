---
title: Sharing and Embedding for General Equipment Yield Data
slug: /en/industry/finance-d007-c146-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for General Equipment Yield Data
meta_description: General equipment yield data comes from device operating condition collection terminals, industrial internet operation and maintenance platforms, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for General Equipment Yield Data

## What Data for This Category Looks Like
General equipment yield data comes from device operating condition collection terminals, industrial internet operation and maintenance platforms, and official data interfaces from equipment manufacturers. It is mostly used in financial scenarios for equipment asset revenue analysis. The data is output as daily updated structured documents. It includes fields such as equipment number, cumulative operating duration, monthly output quantity, unit energy consumption cost, monthly revenue per unit equipment, monthly maintenance cost amount, and total expenditure amount. The units are respectively unit, hour, piece, yuan/kilowatt-hour, yuan/unit, yuan, and yuan. The update frequency is full data summary for the previous day completed every day at midnight. Some devices connected to real-time working conditions support updating temporary yield-related data every 15 minutes.

## What Constraints Do These Characteristics Impose on Sharing and Embedding?
The multi-field, multi-update-frequency, and multi-source aggregation characteristics of general equipment yield data impose clear constraints on the sharing and embedding process. First, multi-dimensional numerical fields must support custom display items. Fixed templates cannot adapt to field priority requirements of different business dashboards. Second, the dual update frequency requirements mean that embedding configuration must support dynamic refresh switches. This prevents expired cached old data from affecting analysis accuracy. Third, the multi-source data aggregation feature requires that embedding authorization covers all associated interfaces. It also supports filtering device data scope by user ID to prevent unauthorized access to sensitive data. Finally, the fixed field order of structured documents requires embedding components to support custom field sorting. This adapts to display logic for different scenarios.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `shareLinkAuthType` | `userBind` | General equipment data must filter device scope based on user permissions to prevent cross-user data leaks |
| `iframeAutoRefreshInterval` | `300 seconds` | Real-time general equipment data must maintain update timeliness within 5 minutes, balancing performance and data freshness |
| `allowedEmbedDomains` | `["internal enterprise operation and maintenance domain", "specified business dashboard domain"]` | Restrict embedding sources to prevent unauthorized sites from stealing data interfaces |
| `maxShareLinkExpireTime` | `86400 seconds` | General equipment daily report data updates daily. A 24-hour expiration ensures shared content syncs with the latest data |
| `customEmbedStyle` | `{"height": "auto", "padding": "12px", "borderRadius": "8px"}` | Adapt to layout requirements of different business dashboards, avoiding content overflow or blank space caused by fixed height |
| `disableShareViewSource` | `true` | Hide the view source function for share links to reduce exposure risk of manufacturer data interfaces |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Issue: The embedded iframe component uses fixed height, causing content overflow or style mismatch with the business dashboard. Cause: The adaptive height parameter in `customEmbedStyle` is not configured, and the default fixed height setting is used.
- Issue: After setting `disableShareViewSource` to `true`, the share link still displays the view source button. Cause: The view source permission in non-login mode is not disabled synchronously on the application release page, or the configuration is not synchronized to cache nodes.
- Issue: A cross-domain error occurs when directly calling the interface from the frontend, or full device data is returned after embedding the application. Cause: The frontend site’s domain name is not configured in `allowedEmbedDomains`, or `shareLinkAuthType` is not set to `userBind` and no user identification parameter is passed during the call.

## How to Confirm Successful Configuration
- Open the share link, check if the view source button is hidden, to verify that the `disableShareViewSource` configuration takes effect.
- Refresh the page in the embedded iframe, check if the data update interval matches the preset configuration, to verify that the `iframeAutoRefreshInterval` configuration takes effect.
- Attempt to embed the application on an unauthorized domain, confirm that the interface returns a cross-domain error or no data permission, to verify that the `allowedEmbedDomains` configuration takes effect.
- Switch between different user identities to access the share link, confirm that only device data accessible to the current user can be viewed, to verify that the `shareLinkAuthType` configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
