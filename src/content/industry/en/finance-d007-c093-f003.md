---
title: Sharing and Embedding for Game Revenue Yield Reports
slug: /en/industry/finance-d007-c093-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Game Revenue Yield Reports
meta_description: Daily game revenue yield report data is sourced from internal game operator systems and third-party game data aggregation APIs. Updates run at a fixed
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Game Revenue Yield Reports

## What the data for this category looks like
Daily game revenue yield report data is sourced from internal game operator systems and third-party game data aggregation APIs. Updates run at a fixed early morning time each day, providing full data for the prior calendar day. The data is structured as a standardized dataset. Each record includes fields such as unique game code, daily revenue achievement rate, active user count achievement rate, and paid user proportion achievement rate. Field units are multiples relative to a preset baseline, with no percentage identifiers used. The data volume is moderate, and the number of fields per record is fixed.

## What constraints these characteristics impose on sharing and embedding
Fixed daily full data updates require shared link cache validity to match the update cycle, to avoid returning expired prior-day data. Structured fields include multiple types of achievement rate metrics. The embedding process must support custom field filtering to fit information display needs across different scenarios. Data relies on external API pulls, so cross-domain whitelists must be configured during embedding to prevent browser security policies from blocking requests. The unique game code is used to pull data for a specific game. Shared links must carry this parameter and pass legality checks, to prevent unauthorized access to data for non-authorized games. Additionally, daily report update frequency is fixed. Embedded component refresh mechanisms must support daily triggering or manual triggering, to avoid wasting API resources from frequent requests.

## How to configure settings
| Configuration Item | Recommended Setting | Rationale |
| ---- | ---- | ---- |
| `share_enable_auth` | Enabled | Game operation data often contains non-public information, so access subjects must be restricted |
| `share_expire_seconds` | `86400 seconds` | Matches the daily update cycle of game daily reports to ensure the latest previous-day data is returned |
| `iframe_allowed_domains` | List of valid domains for business deployment | Restricts sources for iframe embedding to prevent unauthorized domains from calling data APIs |
| `api_request_timeout` | `15 seconds` | Adapts to the typical response duration of game data APIs to avoid request failures due to network fluctuations |
| `custom_share_fields` | Select fields related to revenue, active users, and paid conversions | Matches the structured field characteristics of game daily reports, focusing on core display content |
| `share_cache_ttl` | `3600 seconds` | Balances data timeliness and API load, avoiding frequent pulls of full data |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Issue: Shared links return a 403 Forbidden status code when accessed. Cause: The `share_enable_auth` configuration is not enabled, but the API enforces authentication checks, resulting in no permission to access data.
- Issue: A blank page is displayed after embedding via iframe, but accessing the shared link directly works normally. Cause: The `iframe_allowed_domains` whitelist is not configured, and the browser's cross-domain policy blocks the embedding request.
- Issue: The fields displayed on the shared page do not match expectations, with a large amount of non-core data included. Cause: The fields to be displayed are not specified via the `custom_share_fields` configuration, and all fields are loaded by default.

## How to Verify Configuration Completion
- Copy the generated shared link, open it in an unlogged browser, and check whether the specified fields are displayed or authentication is required as configured, confirming that authentication and field configurations take effect.
- Write test iframe embedding code under the valid business deployment domain, embed the shared link, and check whether the page loads normally without errors, confirming that the cross-domain configuration takes effect.
- Modify the value of the `share_expire_seconds` parameter, wait for the corresponding duration, then access the shared link again, and check whether access is unavailable or an expired prompt is returned, confirming that the expiration configuration takes effect.
- Call the data pull API, check that the returned results only include the fields selected in `custom_share_fields`, confirming that the custom field configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
