---
title: Sharing and Embedding for Wind Power Generation Yield
slug: /en/industry/finance-d007-c153-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Wind Power Generation Yield
meta_description: Data for wind power generation yield comes from public grid dispatching platforms and wind farm operation and maintenance management systems. Updates
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Wind Power Generation Yield

## What this category of data looks like
Data for wind power generation yield comes from public grid dispatching platforms and wind farm operation and maintenance management systems. Updates are performed every early morning, with a full sync of all data from the previous day. No temporary incremental data pushes are sent. Each data document includes six core fields: unique station code, statistical date, cumulative power generation, grid-connected capacity, operating duration, and per-kilowatt-hour revenue. Cumulative power generation is measured in kilowatt-hours, grid-connected capacity in kilowatts, operating duration in hours, and per-kilowatt-hour revenue in yuan per kilowatt-hour. Data records are uniquely associated by station and statistical date, with no redundant fields. The data volume per station per day is fixed, and there are no dynamic extended fields.

## What constraints these characteristics impose on sharing and embedding
The daily update requirement means the cache duration for share links must match the data update cycle, to avoid displaying stale historical data. The unique station-date association rule means the embedding process must support passing filter conditions via URL parameters to enable targeted data display, preventing cross-station data confusion. The fixed field and unit format means embedded components must match the field order and unit display rules, to avoid reading obstacles caused by content misalignment or unit confusion. The data volume per station per day is small, but API response time must be controlled when querying data for multiple stations in bulk, to avoid loading timeouts on embedded pages.

## Configuration settings
This configuration applies to FastGPT open source edition V4.9.7 and above.

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_ttl` | `86400 seconds` | Matches the daily update schedule of wind power yield daily reports, prevents data lag caused by overly long cache expiration time |
| `share_url_param_whitelist` | Includes `station_code`, `stat_date` | Allows passing station code and statistical date via URL parameters to enable targeted data display |
| `embed_component_unit_format` | Set to `yuan/kilowatt-hour` | Adapts to the data unit format, unifies content readability |
| `workflow_api_timeout` | `300 seconds` | Meets the API response time requirement for batch fetching multi-station yield data |
| `embed_allow_origin` | Fill in the domain list of the associated business | Restricts cross-origin access scope for embedded pages, ensures data call security |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Embedded page API calls return a 403 Forbidden status code. The cause is that the `embed_allow_origin` cross-origin whitelist has not been configured, and cross-origin requests are blocked by security policies.
- The shared page displays yield data that is 24 hours old. The cause is that the `share_cache_ttl` configuration value is greater than 86400 seconds, and the cache is not updated promptly.
- After an anonymous user deletes conversation records on the embedded page, no corresponding operation log appears in the backend. The cause is that the `log_anonymous_user_operation` configuration item has not been enabled, so anonymous user operations are not included in log records.

## How to confirm configuration is complete
- Access the share link, add the URL parameters `station_code=test001` and `stat_date=2024-06-01`, confirm the page only displays yield data for the specified station and date.
- Wait 24 hours then access the same share link, confirm the displayed statistical date updates to the latest date.
- Check the data display module on the embedded page, confirm the per-kilowatt-hour revenue is displayed as `yuan/kilowatt-hour` with no format errors.
- Submit an anonymous user's conversation deletion operation, check if the corresponding record and access information are saved in the backend operation logs.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
