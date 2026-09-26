---
title: Sharing and Embedding for Rural Commercial Bank Yield Data
slug: /en/industry/finance-d007-c025-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Rural Commercial Bank Yield Data
meta_description: Rural commercial bank yield and market data is sourced from daily closing settlement reports of core business systems.
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Rural Commercial Bank Yield Data

## What the data for this category looks like
Rural commercial bank yield and market data is sourced from daily closing settlement reports of core business systems.
Data is updated once daily, with full daily data aggregated and released in the early morning.
Documents use product category as the first-level classification node. Fields under each node include product identifier, business type, accounting cycle, income accounting parameters, and service coverage.
Accounting cycle uses natural days as the unit. Income accounting parameters use relative benchmark values as the unit, and no percentage-based descriptions are used.
Data only covers self-operated deposit and loan businesses and agency-sold wealth management products for the bank and its in-scope branches. It does not include cross-institution linked data.

## Constraints imposed by these characteristics on the sharing and embedding workflow
Internal business data for rural commercial banks has high sensitivity. The sharing and embedding workflow must strictly control access permissions to prevent unauthorized external access.
The daily update cadence requires the embed component's cache cycle to match the data update frequency. This prevents expired data from being displayed.
The document structure classified by product and branch requires embed configuration to support content filtering by specific dimensions. This avoids displaying irrelevant business data.
Fields covering different service scopes require sharing links to bind access permissions. This restricts specific branches or customer groups from viewing corresponding content.
Most internal systems are deployed on internal networks. The embedding workflow must support cross-domain session keepalive to prevent login state interruptions.

## How to set the configuration
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `shareAuthType` | `auth token` | Internal data for rural commercial banks requires strict permission control. Auth tokens can be bound to specific users or roles, meeting data sensitivity requirements |
| `embedCacheTTL` | `86400 seconds` | Rural commercial bank yield data updates once daily. 86400 seconds equals 24 hours, matching the update cadence and preventing data lag |
| `embedFilterParams` | `["productId", "branchId"]` | Rural commercial bank data is classified by product and branch. Supporting these two parameters allows precise filtering of corresponding content, aligning with document structure characteristics |
| `iframeSessionKeepalive` | `enabled` | Most internal systems for rural commercial banks are deployed on internal networks. Enabling keepalive prevents session interruptions after embedding and resolves login exit issues |
| `shareAvatarConfig` | `custom avatar` | Allows modification of AI and user avatars to match the visual style of internal systems, meeting business display requirements |
| `shareLinkExpireTime` | `7 days` | Internal report sharing cycles typically last one week. Links automatically expire after this period, aligning with internal usage habits |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common errors
- Symptom: An error reading "iframe actively interrupted main application code running in sub-application" appears in the console after embedding. Cause: The `iframeSessionKeepalive` parameter is not configured, and cross-domain session interruption occurs because session keepalive is not enabled.
- Symptom: The avatar for sharing links is not modified as expected. Cause: The custom avatar parameter is not configured in `shareAvatarConfig`, and the system default value is used instead.
- Symptom: The identity authentication option is not found when configuring sharing in version v4.9.11. Cause: The authentication configuration entry is located in the advanced configuration menu of sharing settings. The corresponding configuration item cannot be found because advanced options are not expanded.

## How to confirm the configuration is complete
- Open the embedded page, check if an identity authentication pop-up appears, to confirm the authentication configuration is active.
- Wait 24 hours then refresh the embedded page, to confirm the data has been updated to the latest daily business data.
- Pass different `productId` parameters, to confirm the page only displays yield information for the corresponding product.
- Test whether sharing links are inaccessible after the expiration time, to confirm the expiration configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
