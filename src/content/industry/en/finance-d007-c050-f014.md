---
title: Forms and Interactions for Plastics and Rubber Yield Rates
slug: /en/industry/finance-d007-c050-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Forms and Interactions for Plastics and Rubber Yield Rates
meta_description: Plastics and rubber market and yield rate data comes from domestic bulk commodity spot trading platforms, official futures exchange APIs, and industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Forms and Interactions for Plastics and Rubber Yield Rates

## What this category's data looks like
Plastics and rubber market and yield rate data comes from domestic bulk commodity spot trading platforms, official futures exchange APIs, and industry association research channels. Update frequency differs between trading and non-trading hours: Spot data is finalized for the day by 17:00 on each trading day. Futures data updates in real time during trading hours. Full daily report data is generated at 20:00 each trading day. The structure of a single daily report document includes product identifier, trading market category, benchmark price, daily fluctuation value, daily trading volume, and industry supply and demand reference value. Field units are uniformly set as yuan/ton for benchmark price and fluctuation value, lots for trading volume, and ten thousand tons for supply and demand reference value. No additional custom unit requirements apply.

## Constraints Imposed on Forms and Interactions by These Characteristics
The characteristics of multiple data sources and time-partitioned updates require form interactions to support configuring multiple data sources simultaneously and setting their corresponding effective time periods, to avoid cross-source data confusion. The requirement for multiple fields and fixed units means forms must pre-set unit options and field mapping rules, to reduce manual input error rates. The batch daily report data generation mode requires the interaction link to support batch import and multi-product configuration selection, eliminating the need to add product entries one by one. The requirement for categorized display of different products means forms can automatically group by plastics and rubber sub-categories, to facilitate structured presentation of subsequent broadcast content. The mixed use of real-time market and daily report data requires distinguishing the interaction logic between real-time submission and scheduled batch submission, to avoid data conflicts.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `datasource_type` | `custom_multi` | Plastics and rubber data covers multiple sources including futures, spot, and industry research, requiring simultaneous access to multiple data source types |
| `update_cron` | `0 17 * * 1-5,0 20 * * 1-5` | Adapts to the trading day update schedule: spot data updates at 17:00, daily report data generated at 20:00 |
| `field_mapping` | `price: benchmark price, change: daily fluctuation value, volume: daily trading volume` | Matches data source returned fields with preset fields in the broadcast template, to avoid mapping failures |
| `batch_import_max_rows` | `500` | Covers the demand for batch importing plastics and rubber product data across multiple days in a single batch |
| `form_field_unit` | `CNY per ton, lot, ten thousand tons` | Matches the standard units of plastics and rubber market data, simplifying input validation |
| `retry_count` | `3` | Addresses occasional fluctuations in some data source APIs, reducing the probability of broadcast failures |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: An `undefined model must match "^(text` error is returned when configuring the embedding model. Cause: No properly formatted model name is specified in the `embedding_model` configuration item, or the selected model is not included in the platform's supported list.
- Phenomenon: After batch importing daily report data, some products' fluctuation value fields are empty. Cause: The `field_mapping` parameter is not configured correctly, resulting in a mismatch between data source fields and template fields, preventing successful data mapping.
- Phenomenon: GPT-4 or Claude 3.5 cannot be called to generate broadcast content after switching large models. Cause: No interface address and key for the corresponding channel are added in the `custom_model_channel` configuration, or the switch to the corresponding custom channel was not completed.

## How to Confirm Configuration Is Complete
- Navigate to the data source configuration page, verify the settings of `datasource_type` and `update_cron` match the actual update schedule of plastics and rubber data.
- Upload a single test market data entry, confirm that the `field_mapping` rules can correctly extract corresponding values and display them in the preview interface.
- Trigger a manual broadcast task, check whether the returned result includes all preset plastics and rubber sub-category data.
- Check the custom channel configuration page, confirm that the interface address and key for the selected large model have been bound, and can be called normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
