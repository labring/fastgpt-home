---
title: Publishing Yield Rate Sharing and Embedding
slug: /en/industry/finance-d007-c026-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Publishing Yield Rate Sharing and Embedding
meta_description: Daily yield rate and market trend data for the publishing category comes from public market APIs of compliant financial data service providers, daily
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Publishing Yield Rate Sharing and Embedding

## What the data for this category looks like
Daily yield rate and market trend data for the publishing category comes from public market APIs of compliant financial data service providers, daily trading data disclosed by exchanges, and product operation reports from licensed financial institutions. Full updates are completed 1 to 2 hours after market close on each trading day, with no updates on non-trading days. The data uses a structured table format with fixed fields: report date, product ID, product full name, return indicator, net value change indicator, trading scale indicator. Each field uses a standardized measurement format, with no custom extended fields.

## What constraints these characteristics impose on sharing and embedding
The requirement for structured fixed fields means embedding components must support fixed column width configuration to avoid field misalignment or content overflow. The daily update feature means embedded data sources must use a refresh or cache period of no more than 24 hours to ensure data timeliness. The compliant data source requirement means explicit data attribution must be displayed, in line with information publishing standards for the publishing industry. The bulk publishing requirement means support for bulk generation of embedding code or templates to improve sharing efficiency for multiple daily reports.

## How to set configurations

| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `iframeAutoRefresh` | `3600 seconds` | The daily report updates once per day. A 1-hour refresh ensures data is synchronized within 2 hours after updates, balancing performance and timeliness |
| `embedShowSource` | `Enabled` | The publishing category requires compliant data source attribution to meet industry information publishing requirements |
| `embedFixedColumnWidth` | `80–120 pixels per column` | The structured daily report contains multiple fields. This width adapts to displays on both PC and mobile devices, avoiding field overflow |
| `apiRequestTimeout` | `15 seconds` | Financial data interfaces typically respond quickly. A 15-second timeout covers network fluctuations and avoids long wait times |
| `cacheControl` | `max-age=3600` | Daily report data updates once per day. A 1-hour cache reduces repeated requests and lowers server load |
| `embedBatchTemplate` | `Generate grouped by daily report date` | Publishing category daily reports are published in batches by date. Bulk configuration improves sharing efficiency |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and testing on deployment samples prior to final setup is recommended.

## Three common mistakes
- Issue: Fields are misaligned or content overflows after embedding. Cause: The `embedFixedColumnWidth` parameter is not configured, and the default adaptive width is used, which does not adapt to the multi-field structure of the publishing daily report.
- Issue: The embedded sharing link does not have identity authentication, and non-subscribed users can freely access the daily report content. Cause: The `shareLinkAuth` parameter is not configured. The open-source version does not enable sharing authentication by default, and no custom authentication logic is added.
- Issue: The embedded component does not update data for a long time, showing old daily reports. Cause: `iframeAutoRefresh` is set to an interval longer than 24 hours, or the `cacheControl` parameter is not configured, resulting in failed timely cache refresh, which does not meet the daily update requirement of the daily report.

## How to confirm configuration is complete
- Open the embedded page, check that all fields are displayed according to layout requirements, with no misalignment or overflow, and adjust the `embedFixedColumnWidth` parameter to meet requirements for the target display carrier.
- Wait for one trading day's update cycle, refresh the embedded page, confirm that the data matches the latest daily report, and adjust the `iframeAutoRefresh` and `cacheControl` parameters to match the update rhythm.
- Attempt to open the embedded page through an unauthorized access path, confirm that the content cannot be obtained, and add the `shareLinkAuth` parameter or custom authentication logic.
- Bulk generate embedding code, check that the embedding formats of multiple daily report links are consistent, and confirm that the `embedBatchTemplate` configuration takes effect.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
