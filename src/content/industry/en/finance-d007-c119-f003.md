---
title: Sharing and Embedding for Comprehensive Service Yield Data
slug: /en/industry/finance-d007-c119-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Comprehensive Service Yield Data
meta_description: Data for this category comes from licensed financial institution net value disclosure interfaces integrated via connection, and publicly filed product
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Comprehensive Service Yield Data

## What the Data for This Category Looks Like
Data for this category comes from licensed financial institution net value disclosure interfaces integrated via connection, and publicly filed product announcement information. Full synchronization of the previous trading day’s data is completed after each trading day closes. The data uses a structured table format, including fields such as product code, full product name, product type, unit net value, unit net value change amount, performance benchmark change amount, and total product scale. Unit net value is measured in yuan, change amounts are measured in yuan, and total product scale is measured in ten thousand yuan. A single document covers all compliant financial product data collected on the day.

## Constraints Imposed by These Characteristics for the "Sharing and Embedding" Workflow
Since the data consists of structured batch documents aggregated from multiple channels and covers multiple categories of financial products, embedding must support custom display fields and sorting rules to avoid redundant information interfering with reading. Since full updates are completed only once per day, embedded components need a reasonable cache duration to balance data timeliness and interface call pressure. Share links must support carrying filter parameters to enable targeted display by product type. At the same time, embedding structured data must retain the original field mapping relationship to prevent deviations between displayed content and original filed data.

## How to Configure Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `iframe_cache_ttl` | `86400 seconds` | Matches the daily data update schedule, prevents excessive cache duration from causing data lag, and avoids excessive interface calls from overly short cache durations |
| `share_custom_fields` | `product code,full product name,product type,unit net value,unit net value change amount` | Filters core display fields, meets the reading needs of users for multi-category products in comprehensive services, and reduces unnecessary information |
| `share_filter_enable` | `Enabled` | Supports filtering by product type, adapts to different users' needs to view specific category data, and matches the characteristic that a single document covers multiple categories |
| `export_markdown_disable` | `Enabled` | Avoids formatting chaos when exporting structured data, and also complies with requirements that prohibit full data export in some scenarios |
| `share_session_persist` | `Isolate by user ID` | Ensures that user sessions in different embedding scenarios do not interfere with each other, meets security requirements for multi-user access |
| `embed_responsive` | `100% width, 600-1200 pixel height` | Adapts to different webpage layouts, prevents embedded components from overflowing or displaying incompletely |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: The embedded page displays a Markdown export button that cannot be closed. Cause: `export_markdown_disable` is not set to Enabled, and the export function entry is retained by default.
- Symptom: Different users see the same chat session content when accessing the embedded component. Cause: The user ID isolation configuration for `share_session_persist` is not enabled, and session data is not isolated by visitor identity.
- Symptom: The fields displayed by the embedded component do not match the original filed data. Cause: The field mapping relationship for `share_custom_fields` is not configured correctly, and non-filed fields are mistakenly added to the display list, leading to data display deviations.

## How to Verify the Configuration Is Correct
- Access the share link, check that the displayed fields match the configured `share_custom_fields` list.
- Wait for a trading day to end, refresh the embedded page, and confirm that the data has been updated to the latest previous trading day’s content.
- Use two different access identities to enter the embedded component, check that their respective session records do not overlap.
- Check that the size of the embedded component adapts to the current webpage layout, with no overflow or incomplete display.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
