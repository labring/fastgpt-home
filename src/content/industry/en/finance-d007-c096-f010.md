---
title: Database and Operations for Coke Yield Reporting
slug: /en/industry/finance-d007-c096-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Coke Yield Reporting
meta_description: Coke market and yield data is primarily sourced from public market APIs of the Dalian Commodity Exchange and domestic spot price platforms for major
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Coke Yield Reporting

## What data for this category looks like
Coke market and yield data is primarily sourced from public market APIs of the Dalian Commodity Exchange and domestic spot price platforms for major coke producing areas. Real-time market data is pushed every 5 seconds. Daily yield-related data is updated after 17:00 on each trading day.
This data is structured time-series data, including fields such as product code, trading date, settlement price, open interest, spot benchmark price, and more. Price-related fields use yuan/ton as the unit. Trading volume and open interest use lots as the unit.

## Constraints for database and operations
High-frequency real-time market updates require database connections to support low-latency writes. This prevents data backlogs that cause broadcast delays.
Daily batch data updates require a dedicated scheduling window. This avoids resource conflicts during peak trading hours.
Multi-dimensional time-series fields require joint indexes. This improves query efficiency when filtering by trading date and product code.
Multiple data sources require data validation rules. These filter out abnormal values to ensure accurate yield calculations.
Long-term market data retention requires a hot-cold storage strategy. This reduces operational costs.

## How to configure the settings
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `MONGO_CONNECTION_POOL_SIZE` | 10–20 | Matches the 5-second real-time market write frequency for coke, prevents write failures from exhausted connections |
| `DATA_SYNC_INTERVAL` | 5 seconds | Aligns with the Dalian Commodity Exchange's real-time market push interval, ensures data timeliness |
| `BATCH_INSERT_SIZE` | 50–100 | Balances write performance and memory usage, fits the volume of real-time market data per batch |
| `INDEX_EXPIRE_AFTER_SECONDS` | 86400 seconds | Sets automatic expiration for temporary real-time market data, reduces invalid storage usage |
| `DAILY_DATA_UPDATE_TIME` | 17:30 | Aligns with the post-close data update window for coke trading days, avoids conflicts with real-time market pushes |
| `DATA_VALIDATION_LEVEL` | strict | Validates all incoming coke market fields, filters abnormal values to ensure data accuracy |

> The parameter values provided on this page are common recommendations used as starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require targeted analysis. It is recommended to test with your own samples before finalizing settings.

## Three common mistakes
- Symptom: MongoDB connection error `Connection refused`. The system interface displays a database connection failure. Cause: The `MONGODB_URI` parameter is not configured correctly. For local Windows environments, the default MongoDB port 27017 is not open, or a firewall blocks external connection requests.
- Symptom: Low TPS for the yield broadcast workflow. Logs show data write queue backlog duration exceeds expectations. Cause: The `BATCH_INSERT_SIZE` and `MONGO_CONNECTION_POOL_SIZE` parameters are not adjusted to match the coke real-time market update frequency. This causes write throughput to fail to match the data update rhythm.
- Symptom: Incomplete fields are returned when calling the database query interface. Complete coke yield broadcast content cannot be generated. Cause: No joint index covering trading date and product code is created in the database, or the configured `DATA_VALIDATION_RULES` incorrectly filters core business fields.

## How to confirm proper configuration
- Run a database connection test command to verify that the `MONGODB_URI` configuration address can be accessed normally.
- Submit simulated real-time coke market data, check the write log to confirm that data write delay meets business requirements.
- Call the database query interface to query coke data for a specified trading date, confirm that returned fields cover all content required for business operations.
- View the database metadata management page to confirm that the full field definitions and index configurations of the coke market data table are visible.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
