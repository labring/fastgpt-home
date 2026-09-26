---
title: Database and Operations for Traditional Chinese Medicine Yield Rates
slug: /en/industry/finance-d007-c006-f010
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Traditional Chinese Medicine
meta_description: Data related to TCM yield rates comes from two primary sources: real-time trading quotes from major domestic TCM professional markets, and cost
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Traditional Chinese Medicine Yield Rates

## What data for this category looks like
Data related to TCM yield rates comes from two primary sources: real-time trading quotes from major domestic TCM professional markets, and cost accounting data from TCM decoction piece processing enterprises. Trading quote data updates daily. Cost accounting data updates weekly.
Data is provided in structured JSON or CSV format. It includes fields such as common medicinal name, origin, specification grade, unit transaction price, 7-day yield rate, 30-day yield rate, and more. The unit of measurement is uniformly yuan per kilogram. Each data entry includes a source identifier and an update timestamp.

## Constraints for Database and Operations Workflows
Multi-source data has differing update cadences. Configure differentiated scheduled synchronization tasks to avoid resource conflicts during business peak hours.
Yield rates are derived calculation fields. Store both raw transaction data and calculation results in the database to avoid repeated computation resource usage.
Minor differences exist in data for the same medicinal herb across different markets. Configure data consistency check rules to filter dirty data.
The number of TCM medicinal categories is large. Data volume grows as market coverage expands. Implement a reasonable database partitioning strategy to improve batch query efficiency.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `TEXT_INDEX_CONFIG` | `{"fields": ["Generic Herbal Name", "Origin", "7-Day Yield", "30-Day Yield"], "weights": {"7-Day Yield": 2, "30-Day Yield": 1.5}}` | Yield rate-related queries are core scenarios. Increasing the weight of corresponding fields optimizes recall accuracy and covers major search keywords |
| `DATA_SYNC_CRON` | `["0 2 * * *", "0 1 * * 0"]` | Matches the update cadence of daily market quotes and weekly cost data. Executing during low-peak early morning hours avoids consuming business resources |
| `DB_CONNECTION_POOL_SIZE` | `10–15` | Concurrent query demand for TCM data is moderate. This value covers conventional concurrent scenarios and prevents connection exhaustion |
| `DATA_CLEAN_RETENTION_DAYS` | `90` | Retaining 90 days of historical data meets conventional business query needs while controlling storage resource usage |
| `RECALL_NUMBER` | `Top 8 entries` | Core results for TCM yield rate queries are concentrated in a small number of highly relevant entries. This value balances query efficiency and result completeness |
| `PARSE_FILE_TIMEOUT` | `600 seconds` | Single TCM trading data files may contain data from multiple markets and medicinal varieties. Parsing takes a long time. This value avoids timeout interruptions |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- Symptom: Startup error occurs after upgrading FastGPT, with the prompt `text index required for $text query`. Cause: The original text index configuration was not retained during the upgrade, or the new version does not automatically create a full-text index for yield rate-related fields by default. This prevents text search during RAG queries.
- Symptom: Some historical data is lost after executing a database upgrade operation. Cause: Database data persistent mounting was not configured, or the upgrade script did not specify retaining the original database volume. This causes locally stored data to be cleared when the container is recreated.
- Symptom: Empty results are returned when querying the yield rate of a specified TCM herb. Cause: Scheduled synchronization tasks were not configured according to the data source update cadence, so the latest transaction and calculation data is not stored in the database. Or the recall number configuration is too low, causing target results to be omitted.

## How to Confirm Configuration is Complete
- Log in to the database management interface, check the full-text index status of fields including `药材通用名`, `近7日收益率`, `近30日收益率`, and confirm that the index has been created with no abnormal errors.
- Manually trigger a scheduled synchronization task, check the system logs for no errors during data pulling, parsing, or storage, and confirm that the latest TCM medicinal data has been added to the database.
- Submit a query that includes a specific medicinal name and yield rate keywords, verify that the returned results have complete fields, and that the update time matches the actual data source update cadence.
- Check database connection pool monitoring metrics, confirm that the current active connection count does not exceed the configured maximum connection pool size, and that there are no connection exhaustion issues.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
