---
title: Configure FastGPT Plugin Local-Pool Runtime Parameters
slug: /en/model/fastgpt-plugin-local-pool-runtime
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# Configure FastGPT Plugin Local-Pool Runtime Parameters

## Local-Pool Runtime Scheduling Flow
The default runtime for FastGPT plugin services is `local-pool`, which manages plugin Pods and request queues. When a plugin call enters a service, scheduling follows these fixed steps:
1. Prefer an existing available Pod and dispatch the request immediately.
2. If no Pod is available and `pods + pendingPods < maxPods`, create a new Pod first and dispatch the current request after startup succeeds.
3. If `maxPods` has been reached, startup backoff is active, or a Pod cannot be created temporarily, the request enters a bounded queue.
4. When a Pod is released, startup succeeds, configuration is updated, or a crash is recovered, the queue continues to drain.
5. When queue length reaches `maxQueueSize`, new requests are rejected. Requests also fail after waiting longer than `queueTimeout`.

## Per-Plugin Runtime Configuration
Each tool plugin can configure these runtime parameters:
| Parameter                            | Default    | Description                                                                      |
| ------------------------------------ | ---------- | -------------------------------------------------------------------------------- |
| Minimum worker nodes                 | `0`        | Values above `0` warm up Pods and try to keep at least this many Pods available. |
| Maximum worker nodes                 | `5`        | The service can scale out to this limit when no Pod is available.                |
| Node timeout                         | `120000ms` | Timeout for one plugin call inside a Pod.                                        |
| Maximum concurrent requests per node | `10`       | Maximum concurrent requests one Pod can process.                                 |

## Global Environment Variable Defaults
Environment variables set global default runtime parameters and operational limits for all plugin services:
| Environment variable                           | Description                                                                       |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| `POOL_HEALTH_CHECK_INTERVAL`                   | Health check interval in milliseconds.                                            |
| `POOL_MAX_TOTAL_PODS`                          | Total limit for all plugin Pods in the current server process.                    |
| `POOL_SERVICE_MIN_PODS`                        | Default minimum worker nodes for one plugin.                                      |
| `POOL_SERVICE_MAX_PODS`                        | Default maximum worker nodes for one plugin.                                      |
| `POOL_SERVICE_IDLE_TIMEOUT`                    | Pod idle recycle time in milliseconds.                                            |
| `POOL_SERVICE_POD_TIMEOUT`                     | Execution timeout for one plugin call in milliseconds.                            |
| `POOL_SERVICE_MAX_CONCURRENT_REQUESTS_PER_POD` | Default maximum concurrent requests for one Pod.                                  |
| `POOL_SERVICE_MAX_REQUESTS_PER_POD`            | Maximum requests one Pod can process before replacement.                          |
| `POOL_SERVICE_MAX_QUEUE_SIZE`                  | Maximum request queue capacity for one plugin service.                            |
| `POOL_SERVICE_QUEUE_TIMEOUT`                   | Maximum time a request can wait in queue for an available Pod, in milliseconds.   |
| `POOL_SERVICE_STARTUP_RETRY_BASE_DELAY`        | Base delay for exponential backoff after Pod startup timeout, in milliseconds.    |
| `POOL_SERVICE_STARTUP_RETRY_MAX_DELAY`         | Maximum delay for exponential backoff after Pod startup timeout, in milliseconds. |

## Pod Startup Error Handling
Pod startup errors are recorded and classified by type. Consecutive non-timeout startup failures trigger startup circuit breaking once the threshold is reached, preventing additional unnecessary Pod creation. Startup timeouts are interpreted as resource pressure, triggering exponential backoff and delayed retries rather than immediate failure loops.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
