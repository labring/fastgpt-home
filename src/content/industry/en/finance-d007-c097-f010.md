---
title: Database and Operations for Coking Coal Yields
slug: /en/industry/finance-d007-c097-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Coking Coal Yields
meta_description: Coking coal market and yield data is sourced from public APIs of domestic futures exchanges and spot price sources from industry associations. Updates
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Coking Coal Yields

## What This Category of Data Looks Like
Coking coal market and yield data is sourced from public APIs of domestic futures exchanges and spot price sources from industry associations. Updates include real-time pushes during futures trading hours and fixed daily report generation after market close each trading day. Each data entry includes fields such as contract ID, trading date, benchmark trading price, daily settlement price, position volume, and daily price change. Field units are as follows: contract ID uses string format, price fields use yuan/ton, price change uses numeric format, and position volume uses integer format.

## Constraints Imposed on Database and Operations
The high-frequency real-time pushes and daily batch daily report generation for coking coal data create dual requirements for database write throughput. Contract ID as the core primary key requires a unique index to prevent duplicate entries. Numeric storage for the price change field must adapt to floating-point precision requirements to avoid calculation deviations. Multi-source data alignment requires the database to support cross-source associated queries. The fixed daily data update window after market close requires precise scheduled trigger configuration to avoid resource contention with other operational tasks. Long-term retention of historical market data must support archiving by trading cycles to reduce online storage load pressure.

## Configuration Recommendations
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `mongodb_write_concern` | `"majority"` | Coking coal trading data has strong correlation. Ensures a write response only after confirming data is written to a majority of nodes to prevent data loss |
| `redis_maxmemory_policy` | `allkeys-lru` | Caches real-time market data. Prioritizes evicting least recently used old data to ensure fast access to the latest data |
| `milvus_index_build_threshold` | `100000 entries` | Coking coal historical data volume is large. Automatically builds indexes once the threshold is reached to balance query speed and storage costs |
| `batch_import_timeout` | `300 seconds` | Daily batch daily report data volume is large. Reserves sufficient import time to avoid task interruption |
| `data_retention_days` | `365 days` | Matches industry standard historical data query cycles while reducing long-term storage and operational costs |
| `api_request_rate_limit` | `100 requests per minute` | Adapts to real-time market update frequency to avoid exceeding external API call limits |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by data volume, business rules, and deployment environment. Conduct testing on your own samples before finalizing settings.

## Three Common Mistakes
- An `UnsupportedWireVersion` error appears after starting the MongoDB service. Cause: An untested compatible MongoDB version is used, such as a non-official recommended 7.x series version, leading to a mismatch with FastGPT's database interaction protocol.
- Redundant entries are returned when querying coking coal yield data. Cause: A unique index is not created for the combined field of contract ID and trading date, leading to inability to automatically deduplicate duplicate data entries.
- The locally Docker-deployed database service is terminated by the system. Cause: No memory limit parameters are configured for Redis and MongoDB in docker-compose.yml, causing the containers to occupy excessive host memory and trigger the OOM mechanism.

## How to Verify Proper Configuration
- Run the MongoDB command `db.getCollection('coal_daily').getIndexes()` to confirm that the combined index for contract ID and trading date has been created.
- Submit a simulated coking coal data write request, and use the `db.getLastError()` command to confirm that the write was successful and no duplicate data exists.
- Check Docker container metrics via the `docker stats` command to confirm that Redis and MongoDB memory usage does not exceed preset limits.
- Trigger a batch daily report import task, and confirm via system logs that the task completed within the preset timeout period without errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
