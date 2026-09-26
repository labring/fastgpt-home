---
title: Share and Embed for Minor Metal Yield and Market Daily Reports
slug: /en/industry/finance-d007-c058-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Share and Embed for Minor Metal Yield and Market Daily
meta_description: Minor metal market daily data is sourced from a domestic professional non-ferrous metal industry market aggregation API. Data updates are completed
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Share and Embed for Minor Metal Yield and Market Daily Reports

## What the Data for This Category Looks Like
Minor metal market daily data is sourced from a domestic professional non-ferrous metal industry market aggregation API. Data updates are completed within 1 hour after market close each trading day. Each record includes unique product code, Chinese product name, daily settlement price, total daily transaction amount, daily position volume, and previous trading day's settlement price. Settlement price unit is yuan/ton, total transaction amount unit is ten thousand yuan, position volume unit is lots. No percentage-based statistical values are included in data fields; only absolute change values are retained.

## Constraints Imposed by Data Characteristics on Share and Embed Workflows
The daily update requirement means embedded components must include a scheduled synchronization mechanism. Without this mechanism, stale historical data will be displayed, failing to meet real-time market display needs. Fields include numerical values with attached units. Full unit identifiers must be retained during embedding, otherwise data readability will decrease and professional user judgments will be affected. Each market quote record has a relatively large number of fields. Embedding containers must reserve sufficient horizontal space to prevent line breaks and misalignment of fields, which would damage layout integrity. The professional data source has strict API permission verification. A dedicated API key must be used during embedding, otherwise an unauthorized or empty data response will be returned, and normal display of market content will not be possible.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_auto_refresh_interval` | `86400 seconds` | Minor metal market daily data updates once per day. Matches the update rhythm to avoid displaying stale data |
| `share_show_export_button` | `false` | Minor metal market data is standardized public content. No additional export function is needed |
| `iframe_embed_max_width` | `100%` | Adapts to embedding container widths across different devices, prevents field line breaks and misalignment |
| `share_api_key_required` | `true` | Minor metal market data comes from a professional data source. Unauthorized embedding must be restricted |
| `share_markdown_compact_mode` | `enabled` | Minor metal market data has many fields. Compact format optimizes display layout |
| `embed_content_security_policy` | `strict-origin-when-cross-origin` | Prevents third-party embedded pages from tampering with data display logic |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. Testing on internal samples is recommended before finalizing settings.

## Three Common Configuration Errors
- Symptom: Embedded iframes display a Markdown export button, which does not align with display requirements. Cause: `share_show_export_button` is not set to `false`, so the default export function remains enabled.
- Symptom: Embedded pages return empty market data after loading. Cause: `share_api_key_required` is not set to `true`, or an incorrect API key is used, resulting in failed data source permission verification.
- Symptom: Embedded market data remains unchanged for an extended period and does not match current day's actual market conditions. Cause: `share_auto_refresh_interval` is set to an overly long interval, or automatic refresh is not enabled, resulting in displayed historical data.

## How to Verify Successful Configuration
- Access share links to check for Markdown export button display, and confirm configuration matches requirements.
- Embed content into test containers, verify that displayed data is the latest minor metal market data for the current day, and confirm automatic refresh configuration is active.
- Replace with an unauthorized API key, verify that a permission error is returned, and confirm interface verification configuration is active.
- Adjust embedding container width, check that market fields are displayed with proper formatting, and confirm width configuration is active.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
