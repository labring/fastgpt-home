---
title: FastGPT Sandbox Environment Variable Changes for 4.15.03 Upgrade
slug: /en/deploy/fastgpt-sandbox-env-changes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41503
source_type: Official documentation
---

# FastGPT Sandbox Environment Variable Changes for 4.15.03 Upgrade

**Sandbox Environment Variable Updates**
The 4.15.03 FastGPT self-host upgrade adds security, resource limit, and request queuing controls for the code sandbox environment. These changes improve operational stability and reduce SSRF risk for network requests originating from sandboxed code execution. Two core new capabilities are included: configurable security and resource limits for sandbox operations, and grouped request queuing via the `queueId` parameter for run APIs.

**Full Environment Variable Reference**
The complete list of sandbox-related environment variables, with their default values and official descriptions, is provided below:
| Variable                          | Default | Description                                                                                           |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `SANDBOX_API_MAX_BODY_MB`         | `8`     | Maximum `/sandbox` API JSON body size, including `variables`, in MB.                                  |
| `SANDBOX_MAX_OUTPUT_MB`           | `10`    | Maximum output JSON size for one code execution, including return values and logs, in MB.             |
| `CHECK_INTERNAL_IP`               | `true`  | Enables internal IP checks for sandbox network requests by default to reduce SSRF risk.               |
| `SANDBOX_MAX_TIMEOUT`             | `60000` | Timeout for one code execution, in milliseconds.                                                      |
| `SANDBOX_MAX_MEMORY_MB`           | `256`   | Memory limit for one sandbox, in MB. The runtime reserves an extra `50` MB for overhead.              |
| `SANDBOX_POOL_SIZE`               | `20`    | Number of pre-warmed JS/Python workers.                                                               |
| `SANDBOX_REQUEST_MAX_COUNT`       | `30`    | Maximum number of network requests allowed during one code execution.                                 |
| `SANDBOX_REQUEST_TIMEOUT`         | `60000` | Timeout for one network request from inside the sandbox, in milliseconds.                             |
| `SANDBOX_REQUEST_MAX_RESPONSE_MB` | `10`    | Maximum response body size for one sandbox network request, in MB.                                    |
| `SANDBOX_REQUEST_MAX_BODY_MB`     | `5`     | Maximum request body size for one sandbox network request, in MB.                                     |
| `SANDBOX_QUEUE_ID_CONCURRENCY`    | Empty   | Number of requests with the same `queueId` that may enter execution at once. Empty disables queueing. |

**Queueing Configuration**
The new `queueId` parameter supports grouped request queuing for run APIs. The `SANDBOX_QUEUE_ID_CONCURRENCY` variable defines the maximum number of concurrent requests that share a `queueId` and are allowed to enter sandbox execution. If this variable is left unset, the request queuing feature is completely disabled.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41503)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
