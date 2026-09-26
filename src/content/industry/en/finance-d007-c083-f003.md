---
title: Sharing and Embedding for Water Utility Yield Rates
slug: /en/industry/finance-d007-c083-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Water Utility Yield Rates
meta_description: Daily water utility yield rate data is sourced from urban water utility operation ledgers, daily operation records of water projects, and public
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Water Utility Yield Rates

## What the data for this category looks like
Daily water utility yield rate data is sourced from urban water utility operation ledgers, daily operation records of water projects, and public disclosure information from public utility regulatory authorities. Full data aggregation for the previous day is completed at midnight every day. The document structure includes these fields: regional code, unique water project identifier, daily operation duration, total revenue, total cost, and yield ratio. The units for each field are administrative region standard code, project number, hour, CNY, CNY, and dimensionless ratio, respectively.

## What constraints these characteristics impose on the sharing and embedding workflow
The data traceability attribute of daily water utility yield rate data requires that sharing and embedding links retain the associated identifier of the data source. Without this identifier, compliance requirements for public utility data disclosure cannot be met. The daily update cycle requires embedded components to use a cache refresh period of no more than 24 hours. This prevents display of expired previous-day operation data. Multi-dimensional structured fields require embedding to support passing filter conditions such as regional code and project ID via query parameters. This enables targeted data display. The dimensionless yield ratio format requires embedded components to adapt to non-percentage numerical display logic. This avoids confusion with yield rate displays from other categories.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `enableShare` | `true` | Enables global sharing and embedding functionality, providing basic capabilities for distributing daily water utility yield rate reports |
| `embed.cacheTtl` | `86400 seconds` | Matches the daily update cycle of water utility data, preventing display of expired previous-day operation data |
| `embed.allowedDomains` | `["*.water.gov.cn", "*.waterenterprise.com"]` | Restricts trusted access domains, and includes a compatible configuration to bypass mandatory domain verification for mini-program embedding |
| `share.queryParams` | `["regionCode", "projectId", "custId"]` | Supports passing filter conditions and global variables via query parameters, enabling targeted data display and variable updates |
| `share.showHistory` | `true` | Retains user operation history records, resolving the issue where login-free window history records are not visible |
| `embed.voiceEnabled` | `false` | Disables voice recognition functionality to avoid `permission denied` errors, adapting to embedding requirements for non-voice scenarios |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Symptom: The login-free sharing window fails to display historical operation records, while corresponding operation data can be queried in backend logs. Cause: The `share.showHistory` configuration item is not enabled, so only historical records are stored in the backend, and the frontend window does not load the corresponding display logic.
- Symptom: The iframe-embedded water utility yield rate page fails to load in a mini-program, and the console returns a domain verification failure error. Cause: The legal access domain for the mini-program is not configured in `embed.allowedDomains`, triggering cross-domain access restrictions.
- Symptom: The bubble component embedded in a third-party webpage prompts `permission denied` and fails to call voice recognition functionality normally. Cause: The `embed.voiceEnabled` configuration is not disabled, and the currently used 4.8.23 version has no permission exemption rules configured, leading to permission verification failure.

## How to verify successful configuration
- Access the generated sharing link, check if the URL carries preset filter parameters such as `regionCode` and `projectId`, to confirm that the parameter passing logic works correctly.
- View backend operation logs, confirm that historical operation records of the login-free window are displayed synchronously, to verify that the `share.showHistory` configuration takes effect.
- Embed the page in a mini-program test environment, verify that the page loads normally, and confirm that the access domain complies with the rules set in `embed.allowedDomains`.
- Trigger voice recognition functionality, check that the `permission denied` error no longer appears, to confirm that the `embed.voiceEnabled` configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
