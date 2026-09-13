---
title: Configure OpenSandbox Settings for FastGPT Services
slug: /en/deploy/fastgpt-opensandbox-service-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: Official documentation
---

# Configure OpenSandbox Settings for FastGPT Services

## Configuration Location
All shared OpenSandbox settings for `fastgpt-app` and `fastgpt-pro` are centralized in the Docker Compose file’s `x-agent-sandbox-config` anchor. This eliminates duplicate configuration across individual service definitions and ensures both services use identical sandbox parameters.

## Environment Variable Reference
All required and optional environment variables for OpenSandbox configuration are listed below:

| Variable Name | Required Value | Purpose |
|---|---|---|
| `AGENT_SANDBOX_PROVIDER` | `opensandbox` | Sets the active sandbox provider to OpenSandbox |
| `AGENT_SANDBOX_OPENSANDBOX_BASEURL` | `http://fastgpt-opensandbox-server:8090` | Internal network URL for the OpenSandbox server |
| `AGENT_SANDBOX_OPENSANDBOX_API_KEY` | Replace with your OpenSandbox API key | Authentication token for OpenSandbox server access |
| `AGENT_SANDBOX_OPENSANDBOX_RUNTIME` | `docker` | Container runtime for isolated sandbox environments |
| `AGENT_SANDBOX_OPENSANDBOX_IMAGE` | `ghcr.io/labring/fastgpt-agent-sandbox:v0.3.1` | Official container image for FastGPT sandbox agents |
| `AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY` | `true` | Enables server-side proxying for sandbox network traffic |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL` | `http://fastgpt-volume-manager:3000` | Internal URL for the attached volume manager service |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN` | Replace with your volume manager token | Authentication token for volume manager access |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX` | `fastgpt-session` | Prefix for persistent session volumes |
| `AGENT_SANDBOX_PROXY_SECRET` | 32-character random secret | Secure secret for sandbox proxy authentication |
| `AGENT_SANDBOX_PROXY_URL` | `wss://sandbox-proxy.example.com` | WebSocket URL for sandbox proxy connectivity |
| `AGENT_SANDBOX_PREVIEW_PROXY_URL` | `https://sandbox-proxy.example.com` | HTTPS URL for sandbox preview proxy access |
| `AGENT_SANDBOX_CPU_COUNT` | `1` | Maximum CPU cores allocated per sandbox |
| `AGENT_SANDBOX_MEMORY_MIB` | `2048` | Maximum memory (MiB) allocated per sandbox |
| `AGENT_SANDBOX_STORAGE_SIZE_GI` | `1` | Maximum storage (GiB) allocated per sandbox |

## Deployment & Validation
After replacing all placeholder values (such as `replace_with_opensandbox_api_key` and `replace_with_volume_manager_token`) with secure, unique values, apply the updated Docker Compose configuration. Confirm successful deployment by checking that sandbox services start without authentication errors and that persistent session volumes are created with the `fastgpt-session` prefix.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
