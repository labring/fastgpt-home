---
title: Sharing and Embedding for Biologics Yield Data
slug: /en/industry/finance-d007-c105-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Biologics Yield Data
meta_description: Biologics yield data comes from public market APIs for the pharmaceutical and biotech industry, pharmaceutical circulation sales monitoring platforms
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Biologics Yield Data

## What the data for this category looks like
Biologics yield data comes from public market APIs for the pharmaceutical and biotech industry, pharmaceutical circulation sales monitoring platforms, and official batch issuance databases.
Update frequencies include daily, weekly, and monthly. Daily data updates after daily market close. Weekly and monthly data is aggregated per natural calendar cycle.
The data is provided as structured tables. Fields include product unique identifier, manufacturer name, report date, daily yield, cumulative periodic yield, terminal price change, and more.
Yield-related metrics use basis points as the unit. Terminal price change uses yuan per unit specification as the unit.

## Constraints for sharing and embedding
High-frequency daily market data requires real-time data pull logic in embedded pages. Otherwise, data may lag beyond one natural day.
Structured documents with multiple fields require specifying target display fields during embedding. This prevents loading redundant page content.
Variations in fields across different biologics require adding field mapping rules in embedding configurations. This ensures consistent data display formats across products.
Low-update-frequency monthly batch issuance-related data can use longer cache cycles. This reduces the frequency of API calls.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embed_cache_ttl` | Daily data set to `300 seconds`, monthly data set to `86400 seconds` | Matches the update rhythm of corresponding data, balances data timeliness and API call costs |
| `embed_show_fields` | `["product_identifier", "daily_return", "weekly_accumulated_return"]` | Focuses on core display needs for biologics yield daily reports, filters non-essential fields |
| `embed_field_mapping` | Map `product_identifier` to `Product Code`, map `daily_return` to `Daily Yield (Basis Points)` | Aligns with common display habits in the domestic pharmaceutical industry, unifies field names and display logic |
| `embed_allow_origin` | `["*.your-domain.com"]` | Restricts embedding sources, prevents unauthorized pages from calling the application, ensures data access security |
| `embed_max_height` | `600 pixels` | Adapts common web layout dimensions, prevents page content from overflowing containers |
| `embed_disable_thinking` | `true` | Adapts to the lightweight display needs of yield broadcast scenarios, simplifies page content |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration mistakes
- Embedded pages display `permission denied` errors. This occurs when the `embed_allow_origin` parameter is not configured, or the configured domain does not include the domain of the current embedded page. Cross-origin requests are blocked.
- Iframe calls fail to display application images and user avatars. This happens when the `embed_show_avatar` parameter is not enabled, or the corresponding configuration item is disabled. Cross-origin security policies in some browsers block unauthorized avatar resource loading. Only compatible browsers may load these resources normally.
- The login-free window creates a new chat window after refresh, and does not navigate to the historical chat window. This occurs when the `embed_preserve_chat` parameter is not set to `true`. Each refresh resets the session state.

## How to confirm configurations are set correctly
- Open the browser developer tools for the embedded page. Check network request status codes. Confirm all data interfaces return 200 OK, with no cross-origin related errors.
- Verify the fields displayed on the embedded page. Confirm they match the list in the configured `embed_show_fields` parameter, with no redundant or missing field content.
- Refresh the embedded page. Confirm the session state is retained, and no new independent chat window is created.
- Wait for the corresponding data update cycle. Confirm page data automatically syncs and updates, with no noticeable lag.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
