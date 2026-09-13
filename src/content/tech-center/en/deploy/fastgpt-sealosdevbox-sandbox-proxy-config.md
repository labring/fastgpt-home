---
title: Configure FastGPT SealosDevBox Sandbox Proxy Parameters
slug: /en/deploy/fastgpt-sealosdevbox-sandbox-proxy-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox
source_type: Official documentation
---

# Configure FastGPT SealosDevBox Sandbox Proxy Parameters

# Enabling SealosDevBox Sandbox Proxy Configuration
When the `AGENT_SANDBOX_PROVIDER` environment variable is set to `sealosdevbox`, FastGPT requires specific proxy-related environment variables to enable sandbox functionality across its core components. This documentation outlines the mandatory configuration parameters and requirements for both fastgpt-app and fastgpt-pro deployments, ensuring consistent and secure sandbox proxy operations.

# Mandatory Environment Variables
The following table lists the required environment variables and their associated requirements for each FastGPT component:

| FastGPT Component | Required Environment Variables | Configuration Rules |
|-------------------|---------------------------------|---------------------|
| fastgpt-app       | `AGENT_SANDBOX_PROXY_SECRET`, `AGENT_SANDBOX_PROXY_URL`, `AGENT_SANDBOX_PREVIEW_PROXY_URL` | The `AGENT_SANDBOX_PROXY_SECRET` value must exactly match the secret configured for the `fastgpt-agent-sandbox-proxy` service, and must be a minimum of 32 characters in length. All three variables must be defined for fastgpt-app instances to enable full sandbox functionality. |
| fastgpt-pro       | `AGENT_SANDBOX_PREVIEW_PROXY_URL` | No additional secret configuration is required for fastgpt-pro, but the preview proxy URL must align with the endpoint used by fastgpt-app deployments to maintain consistent sandbox access. |

# Step-by-Step Deployment Configuration
Follow these steps to properly configure the SealosDevBox sandbox proxy for your FastGPT deployment:
1.  Set the core provider variable: Add `AGENT_SANDBOX_PROVIDER=sealosdevbox` to your deployment’s environment configuration file, container runtime arguments, or orchestration platform secrets.
2.  Configure fastgpt-app variables: For each fastgpt-app instance, define all three required proxy variables. Generate a secure secret of at least 32 characters for `AGENT_SANDBOX_PROXY_SECRET`, and ensure this value matches the secret configured for the `fastgpt-agent-sandbox-proxy` service.
3.  Configure fastgpt-pro variables: For each fastgpt-pro instance, only define the `AGENT_SANDBOX_PREVIEW_PROXY_URL` variable, using the same proxy endpoint URL as configured for fastgpt-app deployments.
4.  Validate configuration: Confirm all environment variables are correctly applied by running environment inspection commands such as `printenv` for local or single-node deployments, or using Kubernetes `kubectl get secrets` and `kubectl describe configmap` commands for containerized orchestrated deployments. Verify that no mandatory variables are missing or misconfigured to avoid sandbox connectivity failures.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/sandbox/sealosdevbox)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
