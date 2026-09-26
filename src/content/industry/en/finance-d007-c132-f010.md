---
title: Database and Operations for Computer Equipment Yield Rates
slug: /en/industry/finance-d007-c132-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Computer Equipment Yield Rates
meta_description: Data related to computer equipment yield rates comes from hardware asset management platforms, real-time operations monitoring systems, and billing
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Computer Equipment Yield Rates

## What this category of data looks like
Data related to computer equipment yield rates comes from hardware asset management platforms, real-time operations monitoring systems, and billing modules of financial trading terminals. The update schedule is as follows: real-time revenue and computing power data is pushed every 15 minutes during trading hours. A full update of daily cumulative revenue and asset depreciation data is completed at 00:00 each day.

The structure of individual data documents includes `device_sn`, `device_model`, `stat_period`, `period_income`, `avg_cpu_used`, `total_runtime`, and `update_time`.
- `device_sn` is the unique serial number of the device
- `period_income` is measured in yuan
- `avg_cpu_used` is the average number of CPU cores occupied during the statistical period
- `total_runtime` is measured in hours
- `update_time` is the timestamp when the data was updated

## What constraints these characteristics impose on database and operations
High-frequency real-time writes require databases to support low-latency concurrent operations. Otherwise, write backlogs will occur. Storage requirements sharded by device and statistical period require advance planning of database and table sharding strategies to avoid difficulties in future data scaling. Mixed updates of real-time and full batch data require separate write channels. This prevents batch imports during off-peak periods from occupying excessive resources and impacting real-time services. Financial-related revenue data requires strict data consistency. Transactions and primary key constraints must be configured to avoid dirty writes. High-frequency queries by time and device dimensions require corresponding joint indexes to improve query efficiency.

## How to set configurations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `MONGODB_WRITE_CONCURRENCY` | `20–30 concurrent connections` | Matches the 15-minute real-time write frequency to avoid exhausting database connection pools |
| `MONGODB_SHARD_KEY` | `stat_period, device_sn` | Shards by statistical period and device serial number to balance write and query performance |
| `MONGODB_INDEX_EXPIRE_AFTER_SECONDS` | `2592000 seconds` | Automatically cleans real-time data older than 30 days to reduce long-term storage pressure |
| `BATCH_IMPORT_THREADS` | `4–6 threads` | Adapts to the daily full update data volume, preventing single-threaded imports from occupying excessive resources |
| `DB_QUERY_TIMEOUT` | `15 seconds` | Matches the response requirements of real-time market queries to prevent timeouts that block business processes |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by data format, data volume, and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Phenomenon: A MongoDB connection error is returned with the `ECONNREFUSED` error code during local development. Cause: The `MONGODB_URI` parameter is not configured correctly, or the local MongoDB service is not started, resulting in rejected connection requests.
- Phenomenon: No response is returned after exceeding the set concurrency threshold during shared page testing. Cause: The `MONGODB_WRITE_CONCURRENCY` and `DB_QUERY_TIMEOUT` configurations are not adjusted. Concurrent requests exceed the processing limits of the database and application server, leading to request backlogs.
- Phenomenon: Server memory usage continues to rise until system limits are triggered during batch import of historical data. Cause: A reasonable number of threads for `BATCH_IMPORT_THREADS` is not set. Multi-threaded imports load too much data into memory at the same time, exceeding resource carrying capacity.

## How to confirm configurations are set correctly
- Run database write stress tests, observe connection counts and write latency, and adjust the `MONGODB_WRITE_CONCURRENCY` configuration to meet peak business requirements.
- Check MongoDB sharding status, confirm that `stat_period, device_sn` has been set as the shard key and that shard distribution is even.
- Run batch import scripts, monitor memory and CPU usage, and confirm that the `BATCH_IMPORT_THREADS` configuration does not exceed server resource limits.
- Execute real-time data queries, verify that the `update_time` field of returned results is not empty, and that query latency meets business expectations.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
