---
title: Database and Operations for Advertising and Marketing Research Knowledge Base Construction
slug: /en/industry/finance-d006-c062-f010
page_type: Industry scenario page
article_section: Research Knowledge Base Governance
is_part_of: FastGPT Tech Center
meta_title: Database and Operations for Advertising and Marketing
meta_description: Data comes primarily from ad platform backends, third-party media monitoring tools, competitor ad material libraries, industry marketing whitepapers
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Database and Operations for Advertising and Marketing Research Knowledge Base Construction

## What this category of data looks like
Data comes primarily from ad platform backends, third-party media monitoring tools, competitor ad material libraries, industry marketing whitepapers, and audience profile datasets. Update frequencies cover real-time (campaign performance data), hourly (channel traffic fluctuations), daily (competitor material updates), and weekly (industry reports). Each document includes fields such as campaign ID, media channel category, material format, impressions, clicks, conversion cost, delivery time window, and target audience reach count. Units include impressions, yuan, and people. Data is stored as structured key-value pairs, with no overly nested sub-documents.

## What constraints do these characteristics impose on database and operations work
High-frequency writes of real-time campaign data require databases with high throughput write capabilities to prevent data buildup that disrupts subsequent research queries.
Multi-source heterogeneous data integration needs support for mixed storage of structured metric data and unstructured material files, to fit the storage needs of different data types.
Many field dimensions with frequent updates require composite indexes on commonly used query fields, to reduce latency for large-scale queries.
Historical data backtracking needs for research scenarios require databases to support fast range queries by campaign ID.
Layered backup strategies must be configured to match data update rhythms, to ensure traceability of historical data across different time cycles.

## How to set the configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `MONGODB_URI` | `mongodb://admin:yourpass@mongodb-host:27017/fastgpt_marketing?authSource=admin` | Follows standard MongoDB connection format, adapts to permission control and database routing for multi-source marketing data access |
| `UPLOAD_FILE_MAX_SIZE` | `2000 MB` | Covers upload needs for mainstream long-form video ad materials and high-definition graphic and text materials, prevents large file upload failures |
| `RECALL_TOP_K` | `10–20` | Balances the comprehensiveness and processing efficiency of research queries, avoids excessive recall results increasing context window pressure |
| `DB_WRITE_TIMEOUT` | `30 seconds` | Matches the write latency tolerance of real-time campaign performance data, prevents connection timeouts in high-frequency write scenarios |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600 seconds` | Adapts to OCR and text parsing time for long-form video ad materials, prevents mid-parsing interruptions |
| `SEARCH_SIMILARITY_THRESHOLD` | `0.75–0.85` | Filters low-relevance competitor materials or industry report fragments, improves precise matching of research results |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material format, data volume, and business rules. Each scenario requires specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three common mistakes
- Symptom: After deploying MongoDB locally on Windows 10, a `Connection refused` error is returned when connecting. Cause: The system firewall permission for MongoDB's default port 27017 is not enabled, or the local host address and authentication parameters are not correctly specified in the `MONGODB_URI` configuration.
- Symptom: Research conversation history cannot be queried in the `chat_histories` collection of MongoDB. Cause: The `ENABLE_CHAT_HISTORY` configuration item is not enabled, or the database user is not granted write permissions for the `chat_histories` collection.
- Symptom: When calling a tool, the number of knowledge base recall results does not match the configured `RECALL_TOP_K`, and the returned results have poor relevance. Cause: The knowledge base recall threshold configuration is not updated synchronously, or multiple levels of filtering rules are enabled at the same time, causing valid matching results to be filtered out early.

## How to confirm the configuration is correct
- Run the `mongo` command to connect to the configured `MONGODB_URI`, verify that the database connection is normal, and adjust firewall and permission configurations based on the returned connection status.
- Upload a single ad material file that complies with the `UPLOAD_FILE_MAX_SIZE` limit, check the upload progress and parsing status, confirm that the file storage and parsing processes work without errors.
- Initiate a research conversation that includes a query for delivery metrics, check if the number of returned recall results matches the configured `RECALL_TOP_K`, adjust the similarity threshold based on the matching results.
- View the database monitoring dashboard, confirm that write operation latency is lower than the configured `DB_WRITE_TIMEOUT` value, verify throughput capability in high-frequency write scenarios.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
