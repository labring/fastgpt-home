---
title: Sharing and Embedding of Dairy Product Yield Rates
slug: /en/industry/finance-d007-c007-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Dairy Product Yield Rates
meta_description: Data for dairy product yield rates comes from domestic dairy industry monitoring platforms and public sales and production ledgers of dairy
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Dairy Product Yield Rates

## What the data for this category looks like
Data for dairy product yield rates comes from domestic dairy industry monitoring platforms and public sales and production ledgers of dairy enterprises. Full data for the previous calendar day is synced every morning. Each data document includes fields such as statistical date, detailed product category (e.g., pasteurized milk, sterilized milk), raw material procurement cost, terminal sales unit price, gross profit per product, and input-output ratio value. Field units are yuan per liter, yuan per box (standard 500ml specification), yuan per box, yuan per box, and dimensionless values respectively. No percentage display fields are included.

## What constraints these characteristics impose on the "sharing and embedding" workflow
The multi-source nature of dairy data requires embedding configurations to support custom field mapping, to adapt to field differences across monitoring platforms and dairy enterprises. The daily update rhythm requires embedding component cache duration settings to match the data update cycle, to avoid displaying expired data. The wide range of detailed product categories requires embedding interfaces to support passing category filtering parameters, to enable accurate data display. The variation in field units across specifications requires embedding configurations to allow setting default specification parameters, to unify the display unit for single products and avoid unit confusion across data sources.

## How to set the configurations

| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `cache_ttl` | `86400 seconds` | Matches the daily update rhythm of dairy product data, avoids displaying expired data |
| `hide_citation` | `true` | Adapts to the concise display needs of embedding scenarios, aligns with reading habits of industry daily reports |
| `field_mapping` | `{"Raw Material Cost": "cost", "Retail Price": "price", "Gross Profit": "margin"}` | Adapts to field differences across multi-source data, unifies display field names |
| `default_category` | `UHT Sterilized Milk` | Covers mainstream dairy product categories, reduces cases of no data on initial user load |
| `allowed_origin` | `["https://your-domain.com"]` | Restricts embedding domains, prevents unauthorized pages from calling embedding components |
| `default_spec` | `500ml/box` | Unifies the display unit for single products, avoids unit confusion across data sources |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Issue: No data returned after the embedding page loads. Cause: The `field_mapping` parameter is not configured, so the field structure of the data source cannot be matched, and the interface cannot return valid data.
- Issue: Unconfigured citation content modules are displayed on the embedding page. Cause: The `hide_citation` parameter is not set to `true`, and the FastGPT citation display module is retained by default.
- Issue: Expired data older than 24 hours is displayed on the embedding page. Cause: The `cache_ttl` parameter duration exceeds the data update cycle, resulting in delayed cache refresh.

## How to confirm the configuration is complete
- Open the browser developer tools for the embedding page, check the field list returned by the interface, and confirm it matches the configured `field_mapping` parameter.
- Check the response header of the network request, confirm that the max-age value of the `Cache-Control` field meets the preset cache duration requirements.
- Switch different product categories in the parameter bar of the embedding page, confirm that the data displayed on the page is updated synchronously to the information of the selected category.
- Try embedding the page from an unauthorized domain, confirm that the page fails to load normally or displays an error prompt, to verify that the `allowed_origin` configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
