---
title: Sharing and Embedding of Electronic Component Yield Data
slug: /en/industry/finance-d007-c109-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Electronic Component Yield Data
meta_description: Electronic component market data comes primarily from authorized distributors’ real-time inventory quotation systems and industry spot trading
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Electronic Component Yield Data

## What Data for This Category Looks Like
Electronic component market data comes primarily from authorized distributors’ real-time inventory quotation systems and industry spot trading platforms. Two update frequencies apply: spot trading data refreshes every 10 to 30 minutes, and official factory guide prices update daily. Each data entry includes component model identifier, package specification, current unit price, inventory quantity, price change range, and update timestamp. Unit price is measured in RMB per piece, inventory in piece count, and change range is a numeric fluctuation difference. Data fields are tightly tied to business needs. Data varies widely between components with different packages and models. Precise parameter matching is required to return valid content.

## How These Characteristics Impact Sharing and Embedding Configuration
The real-time performance and field precision requirements of electronic component market data directly affect sharing and embedding configuration logic. Real-time spot data requires embedded components to use a short cache duration. A longer cache will cause displayed data to lag. Precise model and package parameters are required to return valid data, so sharing links must support custom query parameters to filter data. Many data fields are business-specific, so embedded display components must support custom field display to avoid irrelevant information disrupting page layout. Some quotation data is restricted to authorized business users, so additional access control is needed to prevent unauthorized calls.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_ttl` | `600 seconds` | The update cycle of electronic component spot data is mostly 10-30 minutes; a 600-second cache balances real-time performance and loading performance |
| `iframe_allow_origin` | Fill in the domain list of the business | Restrict unauthorized sites from embedding iframes to avoid data leakage or abuse |
| `share_auth_enabled` | `true` | Most electronic component quotations are targeted business data; enabling authentication helps control access scope |
| `share_default_query` | `["component_model", "stock_status"]` | Pass component model and stock status parameters to ensure accurate matching market data is returned |
| `iframe_max_height` | `700–900px` | Adapt to the conventional layout height of market display cards to avoid page overflow |
| `share_show_loading` | `true` | Real-time market data loading has delays; displaying a loading placeholder optimizes user experience |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material forms, data volume, and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After embedding via iframe, the application avatar and market charts fail to display. Mainstream browsers such as Chrome and Edge fail to load, but some niche browsers work normally. Cause: The `iframe_allow_origin` cross-origin whitelist is not configured correctly, or cross-domain access permissions for static resources (avatars, charts) are not enabled.
- Symptom: After refreshing the shared page, a new session window always opens instead of reusing the existing session. Cause: Session persistence-related parameters are not configured, resulting in a brand new session being generated for each request, unable to retain the user's historical query status.
- Symptom: Embedded market data fields are missing or do not match the expected category. Cause: The `share_default_query` parameter does not correctly pass component model and package parameters, causing the system to return full data instead of accurate market data for the specified category.

## How to Confirm Successful Configuration
- Open the test page with the embedded iframe, check whether the market chart and application avatar display normally, and refresh the page to confirm that the existing session is reused instead of creating a new window.
- Copy the sharing link, check whether the link carries preset query parameters such as `component_model` and `stock_status`, and confirm that the parameters match the configured `share_default_query`.
- Attempt to embed the iframe from an unauthorized domain, confirm that the page is blocked, and verify that the `iframe_allow_origin` configuration takes effect.
- After enabling `share_auth_enabled`, use an unlogged-in account to access the sharing link, confirm that the market data cannot be viewed directly, and access is only allowed after completing authentication.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
