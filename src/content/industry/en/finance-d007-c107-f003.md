---
title: Sharing and Embedding for Power Industry Yield Data
slug: /en/industry/finance-d007-c107-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Power Industry Yield Data
meta_description: Power industry yield data is sourced from public trading data of the National Power Trading Center and real-time operating data of provincial grid
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Power Industry Yield Data
## What data for this category looks like
Power industry yield data is sourced from public trading data of the National Power Trading Center and real-time operating data of provincial grid dispatch platforms. Intraday trading data updates every 15 minutes. End-of-day aggregated yield reports are updated within 4 hours after each trading day. Each data entry includes fields such as trading period, regional grid code, grid-side unit revenue, power sales side unit revenue, and regional weighted average revenue. The regional grid code is a unitless identifier. The unit for grid-side and power sales side unit revenue is yuan/megawatt-hour.

## What constraints do these characteristics impose on the sharing and embedding workflow
High-frequency updated intraday data requires embedded components to support scheduled refresh or real-time pulling. Otherwise, displayed data will have significant deviation from real-time market data. Data includes segmented fields such as regional grid code and trading period. Embedding must specify the target region and period via parameters. Otherwise, the returned data range will not meet usage requirements. The data unit is yuan/megawatt-hour. When embedding into external systems, ensure the display layer completes unit adaptation to avoid confusion with data from other categories. End-of-day aggregated data updates have fixed delays. Shared daily report links must include update time annotations to prevent users from misunderstanding data timeliness.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `shareCacheTTL` | `300–900 seconds` | Power data intraday update frequency is 15 minutes. Cache duration covers at least one update cycle to avoid data lag |
| `iframeAllowList` | `Enterprise-owned business domains, partnered platform filing domains` | Avoid cross-domain loading restrictions while meeting data security verification requirements |
| `shareQueryPreset` | `["regionCode", "tradeDate"]` | Power data requires specifying region and trading period. Preset parameters simplify external system calling processes |
| `embedPermissionCheck` | `Enabled` | Power data belongs to transaction-related data in the public utility segment. Non-authorized domain embedding must be restricted |
| `embedSpeechPermission` | `Disabled` | Yield broadcast scenarios mostly use static data display. Speech recognition is not required, avoiding permission error prompts |
| `shareHistoryRetention` | `7 days` | The business reference cycle for power market daily reports is one week. Excessive retention will occupy storage resources |
| `shareHistoryVisible` | `true` | Allow login-free windows to display historical query records, meeting user needs for viewing past queries |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing.

## Three common errors
- Phenomenon: When the embedded page calls the speech recognition function, the console returns a `permission denied` error, using version 4.8.23. Cause: The `embedSpeechPermission` configuration item is not disabled, or the speech permission declaration is not added to the embedded page.
- Phenomenon: The iframe component embedded in the mini-program fails to load content, prompting domain name verification failure. Cause: The mini-program business domain name is not added to the `iframeAllowList` configuration item, or the mini-program domain name filing verification is not completed.
- Phenomenon: The login-free session window of the embedded page cannot display historical query records, but the corresponding session data can be retrieved in the background logs. Cause: The `shareHistoryVisible` parameter is not configured as `true`, or the historical record reading permission is not enabled on the embedded page.

## How to confirm configuration is applied correctly
- Log in to the FastGPT backend sharing and embedding configuration module, check whether the `iframeAllowList` configuration item includes all business domains that need to be embedded, and confirm that the configuration has been saved and takes effect.
- Generate a test shared link with preset parameters, open it in the target embedded environment, and check whether the fields and units of the returned data match business requirements.
- Try to load the embedded component using a domain name not in the whitelist, confirm that the content cannot be displayed normally, and authorized domains can load data normally.
- View the console logs of the embedded page, confirm that there are no `permission denied` type errors, and the historical record function can display the corresponding session data when working properly.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
