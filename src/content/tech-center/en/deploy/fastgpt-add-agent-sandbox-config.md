---
title: Add Agent-Sandbox Configuration for FastGPT Upgrade
slug: /en/deploy/fastgpt-add-agent-sandbox-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410
source_type: Official documentation
---

# Add Agent-Sandbox Configuration for FastGPT Upgrade

### Overview
This guide covers the required agent-sandbox related configuration changes for FastGPT Docker Compose deployments, as part of the 4.14.10 upgrade process. All configuration steps and parameters are sourced directly from the official FastGPT deployment repository. This configuration does not apply to Sealos commercial deployments, which use an alternative sandbox service setup.

### Step-by-Step Configuration
1. Retrieve the latest official Docker Compose deployment file from the FastGPT GitHub repository at the specified public location.
2. Add the top-level anchor authentication token variable at the start of the docker-compose.yml file:
   ```yaml
   x-volume-manager-auth-token: &x-volume-manager-auth-token 'vmtoken'
   ```
3. Append three new service definitions to the compose file: `opensandbox-server`, `volume-manager`, and `agent-sandbox-image`.
4. Copy the pre-defined `configs` block from the bottom of the sample deployment file and append it directly to your local compose file.
5. Update the environment variables section of the existing `fastgpt` service to include the full agent sandbox configuration block:
   ```yaml
   # ==================== Agent sandbox config ====================
   AGENT_SANDBOX_PROVIDER: opensandbox
   # OpenSandbox config (effective when PROVIDER: opensandbox)
   AGENT_SANDBOX_OPENSANDBOX_BASEURL: http://opensandbox-server:8090
   AGENT_SANDBOX_OPENSANDBOX_API_KEY:
   AGENT_SANDBOX_OPENSANDBOX_RUNTIME: docker
   AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO: ghcr.io/labring/fastgpt/fastgpt-agent-sandbox
   AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG: v0.0.2
   # Volume persistence config (optional under opensandbox provider)
   AGENT_SANDBOX_ENABLE_VOLUME: true
   AGENT_SANDBOX_VOLUME_MANAGER_URL: http://volume-manager:3000
   AGENT_SANDBOX_VOLUME_MANAGER_TOKEN: *x-volume-manager-auth-token
   ```

### Configuration Parameters
All agent sandbox environment variables must be added to the `fastgpt` service's environment list. The following table lists each required and optional parameter:

| Parameter | Requirement | Example Value |
|-----------|-------------|---------------|
| `AGENT_SANDBOX_PROVIDER` | Required | `opensandbox` |
| `AGENT_SANDBOX_OPENSANDBOX_BASEURL` | Required | `http://opensandbox-server:8090` |
| `AGENT_SANDBOX_OPENSANDBOX_API_KEY` | Optional | (empty string) |
| `AGENT_SANDBOX_OPENSANDBOX_RUNTIME` | Required | `docker` |
| `AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO` | Required | `ghcr.io/labring/fastgpt/fastgpt-agent-sandbox` |
| `AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG` | Required | `v0.0.2` |
| `AGENT_SANDBOX_ENABLE_VOLUME` | Optional | `true` |
| `AGENT_SANDBOX_VOLUME_MANAGER_URL` | Required if enabling volume persistence | `http://volume-manager:3000` |
| `AGENT_SANDBOX_VOLUME_MANAGER_TOKEN` | Required if enabling volume persistence | Reference to the top-level anchor token `*x-volume-manager-auth-token` |

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/41410)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
