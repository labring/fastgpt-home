---
title: Database and Operations for Thermal Coal Yield Rates
slug: /en/industry/finance-d007-c028-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Thermal Coal Yield Rates
meta_description: Thermal coal market data primarily comes from public quotes released by domestic coal trading centers, real-time monitoring data from core ports
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Thermal Coal Yield Rates

## What the data for this category looks like
Thermal coal market data primarily comes from public quotes released by domestic coal trading centers, real-time monitoring data from core ports including Qinhuangdao Port, and aggregated information from third-party industry monitoring agencies.
There are two update schedules:
1. Daily full market data: Updates full origin and port quote information from the previous day at 8 AM each day.
2. Real-time futures market data: Updates every 15 minutes.
Each data document corresponds to a single market snapshot for one origin or port. It includes fields such as origin name, port name, current day's listed price, previous day's settlement price, trading volume, and publish time.
Price unit is yuan per ton. Trading volume unit is tons. No percentage-based statistical fields are included.

## What constraints do these characteristics impose on the database and operations link
The dual update schedule for thermal coal data requires the database to support both full batch import and incremental real-time synchronization. It must balance storage needs for high-frequency real-time queries and low-frequency historical data archiving.
Differences in field naming across multiple data sources require unified field mapping rules to prevent malformed dirty data from entering the knowledge base.
Daily fixed-time full data updates create short-term high write loads. A reasonable read-write separation strategy must be configured to avoid disrupting the stability of real-time query services.
Long-term retention of historical data requires separating hot and cold storage. Real-time market data from the past 7 days falls within the high-frequency query range. High-performance storage supports high concurrent access for this data. Expired data can be migrated to archive storage to reduce operational costs.
Additionally, yield rate calculations rely on price comparisons across two consecutive days. Complete retention of historical snapshot data must be ensured to prevent calculation failures from data loss.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale for This Value |
| ---- | ---- | ---- |
| `DATASOURCE_SYNC_INTERVAL` | `15 minutes` | Matches the 15-minute update frequency of thermal coal real-time market data, ensuring data delay stays within the maximum range allowed by business requirements |
| `PARSE_DOC_FIELD_MAPPING` | `origin place: origin, port name: port, daily listed price: price_today, previous day settlement price: price_yesterday, release time: publish_time` | Unifies differences in field naming across multiple data sources, ensuring consistent field formatting for knowledge base storage |
| `DB_HOT_DATA_RETENTION_DAYS` | `7 days` | Separates hot and cold data storage. Real-time market data from the past 7 days falls within the high-frequency query range, so high-performance storage can support high concurrent access |
| `UPLOAD_FILE_MAX_SIZE` | `500 MB` | Single thermal coal historical market Excel/CSV files typically do not exceed 300 MB. A reasonable upper limit is reserved to avoid exceeding system limits during single imports |
| `DATA_VALIDATION_THRESHOLD` | `0.8` | Validates field completeness for data sources. Records below the threshold are automatically filtered to reduce the impact of dirty data on the knowledge base |
| `MONGO_REPLICA_SET_ENABLED` | `Enabled` | Thermal coal market data requires high availability. Replica sets prevent service interruptions caused by single-point failures |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Phenomenon: An error "field mismatch" is prompted when importing a thermal coal market Excel file, and the import progress stalls at a preset percentage. Cause: `PARSE_DOC_FIELD_MAPPING` is not configured. The built-in fields of the data source cannot correspond to the preset fields of the knowledge base, causing the parsing process to interrupt.
- Phenomenon: MongoDB service fails to start, and the log returns an error "replica set not initialized". Cause: `MONGO_REPLICA_SET_ENABLED` is not enabled. The system enforces replica set configuration to support real-time synchronization requirements. Startup fails directly when the setting is not enabled by default.
- Phenomenon: Empty results are returned when querying historical thermal coal yield rates, and all market data older than 10 days is missing. Cause: `DB_HOT_DATA_RETENTION_DAYS` is not configured. The system cleans expired data by default, and no archive storage strategy is configured, resulting in accidental deletion of historical data.

## How to Confirm Configurations Are Correctly Set
- Perform a manual import of a test thermal coal market file, and check whether the import log displays a prompt indicating successful field matching. Confirm that the `PARSE_DOC_FIELD_MAPPING` configuration has taken effect.
- View the monitoring panel for database real-time synchronization tasks, and verify the data update delay time. Confirm that the `DATASOURCE_SYNC_INTERVAL` configuration matches the data source update frequency.
- Log in to the MongoDB management interface, check the replica set node status. Confirm that all nodes synchronize normally after `MONGO_REPLICA_SET_ENABLED` is enabled, with no abnormal error messages.
- Initiate two real-time market queries 15 minutes apart, and verify the update times of the returned results. Confirm that the `DATASOURCE_SYNC_INTERVAL` configuration normally triggers data refresh.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
