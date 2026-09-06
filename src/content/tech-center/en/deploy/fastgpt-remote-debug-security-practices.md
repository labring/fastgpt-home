---
title: Manage Security Risks for FastGPT Remote Debug Suite
slug: /en/deploy/fastgpt-remote-debug-security-practices
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Manage Security Risks for FastGPT Remote Debug Suite

## Sensitive Credential Management
All credentials related to FastGPT's remote debug suite carry significant security risks if exposed. The following parameters are classified as sensitive and must never be written to logs, screenshots, or public documentation: `CONNECTION_GATEWAY_AUTH_TOKEN`, `JWT_SECRET`, `connectionKey`, and `connectToken`.

### Sensitive Parameter Reference Table
| Parameter Name | Specific Usage | Mandatory Security Actions |
|---|---|---|
| `CONNECTION_GATEWAY_AUTH_TOKEN` | Authentication token for Plugin Server communications | Only required for Plugin Server deployments; local CLI instances do not need this token and should never receive it. Never expose in logs, screenshots, or public documentation. |
| `JWT_SECRET` | Secret key for signing and verifying JSON Web Tokens used in secure debug connections | Never expose in logs, screenshots, or public documentation. |
| `connectionKey` | Long-lived secret for authenticating persistent debug connections | Returned in plaintext only when the debug channel is enabled or refreshed. If this value is leaked, immediately refresh or revoke the associated debug channel to prevent unauthorized access. Never expose in logs, screenshots, or public documentation. |
| `connectToken` | Temporary token for securing individual debug session requests | Never expose in logs, screenshots, or public documentation. |

## Remote Debug Invocation Behavior
Debug source invocations exclusively use the remote debug path. If the requested connection or active session cannot be located, the invocation will fail outright, with no fallback to the production plugin runtime. This ensures that debug workflows do not accidentally execute in a non-debug production environment, preventing unintended data exposure or operational changes.

## Multi-Replica Gateway Deployment Safeguards
For FastGPT Gateway deployments with multiple replicas, special routing rules are required to maintain reliable debug session management. Session deletion requests must be routed to the specific Gateway node that owns the associated WebSocket connection. If requests are sent to an incorrect replica, the Redis-stored session data will be deleted, leading to failed subsequent debug calls until the session state is fully cleaned up.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
