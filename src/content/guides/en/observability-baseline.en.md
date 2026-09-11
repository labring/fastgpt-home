<!--
slug: observability-baseline
canonical: https://fastgpt.io/guide/observability-baseline
hreflang: en | zh-CN → https://fastgpt.cn/guide/observability-baseline | en → https://fastgpt.io/guide/observability-baseline | x-default → https://fastgpt.io/guide/observability-baseline
Meta title: FastGPT Observability: Logs, Metrics and Alert Ownership
Meta description: Set a FastGPT observability baseline for logs, metrics and alerts, with clear ownership, deployment checks, response thresholds and acceptance criteria.
keywords: observability baseline
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 深度内容-英文版/observability-baseline-EN-V1.0-20260907.md
source_sha256: 078ba96c618b1d1df5b2d528c9831e58eddc7a7ff6093aee9976f5f25f4cf727
source_verified: 2026-09-07
publication_batch: Week08
-->

# Observability Baseline Before Go-Live: Logs, Metrics and Alert Ownership

## When this becomes a decision
You face this mandatory decision when your deployed system shifts from a monolith to a distributed architecture, or when you add MCP tool integrations or Agent mode features. Scattered monitoring configurations will show their limitations over time. You will need a formal observability baseline when cross-team collaboration has unclear responsibility boundaries, troubleshooting takes too long, alerts are delayed, or compliance audits fail.

For example:
- Adding LLM request tracing without clear log ownership slows down debugging of LLM call errors
- Switching your log storage from Mongo to OTEL collection without proper configuration causes missing or unaggregated logs
- Unmonitored internal MCP tool calls make it hard to tell if failures come from the server or client
- Multi-node, multi-service deployments lead to team blame-shifting without a unified observability baseline, harming system stability and operational efficiency

## What to settle first
| Criterion | What to set | Basis |
| --- | --- | --- |
| LLM request tracing log retention duration | Default 6 hours, adjustable via `LLM_REQUEST_TRACKING_RETENTION_HOURS` | v4.14.7 added temporary LLM request tracing for debugging |
| Chat log filtering | Enable error log filtering and user-specific precise filtering | v4.14.7 added chat log list filtering feature |
| System dependency pre-check | Run infra/subservice validity check on startup | v4.14.7 added dependency pre-check to locate unavailable services |
| Model monitoring metric collection | Enable cache hit rate collection | v4.14.7 added model monitoring cache hit rate metric |
| MCP service monitoring metrics | Collect schema parsing status, call success rate, response latency | MCP service $ref syntax optimization and MCP call issues mentioned in requirements |
| Alert threshold grading | Divide into P0, P1, P2 levels with corresponding response timelines | Confirm specific thresholds based on actual business scenarios |

These criteria have clear priorities and tradeoffs:
1. Core link logs and metrics take precedence over non-core features. LLM request tracing and MCP service monitoring belong to core business links and must be configured and collected first.
2. Log retention duration balances debugging needs and storage resource usage. The default 6-hour retention meets most debugging requirements. You can adjust it via the environment variable for longer audit cycles, but confirm storage capacity matches your environment first.
3. Each criterion maps to a specific responsible team. For example, the operations team verifies system dependency pre-checks, while the AI application development team analyzes model monitoring metrics. Clarify responsibility boundaries to avoid overlap or gaps.
4. Alert threshold grading ties to business impact. P0 alerts mean core system functions are unavailable and require immediate response. P2 alerts affect non-core functions and can be handled during working hours. Avoid overconfiguring alerts to prevent alert fatigue.

## How to do it
First, align and configure your log system:
Remove the legacy environment variables `LOG_LEVEL`, `STORE_LOG_LEVEL`, `SIGNOZ_BASE_URL`, `SIGNOZ_SERVICE_NAME`, and `SIGNOZ_STORE_LEVEL`. Configure the new log control variables: enable console printing and OTEL collection, set the minimum required log level, and specify the service name and collection address for the OTLP collector. Adjust the LLM request tracing retention period using the `LLM_REQUEST_TRACKING_RETENTION_HOURS` variable to meet different debugging needs. Enable the error log filtering and user-specific precise filtering options for chat logs to quickly screen and locate abnormal logs.

Second, configure core metric collection:
Enable cache hit rate collection for model monitoring and include this metric in your AI application’s performance monitoring system. Configure MCP service monitoring metrics, including schema parsing status, call success rate, and response latency. Use the dependency pre-check function when the service starts to verify MCP service validity; block failed services from starting and trigger an alert. Collect error rate metrics for scenarios like knowledge base uploads and file parsing to quickly identify functional abnormalities. For internal MCP tool calls, add long connection monitoring metrics to ensure local Agent node registration and command delivery links work properly.

