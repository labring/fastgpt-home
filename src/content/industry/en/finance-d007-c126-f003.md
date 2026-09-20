---
title: Share and Embed for Aviation Airport Yield Rates
slug: /en/industry/finance-d007-c126-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Share and Embed for Aviation Airport Yield Rates
meta_description: Daily report data related to aviation airport yield rates is one of the core data sources for civil aviation industry chain analysis in the financial
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Share and Embed for Aviation Airport Yield Rates

## What this type of data looks like
Daily report data related to aviation airport yield rates is one of the core data sources for civil aviation industry chain analysis in the financial and wealth management field. Data sources include public civil aviation industry statistical reports, official airport operation ledgers, and compliant third-party civil aviation data interfaces. Full synchronization of the previous day’s dataset completes each day at midnight. The data uses a structured format. Each record corresponds to the daily operation and yield status of a single airport. It includes unique airport identifiers, core operation metrics, and quantitative yield metrics. Metric fields cover two categories: operation scale and yield efficiency. Units combine operation volume units and monetary yield units. No fixed, uniform single unit format exists.

## What constraints do these characteristics impose on share and embed workflows
The daily update nature of aviation airport daily report data requires embed components to include a scheduled refresh mechanism. Without this, expired previous day’s data will display, which harms analysis accuracy.
The structured feature of multiple fields with mixed units requires embed configurations to support custom field filtering and unit adaptation. Without this, redundant fields or mismatched units may appear in displays.
The record structure split by individual airports requires share and embed configurations to support filtering by airport code. Without this, precise display of yield rate information for a specified airport is not possible.
The public data source attribute requires share configurations to not force user login. It also requires limiting call frequency to prevent interface abuse.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_expire_days` | `7 days` | Aviation airport daily report data updates daily. A 7-day validity period covers weekly analysis cycles and prevents expired data from affecting displays |
| `embed_auto_refresh_interval` | `24 hours` | The data source updates once daily. A 24-hour refresh interval ensures embedded content always displays the latest daily report data |
| `embed_allowed_fields` | `airport code, daily takeoffs and landings, revenue yield rate per flight, revenue per passenger` | Focuses on core operation and yield metrics of aviation airport daily reports. Filtering non-essential fields simplifies embedded display content |
| `share_require_login` | `false` | Most aviation airport operation data is public industry information. Sharing does not require login, which aligns with the public attribute of industry data |
| `embed_cors_allowed_origins` | `specified business domain list` | Restricts embed sources to prevent unauthorized domains from accessing shared content, and ensures data call security |
| `embed_max_requests_per_minute` | `60 requests per minute` | Daily report data updates infrequently. 60 requests per minute meets call requirements for most integration scenarios, and avoids exceeding interface rate limits |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by data format, data volume, and business rules. Each scenario requires individual analysis. It is recommended to test on the target organization’s own samples before finalizing configurations.

## Three common configuration mistakes
- Phenomenon: After using a login-free share link, deleting the conversation content clears background logs synchronously. Cause: The `share_persist_logs` parameter is not enabled. In open source version V4.9.7 and earlier, this parameter defaults to disabled. Login-free share session logs are tied to temporary users. Deleting a session clears associated logs synchronously.
- Phenomenon: When embedding into a custom system, data can only be retrieved via API calls. The platform’s built-in frontend embed component cannot be used directly. Cause: The `embed_enable_frontend_component` configuration item is not enabled. By default, only API call permissions are enabled, and the built-in embed frontend module is not loaded.
- Phenomenon: The conversation icon displayed on the embedded page does not match the aviation airport scenario, and cannot be replaced through customization. Cause: A custom icon that meets format requirements has not been uploaded in the share configuration, or the `embed_icon_url` parameter has not been correctly configured to point to the custom icon resource.

## How to confirm configurations are set correctly
- Open the configured share link. Verify that the link is accessible normally within the configured validity period, and cannot load content after the expiration date.
- Deploy the embed component to a test page of a custom system. Confirm that displayed metrics only include pre-configured core fields, with no redundant or missing items.
- Call the share interface to retrieve historical conversation records. Confirm that historical data for the corresponding session can be retrieved normally to meet business review needs.
- Check network requests in the browser console. Confirm that the target business domain name can initiate cross-domain requests normally, with no 403 status code returned.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
