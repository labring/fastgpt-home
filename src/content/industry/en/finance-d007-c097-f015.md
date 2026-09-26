---
title: Deployment and Upgrade of Coke Coal Yield Metrics
slug: /en/industry/finance-d007-c097-f015
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade of Coke Coal Yield Metrics
meta_description: Coke coal market and yield data is sourced from public market APIs of domestic commodity futures exchanges. Full daily data updates are completed
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade of Coke Coal Yield Metrics

## What the Data for This Category Looks Like
Coke coal market and yield data is sourced from public market APIs of domestic commodity futures exchanges. Full daily data updates are completed approximately two hours after the 15:00 daily market close.
Data is provided in structured JSON or CSV formats. Included fields are contract code, delivery month, benchmark settlement price, daily average transaction price, daily price change, total open positions, and more. Units are string, year-month format, yuan/ton, yuan/ton, yuan/ton, and lots respectively.
Data only covers coke coal futures contracts listed on the Dalian Commodity Exchange. No additional derived statistical fields are included.

## Constraints on Deployment and Upgrade Workflows
These data characteristics create three core constraints for deployment and upgrade workflows.
First, the data source is a dedicated futures market API. Exclusive authentication parameters must be configured, and call frequency must align with exchange rate limiting rules. Additional request rate limiting middleware must be configured during deployment to prevent API bans.
Second, data updates occur at a fixed time each day. A scheduled pull task trigger time must be configured during deployment, aligned with the exchange's data release time, to avoid pulling incomplete or empty data.
Third, fields include structured identifiers such as contract code and delivery month. Data validation rules must be configured during deployment to filter invalid data. The latest coke coal futures contract list must be updated synchronously during upgrades to ensure coverage of all listed contracts.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| ---- | ---- | ---- |
| `CRON_EXPRESSION` | `0 18 * * *` | Coke coal futures data is released approximately two hours after the 15:00 daily market close. This cron expression ensures full daily data is pulled at 18:00 each day |
| `EXTERNAL_DATA_SOURCE_API_KEY` | Exclusive authentication key applied for from the exchange | Dedicated market APIs require authentication for access. A valid key ensures data pull permissions |
| `PARSE_DATA_VALIDATION_RULES` | `["contract_code", "settlement_price", "daily_change"]` | Ensures core data fields are complete, filters invalid data missing critical information |
| `MONGODB_MAX_POOL_SIZE` | `20` | Coke coal market data volume is moderate. A 20-connection pool meets concurrent pull and storage requirements |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | `30` | Matches the rate limiting threshold of domestic commodity exchange market APIs to avoid triggering bans |
| `UPDATED_DATA_SYNC_INTERVAL` | `86400 seconds` | Coke coal market data only needs to be updated once per day. This interval avoids pulling redundant duplicate data |

> The parameter values provided on this page are common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After deploying with Docker Compose, running `pnpm dev` displays a MongoDB connection timeout. Cause: Correct `MONGODB_URI` parameter is not configured in the `.env` file, or the local MongoDB service is not started and no in-container MongoDB image is enabled.
- Symptom: Scheduled pulled coke coal market data fields are empty. Cause: The configured `CRON_EXPRESSION` is earlier than the exchange's data release time, resulting in pulled incomplete or empty data.
- Symptom: After deployment, calling the market API returns a 403 Forbidden error. Cause: The `EXTERNAL_DATA_SOURCE_API_KEY` parameter is not configured, or an invalid authentication key is used.

## How to Verify Proper Configuration
- Run `docker compose up -d`, then check container logs to confirm there are no timeout errors in MongoDB connection logs.
- Manually trigger a scheduled pull task, then check if the parsed coke coal market data includes required fields.
- Call the market API for testing, confirm the returned status code is 200 and data fields are complete.
- Check the scheduled task trigger logs to confirm there are data pull records around 18:00 each day.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
