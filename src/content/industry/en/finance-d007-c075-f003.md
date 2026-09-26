---
title: Sharing and Embedding for Vehicle Gross Margin Data
slug: /en/industry/finance-d007-c075-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding for Vehicle Gross Margin Data
meta_description: Vehicle gross margin related data is mainly sourced from the China Association of Automobile Manufacturers terminal monitoring database, automaker
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding for Vehicle Gross Margin Data

## What this category’s data looks like
Vehicle gross margin related data is mainly sourced from the China Association of Automobile Manufacturers terminal monitoring database, automaker sales settlement systems, and third-party retail market platforms. Data updates follow a schedule where full data synchronization for the previous day is completed each early morning. The documentation uses structured table format, with each row corresponding to one passenger vehicle model available for sale. Included fields are: vehicle identification code, vehicle name, terminal transaction average price, per-unit manufacturing cost, per-unit sales expense, per-unit actual gross profit, daily average transaction price change amount, and monthly cumulative gross profit proportion value. Price-related fields use yuan as the unit. Gross profit-related fields use yuan as the unit. The change amount uses yuan as the unit.

## What constraints do these characteristics impose on the sharing and embedding workflow
The structured row-based storage, daily full data updates, and multi-field attributes of vehicle gross margin data create multiple constraints for the sharing and embedding process. Daily full data updates require embedded components to connect to real-time synchronized data source interfaces. Static cached files cannot be used as a dependency. The structure where each row corresponds to a single vehicle model requires embedded configurations to support filtering results by vehicle identification. This avoids page bloat caused by full data dumps. The multi-field feature with unified yuan units requires embedded components to pre-configure field mapping rules. This ensures field and unit matching during display without additional format conversion. Additionally, the relatively long length of individual data entries requires embedded components to support horizontal scrolling or adaptive layouts. This prevents content overflow.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `ALLOWED_ORIGINS` | `["https://*.auto-finance.com", "https://auto-report.com"]` | Restrict valid usage domains for embedded components, to prevent unauthorized sites from stealing embedded resources |
| `MAX_RETRIEVE_COUNT` | Top 10 entries | Match the typical number of vehicle models displayed on a single page, to avoid loading lag caused by excessive embedded content |
| `PARSE_FIELD_MAPPING` | `vehicle model name: car_name, terminal transaction average price: price, single unit actual gross profit: gross_profit, daily change amount: change` | Match data source field names to display label names, to ensure accurate field display after embedding without additional format processing |
| `SHARE_CARD_ASPECT_RATIO` | `16:9` | Adapt to layout specifications for most embedded display scenarios, to avoid content overflow or improper scaling |
| `SHARE_PAGE_TIMEOUT_SECONDS` | `30 seconds` | Reserve sufficient time to pull and render vehicle data, to accommodate synchronization time for daily full dataset updates |
| `RETRIEVE_SIMILARITY_THRESHOLD` | `0.75` | Filter low-relevance vehicle model data, to ensure matching between embedded display results and query requirements |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: Embedded vehicle model data displays cross-row splicing or field misalignment. Cause: The `PARSE_FIELD_MAPPING` parameter is not configured, resulting in a mismatch between data source fields and display labels, or row-wise document parsing rules are not enabled.
- Phenomenon: Embedded page load times out, returning a `504 Gateway Timeout` error code. Cause: The `SHARE_PAGE_TIMEOUT_SECONDS` configuration value is too small, failing to accommodate the data pull time for full vehicle datasets.
- Phenomenon: The number of vehicle models returned in embedded results exceeds expectations. Cause: The `MAX_RETRIEVE_COUNT` configuration value is set too high, or no vehicle filtering conditions are added, resulting in recall of the full dataset.

## How to Confirm Correct Configuration
- Access the embedding management page in the FastGPT backend, check the `ALLOWED_ORIGINS` configuration item, and confirm that target embedding domain names have been added.
- Generate embedding code and deploy it to a test site, verify that field displays match data source fields after loading, and adjust the `PARSE_FIELD_MAPPING` parameter until matches are achieved.
- Initiate a vehicle model query request, check that the number of returned results falls within the range configured for `MAX_RETRIEVE_COUNT`, and adjust the parameter until expectations are met.
- Simulate a high-latency network environment, test that the embedded page load completes within the preset timeout period, and adjust the `SHARE_PAGE_TIMEOUT_SECONDS` parameter to a reasonable range.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