Third, align alert thresholds and responsibility boundaries:
Clarify responsible teams for each metric and log: The operations team monitors and alerts on infrastructure metrics and dependent service availability. The AI application development team handles monitoring and alerts for LLM requests, model performance, and MCP services. Customer support and operations teams manage chat log reviews and user problem troubleshooting. Divide alerts into P0, P1, and P2 levels based on business impact: P0 alerts mean core system functions are unavailable (e.g., abnormal LLM request success rate, dependent service downtime) and require a 15-minute response. P1 alerts mean core function performance drops (e.g., reduced model cache hit rate) and require a 1-hour response. P2 alerts affect non-core functions (e.g., abnormal shared link event transmission) and can be handled during working hours. Set alert recipients to match the responsible teams or individuals for each level.

Fourth, roll out and iterate the baseline:
Add all observability baseline configurations to your pre-go-live checklist to ensure every criterion is properly configured and verified. Regularly review alert records and monitoring data to adjust alert thresholds and collection rules and avoid alert fatigue or missed critical abnormalities. Update the observability baseline when you add new features or components to cover all core business links. For example, when adding a local Agent node registration feature, sync the configuration for long connection status, node registration status, and related alert rules.

## How to verify
1. Log configuration verification: Log in to the service backend to check environment variables. Confirm all legacy log-related variables are removed and the six new log control variables are correctly set. Trigger an LLM request to verify that corresponding trace logs generate and retain for the configured duration. Pass if variables are correctly configured and logs generate and retain as expected.
2. Metric collection verification: Check the monitoring dashboard to confirm model cache hit rate, MCP service call metrics, and system dependency pre-check results are collected normally with no data gaps. Pass if metric data updates on time and no error messages appear.
3. Alert threshold verification: Simulate alert scenarios for each level: close a dependent service to trigger a P0 alert, adjust model cache hit rate to trigger a P1 alert. Confirm alerts trigger on time and are sent to the preset recipients. Pass if alerts respond promptly and recipients match the assigned responsibility boundaries.
4. Filter function verification: Navigate to the chat log list, test the error log filtering and user-specific precise filtering functions. Confirm the system correctly screens the intended log content. Pass if filters work without errors.
5. MCP function verification: Configure an MCP service, test the `getTools` and `runTool` functions. Confirm the system correctly parses schemas and calls tools with no protocol errors. Pass if MCP functions run normally.
6. Responsibility boundary verification: Check the alert assignment rules to confirm each metric and log has a correct responsible team with no overlapping or missing responsibilities. Pass if alert assignments match the predefined boundaries.
7. Compliance verification: Confirm the log retention duration meets your enterprise’s compliance requirements. Adjust if no formal compliance standards exist. Pass if the log retention period matches your business and compliance needs.

## Limits: when this approach does not hold
This baseline approach will not work if:
- Your monitoring components do not support the OTEL protocol. Version v4.14.7 rebuilt the log system and removed Mongo storage, so only OTEL collection is supported.
- Your MCP service uses a non-standard request method instead of JSON-RPC (e.g., only supports GET requests instead of POST). This will cause `getTools` calls to fail and prevent collection of MCP service metrics.
- Your internal network has strict firewall restrictions that block long connections. Local Agent node registration and internal MCP tool calls will fail.
- You add new components not covered by the baseline (e.g., a vector database or new model service). Existing metrics and logs will not cover the new component, so you must update the baseline.
- Your team’s responsibility boundaries are unclear. Operations and development teams will face delayed or missed alert handling, and the baseline will not deliver its intended value.
- Your compliance requirements exceed the current log retention configuration. For example, some industries require 6+ months of log retention, while the default LLM request tracing retains logs for only 6 hours. Adjust the retention period, but confirm storage capacity matches your environment first.

## Keep reading

- [Decision Guide for Upgrade Cadence: Version-Skip Risks and Rollback Readiness](/en/guide/version-upgrade-decision)
- [API Integration Acceptance Criteria: Auth, Rate Limits, and Error Handling](/en/guide/api-integration-acceptance)
- [Backups Are Not Recovery: How Far a Restore Drill Must Go](/en/guide/backup-restore-drill)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- [Contact sales](/en/contact): apply this process to your deployment
- [Get started](/en/start): validate the process on the cloud service
- [Pricing](/en/price): compare what each form covers
