---
title: Configure Agent Sandbox Package Registry Mirrors
slug: /en/deploy/agent-sandbox-package-registry-mirrors
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506
source_type: Official documentation
---

# Configure Agent Sandbox Package Registry Mirrors

## Agent Sandbox Package Registry Mirror Overview
FastGPT’s Agent Sandbox now includes native support for package registry mirror configuration, designed to enhance dependency installation reliability in private network or cross-region network environments. When enabled, FastGPT automatically generates and applies mirror configuration files for npm, yarn, bun, pip, and uv within the sandbox’s HOME directory during sandbox initialization. This eliminates the need for manual per-package-manager configuration within isolated sandbox environments, streamlining setup for restricted network deployments of FastGPT.

## Environment Variable Configuration
Two dedicated environment variables are available to define package registry mirrors for the Agent Sandbox. The following table lists each variable and its supported package managers:
| Environment Variable | Supported Package Managers |
|----------------------|---------------------------|
| `AGENT_SANDBOX_NPM_REGISTRY` | npm, yarn, pnpm, bun |
| `AGENT_SANDBOX_PYPI_INDEX_URL` | pip, python -m pip, uv |

Each variable accepts a valid, fully qualified registry URL. If left unset, the Agent Sandbox will use the default upstream registry for the associated package managers.

## Configuration Caching Logic
The Agent Sandbox tracks registry mirror configurations using a content hash of the values provided in the supported environment variables. This caching mechanism ensures that only when the actual registry URL values change will FastGPT rewrite the mirror configuration files within the sandbox. For existing sandboxes that are restarted or reinitialized without updates to the registry mirror variables, no changes to the sandbox’s package manager config files will be made. This reduces unnecessary file system operations and speeds up sandbox startup times for unchanged deployments.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
