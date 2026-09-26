---
title: Sharing and Embedding of Duty-Free Yield Data
slug: /en/industry/finance-d007-c019-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Duty-Free Yield Data
meta_description: Offshore duty-free yield market data comes primarily from POS sales systems of offshore duty-free operators and customs filing records for offshore
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Duty-Free Yield Data

## What the data for this category looks like
Offshore duty-free yield market data comes primarily from POS sales systems of offshore duty-free operators and customs filing records for offshore passenger shopping. It is compiled and updated daily after business closes. The data uses a structured table format. Each row corresponds to daily operating data for one product category at one store. Fields include store unique identifier, product category code, daily sales unit price (yuan), unit procurement cost (yuan), daily verified order count, in-store passenger traffic count, and other fields. All values use physical currency units or passenger counts as measurement standards. No percentage-based statistical items are included. The data updates on a fixed schedule. The latest daily data can be pulled regularly via an interface to generate daily report displays.

## What constraints these characteristics impose on the sharing and embedding workflow
The fixed daily update schedule for the data requires embedded components to support regular pulling of the latest data. Otherwise, embedded pages will display outdated historical content, failing to meet the timeliness requirements of daily reports. The structured multi-field data structure requires embedding to support filtering specified stores and product categories via URL parameters. Without this, accurate display of yield market data for target segmented product categories is not possible. Some fields involve commercial operating data of business operators. Embedding scenarios require access permission verification to prevent unauthorized third-party calls to sensitive data. Structured data display must adapt to layout dimensions of different host pages. Embedded components must support responsive configuration to meet layout requirements for finance and insurance platforms.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `refresh_interval` | `86400 seconds` | Matches the daily update frequency of duty-free yield daily reports, ensuring embedded pages display the latest data |
| `allowed_domains` | `["*.bank.com", "*.insurance.com"]` | Restricts embedding to only finance and insurance domain names, complying with access permission requirements for industry scenarios |
| `query_params_filter` | `["store_id", "product_category"]` | Only opens store and category filtering parameters to prevent unauthorized calls to sensitive data |
| `enable_voice` | `false` | Duty-free yield daily reports primarily use text data, so voice functionality does not need to be enabled to avoid permission errors |
| `embed_timeout` | `10 seconds` | Balances data loading speed and completeness, avoiding long wait times for embedded pages |
| `embed_layout` | `responsive` | Adapts to the layout dimensions of different host pages, ensuring consistent display effects on mobile and PC terminals |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: Embedded pages fail to load in Internet Explorer, with `ERR_HTTP2_PROTOCOL_ERROR` returned in the browser console. Cause: Internet Explorer does not support the Cross-Origin Resource Sharing (CORS) specification used by FastGPT embeds, resulting in embedded requests being blocked by the browser.
- Symptom: Embedded pages pop up a `permission denied` error when calling voice recognition functionality. Cause: The `allowed_domains` whitelist is not configured, or `enable_voice` is enabled but the embedded domain's voice access permission is not authorized, leading the browser to reject cross-domain voice calls.
- Symptom: Embedded pages display missing duty-free data fields or fields that do not match expected values. Cause: Allowed query parameters are not configured via `query_params_filter`, leading to incorrect filtering logic that cannot correctly match target data fields.

## How to Confirm Configuration Is Correct
- Open the embedded page, verify that the displayed duty-free data matches the content of the official daily report for the current day, and confirm that the refresh interval configuration matches the data update schedule.
- Load the embedded page in Internet Explorer, confirm there are no loading errors, and verify that embedding request rules for older browsers are supported.
- Attempt to embed the page from an unauthorized domain, confirm that data cannot be obtained normally, and verify that the domain whitelist configuration is effective.
- If voice functionality is enabled, trigger the voice call from the embedded page, confirm there are no permission errors, and verify that permission configurations are working properly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
