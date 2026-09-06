---
title: Set up FastGPT Sandbox with Docker Compose
slug: /en/deploy/fastgpt-sandbox-docker-compose-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: Official documentation
---

# Set up FastGPT Sandbox with Docker Compose

## Preconfigured Sandbox Service Stack
The latest official Docker Compose deployment bundle for FastGPT includes all mandatory sandbox-related services out of the box. No additional YAML file merging is required to enable core sandbox functionality for self-hosted FastGPT instances. This pre-configured stack removes the need for manual integration of separate sandbox components, streamlining initial deployment and reducing potential configuration errors.

## Included Sandbox Service Components
All required sandbox services and runtime assets are bundled directly in the official Docker Compose file. The following four core components are pre-included:
| Service Name                  | Core Functionality                                                                 |
|-------------------------------|-------------------------------------------------------------------------------------|
| OpenSandbox Server            | Central orchestration and management for isolated sandbox environments              |
| Volume Manager                | Automated provisioning and cleanup of sandbox storage volumes                       |
| Agent Sandbox Proxy           | Secure traffic routing between FastGPT agent processes and sandbox runtimes         |
| Sandbox Runtime Images        | Pre-built container images for isolated code and tool execution environments        |

## Quick Deployment Workflow
1. Retrieve the official Docker Compose configuration file optimized for global registries and PgVector vector database: [View the latest docker-compose.yml (PgVector, global registries)](/deploy/docker/main/global/docker-compose.pg.yml).
2. Do not merge any additional YAML files, as all required sandbox components are already included in the downloaded file.
3. Complete initial service startup and configuration per standard Docker Compose deployment practices.
4. For alternative vector database setups or configurations tailored for China Mainland container registries, reference the dedicated deployment documentation: [Deploy with Docker Compose](../../deploy/docker.en.mdx).

## Supplementary Configuration Guidance
The linked Docker Compose deployment documentation covers additional adjustments beyond the default global registry and PgVector setup, including support for alternative vector databases and region-specific container registry configurations. All sandbox-related settings are pre-configured in the main compose file, so no separate sandbox configuration files need to be added.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
