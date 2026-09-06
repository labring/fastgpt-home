---
title: Update FastGPT 4.15.0 Service Images
slug: /en/deploy/fastgpt-4-15-service-image-updates
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505
source_type: Official documentation
---

# Update FastGPT 4.15.0 Service Images

## Required Core Image Updates
All self-hosted FastGPT deployments must update the following service image tags to the specified versions:
- `fastgpt-app` (main FastGPT service): `v4.15.0-beta5`
- `fastgpt-pro` (commercial edition): `v4.15.0-beta5`
- `fastgpt-plugin`: `v1.0.0-beta5`
- `aiproxy`: `v0.6.2`

## Agent Sandbox Required Changes
If you have enabled the Agent Sandbox feature, you must add a new service and update two existing images:
1. Add the `fastgpt-agent-sandbox-proxy` service with tag `v0.2.0-beta2`
2. Update the `fastgpt-agent-sandbox` image tag to `v0.2.0-beta2`

### Agent Sandbox Proxy Service Configuration
Add the following block to your `docker-compose.yml` file. Use the China mainland registry by default, or switch to the global registry for international deployments:
```yml
fastgpt-agent-sandbox-proxy:
  image: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox-proxy:v0.2.0-beta2
  container_name: fastgpt-agent-sandbox-proxy
  restart: always
  ports:
    - 3006:1006
  networks:
    - fastgpt
  environment:
    PORT: 1006
    # Must exactly match AGENT_SANDBOX_PROXY_SECRET in fastgpt.
    AGENT_SANDBOX_PROXY_SECRET: replace_with_32_chars_random_secret
    # Internal URL of the main app container. If your service name is not fastgpt, update it accordingly.
    FASTGPT_APP_URL: http://fastgpt:3000
    FASTGPT_APP_REQUEST_TIMEOUT_SECS: 10
    RUST_LOG: info,fastgpt_agent_sandbox_proxy=debug
    # Configure this only when the upstream sandbox endpoint returns localhost/127.0.0.1 and the proxy container cannot reach it.
    # AGENT_SANDBOX_PROXY_REWRITE_HOST: host.docker.internal
```
For global deployments, replace the image value with `ghcr.io/labring/fastgpt-agent-sandbox-proxy:v0.2.0-beta2`.

## Configuration Parameters
The following environment variables apply to the `fastgpt-agent-sandbox-proxy` service:
| Parameter | Default Value | Requirements |
|-----------|---------------|--------------|
| `PORT` | 1006 | Internal listening port for the proxy service |
| `AGENT_SANDBOX_PROXY_SECRET` | N/A | Must exactly match the secret configured for the main FastGPT service; use a 32-character random string |
| `FASTGPT_APP_URL` | http://fastgpt:3000 | Internal network URL of the main FastGPT app container; update if your main service name is not `fastgpt` |
| `FASTGPT_APP_REQUEST_TIMEOUT_SECS` | 10 | Timeout for requests to the main app, in seconds |
| `RUST_LOG` | info,fastgpt_agent_sandbox_proxy=debug | Log level configuration |
| `AGENT_SANDBOX_PROXY_REWRITE_HOST` | Unset | Optional override for cases where the sandbox endpoint returns a local loopback address the proxy cannot reach |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
