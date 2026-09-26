---
title: Sharing and Embedding for Coke Futures Yield and Market Data
slug: /en/industry/finance-d007-c096-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Coke Futures Yield and Market Data
meta_description: Coke is a coal futures product listed on the Dalian Commodity Exchange. Market data comes primarily from official exchange public interfaces and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Coke Futures Yield and Market Data

## What the data for this category looks like
Coke is a coal futures product listed on the Dalian Commodity Exchange. Market data comes primarily from official exchange public interfaces and compliant third-party aggregated data sources. Real-time transaction data updates every 3 seconds during trading hours on trading days. Post-settlement data updates within one hour after the same day’s market close. No real-time updates occur on non-trading days.
A single standard market data document includes fields such as contract code, delivery month, latest transaction price, settlement price, daily price change difference, trading volume, and open interest. Price fields use yuan/ton as the unit. Trading volume and open interest use trading lots as the unit. No additional statistical fields are included.

## Constraints on sharing and embedding from these characteristics
The high-frequency real-time update feature of coke market data requires embedded components to support configurable scheduled refresh logic. This prevents display of expired static data.
The multi-delivery month contract structure requires shared links to support passing parameters for specified contracts. This ensures shared content matches the target market data.
The yuan/ton unit rule requires embedded configurations to retain a display toggle for unit fields. This avoids misunderstandings caused by missing data labels.
Cross-domain restrictions from exchange data sources require the platform to configure cross-domain whitelists for corresponding domains. Otherwise, embedded components cannot pull data normally.
The lack of updates on non-trading days requires embedded components to adapt to empty data states. This prevents display of incorrect error prompts.
Additionally, coke is a specialized futures category. Its market announcement content must be tied to specific contract parameters. It cannot be generalized to fit the sharing logic of other product categories.

## Configuration Settings
| Configuration Key | Recommended Value | Rationale |
| --- | --- | --- |
| `share_link_allow_params` | `["contract_code", "refresh_interval"]` | Coke market data requires specifying target contracts and refresh frequency to match product data characteristics |
| `embed_component_refresh_interval` | `300 seconds` | Coke real-time market data updates frequently. A 5-minute refresh balances data timeliness and interface load |
| `external_api_cors_whitelist` | `["https://api.dce.com.cn", "https://quote.cjdata.com"]` | Coke data sources come from the Dalian Commodity Exchange and compliant market aggregation interfaces. Corresponding domains must be configured to allow cross-domain embedding |
| `embed_show_unit` | Enabled | Coke market data uses yuan/ton as the unit. Retain unit labels to ensure data accuracy |
| `embed_empty_state_text` | `Non-trading days have no coke futures market data` | No real-time updates occur on non-trading days. Display a clear empty state prompt |
| `share_guest_link_enabled` | Enabled | Matches user scenarios where shared guest links for market broadcasts are used |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Analyze specific issues individually. Test against your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: Embedded shared components display default prompt text that cannot be removed. Cause: The `embed_custom_prompt` parameter is not configured. The platform uses default session prompt copy instead of coke futures-specific prompts.
- Symptom: Guest users cannot view access records via shared links. Cause: The `share_log_guest_access` configuration item is not enabled. The open-source version 4.8.14 disables this logging feature by default. Manual activation is required.
- Symptom: Embedded components return a 403 cross-domain error after loading. Cause: The coke market data source domain is not added to the `external_api_cors_whitelist` configuration. Browser cross-domain restrictions cause interface request failures.

## How to Verify Successful Configuration
- Access a shared link with the specified `contract_code` parameter. Confirm the page displays market data for the corresponding coke futures contract.
- Wait for the configured refresh interval. Confirm the embedded component automatically updates data to verify the refresh logic works.
- Access the embedded component on a non-trading day. Confirm the preset empty data prompt text displays, and no error prompts appear.
- Check the platform’s guest access log page. Confirm access records via guest shared links are saved normally to verify logging configuration works.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
