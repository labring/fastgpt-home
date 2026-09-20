---
title: Sharing and Embedding of Securities Yield Data
slug: /en/industry/finance-d007-c133-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Securities Yield Data
meta_description: Data sources for securities market data primarily come from official market interfaces of domestic and overseas stock exchanges, and compliant
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Securities Yield Data

## What This Type of Data Looks Like
Data sources for securities market data primarily come from official market interfaces of domestic and overseas stock exchanges, and compliant third-party financial data service providers.
There are two data update modes: real-time intraday push and post-market snapshot update.
During trading hours, latest transaction and yield data refreshes every few seconds.
Post-market, full daily market archives are generated.
Each data entry includes fields such as security code, security abbreviation, daily price change yield, opening price, closing price, trading volume, and transaction amount.
Yield fields use percentage units, with fixed decimal precision for values.
The data structure follows general financial information disclosure standards.
Field names and units cannot be adjusted arbitrarily, as this will harm data readability and compliance.

## Constraints for Sharing and Embedding Workflows
The real-time update nature of securities data requires shared and embedded components to support high-frequency data synchronization.
Static cached shared links cannot meet the real-time requirements of intraday market data. A scheduled refresh mechanism must be configured.
The presence of multiple specialized fields and units requires sharing configurations to retain the original data format.
Avoiding field loss or unit conversion errors prevents distortion of displayed financial data.
Compliance requirements for financial data restrict permission configurations for shared embeds.
Access permissions must be differentiated between public sharing and internal embedding to prevent unauthorized users from accessing sensitive market data.
In scenarios with high concurrent embeds, frequent market requests increase server load. Request concurrency per node must be limited to avoid triggering interface rate limits or performance overload.

## How to Set Configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `shareLanguage` | Specify language per target audience, supports `zh-CN`/`en-US` | Meet interface language needs of users in different regions, avoid binding to the console's main language |
| `refreshInterval` | 300-600 seconds | Match securities data's intraday update rhythm, balance real-time performance and server load |
| `hideChatIntro` | `true` (custom scenarios) or `false` (default scenarios) | Remove or retain the default session prompt text for shared links, adapt to customized display needs |
| `requireLogin` | `false` (public sharing) or `true` (internal embedding) | Differentiate between public access and permission-controlled scenarios, comply with compliance requirements for financial data sharing |
| `apiRateLimit` | 100 requests per minute per node | Limit API request volume per node, avoid rate limits triggered by high concurrent iframe loading |
| `embedMaxConcurrent` | Calibrate based on actual testing | Adapt to concurrent carrying capacity of different server configurations, avoid performance overload |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Issue: The interface language of shared links is bound to the console's main language, and cannot be individually adapted for overseas users. Cause: The `shareLanguage` parameter is not set, and the default inherits the console's global language configuration.
- Issue: After embedding a large number of session windows via iframe, the server returns a 429 Too Many Requests error. Cause: The `apiRateLimit` and `embedMaxConcurrent` parameters are not configured, and concurrent request volume is not restricted.
- Issue: Users accessing a login-free shared link cannot view chat records. Cause: The `shareLogEnabled` parameter is not enabled, and shared session log collection is not activated.

## How to Verify Correct Configuration
- Open the configured shared link, check if the interface language matches expectations, to confirm the `shareLanguage` configuration takes effect.
- Load multiple iframe embedded pages in batches, observe server logs for 429 errors, to confirm the rate limit configuration takes effect.
- Access the shared link and initiate a session, check if the default prompt text is displayed, to confirm the `hideChatIntro` configuration takes effect.
- Enter the background session log page, filter session records for the corresponding shared link, to confirm log collection functions normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
