---
title: Sharing and Embedding for Medical Device Yield Rates
slug: /en/industry/finance-d007-c034-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Medical Device Yield Rates
meta_description: Data sources for medical device yield rate and market daily reports include public data published on domestic medical device centralized procurement
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Medical Device Yield Rates

## What the Data for This Category Looks Like
Data sources for medical device yield rate and market daily reports include public data published on domestic medical device centralized procurement platforms, public market APIs for the pharmaceutical industry, and public disclosure information from listed medical device entities. Full market data updates are completed after each trading day’s close, and centralized procurement-related updates are pushed in real time following official publication timelines. The document uses a structured daily report format, containing the following fields: medical device category code, generic name, daily trading average price (unit: yuan per piece), daily highest price (unit: yuan per piece), daily lowest price (unit: yuan per piece), daily trading volume (unit: batches), affiliated segment track tag.

## Constraints on Sharing and Embedding Posed by These Characteristics
The structured format of the medical device market and yield rate daily report creates multiple constraints for sharing and embedding.
Structured data with multiple fields and clear units requires embedded front-end components to match the unit display for each corresponding field, to avoid misalignment between values and units.
The update schedule, which combines fixed post-close updates and real-time pushes, requires embedded share links or iframes to be configured with dynamic refreshes matching the correct frequency. Outdated data will be displayed otherwise.
Some data is sourced from official centralized procurement platforms. Embedding scenarios must comply with the compliance scope of data publication, or permission verification interception will be triggered.
The diversity of segment track tags requires embedded components to support adaptive field width, to prevent content overflow that impairs readability.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| ---- | ---- | ---- |
| `allowedEmbedOrigins` | Only add compliant domain names belonging to the business | Restrict unauthorized scenarios from embedding medical device data, and comply with compliance requirements for public data usage |
| `shareRefreshInterval` | `300 seconds` | Match the daily post-close update schedule for medical device market data, balancing data timeliness and server resource consumption |
| `customFieldSort` | `category code, generic name, daily trading average price, daily highest price, daily lowest price, daily trading volume, affiliated segment track` | Align with the common reading order for medical device procurement and market viewing, improving information acquisition efficiency |
| `streamOutput` | Enabled | Enable real-time pushing of updated market data to embedded pages, reducing page loading latency |
| `maxEmbedFieldNum` | `7 fields` | Match the total number of fields in the current structured daily report, avoiding redundant page display that affects readability |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules, and require specific analysis for specific issues. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Embedded pages return a `403 Forbidden` status code and fail to load data. The cause is that the `allowedEmbedOrigins` parameter is not configured, or the added domain name does not match the actual embedding scenario, triggering cross-domain permission verification interception.
- Embedded pages display medical device data that has not been updated for a long time. The cause is that `shareRefreshInterval` is configured as `0` or automatic refresh is not enabled, resulting in the page only displaying initial cached data after loading.
- Set-cookie requests on embedded pages fail to retain user session status. The cause is that the embedded iframe is not configured with correct sandbox permissions, or `allowedEmbedOrigins` does not include the current business domain name, and the browser restricts third-party cookie writing.

## How to Verify Successful Configuration
- Copy the generated iframe embedding code and paste it into a test page corresponding to the configured allowed domain name, check whether the page can normally load medical device market data.
- Wait for the configured refresh interval duration, refresh the test page, confirm that the data has been updated to the latest post-close or centralized procurement publication data.
- Open the network panel in the browser developer tools, check whether the response header of the embedded request contains correct cookie permission configuration, confirm that third-party cookies are not intercepted.
- Adjust the custom field sort configuration item, refresh the test page, confirm that the field display order has taken effect according to the configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
