---
title: Workflow Orchestration for Minor Metal Yields
slug: /en/industry/finance-d007-c058-f007
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Minor Metal Yields
meta_description: Minor metal data is sourced from domestic nonferrous metal industry professional market aggregation APIs, covering spot and futures markets for
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Minor Metal Yields

## What the data for this category looks like
Minor metal data is sourced from domestic nonferrous metal industry professional market aggregation APIs, covering spot and futures markets for segmented varieties such as tungsten, molybdenum, tin, antimony. Spot data receives a full update daily after market close. Futures data pushes latest quotes every 15 minutes. Each data entry is in structured JSON format, including fields such as product code, Chinese name, delivery grade, daily settlement price, price change value, open interest, trading volume and more. Settlement price uses yuan/ton as the unit, open interest uses lots as the unit, trading volume uses tons as the unit.

## Constraints imposed by these characteristics on workflow orchestration
The data characteristics of this category impose three core constraints on workflow orchestration.
First, spot and futures data have significantly different update rhythms. Configure different trigger timings for different data sources to avoid interface rate limiting caused by high-frequency spot data pulls.
Second, fields have clear units and business meanings. Parameter extraction nodes in the workflow must accurately match field names to prevent confusion between the value logic of settlement price and price change value.
Third, some fields of niche varieties contain null values. Add null value filter nodes in the workflow to avoid errors in subsequent processing steps.
Additionally, there are many segmented minor metal specifications. The workflow must support targeted pulls by product code to reduce invalid data transmission.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| ---- | ---- | ---- |
| `Scheduled Trigger Configuration` | Spot tasks trigger daily at 16:30, futures tasks trigger every 15 minutes | Matches the official update rhythm of minor metal spot and futures data |
| `API Call Rate Limiting Threshold` | 10 requests per minute | Adapts to general call limits of domestic nonferrous metal market APIs |
| `Field Extraction Matching Mode` | Exact matching | Minor metal data fields have clear units and business meanings, requiring avoidance of field confusion |
| `Null Value Filter Switch` | Enabled | Some fields of niche minor metal varieties are empty, preventing errors in subsequent processing |
| `Result Set Return Count` | Top 15 entries | Single-period yield broadcasts do not need to display full variety data, controlling output length |
| `TOOL_CALL_TIMEOUT` | 600 seconds | Market API responses typically complete within 5 minutes, avoiding task interruption due to timeout |

> The parameter values provided on this page are standard recommended starting points for configuration setup. Actual values are affected by material form, data volume and business rules. Each scenario requires individual analysis, and it is recommended to perform tests using local test samples before finalizing configuration values.

## Three Common Configuration Mistakes
- Symptom: After the workflow calls the market API, configured global variables are not updated. Subsequent nodes retrieve initial default values when referencing the variables. Cause: The variable update permission of the tool node is not enabled, or the scope of the global variable is not set to the current workflow.
- Symptom: In workflow version V4.8.22, the configuration entry for custom prompt templates cannot be found, and only a small number of basic parameters can be adjusted. Cause: Custom prompt functionality for workflow nodes was not available in this version. The related feature officially launched in V4.9.7 and later versions.
- Symptom: Extracted minor metal data fields are misaligned. For example, price change value is identified as settlement price. Cause: Exact matching mode for field extraction is not enabled, and field names are not strictly matched when retrieving values.

## How to Confirm the Configuration Is Complete
- Manually trigger the workflow once, check the return logs of the tool call node to confirm that pulled minor metal data fields match the API documentation.
- Check global variable update records to confirm that variable values have been updated as configured after the tool call completes.
- View scheduled task execution records of the workflow to confirm that trigger timings of spot and futures tasks match the preset configuration.
- Simulate a data pull request for a niche variety to confirm that the null value filter node operates correctly and no abnormal errors are triggered.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
