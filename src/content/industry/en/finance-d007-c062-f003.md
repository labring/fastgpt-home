---
title: Sharing and Embedding of Advertising Marketing Yield Rates
slug: /en/industry/finance-d007-c062-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Advertising Marketing Yield Rates
meta_description: Advertising marketing yield rate data comes from ad campaign management systems and third-party ad performance monitoring platforms. These platforms
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Advertising Marketing Yield Rates

## What this type of data looks like
Advertising marketing yield rate data comes from ad campaign management systems and third-party ad performance monitoring platforms. These platforms update data daily at midnight, completing full aggregation and refresh of the previous day’s data. Each daily report document splits data by delivery campaign, media channel, and delivery time slot, and includes these fields: campaign ID, media channel name, delivery time slot, cumulative impressions, cumulative clicks, cumulative conversions, total ad spend, total revenue, and revenue per spend ratio. Monetary fields use Chinese Yuan as the unit. Count fields use "times" or "units" as the unit.

## What constraints do these characteristics impose on sharing and embedding
The daily full data refresh requirement for advertising marketing yield rate data means sharing and embedding modules must support scheduled data source synchronization to avoid returning outdated historical data. Structured data split by delivery channel means embedded chatbots must support filtering recalled content by channel and time slot parameters to avoid returning redundant irrelevant data. Support for multiple data sources means configuration options must support binding data sources from multiple ad monitoring platforms to integrate cross-channel yield rate data. The need to display monetary fields means embedding modules must support formatted monetary display, and also require permission controls to prevent sensitive data leaks. Additionally, marketing scenarios often require sharing data with external customers or embedding it in internal reporting systems, which means embedded interactive functions must adapt to the display logic of external pages.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `datasourceSyncInterval` | `86400 seconds` | Matches the daily full update cadence of advertising marketing yield rate data, ensuring the API and embedding module return the most recent daily data |
| `recallTopK` | `Top 8–12 entries` | Ad marketing daily reports have many data entries when split by delivery channel, limiting recalled entries to avoid returning redundant information |
| `similarityThreshold` | `0.78–0.82` | Accurately match user-queried delivery channels or time slots, filtering out irrelevant daily report data |
| `shareApiAuth` | `Enable key verification` | Controls access permissions for shared APIs, only allowing authorized marketing systems to call interfaces |
| `iframeSandbox` | `allow-same-origin allow-scripts allow-popups` | Configures iframe security permissions, supports external image zoom functionality while avoiding cross-domain risks |
| `enableExternalImageZoom` | `Enabled` | Supports zooming images in responses within the external container of the embedded page, resolving the issue of blurry viewing within the iframe |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Some queries fail to recall knowledge base data when calling the shared API, but recall works normally in the debug page. This occurs when the `datasourceSyncInterval` parameter is not configured, and the data source used by the API does not synchronize the latest advertising marketing daily report data on a scheduled basis, resulting in no matching latest data when the API is called.
- When the chatbot embedded in a webpage returns images, users can only zoom in within the iframe and cannot view them full screen in the external container. This happens when the `enableExternalImageZoom` configuration item is not enabled, or the iframe sandbox permissions do not include the `allow-popups` parameter.
- After modifying the embedded frontend code, the browser console displays "Connection blocked because it was initiated by a public page and intended to connect to a device or server on the local network". This occurs when the `iframeAllowList` parameter is not configured, or the allowed domains do not include the domain where the custom frontend code is deployed, resulting in the browser's cross-origin security policy blocking the request.

## How to Verify Successful Configuration
- Call the shared API to query data for a preset delivery channel, and verify that the returned results match the recall results from the debug page.
- Send a test question containing an image in the chatbot of the embedded page, click the image to confirm that it can be zoomed and viewed outside the iframe container.
- Check the browser console and API logs to confirm there are no prompts for authentication failures, cross-domain interception, or data source synchronization exceptions.
- Wait for the data source refresh interval to end, then call the API again to verify that the data update time matches the official daily report release time.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
