---
title: Sharing and Embedding of Industrial Metal Yield Data
slug: /en/industry/finance-d007-c059-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Industrial Metal Yield Data
meta_description: Data related to industrial metal yields is sourced primarily from global commodity exchanges and industry spot quote platforms. Its update rhythm
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Industrial Metal Yield Data

## What this category of data looks like
Data related to industrial metal yields is sourced primarily from global commodity exchanges and industry spot quote platforms. Its update rhythm aligns with the trading hours of corresponding exchanges. Transaction quotes refresh every 15 minutes during trading days. Daily settlement data is generated after market close each day. Each individual data document includes fields such as product code, standard name, daily opening price, highest price, lowest price, closing price, settlement price, price change amount, position volume, and more. The price unit is uniformly yuan/ton, and the position volume unit is trading lots. No additional derived statistical fields are included.

## What constraints these characteristics impose on sharing and embedding
The high-frequency update feature of industrial metal data requires sharing links or embedded components to support dynamic data pulling, to avoid quote lag caused by cache expiration. The multi-field structure requires the embedded interface to reserve sufficient display space, or support custom display fields, to prevent information overflow. Variations in codes across different industrial metal product varieties require sharing parameters to support passing specified product identifiers, to enable accurate data pushing. Additionally, internal enterprise embedding scenarios need to support password-free login logic, to avoid repeated verification interrupting business processes, and must handle cross-domain embedding permission verification issues.

## How to Configure the Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_expire_time` | `300 seconds` | Matches the 15-minute update cycle of industrial metal data, prevents quote lag caused by cache expiration |
| `iframe_allow_origin` | `Business system main domain, internal office network segment` | Limits the security scope of cross-domain embedding, only allows authorized sites to reference data |
| `share_require_auth` | `false (internal scenarios)` | Adapts to password-free login requirements of internal systems, turns off identity verification to simplify the embedding process |
| `custom_share_params` | `["metal_code", "display_fields"]` | Supports passing industrial metal product codes and custom display fields, adapts to multi-variety data display |
| `embed_cache_control` | `no-store` | Disables forced caching, ensures the embedded component fetches the latest data each time it loads |
| `share_password_enable` | `false` | Turns off share link password verification, avoids repeated pop-ups in internal embedding scenarios |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Issue: A password verification pop-up appears when the embedded share link is opened for the first time. Cause: The `share_password_enable` configuration item was not turned off, or its value is set to `true`.
- Issue: The industrial metal data loaded by the embedded component does not update with the `custId` parameter passed by the business system. Cause: `custId` was not added to the `custom_share_params` whitelist, or the custom parameters were not passed correctly in the embedded code.
- Issue: A cross-domain error with status code `403 Forbidden` appears on the page after iframe embedding. Cause: The business system domain was not added to the `iframe_allow_origin` configuration list, or the configuration format does not meet requirements.

## How to Verify Correct Configuration
- Open the share link, check if a password verification pop-up appears. Adjust the `share_password_enable` configuration based on the embedding scenario.
- Pass a test `metal_code` parameter in the business system's embedded code, confirm that the loaded data corresponds to the specified industrial metal product.
- Wait 5 minutes, then refresh the embedded page, check if the data updates, confirm that `embed_cache_control` does not enable forced caching.
- Check the browser console's network requests, confirm that custom parameters are passed with the share link and are not blocked.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
