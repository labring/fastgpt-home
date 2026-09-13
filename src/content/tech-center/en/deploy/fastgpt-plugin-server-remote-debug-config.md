---
title: Configure FastGPT Plugin Server for Remote Debugging
slug: /en/deploy/fastgpt-plugin-server-remote-debug-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Configure FastGPT Plugin Server for Remote Debugging

## Overview
This documentation covers environment configuration for the FastGPT Plugin Server to enable remote debugging integrations. If the `CONNECTION_GATEWAY_BASE_URL` environment variable is not configured, the Plugin Server automatically disables all remote debugging functionality. All configuration values must align between the Plugin Server and the connected Connection Gateway service for proper operation.

## Required Environment Variables
All Gateway-related configuration parameters must be added to the `fastgpt-plugin` service's environment configuration. The following table details each required variable:

| Environment Variable | Official Purpose | Example Value | Mandatory Rules |
|----------------------|------------------|---------------|------------------|
| `CONNECTION_GATEWAY_BASE_URL` | Private HTTP address used by the Plugin Server to call Gateway internal APIs | `http://connection-gateway:3000` | Must be reachable by the Plugin Server instance |
| `CONNECTION_GATEWAY_PUBLIC_URL` | WebSocket address returned to local developer CLI tools; must be accessible from developer workstations | `wss://debug-gateway.example.com/connection-gateway/v1` | Must use a valid WebSocket protocol prefix |
| `CONNECTION_GATEWAY_AUTH_TOKEN` | Bearer token used by the Plugin Server to authenticate to Gateway `/internal/*` and `/metrics` APIs | `replace-with-a-random-token-at-least-32-chars` | Must be a minimum of 32 random characters |
| `JWT_SECRET` | HMAC secret for Gateway connect tokens; must exactly match the secret configured for the Connection Gateway service | `replace-with-a-random-jwt-secret-at-least-32-chars` | Must be a minimum of 32 random characters, and identical across both the Plugin Server and Connection Gateway |

## Configuration and Deployment
1. Access the environment configuration file for the `fastgpt-plugin` service, usually a `.env` file tied to the service's deployment setup.
2. Insert all four environment variables listed in the table above, replacing the placeholder example values with secure, unique tokens and secrets tailored to your deployment.
3. Restart the `fastgpt-plugin` service to apply the updated configuration changes.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
