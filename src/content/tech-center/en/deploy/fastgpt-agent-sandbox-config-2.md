---
title: Configure FastGPT Agent Sandbox Environment Variables
slug: /en/deploy/fastgpt-agent-sandbox-config-2
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/env
source_type: Official documentation
---

# Configure FastGPT Agent Sandbox Environment Variables

The FastGPT agent sandbox environment variables manage isolated code execution for AI agents, allowing safe running of untrusted agent code within controlled environments. By default, the sandbox feature is completely disabled. To enable sandbox functionality, you must first set the `AGENT_SANDBOX_PROVIDER` variable to one of two supported providers: `sealosdevbox` or `opensandbox`. Once a provider is selected, you must configure all required matching variables for that provider. For deployments using OpenSandbox, refer to the dedicated OpenSandbox configuration guide for additional setup steps beyond these environment variables.

## Provider-Specific Configuration Notes
Each sandbox provider has distinct mandatory and optional configuration requirements. When using the `sealosdevbox` provider, you must provide the service URL, access token, and runtime image, with an optional custom working directory inside the sandbox. For the `opensandbox` provider, you need the service URL, API key, and runtime image, with optional settings for runtime type (either `docker` or `kubernetes`) and whether to route sandbox traffic through the FastGPT server proxy. Note that FastGPT app deployments require all three proxy variables when using sandbox, while FastGPT Pro deployments only need the preview proxy URL for provider setup.

## Complete Environment Variable Reference
Below is the official list of supported environment variables for agent sandbox configuration, including exact default values and official descriptions:

| Variable                                         | Default                  | Description                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENT_SANDBOX_PROVIDER`                         | Empty                    | Agent Sandbox provider. Supported values are `sealosdevbox` and `opensandbox`. Empty disables Sandbox. Once set, the matching provider variables are required. See [OpenSandbox Configuration](./sandbox/opensandbox) when using OpenSandbox. `fastgpt-app` also requires all three proxy variables, while `fastgpt-pro` requires only the preview proxy URL. |
| `AGENT_SANDBOX_SEALOS_BASEURL`                   | Empty                    | Sealos Devbox service URL.                                                                                                                                                                                                                                                                                                                                    |
| `AGENT_SANDBOX_SEALOS_TOKEN`                     | Empty                    | Sealos Devbox access token.                                                                                                                                                                                                                                                                                                                                   |
| `AGENT_SANDBOX_SEALOS_WORK_DIRECTORY`            | `/home/devbox/workspace` | Working directory inside the Sealos Devbox sandbox.                                                                                                                                                                                                                                                                                                           |
| `AGENT_SANDBOX_SEALOS_IMAGE`                     | Empty                    | Runtime image used by Sealos Devbox. Required when `sealosdevbox` is enabled.                                                                                                                                                                                                                                                                                 |
| `AGENT_SANDBOX_OPENSANDBOX_BASEURL`              | Empty                    | OpenSandbox service URL.                                                                                                                                                                                                                                                                                                                                      |
| `AGENT_SANDBOX_OPENSANDBOX_API_KEY`              | Empty                    | OpenSandbox API key. Required when OpenSandbox is enabled, and must match OpenSandbox server `[server].api_key`.                                                                                                                                                                                                                                              |
| `AGENT_SANDBOX_OPENSANDBOX_RUNTIME`              | `docker`                 | OpenSandbox runtime, either `docker` or `kubernetes`.                                                                                                                                                                                                                                                                                                         |
| `AGENT_SANDBOX_OPENSANDBOX_IMAGE`                | Empty                    | Full runtime image used by OpenSandbox. Required when `opensandbox` is enabled.                                                                                                                                                                                                                                                                               |
| `AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY`     | `true`                   | Whether OpenSandbox access goes through the server proxy.                                                                                                                |

## Validation and Deployment
After updating these environment variables, you must restart your FastGPT deployment to apply the new configuration. Incomplete or incorrect variable setup will prevent the agent sandbox from initializing properly, so always verify that all required provider-specific variables are configured before restarting the service.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/env)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
