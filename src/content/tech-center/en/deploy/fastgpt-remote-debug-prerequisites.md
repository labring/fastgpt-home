---
title: Meet FastGPT Remote Debug Suite Prerequisites
slug: /en/deploy/fastgpt-remote-debug-prerequisites
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Meet FastGPT Remote Debug Suite Prerequisites

## Core Network & Version Rules
The FastGPT main service must have bidirectional network access to the fastgpt-plugin service, and both services must use identical PLUGIN_TOKEN and AUTH_TOKEN values to enable authenticated cross-service communication. Unauthorized access between the two services is blocked without matching token values. The deployed fastgpt-plugin version must include remote debugging functionality, and must exactly match the plugin version required by the active FastGPT release to eliminate compatibility conflicts that would break remote debugging workflows. The Gateway WebSocket URL must be directly reachable from the developer’s local machine; for production environments, this URL must be exposed via an HTTPS reverse proxy using the wss:// protocol scheme to ensure secure encrypted communication. Additionally, the Gateway’s internal HTTP API is restricted to only accept traffic from the Plugin Server’s private network to prevent unauthorized external access to sensitive internal endpoints.

## Security & Infrastructure Mandates
The Redis instance configured for use by the Gateway must support the Redis Stream data structure to handle real-time debugging event streams, which are required for remote debugging functionality. For production deployments, all sensitive secrets including PLUGIN_TOKEN, AUTH_TOKEN, and any other authentication credentials associated with the remote debug suite must be a minimum of 32 characters in length. Do not use example values, default credentials, or weak, easily guessable passwords for any production secrets tied to the FastGPT remote debug setup, as these pose significant security risks.

## Prerequisite Validation Steps
1.  Verify cross-service connectivity: Run a network test from the FastGPT main service host to the fastgpt-plugin endpoint to confirm no connection timeouts or refusals.
2.  Confirm matching authentication tokens: Cross-check PLUGIN_TOKEN and AUTH_TOKEN values across both the FastGPT main service and fastgpt-plugin configuration files to ensure they are identical.
3.  Validate plugin version compatibility: Reference the current FastGPT release documentation to confirm the installed fastgpt-plugin version includes remote debugging support and matches the required plugin version.
4.  Test Gateway WebSocket access: From the developer’s local machine, use a WebSocket testing utility to connect to the Gateway WebSocket URL, confirming the connection establishes successfully. For production environments, confirm the URL uses the wss:// protocol via an active HTTPS reverse proxy.
5.  Restrict internal API access: Verify firewall or network policies block all external traffic to the Gateway’s internal HTTP API, allowing only traffic originating from the Plugin Server’s private network range.
6.  Check Redis Stream support: Connect to the Gateway’s Redis instance via redis-cli, run the command `XADD test_stream * field test` to confirm Redis Streams are supported by the instance.
7.  Validate secret requirements: Inspect all production secrets used for the remote debug suite, confirming each secret is at least 32 characters long and does not use example values, default settings, or weak passwords.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
