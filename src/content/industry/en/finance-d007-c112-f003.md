---
title: Sharing and Embedding for White Goods Yield Rate Reports
slug: /en/industry/finance-d007-c112-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for White Goods Yield Rate Reports
meta_description: Data related to white goods yield rates is sourced from domestic home appliance industry monitoring institutions, public sales data from major
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for White Goods Yield Rate Reports

## What the data for this category looks like
Data related to white goods yield rates is sourced from domestic home appliance industry monitoring institutions, public sales data from major e-commerce platforms, and channel supply prices publicly disclosed by brands. Online channel sales data is updated daily. Offline retail channel data is updated weekly. Overall industry aggregate data is updated every two weeks.
Data documents use a structured format, grouped by SKU code. Core fields include product name, sales channel type, average price at the start of the reporting period, average price at the end of the reporting period, cost guide price, and monitored channel types.
Average price fields use the unit yuan per unit. Period difference fields use the unit yuan per unit. Channel coverage fields are categorized text.

## Constraints for Sharing and Embedding
Differing update rhythms for online and offline data require embedded components to support custom data refresh cycles. This adapts to update frequencies of different channels and prevents expired data from being displayed.
Structured SKU-grouped data requires sharing configurations to support filtering data scope by product and channel type. This avoids returning redundant information.
Unified field units require embedded display components to preset formats. No additional unit parameter adjustments are needed, reducing the probability of display errors.
Differences in update timestamps across multiple data sources require embedded applications to specify the update timestamp of the corresponding data when calling the interface. This ensures the latest batch of data is loaded.
Field mapping requirements for structured data require sharing configurations to support custom display fields. This converts original monitoring data into report formats adapted to business scenarios.

## How to Configure Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `share_refresh_interval` | Set to `86400 seconds` for online channel data, `604800 seconds` for offline channel data | Matches the respective data update rhythms of online and offline channels, ensuring displayed data is the latest batch |
| `share_filter_rules` | Configure filter conditions by `sales channel type` and `SKU code` | Adapts to the SKU-grouped structure of structured data, accurately returning yield rate data for target categories |
| `share_display_fields` | Select `product name`, `sales channel type`, `average price at end of reporting period`, `cost guide price` | Focuses on core business metrics, reducing redundant displayed content |
| `share_cache_strategy` | Cache online data for `86400 seconds`, offline data for `604800 seconds` | Balances data freshness and interface call efficiency, adapting to update cycles of different channels |
| `share_export_enabled` | Set to `false` for login-free scenarios | Prevents unauthorized users from exporting complete monitoring data, complying with data security requirements |
| `share_persist_session` | Set to `true` | Enables isolation between different user sessions, ensuring each user can only view their own query results |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Phenomenon: A `Markdown export` button appears on the login-free sharing page, which does not align with business scenario requirements. Cause: The `share_export_enabled` configuration item was not set to `false`, and the export function is enabled by default.
- Phenomenon: Different users accessing the same sharing link can view other users' conversation history and query results. Cause: The `share_persist_session` configuration item was not set to `true`, and session isolation was not implemented.
- Phenomenon: When the trigger phrase "share" is entered, tool call parameters are incorrectly converted to "fenjiao". Cause: The text error correction threshold of the large model context is set unreasonably, or the input text preprocessing logic does not perform special verification for the trigger phrase, leading to a near-character conversion error.

## How to Confirm Configuration Is Successful
- Access the sharing and embedding link, check that the displayed data fields match the configured `share_display_fields`. Confirm that the filter rules take effect and only data for the target SKU and channel is returned.
- Switch to different browsers or devices to access the same sharing link. Check that each user's conversation history and query results are not accessible to others, confirming that session isolation takes effect.
- Wait for the update cycle of the corresponding channel to end, then refresh the embedded page. Check whether the data has been updated to the latest batch, confirming that the refresh interval and cache strategy are configured correctly.
- Check the sharing page in the login-free scenario. Confirm that the `Markdown export` button is not displayed, verifying that the export configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
