---
title: Conversation Logs and Auditing for Securities Yield Data
slug: /en/industry/finance-d007-c133-f006
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Conversation Logs and Auditing for Securities Yield Data
meta_description: The data related to securities yields is sourced from official market data APIs of the Shanghai, Shenzhen and Beijing Stock Exchanges, and public
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logs and Auditing for Securities Yield Data

## What the Data for This Category Looks Like
The data related to securities yields is sourced from official market data APIs of the Shanghai, Shenzhen and Beijing Stock Exchanges, and public datasets from China Securities Index Co., Ltd. The update frequency is 5 to 15 seconds during trading days to push real-time order book changes. Full aggregated yield-related data is fully updated at 16:30 each trading day after market close. Each single data record includes trading date, security code, security name, opening price, closing price, price change percentage, total transaction amount, turnover rate. The unit of price is yuan, total transaction amount is ten thousand yuan, and turnover rate is a proportional value. The data structure is fixed and strongly correlated with trading decisions, with no redundant fields.

## Constraints on Conversation Logs and Auditing
High-frequency real-time market data updates require conversation logs to store complete data snapshots each time a conversation triggers. Otherwise, auditors cannot restore the exact market data present when the user submitted their query.
Each single data record contains multiple fields related to trading decisions. Log collection must fully retain the correspondence between request parameters and returned fields. This avoids missing or misaligned fields.
End-of-day data updates follow fixed timelines. Logs must mark the data generation timestamp. This lets auditors verify the match between the user’s query time and data release time. It also prevents use of expired or non-compliant advance data.
Audits of securities data must comply with regulatory retention rules. Log storage periods must meet the durations specified by applicable regulatory requirements. This ensures the auditing process is fully traceable.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `LOG_RETENTION_DAYS` | `180 days` | Securities conversation logs must meet regulatory retention requirements. 180 days covers the conventional auditing span. |
| `ENABLE_FULL_CHAT_LOG` | `Enabled` | Securities conversations must fully record request parameters and original returned data. This avoids field truncation that would harm auditing accuracy. |
| `MONGO_LOG_COLLECTION_NAME` | `fastgpt_securities_logs` | Split log collections by business scenario. This lets users quickly retrieve securities-related conversation logs by category. |
| `SNAPSHOT_SAVE_ENABLE` | `Enabled` | Real-time market data updates at high frequency. Save original data snapshots for each request. This ensures auditors can restore the exact market data present at the time of the query. |
| `LOG_TRIGGER_RULE` | `All interaction nodes` | Auditing of securities conversations must cover the entire process. This includes all links such as data query and parameter confirmation. |
| `LOG_ERROR_ONLY` | `Disabled` | Retain all conversation logs. This facilitates backtracking of the complete interaction process during audits.

> The parameter values provided on this page are common starting points for configuration. The actual values are affected by material form, data volume and business rules. Specific issues require specific analysis. It is recommended to test on your own samples before finalizing the configuration.

## Three Common Misconfiguration Issues
- Symptom: The conversation details page only displays text interaction content. It cannot show internal data requests or original returned snapshots. Cause: The `ENABLE_FULL_CHAT_LOG` configuration is not enabled. The system only stores simplified interaction text. It does not save complete request parameters and returned data.
- Symptom: Target historical securities conversation records cannot be retrieved via the MongoDB client. Cause: Logs are written to the default collection instead of the dedicated collection. Or the `LOG_RETENTION_DAYS` configuration value is less than the regulatory retention requirement. This causes data to be automatically cleaned up.
- Symptom: Some securities yield data fields are empty during audits. Cause: `SNAPSHOT_SAVE_ENABLE` is not configured. The system does not save original data snapshots for each request. This makes it impossible to obtain accurate data at the corresponding time point during backtracking.

## How to Verify Successful Configuration
- Access the application log management module of FastGPT, select the target securities application, and confirm that the complete interaction process, including data request parameters and original returned content, is visible.
- Connect the configured MongoDB log collection, retrieve log entries containing security code keywords, and confirm that complete records of corresponding conversations exist.
- Initiate a simulated user query, check the snapshot fields of the corresponding log, and confirm that the original securities data and timestamp at the time of the query are saved.
- Review the system log retention configuration, and confirm that the retention period meets the auditing requirements of the applicable scenario.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
