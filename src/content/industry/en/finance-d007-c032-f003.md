---
title: Sharing and Embedding of Chemical Raw Material Yield Rates
slug: /en/industry/finance-d007-c032-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Chemical Raw Material Yield Rates
meta_description: Data sources for chemical raw material yield-related data include domestic bulk commodity spot trading platforms, public market APIs from futures
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Chemical Raw Material Yield Rates

## What the data for this category looks like
Data sources for chemical raw material yield-related data include domestic bulk commodity spot trading platforms, public market APIs from futures exchanges, and monitoring databases from the China Chemical Industry Association. Spot products update daily market data after 16:00. Futures contracts update transaction data every 5 minutes. The data is delivered in structured table format, with each row corresponding to one single-specification chemical raw material. Fields include unified commodity code, Chinese product name, production origin, quality grade, daily settlement price, 7-day average settlement price, 30-day average settlement price, and price change value. Settlement price is measured in yuan/ton. Price change value is measured in yuan/ton.

## Constraints imposed by these characteristics on sharing and embedding
Data aggregation across multiple interfaces is required. Multi-data source synchronization logic must be configured during embedding, otherwise some category data will be missing. Different data have large differences in update frequencies. Spot data cache duration should not be too long. Futures data cache cycle needs to be shortened, otherwise outdated market data will be displayed. Fields include multi-dimensional average values and change values. Targeted display field configuration is required to avoid excessive redundant information on pages. Units are uniformly set to yuan/ton. Consistent unit display must be ensured during embedding to prevent user confusion over pricing standards for different categories.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embedCacheTime` | Set to 3600 seconds for spot scenarios, 300 seconds for futures scenarios | Matches the update frequencies of the two data types to avoid displaying outdated market data |
| `sharePageLang` | `zh-CN` or `en-US`, specify as needed | Unifies the display language of embedded pages to adapt to different usage scenarios |
| `shareChatIdEnable` | Enabled | Supports session reuse to meet multi-round interaction requirements |
| `customVariableVisible` | Set to `true` during debugging, adjust as needed after launch | Facilitates debugging of custom variable configurations on the share page |
| `embedSpeechInputTimeout` | Set to 5000 milliseconds | Matches the normal response duration of voice input to avoid misjudging delays |
| `sharePageDisplayFields` | Configure as commodity code, product name, settlement price, price change value | Only displays core fields to optimize page display effects |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfiguration Issues
- Symptom: Embedded page display language does not switch as expected, and remains in the default Chinese. Cause: The `sharePageLang` parameter is not configured, or the parameter value does not follow the `zh-CN`/`en-US` format.
- Symptom: Login-free share pages cannot reuse sessions, and each opening displays a brand new conversation. Cause: The `shareChatIdEnable` parameter is not enabled, and session identifiers are not generated or passed.
- Symptom: No response after voice input, or long press timer stays at 00:00. Cause: The `embedSpeechInputTimeout` parameter value is smaller than the actual network response duration, or voice input retry logic is not enabled.

## How to Verify Correct Configuration
- Access the embedded page, confirm that the page display language matches the configured value of the `sharePageLang` parameter.
- Open the same login-free share link twice, confirm that session context can be reused across both openings.
- Perform a voice input operation, confirm that input content can be submitted normally and there is no prolonged unresponsiveness.
- Enter the debugging interface of the login-free share page, confirm that custom variable configuration parameters load normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
