---
title: Add Mandatory Environment Variables for FastGPT 4.15 Upgrade
slug: /en/deploy/fastgpt-415-upgrade-environment-variables
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505
source_type: Official documentation
---

# Add Mandatory Environment Variables for FastGPT 4.15 Upgrade

This document details the new environment variables required for self-hosted FastGPT 4.15 deployments, covering mandatory variables for all instances and optional additional variables for setups with Agent Sandbox enabled.

## Core Environment Variables for All FastGPT Deployments
These variables must be added to both `fastgpt` and `fastgpt-pro` service configurations:

| Variable Name               | Target Services             | Purpose                                                                 | Example Configuration                                                                 |
|------------------------------|-----------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| `CHAT_TITLE_MODEL`           | `fastgpt`, `fastgpt-pro`   | Enables automatic generation of unique chat titles for new conversation threads | `CHAT_TITLE_MODEL=deepseek-v4-flash`                                                           |
| `INVOKE_TOKEN_SECRET`        | `fastgpt`, `fastgpt-pro`   | JWT secret key used for reverse-called interfaces; requires a key longer than 32 bits | `INVOKE_TOKEN_SECRET=For keys with more than 32 bits, reverse call the interface jwt key` |

## Additional Variables for Agent Sandbox Deployments
If you have enabled the Agent Sandbox feature, add the following two environment variables to your `fastgpt` service configuration:

| Variable Name                     | Target Services                                                                 | Purpose                                                                 | Example Configuration                                                                 |
|------------------------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| `AGENT_SANDBOX_PROXY_SECRET`       | `fastgpt` (Agent Sandbox enabled)                                           | Shared secret for communication with `fastgpt-agent-sandbox-proxy`; use a cryptographically random string longer than 32 characters in production environments | `AGENT_SANDBOX_PROXY_SECRET=replace_with_32_chars_random_secret` |
| `AGENT_SANDBOX_PROXY_URL`          | `fastgpt` (Agent Sandbox enabled)                                           | Browser-accessible WebSocket URL for the `agent-sandbox-proxy` service; use `wss://` for domains proxied over HTTPS | `AGENT_SANDBOX_PROXY_URL=ws://{{host}}:3006` |

## Implementation Steps
1. Locate your existing FastGPT environment variable configuration, such as a `.env` file, Docker Compose environment section, or Kubernetes ConfigMap.
2. Add the core environment variables from the first section to both `fastgpt` and `fastgpt-pro` service definitions.
3. If you use Agent Sandbox, append the additional variables from the second section to your `fastgpt` service configuration.
4. Restart all FastGPT services to apply the updated environment variables.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41505)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
