---
title: Conversation Logs and Auditing for Duty-Free Yield Rates
slug: /en/industry/finance-d007-c019-f006
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Conversation Logs and Auditing for Duty-Free Yield Rates
meta_description: Data for this category comes from daily operational reports submitted by duty-free retail store POS systems and offshore duty-free supervision
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logs and Auditing for Duty-Free Yield Rates

## What the data for this category looks like
Data for this category comes from daily operational reports submitted by duty-free retail store POS systems and offshore duty-free supervision platforms. Full synchronization of the previous day’s data is completed every early morning. Each daily report document is grouped by store and product category, and includes six core fields: store code, product category code, total daily revenue, total daily operating cost, total daily passenger flow, and revenue per passenger flow. Total revenue and total operating cost are denominated in Chinese Yuan. Total passenger flow is measured in person-times. Revenue per passenger flow is measured in Yuan per person-time. The number of entries in a single daily report varies based on the scope of covered stores and product categories, with no fixed upper limit.

## What constraints do these characteristics impose on conversation logs and auditing workflows
The daily full-update data source requires conversation logs to record the date timestamp of the called data and the data source identifier. This ensures the timeliness of data sources can be traced during audits. The document structure grouped by store and product category requires logs to also record filter conditions set during conversations, such as specified store codes or product categories. This facilitates matching the scope of conversation requests and returned data. The design with multiple fields and differentiated units requires logs to fully record unit information for each returned field, avoiding unit confusion during audits. The lack of a fixed upper limit on the number of entries requires logs to record the total number of returned entries, facilitating verification of the completeness of conversation return results.

## How to set configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `LOG_RETENTION_DAYS` | `30–90 days` | Duty-free retail operational audits typically cover monthly to quarterly cycles. Retaining data for 30 to 90 days meets regular audit requirements while avoiding excessive storage usage |
| `MAX_SESSION_LOGS` | `500–1000 entries` | Queries about duty-free yield rates in a single session typically do not exceed 500 entries. Threshold breaches can trigger automatic truncation or archiving to prevent excessive single-session log size |
| `LOG_INCLUDE_FIELDS` | `["session_id", "query_time", "data_date", "filter_conditions", "return_entry_count", "unit_info"]` | Must cover conversation requests, data date, filter conditions, returned entry count, and unit information to meet audit traceability requirements |
| `LOG_AUDIT_WHITELIST` | `["/api/v1/chat/completions", "/api/v1/finance/report", "/api/v1/oneapi/completions"]` | Only record API requests related to yield rate and market trend queries and large model calls. Filter unrelated logs to improve audit efficiency |
| `LOG_CLEAN_TRIGGER_SIZE` | `100 GB` | Based on estimated daily log generation volume, a 100 GB threshold reserves sufficient buffer space to prevent storage overflow |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require case-by-case analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Errors
- Symptom: The `aiproxy_pg` service exits after running `docker-compose up`, with logs showing "permission denied for log directory". Cause: The permission settings for the log mount directory have not been configured to allow read/write access for the FastGPT runtime user, preventing database logs from being written.
- Symptom: Duty-free yield rate data returned by conversations has mismatched units or empty fields. Cause: The `unit_info` field is not included in the `LOG_INCLUDE_FIELDS` configuration. This makes it impossible to verify units during audits, and logs do not record the cause of missing fields.
- Symptom: No corresponding session logs appear in the FastGPT backend after initiating a conversation via a OneAPI call to a large model. Cause: `/api/v1/oneapi/completions` is not added to the `LOG_AUDIT_WHITELIST` configuration item, so the related request is not recorded.

## How to Confirm the Configuration is Correct
- Confirm that the current FastGPT version is v4.9.7 or higher. This version adds support for custom log fields and data source identifier recording, which meets the configuration requirements for this scenario.
- Log in to the FastGPT backend log management page, check whether conversation logs for specified stores and product categories are present, and verify that the logs include preset fields such as `data_date` and `filter_conditions`.
- Run a duty-free yield rate query conversation, check whether the field units of the returned results match the configured `unit_info`, and confirm that the total number of returned entries is recorded in the logs.
- Call the OneAPI interface to initiate a large model conversation, check whether corresponding session logs are generated in the backend, and confirm that the whitelist configuration is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
