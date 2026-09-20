---
title: Model Access and Configuration for Duty-Free Yield Rates
slug: /en/industry/finance-d007-c019-f012
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Model Access and Configuration for Duty-Free Yield Rates
meta_description: Duty-free category yield-related data is primarily sourced from daily sales registration ledgers of off-island duty-free operating entities and
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Access and Configuration for Duty-Free Yield Rates

## What the data for this category looks like
Duty-free category yield-related data is primarily sourced from daily sales registration ledgers of off-island duty-free operating entities and officially publicized pricing information. Updates occur once daily, with complete data documents for the previous day generated after store close each day. The document structure is fixed, with each data entry containing SKU code, product category, procurement cost, listed selling price, actual settlement price, and unit gross profit fields. Monetary fields uniformly use CNY as their unit, and the unit gross profit field uses CNY per item as its unit, rather than percentage units.

## Constraints imposed on model access and configuration by these characteristics
These characteristics impose the following constraints on model access and configuration:
1. The fixed field structure requires strict configuration of field mapping rules during model access, to avoid field misalignment that prevents the model from correctly reading core data.
2. The daily update rhythm requires the scheduled task execution cycle to match the update frequency of the data source, and a task execution time window must be configured to avoid the period when daily data is generated, preventing the pulling of incomplete unprocessed data.
3. The requirement that unit gross profit uses CNY as its unit means the model's output numerical format must be uniformly set to a two-decimal monetary format, to avoid calculation deviations caused by unit confusion.
4. The unique nature of SKU codes requires configuring data deduplication rules to ensure only one yield data entry is generated per SKU, avoiding duplicate calculations that affect the accuracy of subsequent broadcasts.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `Scheduled Trigger Cycle` | `Once daily, execution time is 02:00-03:00 daily` | Matches the daily update rhythm of duty-free category data, which is generated after store close each day, avoids the period when daily data is generated, ensures complete data is pulled |
| `Field Mapping Rule` | `Strictly bind SKU code, procurement cost, listed selling price, actual settlement price, unit gross profit fields` | Corresponds to the fixed document structure of duty-free category data, avoids field misalignment that causes model calculation errors |
| `Batch Pull Limit` | `500 items per request` | Adapts to the conventional scale of duty-free SKU quantities, avoids interface timeouts caused by excessive single pull data volume |
| `Data Validation Rule` | `Validate that unit gross profit field is a non-negative numerical value` | Prevents abnormal data from flowing into the model, ensures that the basic data for yield rate calculations is compliant |
| `Model Output Format` | `Two-decimal CNY monetary format` | Matches the unit requirements of duty-free category data, avoids inconsistency between the output format and the data source |
| `Deduplication Configuration` | `Deduplicate based on SKU code field` | Corresponds to the unique nature of duty-free category SKUs, avoids duplicate calculations of single product yields |

> The parameter values provided on this page are common recommendations used as a starting point for configuration. Actual values are affected by material form, data volume and business rules, so specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common errors
- Phenomenon: A `400 Bad Request` error is returned when calling the model interface, with a prompt indicating that the field format does not match. Cause: The field mapping rules for the duty-free category were not configured correctly, and the unit gross profit field was incorrectly mapped to a non-CNY unit format, which does not meet the field requirements of the data source.
- Phenomenon: After modifying the workflow, the response results of the published channel are not updated, and still return content from the old logic. Cause: The corresponding channel was not republished after modifying the workflow, so the old version of the workflow bound to the published channel was not synchronized and updated.
- Phenomenon: The configured Tongyi Qianwen model cannot be selected when calling the model, and a `Model not found` error is returned. Cause: The API key and the corresponding model identifier were not correctly bound in the model access configuration, so the interface cannot recognize the specified model.

## How to confirm the configuration is complete
- Manually trigger a data pull task, and verify that the returned field list includes SKU code, procurement cost, listed selling price, actual settlement price, and unit gross profit, with field names matching the configured mapping rules.
- Pass a set of simulated duty-free category data, and confirm that the numerical format of the model output meets the preset CNY monetary requirements, with no abnormal formats.
- Modify the data processing logic in the workflow, republish the corresponding channel, and use the external access address to confirm that the returned result matches the modified logic.
- Initiate a model call test, and confirm that the interface does not return errors such as `401 Unauthorized` or `Model not found`, to verify the validity of the API configuration.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
