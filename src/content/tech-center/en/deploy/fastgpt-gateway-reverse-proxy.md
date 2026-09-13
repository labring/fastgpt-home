---
title: Configure Secure FastGPT Gateway Reverse Proxy
slug: /en/deploy/fastgpt-gateway-reverse-proxy
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Configure Secure FastGPT Gateway Reverse Proxy

# Core Reverse Proxy Configuration Principles
When deploying FastGPT for public use, the reverse proxy must only expose the FastGPT Gateway WebSocket endpoint, while keeping all internal Gateway HTTP APIs private. This ensures that sensitive internal operations are not accessible from the public internet, reducing exposure to unauthorized access or data leaks.

# Official Nginx Proxy Configuration
The following Nginx configuration is the official supported setup for exposing the FastGPT Gateway. Use this exact configuration to safely proxy WebSocket traffic:
```nginx
location /connection-gateway/v1 {
  proxy_pass http://connection-gateway:3001;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
  proxy_set_header Host $host;
  proxy_read_timeout 3600s;
}
```
The following table breaks down each required parameter:
| Parameter | Exact Configuration Value | Purpose |
|-----------|---------------------------|---------|
| Location Path | `/connection-gateway/v1` | Maps public-facing URL path to the internal FastGPT Gateway service |
| Proxy Pass | `http://connection-gateway:3001` | Routes proxied traffic to the internal Gateway service |
| Proxy HTTP Version | `1.1` | Enables HTTP/1.1, required for WebSocket connection upgrades |
| Upgrade Header | `$http_upgrade` | Preserves the client’s WebSocket upgrade request header |
| Connection Header | `"upgrade"` | Instructs the proxy to handle WebSocket connection upgrades |
| Host Header | `$host` | Passes the original client host header to the backend service |
| Read Timeout | `3600s` | Maintains long-lived WebSocket connections for extended user sessions |

# Prohibited Public Exposures
To maintain deployment security, the following must never be exposed directly to the public internet:
- All paths under `/internal/*`, which contain internal administrative and operational APIs intended only for internal FastGPT use
- The `/metrics` endpoint, which exposes deployment performance and operational metrics
- The FastGPT Gateway HTTP port directly, which bypasses the dedicated WebSocket proxy configuration and exposes all internal Gateway traffic.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
