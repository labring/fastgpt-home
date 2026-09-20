---
title: Form and Interaction for Wind Power Generation Yield
slug: /en/industry/finance-d007-c153-f014
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Form and Interaction for Wind Power Generation Yield
meta_description: Data sources for wind power yield and market daily reports include wind farm SCADA collection systems, public settlement data from regional power
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Form and Interaction for Wind Power Generation Yield

## What this category of data looks like
Data sources for wind power yield and market daily reports include wind farm SCADA collection systems, public settlement data from regional power trading centers, and auxiliary wind speed and radiation data from meteorological observatories.
The update cadence is daily generation of T+1 statistical documents. Documents are released the next day after same-day statistics are completed.
The core structure of each single document includes: unique farm station identifier, statistical date, grid-connected power generation that day, grid settlement electricity price that day, operation and maintenance cost that day, subsidy calculation amount that day, and yield calculation value that day.
Field units follow these standards: power generation in megawatt-hours, electricity price in CNY per megawatt-hour, cost and subsidy in CNY, yield in CNY per kilowatt of installed capacity.

## What constraints these characteristics impose on form and interaction
Mixed collection from multiple data sources requires the form to support multi-channel data docking. Single file upload or manual entry alone is not sufficient.
The T+1 update cadence requires the form to be bound to scheduled trigger logic, to align with the daily fixed daily report generation business process.
Linked calculation requirements across multiple fields require the form to preset associated verification rules for power generation, electricity price, and yield, to avoid calculation deviations caused by manual input.
The requirement for unique station identifiers requires the form to add field verification logic to prevent duplicate daily report entries for the same station.
Regional differences in electricity price and subsidy policies require the form to support loading drop-down options for corresponding parameters by region, to adapt to business rules of different stations.

## How to Configure the Settings
| Configuration Item | Recommended Value Range | Rationale |
| --- | --- | --- |
| `recall count` | `8–12 results` | The core fields of the wind power yield daily report are approximately 10. This range covers all necessary data while avoiding interference from redundant information |
| `similarity threshold` | `0.75–0.85` | Wind farm station data has strong relevance. This range filters low-correlation historical data and retains the latest information required for daily calculation |
| `scheduled task interval` | `24 hours` | Matches the T+1 update cadence of the wind power yield daily report, ensuring the latest broadcast content is automatically generated daily |
| `form field verification rules` | `Enable station ID uniqueness verification` | Wind farm station identifications are unique. This verification prevents duplicate entry of daily report data for the same station |
| `context window size` | `6000–10000 characters` | A single wind power daily report document contains multi-dimensional calculation data. This window fully carries all information required for parsing |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing.

## Three Common Configuration Mistakes
- Phenomenon: Setting `recall count` to 2 returns only one data entry. Reason: Some data source interfaces return Top1 results by default, and do not follow the configured recall count parameter, resulting in actual returned data that does not match the configuration.
- Phenomenon: After referencing a custom daily report generation plugin, the connection code running node prompts "missing input fields" when triggered. Reason: The required attribute of input fields was not declared in the plugin configuration, causing the workflow call to fail to automatically map core data submitted via the form.
- Phenomenon: All available models are visible on the model configuration page, but only a small number of models are displayed in workflow nodes. Reason: The `model_allow_list` parameter was not configured, or the configured whitelist range is too narrow, limiting the selectable model range in the workflow.

## How to Confirm Successful Configuration
1.  Manually trigger form submission, check whether the workflow log contains all configured field data, and verify that field units match business requirements.
2.  Run a scheduled task test to confirm that the daily report document is automatically generated at the preset time, and that the data matches the station's operational data for that day.
3.  Check the model selectable list in the workflow node to confirm that all models required for the business are included, and no incompatible extra models are displayed.
4.  Simulate submitting daily report data for the same station repeatedly, confirm that the form triggers the uniqueness verification and prompts an exception, preventing duplicate entry.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
