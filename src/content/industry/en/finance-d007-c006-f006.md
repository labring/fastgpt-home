---
title: Conversation Logs and Auditing for Traditional Chinese Medicine (TCM) Yield Rates
slug: /en/industry/finance-d007-c006-f006
page_type: Industry scenario page
article_section: Yield and Market Daily Briefing
is_part_of: FastGPT Tech Center
meta_title: Conversation Logs and Auditing for Traditional Chinese
meta_description: TCM yield and market data comes from public industry market collection channels. Full updates are completed at fixed times each day. Documents use a
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Conversation Logs and Auditing for Traditional Chinese Medicine (TCM) Yield Rates

## What this category's data looks like
TCM yield and market data comes from public industry market collection channels. Full updates are completed at fixed times each day. Documents use a structured format, including fields such as variety name, origin specification, daily average transaction price, daily total transaction volume, and statistical date. Transaction price is measured in yuan per kilogram, and total volume is measured in tons. Each record corresponds to complete daily market information for a single variety.

## Constraints for conversation logs and auditing
The daily fixed update requirement means the audit step must verify that the statistical date of returned market data matches the time range requested by the user, to prevent misuse of cross-period data. The structured multi-field document format requires conversation logs to fully record the extraction and verification process of key parameters such as variety name and origin specification, to avoid missing or mismatched fields. The single-record-per-variety format requires auditing to distinguish market data call records for different varieties across multi-turn conversations, to prevent mixing data from different varieties. Publicly collected data sources require call chain identifiers to be retained in logs, to facilitate backtracking of data source compliance and timeliness.

## Configuration Settings
| Configuration Item | Recommended Value | Rationale |
|---|---|---|
| `LOG_RETENTION_DAYS` | 30 days | TCM market daily reports are updated once per day. Auditing requires retaining logs for at least one full trading cycle; 30 days covers full monthly auditing requirements |
| `WORKFLOW_LOG_LEVEL` | DEBUG | Full records of plugin calls and field extraction across the workflow are required to troubleshoot field mismatch issues |
| `PLUGIN_EXTRACT_FIELDS` | Set to `["品种名称", "产地规格", "当日交易均价", "统计日期"]` | Matches core fields of TCM market data, ensuring audits can verify extraction results for key parameters |
| `MAX_CONTEXT_HISTORY` | Top 6 entries | Prevents field confusion from excessive historical data in multi-turn conversations, aligns with the auditing granularity requirements of single-turn conversations |
| `DATA_SOURCE_VERIFY_INTERVAL` | 24 hours | Matches the daily update rhythm of TCM market data, verifies data source update status each day |
| `AUDIT_LOG_SAMPLING_RATE` | 100% | Auditing scenarios require full log recording to ensure no missing call chain backtracking |

> The parameter values provided on this page are common starting points for configuration setup. Actual values are affected by material form, data volume, and business rules. Specific issues require targeted analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Misconfigurations
- Phenomenon: After workflow orchestration, multi-turn conversations cannot associate TCM market data from different dates, and field matching results of historical requests are not recorded in logs. Cause: Workflow nodes do not have context transfer configuration enabled, or the value of `MAX_CONTEXT_HISTORY` does not adapt to the field retention requirements of multi-turn conversations.
- Phenomenon: When a code running node inputs historical TCM market records, verification fails, and the node returns status code 400. Cause: FastGPT v4.8.14 updated the format verification logic for workflow input fields, and does not support incoming market data in structured array format.
- Phenomenon: Only partial call steps are displayed in audit logs, and complete plugin call chains are not recorded. Cause: `WORKFLOW_LOG_LEVEL` is configured to INFO level, and full process logging at DEBUG level is not enabled, resulting in filtering of logs for key steps.

## How to Confirm Proper Configuration
- Log in to the FastGPT backend log management page, view the current configuration of `LOG_RETENTION_DAYS`, and confirm the value meets auditing cycle requirements.
- Initiate a market query conversation involving multiple TCM varieties, check that workflow logs fully record field extraction and verification processes for each variety.
- Add a code running node to the workflow and pass structured market data, confirm the node has no verification failure prompts and is compatible with the currently deployed FastGPT version.
- View audit log sampling records, confirm that all conversation and workflow call chains are fully retained, with no missing key steps.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
