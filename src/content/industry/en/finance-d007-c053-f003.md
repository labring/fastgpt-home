---
title: Sharing and Embedding for Multi-Financial Yields
slug: /en/industry/finance-d007-c053-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Multi-Financial Yields
meta_description: Data for multi-financial yield and market daily reports comes from standardized public APIs of licensed financial information service providers, and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Multi-Financial Yields

## What the data for this category looks like
Data for multi-financial yield and market daily reports comes from standardized public APIs of licensed financial information service providers, and official disclosure platforms of product managers. Data is collected on the close of each trading day, and updated on the morning of the next trading day. Each daily report uses a structured table format, grouped by product category. Each product entry includes a unique identification code, full product name, basic information fields, and multi-period yield indicator fields.

Field types and units: Product codes use string format, product names use string format, yield indicators are dimensionless values retained to four decimal places, and net asset value indicators use yuan as the unit.

## What constraints these characteristics impose on the "sharing and embedding" workflow
Data sources rely on external compliant APIs, so embedding workflows require valid API call credentials. Call frequency must align with the data update schedule to avoid triggering external API rate limits.

The structured multi-field document structure requires embedding components to support custom field display, to adapt to the table layout and display requirements of different business systems.

The fixed daily update schedule requires the embedding cache expiration time to match the update cycle, to prevent displaying outdated data.

The presence of product unique identification fields requires the embedding workflow to support passing parameters to filter daily report data for specified products, meeting the business needs of precise push.

At the same time, data calls must comply with financial information compliance requirements, and sensitive API authentication information must not be exposed in embedding code.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `apiRequestTimeout` | 30 seconds | Matches the typical response duration of external financial data APIs to avoid interrupting data retrieval due to timeout |
| `corsAllowedOrigins` | List of business system domain names | Restricts the sources of embedding requests to prevent unauthorized cross-domain calls |
| `cacheExpireTime` | 86400 seconds | Aligns with the daily update cycle to ensure cached data matches the official disclosure schedule |
| `customFieldMapping` | Map product codes and yield indicators according to business system fields | Adapts to the field requirements of table components in different business systems |
| `apiAuthKey` | Platform-exclusive key stored in encrypted form | Prevents key exposure in front-end code and ensures compliance of data calls |
| `requestRateLimit` | 100 requests per minute | Matches the call frequency limits of licensed institution APIs to avoid triggering rate limiting rules |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Embedding pages return a 403 Forbidden status code. This occurs because the `corsAllowedOrigins` parameter is not configured, or the incoming business system domain name is not included in the allowed list.
- Embedding components display outdated yield data. This occurs because the `cacheExpireTime` setting does not match the data update cycle, resulting in failed timely cache refresh.
- Embedded pages cannot associate with business system user identities. This occurs because the `passThroughUserInfo` configuration is not enabled, or user identity identification parameters are not correctly passed in the embedding code.

## How to Verify Proper Configuration
- Call the preview interface of the embedding code, check that the returned HTTP status code is 200 to confirm that the cross-domain configuration is effective.
- Temporarily adjust `cacheExpireTime` to a short duration, wait for the set duration, then refresh the embedding page to confirm that data has updated according to the configuration.
- Pass a custom user identity identification parameter in the business system, check that the permission verification logic of the embedding window correctly recognizes the identification.
- Pass a specified product code parameter, confirm that the embedding page only displays the yield daily report data for the corresponding product.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
