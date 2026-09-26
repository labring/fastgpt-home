---
title: Database and Operations for Photovoltaic Yield Reporting
slug: /en/industry/finance-d007-c016-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Photovoltaic Yield Reporting
meta_description: Data for photovoltaic yield daily reports comes from three main sources: distributed photovoltaic station inverter collection terminals
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Photovoltaic Yield Reporting

## What the data for this category looks like
Data for photovoltaic yield daily reports comes from three main sources: distributed photovoltaic station inverter collection terminals, grid-connected settlement data from provincial power grid dispatching platforms, and daily solar radiation statistics from meteorological stations.
Data is updated by aggregating the full dataset for the previous natural day at a fixed time each day. Some same-day cumulative power generation data is synced hourly.
Each data record corresponds to daily statistics for a single photovoltaic station. Fields include unique station ID, statistical date, total power generation, grid-connected power generation, self-consumed power generation, installed capacity, unit installed capacity yield, and more. All power-related fields use kilowatt-hours as their unit. Yield-related fields use yuan as their unit.

## Constraints on Database and Operations
Multi-source data requires cross-source consistency checks.
Configure special data cleaning rules to avoid discrepancies in the same station’s data collected across different platforms.
Daily fixed-window full synchronization requires precise scheduled tasks.
Complete data import and cleaning within the configured window, otherwise the next day’s reporting tasks will be affected.
High-frequency joint queries by station ID and statistical date require targeted index structures.
Without these indexes, query response will be slow.
Multi-dimensional field association logic requires the database to support complex join queries.
Reserve sufficient storage space for historical data archiving.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `DATA_SYNC_CRON` | `0 1 2 * * ?` | Matches the daily aggregation update window for PV daily reports, ensures synchronization runs after the previous day’s data is collected |
| `DB_BATCH_INSERT_SIZE` | `500 records per batch` | Adapts to the per-station record scale of daily PV reports, avoids database table locking during batch inserts |
| `PARSE_DATA_TIMEOUT` | `300 seconds` | PV datasets include multi-dimensional associated fields, parsing takes longer, reserves sufficient processing time |
| `DB_INDEX_CONFIG` | Composite index `idx_station_date` (fields: `station_id`, `date`) | Meets high-frequency joint query requirements by station and date, accelerates retrieval efficiency for daily reports |
| `UPLOAD_FILE_MAX_SIZE` | `2000 MB` | Adapts to storage space requirements for daily report datasets from large PV clusters, supports bulk import operations |
| `DB_BACKUP_RETENTION_DAYS` | `90 days` | Meets compliance requirements for data archiving in the PV industry, reserves sufficient historical data storage period |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on local operational samples before finalizing settings.

## Three Common Misconfigurations
- Scenario: After replacing the default PostgreSQL database with ClickHouse, executing `SELECT * FROM pv_yield WHERE station_id = 'XXX' AND date = '2024-05-20'` returns no results. Cause: A composite primary key was not created according to ClickHouse’s index rules, so high-frequency queries cannot hit valid data.
- Scenario: After the scheduled data sync task triggers, the log returns an `ETIMEDOUT` error. Cause: The `PARSE_DATA_TIMEOUT` parameter was not adjusted. The parsing time for the full PV dataset exceeds the default threshold, causing the sync task to interrupt.
- Scenario: All values in the imported `daily_profit_value` field of the PV daily report data are 0. Cause: Data source field mapping rules were not configured. The grid-side grid-connected power generation field was incorrectly bound to self-consumed power generation, leading to missing basic data for yield calculation.

## How to Confirm the Configuration is Correct
- Manually trigger a data sync task, check that the log contains no `ETIMEDOUT` or index-related error messages.
- Execute a joint query by `station_id` + `date`, confirm that the returned fields match the preset structure of PV data.
- View the historical execution records of scheduled tasks, confirm that the sync task completes within the daily preset time window.
- Run the database backup script, confirm that the image and data files can be exported normally, with no permission or storage error prompts.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
