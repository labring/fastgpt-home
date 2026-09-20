---
title: Sharing and Embedding of Household Goods Yield Rates
slug: /en/industry/finance-d007-c056-f003
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Sharing and Embedding of Household Goods Yield Rates
meta_description: Household goods yield-related data comes from official monitoring databases of the light manufacturing industry, aggregating sales data from offline
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Sharing and Embedding of Household Goods Yield Rates

## What the data for this category looks like
Household goods yield-related data comes from official monitoring databases of the light manufacturing industry, aggregating sales data from offline retail terminals and online e-commerce platforms. Data is updated daily at midnight, syncing full datasets from the previous calendar day. The documentation uses a structured table format, where each row corresponds to a household goods sub-category. Fields include sub-category ID, sub-category name, statistical period, month-over-month change value, year-over-year change value, and data sample size. Change values use relative change units, with no percentage notation.

## What constraints these characteristics impose on sharing and embedding workflows
Since household goods data updates daily, embedded share pages must set a refresh mechanism that matches the update cadence to avoid displaying expired data. The structured table document format requires embedded containers to adapt to fixed column widths, preventing misaligned field display. The presence of the sub-category ID field means share links must support carrying sub-category filter parameters to enable targeted data display. The unified relative change unit requirement means embedded configurations must fix the display format, and unit types cannot be randomly replaced. Data is aggregated from multi-channel retail sources, so embedded displays must retain the data statistical period field to ensure complete information.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `shareRefreshInterval` | `86400 seconds` | Matches the daily update cadence of household goods data, ensuring the latest data is displayed each day |
| `iframeContainerWidth` | `100% adapts to parent container` | Fits the multi-column structure of household goods data tables, avoiding horizontal scrolling or field misalignment |
| `shareFilterParams` | `["subCategoryId", "statPeriod"]` | Corresponds to the sub-category ID and statistical period fields of household goods data, supporting targeted filtered displays |
| `displayUnitType` | `relativeChange` | Matches the change value unit format of household goods data, ensuring consistent display |
| `cacheControl` | `no-cache` | Avoids caching expired data, adapting to the characteristics of the daily updated data source |
| `showDataSourceTag` | Enabled | Retains multi-channel source tracing information for household goods data, ensuring data credibility |

> The parameter values provided on this page are all common recommended starting points for determining configurations. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: Clicking a household category data link in an AI reply fails to trigger a jump to the local application system. Cause: The share link does not have a local application jump callback parameter configured, and only uses the default FastGPT share page jump logic.
- Symptom: Data tracing links in the embedded page do not render correctly. Cause: The `showDataSourceTag` configuration is not enabled, or the configured data source tag format does not meet requirements.
- Symptom: Household goods data displayed on the embedded page does not match the latest daily data. Cause: An overly long cache interval is set, which does not match the daily update cadence of household goods data.

## How to Confirm Configurations Are Set Correctly
- Check the share link to confirm it carries filter parameters matching the household goods data fields.
- Load the embedded container to confirm the table layout adapts to the container size, with no field misalignment or content truncation.
- Refresh the embedded page to confirm the data statistical period matches the current date.
- Click the data tracing tag to confirm the link can jump normally to the corresponding data source page.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
