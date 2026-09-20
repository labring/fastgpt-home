---
title: Sharing and Embedding for Professional Services Yield Data
slug: /en/industry/finance-d007-c002-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Professional Services Yield Data
meta_description: Data is sourced from compliant market data APIs provided by licensed financial data service institutions, with full updates completed at fixed times
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Professional Services Yield Data
## What this category of data looks like
Data is sourced from compliant market data APIs provided by licensed financial data service institutions, with full updates completed at fixed times each trading day. The data structure consists of structured multi-field entries, including categories such as product identifiers, full product names, daily return performance, benchmark comparisons, and basic operational information. Return-related fields use percentage units, and scale-related fields use ten thousand yuan units. The number of covered entries per daily report adjusts based on the product scope covered by the service. Data content must comply with financial information disclosure regulations, and does not include unauthorized sensitive transaction data. Only publicly available market and return information that has passed compliance audits is displayed externally.

## What constraints these characteristics impose on the "sharing and embedding" workflow
Structured multi-field daily report data requires that embedded components retain all core fields required for compliance disclosure, and core information must not be arbitrarily deleted or hidden. The fixed-time full update rhythm requires that embedded pages be configured with a reasonable cache expiration time to avoid displaying expired data. Compliant data source calls must carry valid identity verification identifiers to prevent unauthorized bulk crawling. The feature that a single daily report covers a large number of entries requires embedded components to support adaptive layout to adapt to display pages of different widths. Additionally, the unit differences between return-related and scale-related fields must be standardized in the embedded configuration to avoid unit confusion issues.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `iframe_allow_list` | Enter a list of compliant domain names belonging to the business, such as `https://finance.pro.service.com` | Restrict embedding sources to prevent unauthorized sites from misusing compliant data |
| `cache_ttl` | `86400 seconds` | Match the daily full update rhythm to avoid displaying expired data |
| `display_full_fields` | `false` (do not hide non-required compliance fields) | Professional service scenarios require full disclosure of all information required by compliance to meet industry regulations |
| `auth_verify_mode` | `api_key_based` | Comply with compliance requirements for financial data calls, restricting only authorized services from accessing data |
| `auto_refresh_switch` | `true` | Ensure that embedded pages display the latest daily return data in real time to match the update rhythm |
| `responsive_layout` | `true` | Adapt to business display pages of different widths to avoid data overflow or layout disorder |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Issue: After embedding via iframe, some browsers cannot display application avatars and market charts, and only specific browsers load correctly. Cause: Cross-origin resource allowed domain names are not configured in `iframe_allow_list`, causing the browser to block cross-origin static resource requests.
- Issue: After refreshing the page of a login-free shared link, opening a new chat window each time will not retain previous sessions. Cause: Session persistence configuration is not enabled, and session state is not stored in local cache, so the original session cannot be restored after refresh.
- Issue: The embedded page does not perform authentication verification, and any visitor can view complete return and market data. Cause: The `auth_verify_mode` configuration is not enabled, or valid API key parameters are not carried when calling the interface.

## How to confirm the configuration is complete
- Open the browser developer tools for the embedded page, check the network request panel, confirm that all data interface return status codes are `200`, and that fields are complete and not missing.
- Adjust the window width of the embedded page to verify whether the component will adaptively adjust the layout to avoid data overflow or layout disorder.
- Try embedding from an unauthorized domain name to confirm that the page cannot load data normally, verifying that the authentication configuration is effective.
- Wait for a full update cycle and refresh the page to confirm that the displayed data is the latest daily return information, verifying that the cache configuration is effective.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
