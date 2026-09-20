---
title: Model Integration and Configuration for Usage Statistics All-in-One AI Platform
slug: /en/industry/finance-d002-c106-f012
page_type: Industry scenario page
article_section: Unified AI Platform and Multi-App Orchestration
is_part_of: FastGPT Tech Center
meta_title: Model Integration and Configuration for Usage Statistics
meta_description: Usage statistics data is sourced from FastGPT's model invocation link logs, billing statistics module, and node operation monitoring data. Updates
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Model Integration and Configuration for Usage Statistics All-in-One AI Platform

## What the data for this category looks like
Usage statistics data is sourced from FastGPT's model invocation link logs, billing statistics module, and node operation monitoring data. Updates follow a near real-time rhythm: aggregated snapshots are generated once per minute, while incremental invocation data is pushed simultaneously. The document structure uses structured JSON format, including fields such as `request_id`, `model_identifier`, `caller_tenant_id`, `prompt_tokens`, `completion_tokens`, `total_duration_ms`, and `status_code`. Corresponding units for each field are: invocation identifier is a string, token count is in units, duration is in milliseconds, status code is an HTTP standard status code, and tenant identifier is a string.

## Constraints Imposed on Model Integration and Configuration
Near real-time aggregated and incremental data requires that a matching synchronization interval be configured during model integration, to avoid excessive data delay that causes statistical deviations. Structured fields include model identifiers and status codes, requiring that access configurations bind model identifiers and statistical dimensions, and configure filtering rules for abnormal statuses. This ensures only valid invocation data is counted. Data sources involve invocation links and billing modules, requiring that interface permissions for two-way synchronization be configured. This prevents inconsistencies between statistical data and actual invocation records. The structured JSON format requires that mapping rules for data parsing be configured, to ensure parsing and storage of each field meet statistical requirements.

## How to Configure Settings
| Configuration Item | Recommended Value | Rationale |
| --- | --- | --- |
| `statistic_sync_interval` | `60 seconds` | Matches the aggregated snapshot generation frequency of once per minute, ensuring the time difference between statistical data and actual invocations is controllable |
| `model_identifier_whitelist` | Enter a list of actually deployed model identifiers, such as `qwen2.5-coder:7b,siliconcloud_llama3` | Ensures only usage data for integrated models is counted, preventing unrelated data from being included in statistical results |
| `error_code_filter` | `400,401,404,500` | Filters abnormal status codes for model invocations, only counting valid invocation data that returns `200` |
| `token_statistic_min_size` | `50 tokens` | Filters meaningless minimal token invocations, reducing statistical redundancy |
| `api_auth_scope` | `Only internal invocation links and billing modules` | Restricts access permissions for statistical data, preventing leakage of sensitive usage information |

> The parameter values provided on this page are all common recommended starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require specific analysis, and it is recommended to test on your own samples before finalizing settings.

## Three Common Configuration Mistakes
- The symptom is that a model invocation returns `502 Bad Gateway`. The cause is that an internally deployed model service has not correctly configured external network mapping rules, resulting in FastGPT being unable to access the model interface.
- The symptom is that an ollama model invocation returns a driver-related error. The cause is that the AMD graphics card has not correctly installed the adapted alternative driver, resulting in model loading failure.
- The symptom is that a model invocation returns an empty string. The cause is that the model request format has not been correctly configured, and the input fields required for the corresponding task have not been added.

## How to Confirm the Configuration Is Complete
- View the FastGPT usage statistics panel, confirm that the data update frequency matches the configured `statistic_sync_interval`.
- Manually initiate a model invocation that meets the `token_statistic_min_size` threshold, check whether a corresponding usage entry is generated in the statistics panel.
- View the system logs, confirm there are no timeout errors related to `statistic_sync_interval` or model integration.
- Cross-check the `model_identifier` field in the statistical data with the actually deployed model identifiers, confirm that the binding relationship is correct.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
