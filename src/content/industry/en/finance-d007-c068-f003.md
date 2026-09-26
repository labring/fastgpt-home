---
title: Sharing and Embedding for Investment Platform Yield Data
slug: /en/industry/finance-d007-c068-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Investment Platform Yield Data
meta_description: Investment platforms obtain market and yield daily report data from official market APIs of stock exchanges and partnered third-party financial data
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Investment Platform Yield Data

## What the data for this category looks like
Investment platforms obtain market and yield daily report data from official market APIs of stock exchanges and partnered third-party financial data service providers. Teams complete full data calculation after market close at 15:00 on each trading day, and release official data the following morning (T+1). Each daily report uses a structured table format, and includes information for dozens to hundreds of investment targets. Fields include target code, target name, holding market value, daily transaction amount, daily profit change amount, and total cumulative profit. Monetary fields use Chinese Yuan as the unit. Profit change amount refers to the numerical change compared to the previous trading day.

## Constraints on sharing and embedding from these characteristics
Batch structured data, fixed update schedules, and personalized display requirements impose multiple constraints on sharing and embedding processes.
Embedded components must support dynamic refresh mechanisms to handle fixed-time batch updates on trading days, and avoid displaying outdated market data.
Embedded configurations must retain native typesetting styles for multi-field structured table formats, to prevent data disorder that harms reading experience.
Embedded parameters must support target filtering and field screening, to let investment platforms customize display content based on different users' holding ranges.
Embedding scenarios often use official websites, research pages, or customer backends, so solutions must support cross-domain requests and mainstream front-end framework integration specifications.

## How to set the configuration
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `hideQuote` | `true` | Investment platform market daily reports focus on displaying data itself. Hiding reference sources improves page cleanliness and aligns with professional standards for financial information display |
| `shareExpireTime` | `86400 seconds` | Market daily reports are single-day data. Setting a 24-hour expiration period avoids displaying outdated data while ensuring data security |
| `historyEnableInShare` | `false` | Investment platform market broadcasts mostly use general data. Displaying user personal historical records is unnecessary, and avoids leaking user privacy |
| `iframeAllowList` | `["https://your-invest-platform.com"]` | Restricting embedding of iframes to only the official domain of the investment platform prevents malicious misuse of shared links, and meets security requirements for financial scenarios |
| `cacheControl` | `no-cache, max-age=0` | Market data updates daily. Disabling caching ensures embedded pages always display the latest daily market data |
| `iframeHeight` | `600–800 pixels` | Adapts table height for displaying multiple targets, avoids content overflow or excessive blank space, and aligns with standard layouts on investment platform official websites |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: The published login-free shared link still uses the `http://localhost:3000/chat/` format and cannot be accessed normally. Cause: The correct deployment domain name was not set in the FastGPT `publicUrl` configuration item, so the generated shared link uses the local development address by default.
- Symptom: In the login-free embedding window of version 4.9.1, user historical records cannot be displayed, but historical conversation data can be queried in backend logs. Cause: The `historyEnableInShare` configuration item was incorrectly set to `false`, and this version disables historical record display in sharing scenarios by default. The corresponding parameter must be manually enabled.
- Symptom: After inserting the login-free window code into a VUE project, the page fails to load shared content normally, and cross-domain errors appear in the console. Cause: The deployment domain name of the VUE project was not added to the FastGPT `iframeAllowList` configuration item, so the browser blocks cross-domain requests.

## How to confirm the configuration is complete
- Copy the generated login-free shared link, check that the domain name is the official deployment address of the investment platform, with no residual local development addresses.
- Embed the configured iframe code into the test page of the investment platform, open the page, and confirm that the reference source module is not displayed, and the data table typesetting meets expectations.
- Log in to the FastGPT backend configuration page, verify that the values of `hideQuote`, `shareExpireTime`, `historyEnableInShare` and other parameters match the preset configurations.
- Wait for one data update cycle, refresh the embedded page, and confirm that the displayed market data is from the latest update batch.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
