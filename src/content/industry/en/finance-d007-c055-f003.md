---
title: Sharing and Embedding for Air Pollution Control Revenue Data
slug: /en/industry/finance-d007-c055-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Air Pollution Control Revenue Data
meta_description: Data sources include national air quality monitoring networks, corporate environmental facility operation data interfaces, and regional carbon
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Air Pollution Control Revenue Data
## What this category of data looks like
Data sources include national air quality monitoring networks, corporate environmental facility operation data interfaces, and regional carbon emission trading market quote interfaces. The primary update rhythm is daily reports. Real-time data for key monitoring points updates every 15 minutes. Carbon trading-related data updates alongside trading days. The document structure includes monitoring point code, monitoring period, pollutant emission reduction amount, corresponding revenue accounting benchmark, transaction settlement unit price, and cumulative revenue amount. For field units: emission reduction is measured in tons, settlement unit price is measured in yuan per ton, and cumulative revenue is measured in yuan.

## What constraints these characteristics impose on sharing and embedding workflows
Differentiated data update frequencies require embedding configurations to match corresponding refresh logic. Real-time monitoring data requires scheduled refresh configuration. Daily report data can be set to pull at a fixed daily time. Mixing update logic causes discrepancies between displayed data and actual output. The field structure includes multi-dimensional associated data. A subset of display fields must be explicitly specified during embedding to avoid loading redundant information and slowing page load speed. Data sources rely on external interfaces. Cross-domain whitelists must be configured before embedding, otherwise interface call failures will occur. Revenue-related data involves sensitive enterprise operating information. Permission verification rules must be configured during sharing and embedding to prevent unauthorized access. Different usage scenarios have different display layout requirements. Large-screen embedding requires simplified fields. Internal report sharing requires complete accounting items to be retained. Corresponding display templates must be planned in advance.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `share_link_language` | Specify according to the target sharing scenario, for example `zh-CN` or `en-US` | Supports independent setting of the sharing link language, no need to match the main console interface, adapts to language needs of different user groups |
| `iframe_auto_refresh_interval` | `15 minutes` (real-time data scenario) or `86400 seconds` (daily report scenario) | Matches the update frequency of air pollution control data, avoids data lag or excessive refresh consuming resources |
| `share_allow_iframe_domain` | Fill in the list of authorized embedding domains, for example `["https://monitor.your-company.com"]` | Restricts embedded iframe domains, prevents unauthorized cross-domain interface calls, ensures data security |
| `share_show_tip_text` | `false` (hide default prompt text) or custom prompt copy | Most air pollution control data sharing scenarios target internal teams or fixed partners, default prompt text can be hidden to simplify the interface |
| `share_record_query_log` | `true` (track access records) or `false` (no recording required) | Configure according to compliance requirements, supports viewing question-and-answer records initiated via sharing links |
| `share_require_login` | `false` (share without login) or `true` (require login to access) | Configure according to data sensitivity, non-public scenarios can set no login to improve usage convenience |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After iframe embedding, a large number of inactive windows continuously occupy system resources, causing slow page loading or `504 Gateway Timeout` errors. Cause: No reasonable value is configured for `iframe_auto_refresh_interval`, the default refresh frequency is too high, and embedded cross-domain domains are not restricted, leading to a flood of invalid requests.
- Symptom: The interface language of the sharing link is exactly the same as the main console interface, and an English interface cannot be set separately for overseas users. Cause: The default configuration of `share_link_language` is not modified, the global language setting of the console is used, and the language parameter is not specified separately for the sharing scenario.
- Symptom: Default prompt text is displayed in the sharing link, and cannot be hidden or replaced with custom content. Cause: `share_show_tip_text` is not configured as `false`, or no custom prompt text is entered in the sharing settings, causing the default prompt text to be forced to display.

## How to Verify Successful Configuration
- Open the configured sharing link, check if the interface language matches the expected result, confirm that the `share_link_language` configuration takes effect.
- Embed the iframe into a test page, wait for the time matching the data update cycle, check if the displayed data matches the latest output from the data source, confirm that the `iframe_auto_refresh_interval` configuration aligns with the data update rhythm.
- Attempt to embed the iframe from an unauthorized domain, check if interface call failures are triggered, confirm that the `share_allow_iframe_domain` configuration takes effect.
- Access the login-free sharing link, check if corresponding question-and-answer records appear in the sharing management page of the console, confirm that the `share_record_query_log` configuration meets compliance requirements.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
