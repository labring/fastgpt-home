---
title: Sharing and Embedding for Plastics and Rubber Yield Data
slug: /en/industry/finance-d007-c050-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Plastics and Rubber Yield Data
meta_description: Plastics and rubber market data comes from domestic commodity futures exchanges and spot trading platforms. Real-time trading quotes are pushed every
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Plastics and Rubber Yield Data

## What this category's data looks like
Plastics and rubber market data comes from domestic commodity futures exchanges and spot trading platforms. Real-time trading quotes are pushed every 15 minutes during trading days. Daily settlement prices and full market snapshots are released within one hour after the same day’s close. Each data document includes core fields such as product code, daily opening price, highest price, lowest price, closing price, settlement price, daily trading volume, position volume, and previous day’s settlement price. Futures quotes are priced in yuan per ton, with trading volume and position volume measured in trading lots. Spot data additionally includes fields such as regional trading average price and daily trading volume. Some regional quotes use non-standard unit identifiers.

## What constraints do these characteristics impose on sharing and embedding?
The high-frequency real-time market data and multi-field structure of plastics and rubber require embedding components to support content refresh at specified time intervals, to avoid displaying expired market data. The multi-dimensional fields require embedding configurations to accurately filter displayed fields, preventing redundant information from occupying limited page display space. Unit differences across different data sources require unified conversion or clear unit labeling during embedding, to avoid confusion between quotation rules for different categories. The non-standard field naming of some spot quotes requires embedding components to support custom field mapping, to adapt to display requirements for different business scenarios. The push characteristics of high-frequency real-time data require embedded iframes or components to have low-latency loading capabilities, to avoid page freezes caused by excessive requests.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `refreshInterval` | 300–900 seconds | Matches the 15-minute update interval of plastics and rubber market data, balancing data timeliness and server load |
| `displayFields` | Closing price, settlement price, trading volume, position volume | Covers core market indicators needed for decision-making, avoiding redundant fields that interfere with display |
| `customFieldMapping` | Map in the format `{"spot quotation":"tradePrice"}` | Adapts to non-standard field naming for plastics and rubber spot quotations, unifying data display formats |
| `crossDomainWhiteList` | Enterprise official website domain names, internal trading system domain names | Restricts embedding permissions to prevent unauthorized sites from calling market data |
| `unitConversionEnabled` | Enabled | Unifies price units across different data sources to yuan per ton, avoiding display confusion |
| `cacheExpireTime` | 600 seconds | Matches the update cycle of settlement data after market close, caching market snapshots for non-real-time scenarios |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material forms, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- The browser console prompts that set-cookie is invalid, or login status cannot be persisted after embedding. The cause is that the embedding site’s domain name is not added to the `crossDomainWhiteList` configuration, or the `allowCredentials` parameter is not enabled, causing the browser to block cross-domain cookies.
- Market fields displayed on the embedded page are missing or displayed abnormally. The cause is that the target field is not included in the `displayFields` configuration, or the field mapping relationship in `customFieldMapping` is incorrect.
- The embedded component remains unresponsive for a long time after loading, or frequent request errors occur. The cause is that `refreshInterval` is set too short, and the interface call frequency is not restricted, exceeding the platform’s current limiting threshold.

## How to Confirm the Configuration is Correct
- Open the preview interface of the embedded component, verify that the displayed fields match the `displayFields` list in the configuration, and the units are uniformly yuan per ton.
- Check network requests in the browser developer tools of the embedded site, confirm that the cross-domain interface returns a status code of 200, and there are no cookie interception prompts.
- Wait 15 minutes, then refresh the embedded page, confirm that the displayed data is updated to the latest market snapshot.
- For versions v4.8.10 and above, confirm that the `anonymousAccessEnabled` configuration for password-free embedding is enabled, allowing data loading without repeated login.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
