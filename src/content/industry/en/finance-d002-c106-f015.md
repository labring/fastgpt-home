---
title: Deployment and Upgrade for Usage Statistics Integrated AI Platform
slug: /en/industry/finance-d002-c106-f015
page_type: Industry scenario page
article_section: Unified AI Platform and Multi-App Orchestration
is_part_of: FastGPT Tech Center
meta_title: Deployment and Upgrade for Usage Statistics Integrated AI
meta_description: Usage statistics category data is sourced from built-in platform API call link tracking, container resource monitoring probes, and application runtime
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Deployment and Upgrade for Usage Statistics Integrated AI Platform

## What Data for This Category Looks Like
Usage statistics category data is sourced from built-in platform API call link tracking, container resource monitoring probes, and application runtime logs. Aggregated snapshots are generated per the configured statistical time window. The document structure includes unique application identifier, statistical time interval, total API call count, context token usage, and peak computing resource occupancy. Corresponding units for each field are string, ISO 8601 format, count, token, and MB. There are no mandatory custom fields, only a requirement to match the platform’s built-in statistical data parsing rules.

## What Constraints These Characteristics Impose on Deployment and Upgrade
Data comes from multiple tracking links and monitoring probes. Configure corresponding monitoring plugins and log collection channels in advance during deployment. Valid statistical data cannot be generated otherwise.
Data is aggregated per time window. Use a rolling update strategy during upgrades. This prevents interrupting the aggregation link and causing statistical data gaps.
Fields include unique application identifiers and resource metrics. Configure association rules for application identifiers and resource collection thresholds during deployment. Maintain compatibility with the old data structure during upgrades to avoid statistical data parsing failures.
Statistical data must meet compliance requirements. Confirm the storage path complies with data retention regulations during deployment.

## How to Set Configurations
| Configuration Item | Recommended Value | Rationale |
| ---- | ---- | ---- |
| `STAT_INTERVAL` | `300 seconds` | Matches time window requirements for conventional statistical scenarios, balances data timeliness and storage overhead |
| `STAT_STORAGE_TTL` | `7 days` | Matches statistical data retention periods required by compliance regulations in financial scenarios |
| `APP_ID_MAPPING_PATH` | `/data/app_id_rules.yaml` | Uniformly manages association rules between application identifiers and statistical dimensions, facilitates batch configuration |
| `RESOURCE_MONITOR_ENABLE` | `Enabled` | Collects peak computing resource usage, improves dimension coverage of statistical data |
| `STAT_API_TIMEOUT` | `60 seconds` | Prevents statistical aggregation tasks from being interrupted by timeouts, ensures complete data generation |
| `PARSE_STAT_DATA_SCHEMA` | `Follow official v4.12 version definition` | Ensures statistical data structure is compatible with built-in platform tools, avoids parsing exceptions |

> The parameter values provided on this page are general recommendations that serve as a starting point for configuration. Actual values are affected by material form, data volume and business rules. Specific issues require individual analysis. It is recommended to test on your own samples before finalizing settings.

## Three Common Mistakes
- Symptom: After deployment, the MCP tool cannot retrieve workflow global variables, and the log shows the `variable_not_found` error code. Cause: The `STAT_GLOBAL_VAR_SYNC` parameter is not configured, causing the statistical link to fail to synchronize workflow global variables to the MCP call context.
- Symptom: After updating the `aiproxy` and `sandbox` components, usage statistics data has gaps. Cause: The old `STAT_INTERVAL` configuration was not retained during the upgrade, causing aggregation snapshot generation to be interrupted.
- Symptom: After locally deploying M3E and connecting to AIPROXY, the `token_usage` statistical field is empty. Cause: The `AIPROXY_STAT_UPLOAD` configuration is not enabled, so token data from model calls is not reported to the statistical link.

## How to Verify Successful Configuration
- View the `last_update_time` field in the statistics panel, confirm its update frequency matches the time interval configured in `STAT_INTERVAL`.
- Trigger a test API call, check if the statistical data includes the `call_count` increment for that call, and verify that the configured application identifier matches the test application.
- Check the `resource_peak` field in the monitoring panel, confirm that computing resource usage data is collected, and verify that the `RESOURCE_MONITOR_ENABLE` configuration is active.
- Check the system logs for the `stat_sync_success` flag, confirm that the global variable synchronization link is operating normally.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
