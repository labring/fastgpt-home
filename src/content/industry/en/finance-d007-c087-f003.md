---
title: Sharing and Embedding of Auto Parts Yield Data
slug: /en/industry/finance-d007-c087-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Auto Parts Yield Data
meta_description: Auto parts sector market and yield data is sourced from publicly traded company trading data disclosed by domestic stock exchanges, and official
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Auto Parts Yield Data

## What the data for this category looks like
Auto parts sector market and yield data is sourced from publicly traded company trading data disclosed by domestic stock exchanges, and official industry segment index statistics. Updates are synchronized after each trading day closes. No data is generated on non-trading days.

Data is stored in structured table format. Each record includes these fields:
- Individual stock code (string)
- Full company name (string)
- Daily closing price per share (yuan/share)
- Daily price change value (yuan/share)
- Sector weighted average change value (yuan/share)
- Affiliated segment assembly type
- Financial report disclosure cycle identifier

Data only covers listed entities, and does not include data from unlisted first-tier supporting suppliers.

## Constraints Imposed on Sharing and Embedding by Data Characteristics
The unique characteristics of auto parts yield data impose multiple constraints on the sharing and embedding process:
1. Data only updates on trading days. Embedded pages must include empty data prompt logic for non-trading days. Cache expiration times must match the one-trading-day interval to prevent expired or invalid data from being displayed.
2. Data includes the affiliated segment assembly type field. Shared links must support filter parameters to let callers filter display content for segments such as chassis and electronics.
3. Data uses yuan/share as its unit. Embedded components must follow fixed unit display rules to avoid unit conversion discrepancies across platforms.
4. Data involves financial market information. External platforms must meet compliance requirements for financial information display before embedding, and necessary filing procedures must be completed in advance.

## Configuration Settings

| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_custom_title` | `Auto Parts Daily Yield and Market Report` | Matches the business scenario name, avoids mismatch between the default title and content, and resolves issues where titles are altered after embedding |
| `cache_duration` | `86400 seconds` | Matches the trading day update cycle, ensures cached data is displayed during non-trading hours, and avoids frequent interface requests |
| `url_query_pass` | `filter_type,unit_mode` | Allows passing filter rules and unit display configuration via URL parameters, adapts to display needs of different callers, and supports global variable parameter passing |
| `iframe_allow_list` | `*.your-finance-platform.com,*.mini-program-appid.com` | Restricts embedded domain ranges, meets compliance requirements for financial information display, and prevents unauthorized platforms from embedding |
| `unit_display_mode` | `Fixed display of yuan/share` | Matches the unit specification for auto parts data, avoids unit conversion discrepancies across embedded platforms |
| `compliance_audit_switch` | `Enabled` | Addresses compliance display requirements for financial market data, ensures embedded content meets regulatory standards |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After embedding into a mini-program or iframe, the page top title is automatically modified and cannot be restored. Cause: The `share_custom_title` parameter is not configured, the platform default title is used, and the external platform's page layout overrides the custom title configuration.
- Symptom: The published iframe embedded page shows no robot reply content, while the debug area displays normally. Cause: The published domain name is not added to the `iframe_allow_list`; the platform triggers cross-domain or embedding permission verification and intercepts data returns.
- Symptom: Global variables passed via URL parameters do not take effect, and data cannot be filtered by parameters. Cause: The corresponding field whitelist for the `url_query_pass` parameter is not enabled, only partial parameters are allowed to pass, and the passing permission for target parameters such as `filter_type` is not configured.

## How to Confirm Configuration Is Complete
- Open the shared link, check if the page top title matches the configured `share_custom_title` to confirm the custom title takes effect.
- Access the embedded page on a non-trading day, check if the expected empty data prompt or cached data is displayed, to confirm the cache configuration matches the update cycle.
- Add a valid URL parameter (such as `filter_type=chassis`) to the shared link, check if the page only displays enterprise information for the corresponding segment type, to confirm parameter passing takes effect.
- Check if the embedded platform's domain name is within the range configured in `iframe_allow_list`, to confirm cross-domain embedding permission is normal.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
