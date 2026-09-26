---
title: Database and Operations for Refinery Yield Rates
slug: /en/industry/finance-d007-c094-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Refinery Yield Rates
meta_description: Data sources include refinery production DCS systems, material balance ledgers, crude oil processing volume statistics, and factory quality inspection
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Refinery Yield Rates

## What This Type of Data Looks Like
Data sources include refinery production DCS systems, material balance ledgers, crude oil processing volume statistics, and factory quality inspection reports for refined oil and chemical products.
Updates follow production batches or hourly incremental updates, with multiple incremental records generated within a single production cycle.
This uses a structured single-table document structure, including device ID, processing raw material type, processing volume, output proportion values for each product, energy consumption parameters, and accounting timestamp.
For fields and units: Device ID uses string format, processing volume is measured in tons, output proportion values for each product use decimal format, and accounting timestamp uses ISO standard time string format.

## What Constraints Do These Characteristics Impose on Database and Operations Workflows
The real-time, incremental update nature of continuous production requires the database to support high-frequency, small-batch writes. This avoids table locking caused by bulk writes.
The need for multi-dimensional unique identification using device ID and timestamp requires a joint unique index when creating tables. This prevents duplicate entry of accounting data for the same batch and same device.
A large number of structured fields with dependency relationships requires non-null field constraints and cross-field validation rules at the database level. This stops invalid data from being stored.
Data update frequency is tied to production cycles. Operations workflows must configure a data backup strategy triggered by production batches. This avoids excessive storage and computing resource usage from full backups.
Refinery data has strong business relevance. Configure read-only replicas for yield rate report queries to isolate write and read loads, and ensure stability for both types of operations.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `MONGO_WRITE_CONCURRENCY` | `20–30 concurrent connections` | Adapts to the high-frequency write demand of multiple hourly batches in refinery scenarios, avoiding connection pool exhaustion |
| `MONGO_UNIQUE_INDEX` | `device_id + accounting timestamp` | Follows the unique identification rules for refinery data, preventing duplicate entry of accounting records for the same device and cycle |
| `PARSE_DATA_TIMEOUT` | `300 seconds` | Matches the parsing and storage duration of single-batch refinery data, avoiding timeout interruptions to the write process |
| `VECTOR_DB_REPLICA_COUNT` | `2 read-only replicas` | Isolates load between yield rate report queries and real-time writes, ensuring query stability |
| `DB_BACKUP_CRON` | `0 0 */6 * * *` | Incremental backup plan configured per production cycles, balancing data security and storage overhead |
| `DATA_VALIDATION_SWITCH` | `Enabled` | Validates field integrity and cross-field logical consistency of refinery data, filtering invalid data before storage |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: The system fails to complete initialization, with the `Mongo connection init failed` error appearing in logs. Cause: FastGPT database configuration items do not match the port and authentication information of the local Mongo instance. An additional business database shard is configured in the refinery scenario, causing default connection parameters to fail to point to the correct database instance.
- Symptom: Abnormal FastGPT query results occur after directly modifying vector database data via the Mongo client. Cause: FastGPT vector database data storage includes business-related metadata fields. Direct modification breaks the binding relationship between metadata and business data, leading to inconsistent data sources for yield rate broadcasts.
- Symptom: Write timeout occurs after the system runs for a period of time, with `Mongo write timeout` displayed in logs. Cause: Reasonable concurrent connection counts are not configured. High-frequency writes in the refinery scenario exhaust the connection pool, making it unable to process new write requests in a timely manner.

## How to Verify Proper Configuration
- Run the database connection test script to verify that configured connection parameters can properly connect to the target database instance, and confirm that the joint unique index has been correctly created.
- Simulate the write and query process for single-batch refinery data to confirm that data can be properly stored without duplicate records, and that query results match the source data.
- Check the database monitoring panel to confirm that the write concurrent connection count does not exceed the configured limit, and that the load on read-only replicas does not show abnormal fluctuations.
- Trigger a scheduled backup task to confirm that backup files are generated normally and can be restored properly, verifying the effectiveness of the backup strategy.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
