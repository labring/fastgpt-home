---
title: Configure FastGPT Code Sandbox Environment Variables
slug: /en/deploy/fastgpt-code-sandbox-env-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Code Sandbox Environment Variables

## Overview of FastGPT Code Sandbox Variables
FastGPT’s code sandbox environment variables control security, resource limits, and execution behavior for on-demand code runs. All variables are loaded and validated at `projects/code-sandbox/src/env.ts`. A mandatory security check ensures that when the FastGPT application invokes the sandbox, the provided `CODE_SANDBOX_TOKEN` must exactly match the configured `SANDBOX_TOKEN`. If `SANDBOX_TOKEN` is left empty, API authentication for the `/sandbox` endpoint is disabled; valid tokens only contain printable ASCII characters and cannot include spaces.

## Full Configuration Parameter Reference
All supported environment variables are listed below, with their default values and official descriptions:
| Variable                          | Default                                                  | Description                                                                                                                                       |
| --------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SANDBOX_PORT`                    | `3000`                                                   | Code Sandbox listening port.                                                                                                                      |
| `SANDBOX_TOKEN`                   | Empty                                                    | Bearer token for the `/sandbox` endpoint. Empty disables API authentication. It only allows printable ASCII characters and cannot contain spaces. |
| `SANDBOX_POOL_SIZE`               | `20`                                                     | Number of pre-warmed JS/Python workers, from `1` to `100`.                                                                                        |
| `SANDBOX_QUEUE_ID_CONCURRENCY`    | Empty                                                    | Number of requests with the same `queueId` that may enter execution concurrently. Empty disables `queueId` queueing. Range: `1` to `100`.         |
| `SANDBOX_API_MAX_BODY_MB`         | `8`                                                      | Maximum `/sandbox` API JSON body size, including `variables`, in MB. Range: `1` to `100`.                                                         |
| `SANDBOX_MAX_TIMEOUT`             | `60000`                                                  | Timeout for one code execution, in milliseconds. Range: `1000` to `600000`.                                                                       |
| `SANDBOX_MAX_MEMORY_MB`           | `256`                                                    | Maximum memory for one sandbox, in MB. Range: `32` to `4096`. The runtime reserves an extra `50` MB for overhead.                                 |
| `SANDBOX_MAX_OUTPUT_MB`           | `10`                                                     | Maximum output JSON size for one code execution, including return values and logs, in MB. Range: `1` to `100`.                                    |
| `CHECK_INTERNAL_IP`               | `true`                                                   | Whether internal IP checks are enabled for sandbox network requests.                                                                              |
| `SANDBOX_REQUEST_MAX_COUNT`       | `30`                                                     | Maximum number of network requests allowed during one code execution. Range: `1` to `1000`.                                                       |
| `SANDBOX_REQUEST_TIMEOUT`         | `60000`                                                  | Timeout for one network request from inside the sandbox, in milliseconds. Range: `1000` to `300000`.                                              |
| `SANDBOX_REQUEST_MAX_RESPONSE_MB` | `10`                                                     | Maximum response body size for one sandbox network request, in MB. Range: `1` to `100`.                                                           |
| `SANDBOX_REQUEST_MAX_BODY_MB`     | `5`                                                      | Maximum request body size for one sandbox network request, in MB. Range: `1` to `100`.                                                            |
| `SANDBOX_JS_ALLOWED_MODULES`      | `lodash,dayjs,moment,uuid,crypto-js,qs,url,querystring`  | Module allowlist for JavaScript code. Use commas to separate modules.                                                                             |
| `SANDBOX_PYTHON_ALLOWED_MODULES`  | Common standard libraries plus `numpy,pandas,matplotlib` | Module allowlist for Python code. Use commas to separate modules.                                                                                 |
| `NODE_ENV`                        | Empty                                                    | Standard Node environment variable. Internal address checks are relaxed in `development`.                                                         |
| `HOSTNAME`                        | `localhost`                                              | Sandbox service host used for local-address detection.                                                                                            |
| `PORT`                            | `3000`                                                   | Sandbox local service port used for local-address detection. Actual listening uses `SANDBO

## Tuning and Security Best Practices
To optimize sandbox performance and security for your deployment:
- Adjust `SANDBOX_POOL_SIZE` to match your concurrent execution workload, with a valid range of 1 to 100 pre-warmed workers.
- Restrict allowed external modules using `SANDBOX_JS_ALLOWED_MODULES` and `SANDBOX_PYTHON_ALLOWED_MODULES` to minimize attack surface, only permitting libraries required for your specific use case.
- Configure strict resource limits such as `SANDBOX_MAX_MEMORY_MB` and `SANDBOX_MAX_TIMEOUT` to prevent runaway sandbox processes from consuming excess server resources.
- Use `SANDBOX_QUEUE_ID_CONCURRENCY` to limit concurrent executions for specific queue IDs, preventing resource contention across multiple concurrent requests.
- For non-production development environments, set `NODE_ENV` to `development` to relax internal IP address checks, though this configuration should never be used in live deployments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
