---
title: Sharing and Embedding of Computer Equipment Yield Data
slug: /en/industry/finance-d007-c132-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Computer Equipment Yield Data
meta_description: Computer equipment yield data is primarily sourced from device vendor operation and maintenance APIs, third-party computing power rental trading
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Computer Equipment Yield Data

## What This Category of Data Looks Like
Computer equipment yield data is primarily sourced from device vendor operation and maintenance APIs, third-party computing power rental trading platforms, and internal enterprise IT asset management ledgers. Data is updated once daily, with full statistical documents for the previous natural day generated overnight. Each individual data document includes fields such as device unique ID, deployment node, daily runtime, total daily revenue, and per-unit-time income. Runtime is measured in hours, revenue and income are measured in yuan, and no percentage-based statistical items are included. Document formats are primarily standard JSON or CSV, with each record corresponding to the daily yield status of a single device.

## Constraints Imposed on Sharing and Embedding by These Data Characteristics
Since the data is daily report-level content updated once per day, embedding components must support fixed-cycle refreshing to avoid frequent requests to the data source. Some fields involve sensitive information such as device costs, so sharing links must support field filtering to only expose publicly displayable content. The device unique ID field is used for targeted filtering of specific device data, so sharing configurations must support parameterized filtering rules. Additionally, in login-free sharing scenarios, sensitive information such as the deployment location of internal devices must not be leaked, so the range of displayable fields must be strictly restricted.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_expire_days` | `7 days` | Matches the daily update cycle of the report data. A 7-day expiration covers regular business review cycles while reducing the risk of long-term link exposure. |
| `embed_allowed_fields` | `["device_id", "run_hours", "daily_revenue", "unit_income"]` | Filters out sensitive fields such as cost accounting, only exposes publicly displayable device operation and yield data, and complies with sharing security specifications. |
| `embed_refresh_interval` | `86400 seconds` | Aligns with the daily update rhythm of the data source, reduces invalid API requests, and ensures displayed data matches the latest daily report. |
| `share_enable_log` | `true` | Enables access log collection for sharing links, which can track the usage of embedding components and troubleshoot abnormal access behavior. |
| `embed_auth_mode` | `none` | Adapts to login-free sharing scenarios. This mode is supported in version 4.8.14, allowing access to public data without user login. |
| `embed_icon_url` | `Upload custom SVG/PNG according to business scenarios` | Replaces the default sharing icon to match the visual specifications of the business platform and meet custom display requirements. |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: The target fields displayed by the embedding component are empty. Cause: The corresponding field is not configured in `embed_allowed_fields`, so the sharing link automatically filters unauthorized display items.
- Symptom: Unable to view visitor access and data request records via the sharing link. Cause: The `share_enable_log` configuration item is not enabled, or sharing log collection is not enabled in the platform backend.
- Symptom: The default icon of the embedding component cannot be replaced. Cause: The `embed_icon_url` parameter is not configured, or the uploaded icon format does not meet the SVG/PNG requirements.

## How to Verify Successful Configuration
- Copy the generated sharing link and open it in an incognito browser to confirm that only the fields allowed by the configuration are displayed, with no sensitive data.
- Check the sharing log module in the platform backend to confirm that access records for the link have been collected.
- Wait 24 hours and refresh the embedding component to confirm that the displayed data is the latest daily report data.
- Upload the custom icon link to confirm that the icon of the embedding component has been updated to the specified style.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
