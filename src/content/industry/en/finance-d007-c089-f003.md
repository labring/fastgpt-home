---
title: Sharing and Embedding of Oil and Gas Extraction Yield Data
slug: /en/industry/finance-d007-c089-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Oil and Gas Extraction Yield Data
meta_description: Data sources for oil and gas extraction yield data primarily come from industry association public statistics, oil and gas field production management
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Oil and Gas Extraction Yield Data

## What this category of data looks like
Data sources for oil and gas extraction yield data primarily come from industry association public statistics, oil and gas field production management systems, and commodity exchange market data APIs.
Full daily project data for the previous day is updated every early morning. Cumulative revenue statistics are updated monthly.
The document uses a standardized structured table format, with fields including project unique identifier, production block number, daily production volume, unit extraction cost, linked commodity price, and per-project revenue.
Field units follow industry standard metrics such as cubic meters, yuan per cubic meter, and no non-standard custom units are used.
Only structured fields are included, with no rich text or unstructured content.

## What constraints these characteristics impose on the sharing and embedding workflow
These data characteristics impose three core constraints on the sharing and embedding workflow.
First, multi-source structured fields must match the field naming rules of different business systems. Custom field aliases must be configured during embedding to adapt to business systems.
Second, the daily update schedule requires that the cache period of sharing links and embedded components aligns with the data update cycle. This prevents display of expired previous-day data.
Third, the standardized table structure requires retaining original column widths and alignment rules during embedding. This prevents data misalignment that reduces readability.
Additionally, professional measurement units must be automatically associated during display. This avoids misinterpretation of data meanings by non-industry users.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `embed_cache_expire` | `86400 seconds` | Oil and gas extraction yield daily reports are updated daily. Cache duration matches the data update cycle to avoid displaying expired data |
| `share_link_validity` | `24 hours` | Daily report data is updated daily. Share link validity period aligns with the data update schedule to prevent returning outdated market data |
| `embed_strict_format` | `Enabled` | Oil and gas extraction data uses standardized structured tables. Enabling this retains original column widths, alignment rules, and field order |
| `embed_allow_origin` | `Enterprise intranet domain + public sharing domain` | Distinguishes internal use and external sharing scenarios, controls the scope of embedding permissions |
| `parse_field_unit_display` | `Enabled` | Oil and gas extraction data includes professional units. Enabling this automatically displays field units to improve data readability |

> The parameter values provided on this page are common recommended starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: Embedded components display empty fields or missing units after loading. Cause: The `parse_field_unit_display` configuration is not enabled, causing professional units to not display automatically, or field alias mapping configuration is incorrect.
- Phenomenon: After restarting a Docker-deployed instance, previously generated share links become inaccessible or disappear from the workspace. Cause: Share link data is not persistently stored to a mounted volume, and temporary cache is cleared when the container restarts.
- Phenomenon: Table column alignment is disordered on embedded pages. Cause: The `embed_strict_format` configuration is not enabled, causing the parsed table format to be overwritten by default browser styles, losing original column widths and alignment rules.

## How to confirm configurations are correctly set
- Generate a test share link, access it, and verify that the data update time matches the release time of the previous day’s industry daily report. This confirms the cache configuration is effective.
- Specify a test domain in the embedded code, test cross-domain embedding functionality, and confirm that the `embed_allow_origin` configuration matches the usage scenario.
- View the display content of the embedded component, confirm that field units are automatically displayed, and confirm that the `parse_field_unit_display` configuration is enabled.
- Wait 24 hours, refresh the embedded page, confirm that the data has been updated to the latest daily content, and confirm that the cache cycle configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
