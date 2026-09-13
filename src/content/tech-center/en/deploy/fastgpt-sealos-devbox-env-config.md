---
title: Set Up FastGPT Sealos Devbox Environment Variables
slug: /en/deploy/fastgpt-sealos-devbox-env-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox
source_type: Official documentation
---

# Set Up FastGPT Sealos Devbox Environment Variables

## Overview
This document details the required environment variables to configure FastGPT self-hosted instances to use Sealos Devbox as its agent sandbox provider. These settings apply to both the `fastgpt-app` and `fastgpt-pro` FastGPT services. Proper configuration of these variables is mandatory for sandboxed agent functionality, and the FastGPT main service must have network access to the specified Sealos Devbox server API endpoint.

## Environment Variable Reference
All required environment variables must be added to the service configuration for both `fastgpt-app` and `fastgpt-pro`. The full reference list is below:

| Variable Name | Description | Standard Value/Example |
|---------------|-------------|------------------------|
| `AGENT_SANDBOX_PROVIDER` | Defines the active agent sandbox provider | `sealosdevbox` |
| `AGENT_SANDBOX_SEALOS_BASEURL` | API URL of the provisioned Sealos Devbox server, accessible to the FastGPT main service | `https://devbox-server.example.com` |
| `AGENT_SANDBOX_SEALOS_TOKEN` | Authentication access token issued for the Sealos Devbox service | `replace_with_sealos_devbox_token` |
| `AGENT_SANDBOX_SEALOS_IMAGE` | Container image tag for sandbox instance deployment | `hub.hzh.sealos.run/labring/devbox-sandbox:v0.2.0` |
| `AGENT_SANDBOX_CPU_COUNT` | Maximum CPU cores allocated per sandbox instance | `1` |
| `AGENT_SANDBOX_MEMORY_MIB` | Maximum memory allocated per sandbox instance, measured in mebibytes | `2048` |
| `AGENT_SANDBOX_STORAGE_SIZE_GI` | Maximum storage allocated per sandbox instance, measured in gibibytes | `1` |

## Configuration Steps
1.  Locate the environment variable configuration files for the `fastgpt-app` and `fastgpt-pro` self-hosted services.
2.  Insert the full block of environment variables provided in the reference section into each service's configuration file.
3.  Replace placeholder values: update `AGENT_SANDBOX_SEALOS_BASEURL` to match your organization's provided Sealos Devbox server URL, and replace `AGENT_SANDBOX_SEALOS_TOKEN` with your issued access token.
4.  Save the updated configuration files for both services.
5.  Restart the `fastgpt-app` and `fastgpt-pro` services to apply the new environment variables.

## Required Network Access
The FastGPT main service must have outbound network connectivity to the URL specified in `AGENT_SANDBOX_SEALOS_BASEURL` to successfully provision and manage sandbox instances. No additional inbound ports need to be exposed on the FastGPT services for this functionality.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
