---
title: Conversation Logs and Auditing for Photovoltaic Yield Rates
slug: /en/industry/finance-d007-c016-f006
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Conversation Logs and Auditing for Photovoltaic Yield Rates
meta_description: Photovoltaic yield and market data is sourced from intelligent operation and maintenance terminals for distributed photovoltaic power stations, SCADA
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logs and Auditing for Photovoltaic Yield Rates

## What data for this category looks like
Photovoltaic yield and market data is sourced from intelligent operation and maintenance terminals for distributed photovoltaic power stations, SCADA systems for centralized photovoltaic power stations, and domestic new energy data aggregation platforms. Real-time collected data is pushed every 10 to 15 minutes. A full daily yield summary document is generated each early morning.

The document uses a structured format, including these fields: unique power station identifier, collection timestamp, daily cumulative power generation, grid-connected power, component conversion efficiency monitoring value, and power generation per unit installed capacity. Each field has a clear physical unit, with no ambiguous statistical values.

## What constraints do these characteristics impose on conversation logs and auditing
The high-frequency real-time data push cadence requires conversation logs to support millisecond-level request writes. This prevents short-interval query records from being lost due to log queue blocking.

Structured data includes multi-dimensional identifier fields. Logs must associate fields such as unique power station identifier and collection timestamp. This enables precise audit retrieval by power station and time range.

The daily summary document generation logic must record the called data source interface identifier in logs. This ensures the source correctness of summarized data can be traced.

The unique identifier system for photovoltaic power stations requires logs to bind the target power station specified in user queries. This avoids audit confusion across power stations.

Additionally, all field values returned by yield-related queries must be fully recorded. This provides verifiable evidence for subsequent audits.

## How to configure the settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `logRetentionDays` | `365 days` | Meets audit compliance requirements for the photovoltaic industry. Logs of conversations and data queries must be retained for at least one year. This aligns with the log retention logic of FastGPT V4.9.3 |
| `logBatchSize` | `50 entries per batch` | Meets the write requirements for high-frequency real-time data. Prevents log write delays caused by overly large single batches, and ensures completeness of log records |
| `queryLogFilter` | `Filter by stationId, collectTime` | Matches the multi-dimensional retrieval needs of photovoltaic data. Supports quick location of target logs by power station and time range |
| `workflowLogCapture` | `Enable full-link data capture` | Must fully record interface parameters and returned data for workflow calls. Prevents issues where operational data is empty |
| `mongodbLogCollection` | `pv_yield_audit_log` | Names the MongoDB log collection by business scenario. This makes it easy to distinguish from log collections for other categories, and simplifies subsequent maintenance and retrieval |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three common configuration errors
- Symptom: Operational data is empty in conversation logs after calling a photovoltaic yield query workflow. Cause: The `workflowLogCapture` configuration item is not enabled, so interface calls and returned data for the workflow are not captured.
- Symptom: No log records for the photovoltaic scenario can be found when searching conversation logs by the specified collection. Cause: `mongodbLogCollection` is not configured as `pv_yield_audit_log`. A generic log collection is used instead, leading to collection confusion.
- Symptom: Target query content cannot be located when searching historical records by power station ID. Cause: The `queryLogFilter` stationId filtering rule is not configured. Logs do not bind the power station identifier field from the query, so matching associated data during retrieval is impossible.

## How to confirm the configuration is correct
- Initiate a yield query request for a specified photovoltaic power station. Navigate to the conversation logs page, and verify that associated fields such as stationId and collectTime are recorded.
- Navigate to the workflow run logs page, and confirm that the interface call parameters and returned power generation, efficiency data for this query have been fully captured.
- Perform a log retrieval operation by power station ID and time range, and verify that the corresponding query record can be accurately located.
- Log in to the MongoDB database, check that a log collection named `pv_yield_audit_log` exists, and confirm that the log write path is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
