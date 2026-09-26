---
title: Forms and Interactions for Industrial Metal Yields
slug: /en/industry/finance-d007-c059-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Industrial Metal Yields
meta_description: Industrial metal market data originates primarily from official market APIs of the Shanghai Futures Exchange and London Metal Exchange, as well as
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Industrial Metal Yields

## What This Category’s Data Looks Like
Industrial metal market data originates primarily from official market APIs of the Shanghai Futures Exchange and London Metal Exchange, as well as structured data sources from domestic non-ferrous metal industry information institutions. Data refreshes every 5 minutes during continuous trading hours, and the system generates a complete daily market snapshot after daily market close. Each document covers daily market data for one industrial metal variety, using JSON or CSV structured format. It includes fields such as variety name, daily opening price, highest price, lowest price, settlement price, latest price, trading volume, and position volume. Price-related fields use yuan/ton as their unit, trading volume uses lots, and position volume uses tons.

## Constraints Imposed on Forms and Interactions by These Characteristics
The multi-source nature and high-frequency update rhythm of industrial metal market data require the form to support switching between multiple data sources and visual display of refresh status. This prevents triggering API rate limits from repeated refresh request submissions. The requirement that each document corresponds to a single variety means the form must preset variety filtering options, and only display fields for the currently selected variety. This avoids loading irrelevant data. Fixed fields and unit requirements mean the form should pre-set unit suffixes, eliminating the need for manual user input and reducing input error rates. The fixed field structure of structured data allows the form to configure optional display fields, adapting to content needs across different broadcasting scenarios. The high-frequency update characteristic also requires the form to set a reasonable call interval threshold. This prevents exceeding the call frequency limits of data source APIs, ensuring stable data acquisition.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `defaultKnowledgeBase` | Bind to the dedicated industrial metal market knowledge base | Isolate market data of different categories to avoid cross-category data confusion |
| `recallTopK` | `1 entry` | Each document corresponds to the daily market data of a single variety, so there is no need to recall multiple entries of data |
| `PARSE_FILE_TIMEOUT_SECONDS` | `30 seconds` | Exchange API response delays typically fall within the 10-20 second range; 30 seconds covers most abnormal scenarios |
| `formRefreshInterval` | `15 minutes` | Industrial metal market data refreshes every 5 minutes, but broadcasting does not require high frequency. 15 minutes balances timeliness and API load |
| `formFieldMaxCount` | `8 fields` | Core field count of a single market data document, avoids interface overload |
| `RATE_LIMIT_INTERVAL` | `10 seconds per request` | High-frequency refreshes will trigger exchange API rate limits; a 10-second interval prevents repeated requests from being blocked |

> The parameter values provided on this page are standard starting recommendations. Actual values may vary based on material forms, data volume and business rules. Specific situations require specific analysis. It is recommended to test on your own samples before finalizing configuration.

## Three Common Misconfigurations
- Symptom: The market data returned after form submission does not match the selected variety, and some fields are empty. Cause: The binding rules for `defaultKnowledgeBase` are not configured correctly, resulting in calls to knowledge bases for non-industrial metal categories, or the variety parameter corresponding to the global variable is not bound correctly.
- Symptom: After setting `stream: true` for API calls, the final complete result cannot be obtained correctly, only partial fragments are returned. Cause: The response is not processed according to FastGPT's streaming return format, all streaming data packets are not spliced, or the end marker of the response is not handled correctly.
- Symptom: Interface errors occur after frequent form refreshes, with status code 429 Too Many Requests. Cause: The `RATE_LIMIT_INTERVAL` parameter is not configured, and the refresh interval is too short, triggering the rate limit rules of the data source API.

## How to Verify Correct Configuration
- Open the FastGPT form configuration page, check whether `defaultKnowledgeBase` is bound to the dedicated industrial metal market knowledge base, and confirm that the bound knowledge base only contains structured documents related to industrial metals.
- Manually trigger a form refresh, check whether the returned market data includes the preset core fields, and that the units match the standard units for industrial metal market data.
- Trigger form refreshes three consecutive times, check whether interface errors are triggered, and confirm that the `RATE_LIMIT_INTERVAL` setting meets the data source API call limit requirements.
- Switch the variety option in the form, confirm that the returned market data corresponds to the selected industrial metal variety, with no cross-variety data included.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
