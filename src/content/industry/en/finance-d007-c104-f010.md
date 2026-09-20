---
title: Database and Operations for Glass Yield Rates
slug: /en/industry/finance-d007-c104-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Glass Yield Rates
meta_description: Glass yield rate data comes from three main sources: public quotes from the National Building Materials Circulation Association, factory quote systems
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Glass Yield Rates

## What this category of data looks like
Glass yield rate data comes from three main sources: public quotes from the National Building Materials Circulation Association, factory quote systems of glass manufacturers, and real-time interfaces of commodity trading markets.
There are two update frequency categories: spot data updates every working day, futures data updates after each trading day closes. Some third-party data sources support hourly refreshes.
Each data entry is a structured market record. It includes category identifier, origin information, benchmark quote, daily relative change value, statistical date, and data source identifier.
The change magnitude field uses permille units, not percentage format.

## Constraints on Database and Operations Workflows
Multi-data source access requires the database to support format verification and deduplication for multi-source data. This prevents dirty data from being written.
Data sources with different update frequencies need differentiated synchronization task configurations. Real-time data sources require paired lightweight pull triggers. Daily update data sources can use scheduled task scheduling.
Most glass market query dimensions cover origin and category. Create a joint index for the `production_area` and `product_type` fields. Full table scans will cause excessive query latency without this index.
Data timeliness requirements are high. Implement a hot data archiving strategy. Migrate historical data older than 7 days to cold storage. This prevents the hot database from expanding excessively and affecting response speed.

## Configuration Recommendations
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `MONGO_CONNECTION_POOL_SIZE` | `10–15` | Glass market data has moderate concurrent query volume. This value balances connection resource usage and request response speed |
| `DATA_SYNC_CRON_EXPR` | `0 0-23/4 * * *` | Glass spot data syncs every 4 hours. This balances data timeliness and server load |
| `INDEX_EXPIRE_AFTER_SECONDS` | `604800` | Corresponds to a 7-day hot data retention period. Data older than this is automatically archived to cold storage to reduce hot database pressure |
| `QUERY_MAX_RETURN_COUNT` | `200` | Returns a maximum of 200 entries per query. This prevents memory overflow and transmission delays caused by large result sets |
| `MONGOOSE_VALIDATION_LEVEL` | `strict` | Enforces data field format verification. This matches the fixed field structure of glass market data and reduces dirty data writes |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Analyze specific issues individually. Test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: Running `npm list` inside the container fails to find the mongoose dependency, but the project starts normally. Cause: The mongoose dependency is packaged in the local `node_modules` of the FastGPT core package, and is not installed globally. Use the `docker exec <container name> npm list mongoose` command to view the version inside the container.
- Symptom: Some fields return empty when querying glass market data. Cause: No joint index created for `production_area` and `product_type`. Some concurrent queries are truncated due to timeout, returning incomplete results.
- Symptom: Connection timeout occurs for subsequent query requests when batch syncing glass historical data. Cause: No reasonable connection pool size configured. Concurrent sync tasks exhaust database connections, preventing new requests from acquiring connections.

## How to Verify Successful Configuration
- Run the `docker exec <container name> npm list mongoose` command. Confirm the returned mongoose version matches the version declared in the project's `package.json` file.
- Call the market query interface. Verify that the returned results include preset business fields such as `production_area`, `product_type`, and `daily_change`, with no missing fields or format errors.
- Simulate concurrent query requests. Observe that database connection count does not exceed the configured `MONGO_CONNECTION_POOL_SIZE` limit.
- Check the data synchronization logs. Confirm that the most recent synchronization task completed within the time specified by `DATA_SYNC_CRON_EXPR`, with no abnormal errors.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
