---
title: Configure Agent Sandbox Proxy for FastGPT 4.16.0
slug: /en/deploy/fastgpt-4160-agent-sandbox-proxy-config
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# Configure Agent Sandbox Proxy for FastGPT 4.16.0

## Agent Sandbox Proxy Requirements for FastGPT 4.16.0
FastGPT version 4.16.0 mandates a proxy configuration for static resource access via the agent sandbox. Deployment setup depends on whether your gateway supports routing both WebSocket and HTTP traffic over a single shared port. Deployment flexibility varies based on gateway capabilities: if your gateway supports WebSocket and HTTP traffic on a single shared port, you only need to expose one port for the service. If your gateway does not support combined WebSocket and HTTP traffic on one port, you must configure a dedicated HTTP port using the specified environment variable.

## Configuration Parameters
All settings are defined in the project’s `.env` configuration file. The following environment variables control the proxy service:

| Parameter | Description | Example Value | Default Value |
|-----------|-------------|---------------|---------------|
| `PORT` | Combined port for both WebSocket and HTTP services, used when `PREVIEW_PORT` is not configured | `1006` | `1006` |
| `PREVIEW_PORT` | Dedicated HTTP service port; this value overrides the `PORT` setting if explicitly set | `1007` | `1007` |

You can set these variables using the following syntax:
```dotenv
# Port for the WebSocket and HTTP services
PORT=1006
# HTTP service port; overrides PORT when set
PREVIEW_PORT=1007
```

## Deployment Configuration Modes
### Single-Port Deployment
If your gateway supports simultaneous WebSocket and HTTP traffic on a single port, you only need to expose one port. The proxy access URL must start with `http://` or `https://`, and can use the same host and port as the `AGENT_SANDBOX_PROXY_URL` value. The service will automatically use matching HTTP(S) and WebSocket(S) protocols for its traffic.

### Dual-Port Deployment
If your gateway cannot route both WebSocket and HTTP traffic over a single port, set the `PREVIEW_PORT` environment variable to specify a dedicated HTTP port. You will need to expose both the base `PORT` (for WebSocket traffic) and the configured `PREVIEW_PORT` (for HTTP traffic) to your network or external gateway.

FastGPT strongly recommends using a different origin from the main FastGPT site. A same-origin deployment places user-generated scripts within the main site’s security boundary, which could allow unauthorized access to site credentials or internal APIs. Note that FastGPT does not currently enforce origin isolation by default.

## Verify Service Accessibility
To confirm the agent sandbox proxy service is operational and accessible, visit the official health check endpoint at `https://{{host}}/health`, replacing `{{host}}` with your deployment’s actual domain or public IP address. This endpoint will return a valid response if the service is running correctly.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601)
