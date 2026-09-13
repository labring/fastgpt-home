<!--
slug: api-integration-acceptance
canonical: https://fastgpt.io/guide/api-integration-acceptance
hreflang: en | zh-CN → https://fastgpt.cn/guide/api-integration-acceptance | en → https://fastgpt.io/guide/api-integration-acceptance | x-default → https://fastgpt.io/guide/api-integration-acceptance
Meta title: FastGPT API Integration Acceptance and Error Handling
Meta description: Validate FastGPT API authentication, rate limits, error handling and regression coverage with an acceptance checklist for integration and operations teams.
keywords: api integration acceptance
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 深度内容-英文版/api-integration-acceptance-EN-V1.0-20260907.md
source_sha256: 35ca270af6ff538fff286aa4ae0de2c41ed795ad20a6caf2b9126168146b9a0f
source_verified: 2026-09-07
publication_batch: Week08
-->

# API Integration Acceptance Criteria: Auth, Rate Limits, and Error Handling

## When this becomes a decision
You face this decision when multiple internal teams or cross-entity groups deliver API integrations without pre-aligned uniform acceptance standards.

Unaligned rules cause post-launch business risks:
- Mismatched auth logic leads to unauthorized access or blocked valid requests
- Inconsistent rate limit settings trigger unnecessary traffic blocks or resource exhaustion
- Differing error handling rules make unified troubleshooting impossible
- Incomplete regression tests leave unvalidated functionality gaps

When these issues cause business outages, data anomalies, or user complaints, the original integration workflow problems escalate into critical decisions. You must quickly align acceptance standards and clarify responsibilities to avoid future disputes.

Cross-system permission checks, complex workflow scheduling, or high-concurrency scenarios further amplify risks and make problem identification harder without clear acceptance rules.

## What to settle first
Prioritize these criteria in order of integration scenario importance. Auth validation is the core top priority, as incorrect auth creates security risks. Adjust HTTP node and error handling rules based on the target service’s actual needs. Adjust workflow validation and rate limiting based on business complexity. Align resource identifier rules with internal system configurations.

| Criterion | What to set | Basis |
| --- | --- | --- |
| Auth validation rules | Explicitly pass APIKey with application context, validate user read permissions for associated resources | Optimized API key logic for unified APIKey management; secondary permission check before system tool runs |
| HTTP node configuration | Keep TLS certificate verification enabled with a trusted CA, and return full error objects when needed | New HTTP node configuration options to adapt to self-signed certificates and troubleshooting needs |
| Error handling logic | Auto-add `none` when tools return empty responses; HTTP nodes support custom error output | Optimized error handling rules to avoid errors from models or downstream services |
| Workflow node validation | Enable enhanced validation for array reference types, disable invalid connection modes | Optimized workflow node validation rules to avoid data conflicts and logical anomalies |
| Rate limiting and scheduling configuration | Migrate system tool runs to `local-pool`, configure process pool, queue, timeout, and retry backoff | Optimized plugin system runtime logic to avoid resource exhaustion from high concurrency |
| Resource identifier rules | Define value ranges for the unique application identifier `appId` and request source `source` | Explicit parameter specifications in API documentation to ensure correct request context |

## How to do it
Start with auth and resource identifier configuration. Confirm both parties’ APIKey management logic. Require explicit passing of application context with requests. Check that APIKeys have completed tag management and application name filling, and each APIKey links to the correct application identifier.

Define `appId` as the unique application identifier for requests. Select `source` parameter values based on integration scenarios, including `api`, `test`, `online`, `share`, to ensure correct request context. Validate user read permissions for associated applications, knowledge bases, or tools. Run a secondary permission check before system tools start to avoid unauthorized access.

Next, configure HTTP nodes and error handling. For self-signed services, configure a trusted CA and keep TLS verification enabled. Limit any temporary bypass to isolated diagnostics, restore verification afterward, and confirm untrusted certificates are rejected. Enable full error object return if you need complete error information.

For error handling, set auto-add of `none` when tools return empty responses to avoid errors from models or downstream services. Configure custom error output rules for HTTP nodes to ensure unified collection and troubleshooting of exception information. Also set the `MULTIPLE_DATA_TO_BASE64` variable to control whether image processing threads convert images to Base64 for model input, adapting to different model requirements.

