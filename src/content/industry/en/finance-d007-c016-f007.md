---
title: Workflow Orchestration for Photovoltaic Yield
slug: /en/industry/finance-d007-c016-f007
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Photovoltaic Yield
meta_description: Data sources for photovoltaic yield and market daily reports include provincial grid grid-connected settlement reports, third-party power equipment
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Photovoltaic Yield

## What the data for this category looks like
Data sources for photovoltaic yield and market daily reports include provincial grid grid-connected settlement reports, third-party power equipment market APIs, and SCADA system monitoring data from photovoltaic power stations.
Full daily data for the previous day is compiled every early morning. Real-time monitoring data refreshes every 15 minutes, but daily reports only use compiled data from the previous day.
Documents mostly use structured JSON or CSV formats, with fields including installation number, component specification, total daily power generation, grid-connected settlement electricity price, operation and maintenance cost, total revenue, and more.
Unit specifications: total power generation in kilowatt-hours, electricity price in yuan per kilowatt-hour, operation and maintenance cost in yuan per kilowatt of installed capacity, total revenue in yuan.

## What constraints do these characteristics impose on workflow orchestration?
The multi-source nature of PV data requires configuring parallel fetch nodes to adapt to differences in return formats across data sources.
The T+1 update rhythm of daily reports requires setting trigger nodes to execute at a fixed daily time, to avoid fetching incomplete updated data early.
The need for unique identifiers across multiple fields requires configuring data deduplication and aggregation nodes, grouping cross-source data by installation number.
Differences in calculation rules for different component specifications require configuring branch judgment nodes to split execution for yield calculation logic corresponding to each component type.
The latency characteristics of data interfaces require setting node timeout and retry mechanisms to address occasional response timeouts from grid interfaces.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `trigger_cron` | `0 0 2 * * ?` | PV daily report data is typically updated before 2 AM daily, setting this trigger time ensures complete previous-day data is retrieved |
| `data_source_parallel_count` | `2-4` | PV data comes from multiple channels including grid interfaces and third-party quotation platforms, parallel fetching reduces total execution time |
| `data_merge_key` | `installation number` | This field is the universal unique identifier for a single photovoltaic power station across all data sources, ensuring aggregation accuracy |
| `node_timeout` | `600 seconds` | Response delays for grid interfaces typically fall between 300 and 500 seconds, reserving sufficient time to avoid node timeout failures |
| `branch_condition_field` | `component specification` | Differences in calculation rules for grid-connected electricity price and operation and maintenance cost exist across different component specifications, so split execution by this field |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: The workflow returns revenue data for only one photovoltaic power station, and does not cover all installed units. Cause: The loop traversal function of the workflow is not enabled, and the installation number array is not set as the traversal target.
- Phenomenon: The value of the global variable `select_knowledge_base` remains fixed at the initial configuration, and cannot automatically switch with the component specification. Cause: The dynamic assignment rule for the variable is not configured, and the component specification field returned by the data source is not bound as a trigger condition.
- Phenomenon: The text extraction node returns empty results after execution, and cannot extract the daily grid-connected electricity price. Cause: The matching field of the extraction rule is not configured, and the JSON path of the corresponding electricity price in the data source is not specified.

## How to confirm the configuration is complete
- Verify the scheduled trigger configuration of the workflow, confirm that the trigger time matches the update rhythm of PV daily report data.
- Perform a single test run to verify whether the fields returned by each data source fetch node conform to the preset aggregation rules.
- Check the configuration of the loop node, confirm that the installation number array is bound as the traversal target.
- View the variable assignment log, confirm that the `select_knowledge_base` global variable automatically updates with the component specification returned by the data source.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
