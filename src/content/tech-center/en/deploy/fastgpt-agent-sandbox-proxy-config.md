---
title: Configure FastGPT Agent Sandbox Proxy Service
slug: /en/deploy/fastgpt-agent-sandbox-proxy-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: Official documentation
---

# Configure FastGPT Agent Sandbox Proxy Service

## Agent Sandbox Proxy Service Overview
The FastGPT agent sandbox proxy service manages secure network traffic for isolated agent execution environments, enabling controlled communication between sandboxed processes and the core FastGPT platform. All operational parameters for this service are configured using environment variables, which adjust port mappings, security credentials, internal service URLs, timeout limits, and logging verbosity. Proper configuration ensures reliable traffic routing and secure access to sandbox resources.

## Environment Variable Reference
The following environment variables control the behavior of the agent sandbox proxy service. All values are set during deployment, typically via Docker Compose or container runtime configuration:

| Variable                           | Default Value                            | Description                                                                                                                     |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`                             | `1006`                                   | Proxy container port, mapped to port `3006` on the host by default.                                                             |
| `PREVIEW_PORT`                     | Same as `PORT`                           | In 4.16, sets a separate HTTP preview listener; update the host port mapping and `AGENT_SANDBOX_PREVIEW_PROXY_URL` accordingly. |
| `AGENT_SANDBOX_PROXY_SECRET`       | None                                     | Secret shared with the FastGPT main service. Must be at least 32 characters.                                                    |
| `FASTGPT_APP_URL`                  | `http://fastgpt-app:3000`                | Internal FastGPT URL used by the proxy.                                                                                         |
| `FASTGPT_APP_REQUEST_TIMEOUT_SECS` | `10`                                     | Timeout for proxy requests to FastGPT, in seconds. Increase for slow cold starts.                                               |
| `RUST_LOG`                         | `info,fastgpt_agent_sandbox_proxy=debug` | Proxy service log level.                                                                                                        |

## 4.16 Version Specific Configuration
FastGPT 4.16 adjusted how preview traffic is handled, defaulting to sharing the main proxy port for both WebSocket and HTTP preview traffic. If your network gateway cannot route both protocols on a single port, you can configure a dedicated preview port to avoid connectivity issues.

To adjust the preview port:
1. Set the `PREVIEW_PORT` environment variable to a new unused container port, such as `1007`.
2. Update your Docker Compose port mapping to map a host port to the new container port, for example `3007:1007`.
3. Configure the `AGENT_SANDBOX_PREVIEW_PROXY_URL` environment variable to point to the host’s new preview port.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
