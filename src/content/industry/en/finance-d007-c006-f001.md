---
title: HTTP Interfaces and External Systems for Traditional Chinese Medicine Yield Rates
slug: /en/industry/finance-d007-c006-f001
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: HTTP Interfaces and External Systems for Traditional Chinese
meta_description: Data for TCM yield rates comes from daily trading snapshots of national specialized Chinese herbal medicine markets and public market datasets
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# HTTP Interfaces and External Systems for Traditional Chinese Medicine Yield Rates

## What This Category’s Data Looks Like
Data for TCM yield rates comes from daily trading snapshots of national specialized Chinese herbal medicine markets and public market datasets released by industry associations. Updates run daily at midnight to refresh full data from the previous day.
Each individual market quote document uses standardized structured fields. These fields cover Chinese herbal medicine variety code, common name, statistical date, previous day’s benchmark price, same-day transaction price, same-day yield rate, and same-day total transaction volume.
Benchmark price and transaction price use yuan per kilogram as their unit. Total transaction volume uses kilograms as its unit. Yield rate is a dimensionless relative change value, and no percentage unit is required.
This category’s market quote data typically covers dozens to hundreds of common varieties. The size of each daily report document increases as the number of covered varieties grows.

## Constraints Imposed on HTTP Interfaces and External Systems
The multi-variety coverage of the TCM category requires HTTP interfaces to support batch queries, to avoid redundant overhead from single-item requests.
The daily update rhythm requires external system scheduled pull tasks to match the once-daily scheduling interval, to avoid frequent requests that trigger interface rate limits or repeated retrieval of unchanged data.
The standardized field structure requires interface returned fields to align strictly with FastGPT knowledge base mapping rules, to avoid parsing failures caused by mismatched field names.
The dimensionless yield rate field requires no additional unit conversion processing, but the returned value precision must meet the calculation requirements of external systems.
The need to aggregate multiple data sources requires interfaces to support combined requests for multi-source data, to reduce the data integration workload of external systems.

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `PARSE_FILE_TIMEOUT_SECONDS` | 600 seconds | TCM market quote documents may include historical data for multiple varieties, leading to long parsing times. 600 seconds covers most parsing scenarios |
| `UPLOAD_FILE_MAX_SIZE` | 2000 MB | Archived files for single daily TCM market reports may include full data for multiple quarters, resulting in large file sizes. 2000 MB meets conventional archiving requirements |
| `HTTP_REQUEST_TIMEOUT` | 30 seconds | Interfaces of external data sources typically respond within the 10-25 second range. 30 seconds covers normal response durations and avoids request timeouts |
| `BATCH_QUERY_MAX_COUNT` | 50 items | Excessive single-batch queries increase interface load. 50 items balances query efficiency and system stability |
| `RESPONSE_FIELD_FILTER` | `variety code,variety name,statistical date,closing price,yield rate` | Only retain core fields required for daily report broadcasts, reducing data transmission volume and simplifying field processing logic for external systems |
| `HTTPS_CERT_MOUNT_PATH` | `/app/certs` | Follows the default certificate mounting specification for FastGPT containers, facilitating unified management and updates of SSL certificates |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: After starting the FastGPT container, the HTTPS interface returns a 502 Bad Gateway error, or access via the HTTPS address fails. Cause: The docker-compose.yml file was not modified correctly, and the local certificate directory was not mounted to the specified path of the FastGPT container, causing the container to fail to read the SSL certificate file.
- Symptom: When uploading the b.md file under the dir1 directory in the API knowledge base, the page shows the file is located in the root directory instead of the dir1 subdirectory. Cause: The file metadata returned by the HTTP interface does not carry the correct parent directory path, or the directory parsing parameter configuration of the knowledge base is incorrect, leading to abnormal path mapping.
- Symptom: After calling the TCM yield rate query interface, the returned data lacks the yield rate field, or the field value format does not meet expectations. Cause: The response field filtering rule was not configured correctly, or the field names of the external data source do not match the FastGPT field mapping, leading to field loss or format abnormalities.

## How to Verify Correct Configuration
- Run a curl command to call the configured HTTP interface, check whether the returned fields include the preset core fields, and whether the field format matches the locally tested data source.
- Upload a test TCM market quote document in the FastGPT knowledge base management interface, check whether the file directory structure matches the local file system.
- Start the FastGPT container and access the HTTPS address, check whether the page loads normally and the browser address bar shows a secure connection indicator.
- Configure a scheduled pull task, check whether the task can correctly obtain the daily TCM yield rate data after execution, and whether the data update time matches the update rhythm of the data source.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