Then configure workflow nodes and resource scheduling. Enable enhanced validation for array reference types in workflow nodes to avoid conflicts with two-dimensional data. Disable invalid workflow connection modes to ensure correct process logic. Set the `MAX_FOLDER_DEPTH` environment variable to prevent resource occupation from infinitely nested directories.

Migrate system tool runs to `local-pool`. Configure process pool, queue, timeout, retry backoff, and runtime metrics to avoid resource exhaustion from high concurrency. Set up worker pools for file parsing, HTML to Markdown conversion, and text chunking. Adjust parallelism based on system resources to ensure stable task scheduling.

Complete other supporting configurations. If the integration involves file storage operations, set S3 environment variables including storage vendor, region, access key, and bucket name to align file access permissions and storage logic with agreements. Set directory depth environment variables and worker pool parameters for file parsing to avoid resource exhaustion in high-concurrency scenarios. Check workflow loop and parallel execution node configurations to ensure variable updates and state synchronization meet expectations and avoid logical anomalies.

## How to verify
1.  Validate auth checks: Send a request with a valid APIKey and application context, confirm the interface returns a legitimate response. Send a request without an APIKey or with an invalid APIKey, confirm the interface returns an auth failure response. Send a request from a user without corresponding permissions, confirm the interface returns a permission denied response.
2.  Validate HTTP node configuration: Keep TLS verification enabled, confirm a service signed by the configured trusted CA succeeds, and confirm an untrusted certificate is rejected. Configure the HTTP node to return full error objects, call an abnormal interface, confirm the response includes complete error information.
3.  Validate error handling: Trigger a scenario where tools return empty responses, confirm the returned result automatically adds the `none` field. Trigger an HTTP node exception, confirm the response follows the configured error output rules.
4.  Validate workflow nodes: Configure an array reference type workflow node, pass two-dimensional data, confirm the check intercepts the request or processes the data correctly. Disable invalid workflow connection modes, confirm you cannot create invalid node connections.
5.  Validate resource scheduling: Send high-concurrency interface requests, confirm `local-pool` is used for scheduling and no resource exhaustion occurs. Check that file parsing, HTML to Markdown conversion, and text chunking tasks follow worker pool configuration for scheduling.
6.  Validate regression items: Run all aligned acceptance test cases, confirm each case’s response matches the agreed rules. Check that regression test coverage includes all integrated interfaces and functional points.
7.  Validate resource identifiers: Check that interface requests carry correct `appId` and `source` parameters, with values within the agreed range. Confirm `appId` links to the correct application identifier to ensure correct request context.

## Limits: when this approach does not hold
This acceptance framework does not cover integrated interfaces with custom auth logic not outlined in these guidelines. You must confirm auth rules based on your actual environment for these cases.
This framework only applies to scenarios using explicitly listed protocols, such as HTTP and APIKey. Add additional validation rules for services using other protocols.
If your enterprise has special permission systems or rate limiting rules that differ from this framework’s default configurations, adjust based on your actual environment. Do not directly apply the default rules.
For multi-tenant or cross-team complex permission scenarios in integrated interfaces, unclear permission validation rules may cause acceptance failures. Add targeted testing for these cases.
If integrated services have special error handling logic not mentioned here, the built-in error handling rules cannot fully cover these cases. Add corresponding validation items.
If integrated interfaces involve environment variables or configuration items not specified in this framework, confirm configuration logic based on your actual environment. Do not directly use the default configurations.

## Keep reading

- [Decision Guide for Upgrade Cadence: Version-Skip Risks and Rollback Readiness](/en/guide/version-upgrade-decision)
- [Backups Are Not Recovery: How Far a Restore Drill Must Go](/en/guide/backup-restore-drill)
- [Observability Baseline Before Go-Live: Logs, Metrics and Alert Ownership](/en/guide/observability-baseline)

## References

- [FastGPT workflow HTTP certificate verification](https://github.com/labring/FastGPT/blob/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/service/core/workflow/dispatch/tools/http468.ts)

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT upgrade notes](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## Next steps

The criteria above can be checked against public documentation. To apply this process to a specific deployment, contact sales for support; the cloud service can be used directly to validate the process first.

- [Contact sales](/en/contact): apply this process to your deployment
- [Get started](/en/start): validate the process on the cloud service
- [Pricing](/en/price): compare what each form covers
