---
title: Sharing and Embedding for Dedicated Equipment Yield Data
slug: /en/industry/finance-d007-c004-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Dedicated Equipment Yield Data
meta_description: Dedicated equipment yield and market data is collected from industrial IoT collection modules built into the devices and connected financial market
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Dedicated Equipment Yield Data

## What this category of data looks like
Dedicated equipment yield and market data is collected from industrial IoT collection modules built into the devices and connected financial market data source APIs. Full data refreshes run after market close each trading day. On non-trading days, only device offline status data is synced. Each data document includes six core fields: unique device code, total daily operating hours, daily profit calculation value, daily profit as a proportion of initial purchase cost, associated daily transaction record number, and data generation timestamp. The units for these fields are string, hour, yuan, dimensionless ratio, string, and ISO 8601 format timestamp, respectively.

## What constraints do these characteristics impose on the sharing and embedding workflow
The scheduled daily update cadence of the data requires that the cache refresh cycle of embedded components aligns with the trading day cycle, to avoid displaying expired or ungenerated same-day data. The unique device code as a core positioning parameter requires that sharing links or embedded code must carry this identifier, otherwise exclusive data for the corresponding device cannot be returned. The fixed field structure requires that embedded rendering templates strictly match the field order and type, otherwise field misalignment or abnormal value display will occur. Fields including profit calculation values and proportions require that embedded frontends configure numerical formatting rules to prevent overly long numerical values from overflowing the display area. The rule that only offline status data is synced on non-trading days requires embedded components to add compatible rendering logic for empty data states.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `iframe_domain_whitelist` | `["https://your-finance-platform.com", "https://device-monitor.site"]` | Restrict embedded domain scope to prevent unauthorized sites from stealing or tampering with embedded content |
| `share_expire_days` | `7` | Match the update cycle of dedicated equipment daily reports, to avoid expired links displaying old data from non-current trading days |
| `embed_auth_type` | `device_id_param` | Require embedded requests to carry the unique device code parameter, aligning with core data positioning constraints |
| `cache_refresh_interval` | `86400 seconds` | Match the daily update rhythm of trading days, balancing data timeliness and server load pressure |
| `share_token_required` | `false` | Adapt to the public sharing requirement of daily report broadcasts, allowing access to public device market data without authentication |
| `embed_render_template` | `Standard Template for Special Equipment Market Daily Report` | Match rendering rules for fixed field structures, avoiding display issues such as field misalignment or type mismatch |

> The parameter values provided on this page are all common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- The embedded iframe interface displays English text. The phenomenon is that all interactive copy and data labels in the rendered component are in English. The cause is failing to specify the `locale` parameter in the embedded configuration, or the platform's default language setting not matching the target usage scenario.
- Embedded components fail to retrieve exclusive data for the corresponding device. The phenomenon is returning an empty data set or a 400 Bad Request status code. The cause is failing to carry the unique device code in the URL parameters of the embedded request, or the parameter format not matching the encoding rules specified in the configuration.
- Sharing link authentication logic fails. The phenomenon is that the authentication switch from older configurations no longer works after version 4.9.0. The cause is failing to consult the configuration documentation for the corresponding version, and continuing to use the authentication parameter configuration method that has been removed.

## How to Confirm Proper Configuration
- Check if the target domain in the embedded code is included in the `iframe_domain_whitelist` configuration item list, to verify that embedded requests can be initiated normally.
- Call the sharing link or embedded preview interface, pass the preset unique device code parameter, and verify that the returned data fields match the field order and type of the preset template.
- Manually trigger a cache refresh operation, and confirm that the returned update timestamp matches the closing time range of the current trading day.
- Simulate a non-trading day access scenario, and confirm that the embedded component displays the empty data compatible state without showing error prompts.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
