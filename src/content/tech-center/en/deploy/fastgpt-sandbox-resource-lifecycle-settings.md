---
title: Configure FastGPT Sandbox Resource and Lifecycle Settings
slug: /en/deploy/fastgpt-sandbox-resource-lifecycle-settings
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: Official documentation
---

# Configure FastGPT Sandbox Resource and Lifecycle Settings

## Purpose of Sandbox Configuration Settings
For self-hosted FastGPT deployments, controlled sandbox resource allocation and automated lifecycle management are critical to balancing functional availability and host system efficiency. These environment variables define computational resource limits for individual agent sandboxes, maximum allowable WebSocket message and frame sizes for platform-sandbox communications, and rules for automatically suspending and archiving inactive sandbox instances.

## Configuration Parameter Reference
| Variable                              | Default    | Description                                             |
| ------------------------------------- | ---------- | ------------------------------------------------------- |
| `AGENT_SANDBOX_CPU_COUNT`             | `1`        | Maximum CPU count for each Agent Sandbox.               |
| `AGENT_SANDBOX_MEMORY_MIB`            | `2048`     | Maximum memory for each Agent Sandbox, in MiB.          |
| `AGENT_SANDBOX_STORAGE_SIZE_GI`       | `1`        | Sandbox storage capacity, in Gi.                        |
| `AGENT_SANDBOX_WS_MAX_MESSAGE_BYTES`  | `67108864` | Maximum IDE Agent WebSocket message size.               |
| `AGENT_SANDBOX_WS_MAX_FRAME_BYTES`    | `16777216` | Maximum IDE Agent WebSocket frame size.                 |
| `AGENT_SANDBOX_SUSPEND_MINUTES`       | `60`       | Inactive minutes before a running sandbox is suspended. |
| `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` | `7`        | Inactive days before a suspended sandbox is archived.   |

## Automated Lifecycle Management
The sandbox lifecycle follows a two-stage automated cleanup process. First, any running sandbox that remains inactive for the duration specified by `AGENT_SANDBOX_SUSPEND_MINUTES` is suspended to halt its resource consumption while preserving its state. After a sandbox has been suspended and remains inactive for the number of days defined in `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS`, the system archives the sandbox permanently to reclaim storage and cluster resources. The WebSocket configuration parameters control the maximum allowable sizes for individual messages and frames passed between the FastGPT platform and connected sandboxes, preventing oversized data transfers from disrupting sandbox communications.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
