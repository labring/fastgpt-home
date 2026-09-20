---
title: Sharing and Embedding for City Commercial Bank Yield Data
slug: /en/industry/finance-d007-c048-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for City Commercial Bank Yield Data
meta_description: This data is sourced from official public disclosure channels of city commercial banks, including official websites, product announcement sections of
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for City Commercial Bank Yield Data

## What the data for this category looks like
This data is sourced from official public disclosure channels of city commercial banks, including official websites, product announcement sections of official mobile applications, and public filing data required by regulatory authorities for peer institutions. Full data updates for the previous trading day are completed at a fixed time each day. Documents use a structured format, divided into sections such as time deposits, large-denomination certificates of deposit, structured deposits, and self-operated wealth management products based on product type. Each product entry includes unique product identifier, term type, yield benchmark field, data update timestamp, risk level identifier and other relevant content.

## Constraints on sharing and embedding workflows
The data characteristics of this category impose multiple constraints on the sharing and embedding workflow. First, since data comes from official public disclosure channels, the original data’s traceability identifier must be retained after embedding to comply with financial information disclosure regulatory requirements. Second, the fixed daily update schedule requires that the cache period for embedded calls matches the update frequency, to avoid displaying expired yield data. Third, the structured multi-category product structure requires embedded components to support filtering and display by product type, term and other dimensions, to meet the viewing needs of different business scenarios. Fourth, the data includes sensitive identifiers such as risk levels, so field filtering rules must be configured during embedding to avoid displaying product information that has not completed compliance filing.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_ttl` | `86400 seconds` | Matches the daily update schedule of city commercial banks, ensures the cache period aligns with the data update frequency, and prevents expired data from being displayed |
| `share_filter_fields` | `["product_name", "term_type", "yield_base", "update_time", "risk_level"]` | Only displays core fields that have been legally disclosed, complies with financial information disclosure regulatory requirements, and simplifies displayed content |
| `share_allow_origin` | `["*.citycommercialbank.com", "*.financialinfo.site"]` | Restricts embedding only to city commercial bank’s own channels and compliant partner sites, to ensure data security |
| `share_no_login_enabled` | `true` | Meets the requirement for users to quickly view public data in financial scenarios, without requiring additional login procedures |
| `share_custom_icon` | Set according to brand visual guidelines | Matches the city commercial bank’s brand visual identity, improving user recognition |
| `share_error_timeout_code` | `408` | Complies with HTTP standard timeout error definitions, facilitating front-end troubleshooting of data update exceptions |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Issue: The share icon in the no-login window is not modified per brand requirements, and still displays the platform’s default style. Cause: The `share_custom_icon` parameter is not configured correctly, or the uploaded icon file format and size do not meet platform verification rules.
- Issue: When embedded in the overseas SaaS version, users clicking the share link receive no response, and the console returns a `403 Forbidden` error. Cause: Overseas partner site domain names are not added to the `share_allow_origin` cross-origin whitelist, triggering cross-origin access restrictions.
- Issue: The yield data displayed on the embedded page is expired, with more than 24 hours since the last update. Cause: The `share_cache_ttl` parameter is not set correctly, and the cache period exceeds the data update frequency, resulting in expired data being displayed.

## How to verify the configuration is complete
- View the embedded component’s display icon, confirm it matches the city commercial bank’s brand visual guidelines, to verify the custom icon configuration is active.
- Refresh the embedded page after the data update window, confirm the displayed update timestamp matches the official public disclosure time, to verify the cache configuration aligns with the update schedule.
- Attempt to embed the component from a site not added to the cross-origin whitelist, confirm the page triggers a cross-origin access restriction prompt, to verify the cross-origin configuration is active.
- Click the no-login share button, confirm the pop-up window loads yield data normally, to verify the no-login configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
