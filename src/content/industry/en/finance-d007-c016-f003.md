---
title: Sharing and Embedding for Photovoltaic Yield and Market Daily Reports
slug: /en/industry/finance-d007-c016-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Photovoltaic Yield and Market
meta_description: Photovoltaic yield and market daily report data is sourced from grid-connected photovoltaic power station monitoring terminals, grid settlement
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Photovoltaic Yield and Market Daily Reports

## What the data for this category looks like
Photovoltaic yield and market daily report data is sourced from grid-connected photovoltaic power station monitoring terminals, grid settlement systems, and regional meteorological monitoring platforms. Data is updated on a fixed daily schedule, producing complete reports for the previous natural day. Each daily report includes fields such as unique power station identifier, statistical date, total power generation, self-consumed power, grid-fed power, grid settlement electricity price, self-consumption revenue, total revenue, and more. Power generation fields use kilowatt-hours as their unit. Revenue fields use Chinese yuan as their unit. Associated installed capacity fields use kilowatts as their unit. All fields are structured numerical types, with no free text content.

## What constraints these characteristics impose on sharing and embedding
Photovoltaic daily report data features tightly linked multiple fields, daily updates, and some fields involve power station operations and grid settlement details. These characteristics create multiple constraints during sharing and embedding.
First, core fields such as settlement electricity price and total revenue have a direct calculated binding relationship. Splitting or sharing individual fields separately will break the logical integrity of the data.
Second, daily updated reports require embedded content to use the latest daily version. If static caching is used, cache duration must be controlled within 24 hours to avoid displaying outdated data.
In addition, revenue data for some power stations involves internal operational sensitive information. Sharing and embedding workflows must include fine-grained permission verification, only allowing authorized entities to access corresponding reports.
At the same time, each report contains multi-dimensional structured fields. Embedding into external pages requires reserving sufficient layout space to adapt to field display.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| ---- | ---- | ---- |
| `share_expire_time` | `86400 seconds` | Matches the daily update schedule of photovoltaic daily reports, ensures share links are valid only for the current day, prevents access to outdated data |
| `iframe_allow_origin` | Specify a list of business domain names | Restricts only authorized business pages to embed photovoltaic daily report content, reduces the risk of sensitive operational data leaks |
| `share_require_password` | Enable as needed | For reports involving internal settlement data, use password verification to control access scope, aligns with the sensitive nature of photovoltaic data |
| `cache_control_header` | `max-age=3600 seconds` | Balances data freshness and loading performance, avoids excessive cache duration leading to data lag, or insufficient duration leading to request overload |
| `share_show_source_link` | Disable as needed | Simplifies the display content of embedded pages, avoids irrelevant links interfering with the core information display of photovoltaic daily reports |
| `share_require_login` | `false` (default disabled) | Adapts to internal sharing scenarios for photovoltaic daily reports, only enable when strict permission control is required, matches the sensitivity level of the data |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After enabling password-free sharing, accessing the share link still prompts a password input box. Cause: The password verification switch was not turned off when generating the share link, or the link carries cached historical password parameters.
- Symptom: Photovoltaic daily report pages embedded via iframe exhibit field overflow or layout disorder. Cause: The embedded page was not adapted to FastGPT's default page margins and font styles, or cross-domain permissions for `iframe_allow_origin` were not configured correctly.
- Symptom: In FastGPT 4.9.6, after disabling the source view function for share links, the button still appears when accessing the link. Cause: The application's `share_show_source_link` configuration was not updated synchronously, or an older version of the share link generation logic was used.

## How to Confirm Configurations Are Set Correctly
- Generate a test share link, then verify that the link's expiration time matches the configured `share_expire_time`.
- Attempt to embed share content on an unauthorized domain name, confirm that loading fails or triggers a cross-domain block.
- Generate a share link after disabling password verification, ensure no identity verification popup appears when accessing the link.
- Embed the test page, then verify that field layout meets custom style requirements with no overflow or disorder.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
