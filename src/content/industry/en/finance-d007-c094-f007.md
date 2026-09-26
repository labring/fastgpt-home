---
title: Workflow Orchestration for Refinery Yield Rates
slug: /en/industry/finance-d007-c094-f007
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Workflow Orchestration for Refinery Yield Rates
meta_description: Refinery market and yield rate data primarily comes from manufacturing execution system (MES) of refinery enterprises, group supply chain data middle
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Workflow Orchestration for Refinery Yield Rates

## What the Data for This Category Looks Like
Refinery market and yield rate data primarily comes from manufacturing execution system (MES) of refinery enterprises, group supply chain data middle platforms, and commodity market data APIs. Full data for the previous day is compiled at midnight each day, and released at midnight the following day. Data is delivered in structured JSON or CSV format, with fields including processing batch ID, raw material type, processing volume, output volume of each product, unit production cost, market selling price, calculated gross profit, and more. Processing volume is measured in tons. Production cost and selling price are measured in yuan per ton. Gross profit is measured in yuan per ton.

## Constraints Imposed on Workflow Orchestration by These Characteristics
Multi-source heterogeneous data formats require configuration of format conversion nodes in workflows to unify structures pulled from different data sources. Fixed daily update schedules require setting timed triggers for workflows, to avoid frequent pulling of old data or missing complete daily data. Multi-field associated calculation logic requires encapsulating standard formulas used by most organizations as custom nodes in workflows, to avoid repeating the same calculation logic. Structured data anomaly verification requires configuring verification rules immediately after data pulling, to filter invalid data and ensure accuracy of subsequent calculations.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Structured refinery daily reports may contain multi-dimensional production data. A longer timeout prevents parsing interruptions caused by large data volumes |
| `Timed Trigger Configuration` | `Trigger daily at 02:00` | Refinery production data for the previous day is typically compiled at 01:00 AM. Triggering one hour earlier ensures access to complete data for daily accounting |
| `maxContext` | `1000 characters` | Prompts for refinery yield rate accounting need to include standard formulas and field mapping rules used by most organizations. 1000 characters fully covers core logic |
| `Field Filter Rule` | `Only retain records where raw material type is atmospheric residue` | Refinery scenarios only require focus on yield data for core raw materials. Filtering non-core categories simplifies subsequent calculations |
| `Similarity Threshold` | `0.75` | When matching refinery market data and accounting rules, a threshold of 0.75 balances matching accuracy and recall efficiency |
| `Reranked Return Count` | `Top 4 entries` | Refinery daily reports need to display yield data for 4 core product types. Returning the top 4 reranked entries accurately matches display requirements |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: No records appear in the conversation log panel after workflow execution completes. Cause: Log collection configuration for the workflow is not enabled, or the workflow uses timed triggering instead of interactive triggering, resulting in unrecorded logs.
- Symptom: Model interface returns normal when tested individually, but workflow execution fails at the model node, with no model response logs in the background. Cause: The model calling parameters of the workflow node are not bound to the correct deployment address, or environment variables do not synchronize model key configurations within the container.
- Symptom: The question optimization component is placed after the model calling node in the workflow, so the optimization logic does not apply to the user's input query content. Cause: Nodes are not arranged in the order of data preprocessing → query optimization → model calling, so the optimization step does not cover the core input link.

## How to Confirm Proper Configuration
- Manually trigger the workflow once, and check if the log panel includes execution records and returned data for each node.
- Verify that the timed trigger configuration's execution time matches the refinery data compilation time.
- View the calling logs of the model node, and confirm that the interface address and key configuration match those used during individual testing.
- Export the workflow's execution results, and verify that core fields comply with the business rules of refinery data.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
