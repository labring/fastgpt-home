---
title: Tool Calling and Plugins for Personal Care Product Smart Due Diligence Reports
slug: /en/industry/finance-d008-c005-f008
page_type: Industry scenario page
article_section: Automated Due Diligence Reports
is_part_of: FastGPT Tech Center
meta_title: Tool Calling and Plugins for Personal Care Product Smart Due
meta_description: Personal care product due diligence data sources include regular cosmetic filing information from the National Medical Products Administration
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Tool Calling and Plugins for Personal Care Product Smart Due Diligence Reports

## What the data for this category looks like
Personal care product due diligence data sources include regular cosmetic filing information from the National Medical Products Administration, third-party test reports publicly released by brands, product compliance disclosure documents from e-commerce platforms, and spot check results from industry associations. Data update frequency adjusts based on filing processes, new product launches, and spot check results, with no fixed weekly or monthly cycle. A single due diligence document typically includes filing numbers, ingredient lists, production batch numbers, compliance marks, test items and their corresponding values. Ingredient content mostly uses mg/kg or % as units. Production batch numbers use string format. Filing validity periods use date format.

## What constraints these characteristics impose on tool calling and plugins
Since data sources are scattered across multiple platforms, tool calling requires configuring a multi-source aggregation plugin. The plugin must call filing interfaces, test report interfaces, and disclosure interfaces in sequence, and handle differences in return formats across data sources. Ingredient data has diverse units and industry-specific standards. The plugin must include built-in unit conversion logic to prevent numerical values from different data sources from being incomparable. Update frequency is not fixed, so incremental sync trigger rules must be configured. Only pull data again when filing or spot check results are updated, to avoid invalid calls consuming resources. Single documents have long text lengths. The tool calling context window must adapt to long text processing needs, to prevent due diligence information from being lost due to content truncation.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `pluginTimeout` | `120 seconds` | Personal care due diligence requires calling multiple data source types. The timeout threshold must cover the total time of multiple interface calls |
| `maxContext` | `8000–12000 characters` | Single personal care product due diligence report has a long text length, requiring adaptation for long context processing |
| `ragRecallTopK` | `Top 8 entries` | Personal care compliance data has many entries. Excessive recall will introduce redundant information that interferes with due diligence results |
| `unitAutoConvert` | `Enabled` | Personal care ingredient data units include mg/kg, %, etc. Standard units must be unified to ensure comparison validity |
| `multiSourceSyncInterval` | `Every 7 days` | Filing data update cycles are mostly quarterly. Incremental sync does not need to be frequent enough to cover the latest data |
| `apiRateLimit` | `10 requests per minute` | Multiple data source calls must comply with rate limiting rules of each platform, to avoid triggering access restrictions |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Failing to correctly pass the `prompt` field when calling the `/api/v1/chat/completions` interface, resulting in custom prompt words not taking effect. The cause is not adding the `system` or `prompt` parameter to the request body as required by documentation, only passing conversation content.
- Setting `pluginTimeout` to less than `30 seconds`, resulting in a `504 Gateway Timeout` error when calling multiple data sources. The cause is that personal care due diligence requires calling multiple independent data sources, and a short timeout threshold cannot cover the response time of all interfaces.
- Not enabling the `unitAutoConvert` configuration, leading to mixed ingredient data units in returned results and some fields displaying empty. The cause is that ingredient value units from different data sources are inconsistent, and lack of standardization processing prevents normal display.

## How to Verify Configurations Are Correct
- Initiate a due diligence test for a single personal care product, and check if ingredient data units in the returned results are unified to the preset standard, confirming there are no unit mixing issues.
- View plugin execution logs, confirming that calls to all associated data sources return valid data, with no `504` or `403` type errors.
- Pass a custom `prompt` parameter in the session interface request body, verifying that the returned result includes the compliance check dimensions specified in the prompt.
- Simulate concurrent calls from multiple users, observe interface return status codes, confirming no rate limiting related errors occur, and the concurrency limit matches the configured `apiRateLimit`.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
