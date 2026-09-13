---
title: Configure FastGPT Shared App Security Variables
slug: /en/deploy/fastgpt-shared-security-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Shared App Security Variables

## Overview of Shared Security Variables
This section documents environment variables that configure uniform shared application and administrative security controls for self-hosted FastGPT deployments. These variables apply across all deployed FastGPT apps and admin interfaces, standardizing security settings without per-instance overrides. All variables are configured via standard environment variable syntax during deployment.

## Security Parameter Reference
| Variable                            | Default | Description                                                                                         |
| ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `USE_IP_LIMIT`                      | `false` | Whether IP rate limiting is enabled for selected APIs.                                              |
| `CHECK_INTERNAL_IP`                 | `false` | Whether internal IP checks are enabled to reduce SSRF risk.                                         |
| `AUTH_COOKIE_SECURE`                | `false` | Whether login cookies use the `Secure` attribute. Enable only when the site is HTTPS-only.          |
| `TRUSTED_PROXY_ENABLE`              | `false` | Whether trusted reverse proxy client IP validation is enabled. Disabled keeps legacy behavior.      |
| `TRUSTED_PROXY_IPS`                 | Empty   | Trusted reverse proxy IP/CIDR list, separated by commas or whitespace.                              |
| `PASSWORD_LOGIN_MINUTE_LIMIT_COUNT` | `10`    | Maximum password login requests per account per minute.                                             |
| `MAX_LOGIN_SESSION`                 | `10`    | Maximum login clients per account.                                                                  |
| `ALLOWED_ORIGINS`                   | Empty   | Allowed CORS origins. Use commas to separate multiple origins. Empty allows all origins by default. |
| `MULTIPLE_DATA_TO_BASE64`           | `false` | Whether images are forced into base64 before being sent to models.                                  |
| `DISABLE_CACHE`                     | `false` | Whether system cache hits are disabled, mainly for debugging.                                       |
| `HTTP_PROXY`                        | Empty   | Outbound HTTP proxy for Node and workers.                                                           |
| `HTTPS_PROXY`                       | Empty   | Outbound HTTPS proxy for Node and workers.                                                          |
| `NO_PROXY`                          | Empty   | Address list that bypasses proxies.                                                                 |
| `ALL_PROXY`                         | Empty   | General outbound proxy.                                                                             |

## Configuration Best Practices
This section outlines key usage notes for the documented variables:
- Access and rate limiting: Enable `USE_IP_LIMIT` to activate IP-based rate limiting for selected APIs. Use `PASSWORD_LOGIN_MINUTE_LIMIT_COUNT` to set the maximum allowed password login requests per account per minute, and `MAX_LOGIN_SESSION` to limit concurrent active login clients per account to mitigate brute-force attacks.
- Network and proxy security: Enable `CHECK_INTERNAL_IP` to block requests targeting internal IP addresses, reducing server-side request forgery (SSRF) risk. For reverse proxy deployments, set `TRUSTED_PROXY_ENABLE=true` and populate `TRUSTED_PROXY_IPS` with a comma-separated list of trusted proxy IPs or CIDR ranges to correctly capture original client IP addresses. Use the proxy variables (`HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY`, `ALL_PROXY`) to control outbound network traffic from FastGPT Node.js instances and workers.
- Cookie and CORS security: Set `AUTH_COOKIE_SECURE=true` only if your FastGPT deployment uses HTTPS exclusively, as this flag ensures login cookies are only transmitted over secure connections. Restrict cross-origin resource sharing (CORS) origins with `ALLOWED_ORIGINS` using a comma-separated list of trusted domains; leave the default empty value only for non-production environments, as it allows all origins.
- Debug and data handling: Enable `DISABLE_CACHE=true` exclusively for debugging purposes, as it disables all system caching. Use `MULTIPLE_DATA_TO_BASE64` to force image data into base64 format before sending to connected AI models, which may resolve compatibility issues with certain model providers.

To apply these variables, add them to your deployment configuration. For Docker Compose deployments, include the variables in the `environment` block of the FastGPT service. For Kubernetes deployments, define the variables in a ConfigMap or Secret, then mount them as environment variables in the FastGPT pod specification.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
