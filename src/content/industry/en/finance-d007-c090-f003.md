---
title: Sharing and Embedding Paint and Ink Yield Data
slug: /en/industry/finance-d007-c090-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding Paint and Ink Yield Data
meta_description: Paint and ink yield-related data is sourced from public monitoring data from the China Coatings Industry Association, China Ink Industry Association
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding Paint and Ink Yield Data

## What this category's data looks like
Paint and ink yield-related data is sourced from public monitoring data from the China Coatings Industry Association, China Ink Industry Association, and linked raw material quotation data from commodity trading platforms. The update schedule finalizes all category data for the current day by 17:00 daily, generating the daily yield report document. The document is structured by product categories, including architectural coatings, packaging inks, industrial coatings, and others. Each category includes product name, production base quotation, regional distribution guide price, calculated raw material cost proportion, and calculated daily yield per unit product. Quotation unit is yuan per kilogram. Calculated raw material cost proportion is presented as a decimal value. Calculated daily yield is the net profit per unit product, with unit yuan per kilogram.

## What constraints do these characteristics impose on sharing and embedding?
The daily update schedule for paint and ink yield data requires shared links to load the latest daily data by default, with caching disabled to avoid displaying expired information. The layered document structure by product category requires embedding components to support filtering by product category. Without this, redundant content will appear and harm reading experience. The units of yuan per kilogram and decimal field format require embedding configurations to retain the original data format. Automatic unit conversion or field name modification is prohibited, as this will cause deviation in data meaning. Lengthy document content requires embedding components to support adaptive height or scrollable display, to prevent page layout overflow. Data source attribution must also be displayed alongside content to ensure information traceability.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_cache_expire` | `0 seconds` | Daily updated yield data requires real-time loading; disable caching to avoid displaying expired information |
| `embed_filter_tags` | `["architectural coatings", "packaging inks", "industrial coatings"]` | Matches the layered document structure by product category to enable filtered display by product group |
| `embed_preserve_raw_fields` | Enabled | Retain the original field format of yuan per kilogram and decimal values to avoid information deviation caused by automatic conversion |
| `embed_scroll_height` | `600-1000px` | Adapt to different page layouts and prevent overflow from lengthy daily report content |
| `share_show_source` | Enabled | Retain data source attribution from industry associations to comply with data public traceability requirements |
| `embed_custom_css` | Calibrated via actual testing | Adapt to the style of the target embedded page to meet display needs for different scenarios |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: A password verification pop-up appears when the shared link is first opened. Cause: The `share_require_password` configuration item was not disabled, or its value was set to `true`, causing the shared link to enable encrypted verification by default.
- Phenomenon: The iframe-embedded component cannot modify default styles, and custom style configurations do not take effect. Cause: The `embed_allow_custom_css` configuration item was not enabled, or the embedded code did not correctly bind the custom style file.
- Phenomenon: In FastGPT 4.9.6, after disabling the `share_show_quote` and `share_show_source` configuration items, the quote and view original text buttons still display. Cause: The built-in configuration cache of the version was not synchronized for updates. Restart the application or refresh the backend configuration page to resolve.

## How to Confirm Configurations Are Correctly Set
- Verify that the shared link loads the latest daily yield data, with no expired content remaining.
- Test the embedded component’s category filtering function, confirming that display content can be switched between different product categories.
- Check the field format of the embedded content, confirming that the original quotation unit and numerical format are retained, with no automatic conversion deviation.
- Confirm that the data source attribution on the shared page is displayed normally, meeting information traceability requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
