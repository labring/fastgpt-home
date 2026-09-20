---
title: Sharing and Embedding for Film Theater Revenue Yield Data
slug: /en/industry/finance-d007-c064-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Film Theater Revenue Yield Data
meta_description: Film theater revenue yield data originates from three primary sources: national movie ticketing comprehensive information management system APIs
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Film Theater Revenue Yield Data

## What this category of data looks like
Film theater revenue yield data originates from three primary sources: national movie ticketing comprehensive information management system APIs, internal settlement systems of partner theater chains, and public film industry data APIs. Two update schedules apply: Daily aggregated revenue yield data receives a full update of the previous day’s data between 02:00 and 04:00 daily. Real-time derived per-session revenue yield data refreshes every 15 minutes. Each data entry includes fields such as film identifier, theater affiliation, total daily settled box office revenue, total split costs, allocated operating costs, total net revenue, plus auxiliary fields including number of sessions and average per-session audience count. Monetary fields use yuan as the unit. Audience count fields use person as the unit. Session count fields use session as the unit.

## Constraints on Sharing and Embedding From Data Characteristics
The characteristics of film theater revenue yield data create multiple constraints for the sharing and embedding process. Daily aggregated data is updated only once per day. This means embedded components must display full previous day statistical results by default. If real-time derived data is required, a separate 15-minute refresh logic must be configured. The data includes multi-dimensional associated fields such as theater, film, and session. Embedded components must support filtering parameters for theater ID and film ID. Without this support, accurate matching of target entity revenue yield information is not possible. Monetary field values use yuan as the unit. Embedded displays must configure unit formatting rules to convert large values to ten-thousand yuan units for improved readability. Some data source APIs enforce cross-origin restrictions. Embedded components must configure valid cross-origin request headers. Otherwise, data retrieval will fail.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `shareEmbedRefreshInterval` | `86400 seconds` (daily data) or `900 seconds` (real-time derived data) | Matches the update schedule of film theater data. Daily data does not require frequent refreshes. Real-time derived data refreshed every 15 minutes aligns with industry business requirements |
| `shareEmbedFilterParams` | `["theater ID", "film ID", "session period ID"]` | Matches the multi-dimensional associated fields of film theater revenue yield data, supporting accurate filtering of target entity revenue data |
| `shareEmbedFormatNumber` | `{"monetary amount": "ten-thousand yuan", "audience count": "person", "session count": "session"}` | Adapts to the unit characteristics of film theater data, converting large monetary values to ten-thousand yuan units to improve readability |
| `shareEmbedCorsWhitelist` | `["your-domain.com"]` | Allows embedded pages under specified domains to initiate cross-origin requests, complying with cross-origin verification requirements of data APIs |
| `shareEmbedCustomIcon` | `base64://your-custom-icon-data` | Replaces the default icon of the sharing and embedding component to meet brand customization needs |
| `shareEmbedAuthMode` | `"none"` or `"jwt"` | Select based on business scenarios. Login-free mode is suitable for public sharing. JWT mode is suitable for internal scenarios with permission controls |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Issue: Embedded components load and display the default official icon, and cannot be replaced with a custom brand icon. Cause: The `shareEmbedCustomIcon` parameter is not configured, or the passed icon file format does not meet platform requirements.
- Issue: Embedded components on the overseas SaaS version return errors after initiating data requests, and no revenue yield data is displayed when clicked. Cause: The overseas business domain name is not added to the `shareEmbedCorsWhitelist` configuration, or cross-origin request headers are not set correctly.
- Issue: In the open-source version 4.8.14, the login-free sharing and embedding component does not provide identity authentication related configuration items. Cause: The sharing and embedding module of this version does not integrate identity authentication functions. Upgrade to a later version to obtain related configurations.

## How to Verify Configuration Is Complete
- Open the official preview page of the embedded component, check if the icon matches the custom set style, and confirm that the `shareEmbedCustomIcon` configuration takes effect.
- Initiate a data request on the embedded page, check the network request logs in the browser console, confirm that the return status code is 200, and there are no cross-domain related error prompts.
- Adjust the filtering parameters of the embedded component, check if the displayed revenue yield data matches the business information of the corresponding theater or film, and confirm that the `shareEmbedFilterParams` configuration is correct.
- Wait for the data update cycle to end, refresh the embedded page, check if the displayed data is the latest previous day’s statistical results, and confirm that the `shareEmbedRefreshInterval` configuration aligns with the data update schedule.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
