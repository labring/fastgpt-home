---
title: Configure Agent Sandbox Environment Variables for FastGPT 4.16.1 Upgrade
slug: /en/deploy/fastgpt-agent-sandbox-env-config
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4161
source_type: 官方文档
---

# Configure Agent Sandbox Environment Variables for FastGPT 4.16.1 Upgrade

This page details environment variable configuration for the Agent Sandbox feature as part of the FastGPT 4.16.1 upgrade. When Agent Sandbox is enabled, both `fastgpt-app` and `fastgpt-pro` services require updated environment variable settings to use the standardized single full runtime image reference introduced in this version.

## Core Environment Variables
FastGPT 4.16.1 replaces prior fragmented sandbox image configurations with a single, explicit image reference. Two environment variables control the sandbox runtime and package installation behavior:

For standard non-root deployments (default, no in-sandbox apt package installs needed):
```dotenv
# Standard non-root image, used by default
AGENT_SANDBOX_OPENSANDBOX_IMAGE=ghcr.io/labring/fastgpt-agent-sandbox:v0.3.1
```

For deployments needing apt package installs within sandboxes, use the root image and optional custom apt mirror:
```dotenv
AGENT_SANDBOX_OPENSANDBOX_IMAGE=ghcr.io/labring/fastgpt-agent-sandbox-root:v0.3.1
AGENT_SANDBOX_APT_MIRROR=https://archive.ubuntu.com/ubuntu
```

The `AGENT_SANDBOX_APT_MIRROR` variable lets you specify a regional or local apt mirror to optimize package download speeds for sandbox environments.

## Configuration Steps
1. Confirm that the Agent Sandbox feature is active in your FastGPT deployment.
2. Locate the environment variable files or secrets management setup for both `fastgpt-app` and `fastgpt-pro` services, as both require identical Agent Sandbox configuration.
3. Choose the correct sandbox image:
   - For standard use cases without in-sandbox apt package installs, retain or set the default non-root image value.
   - For sandboxes that need to install additional system packages, switch to the root image and set `AGENT_SANDBOX_APT_MIRROR` if a custom mirror is required.
4. Update the relevant environment variables in your deployment configuration.
5. Redeploy or restart the `fastgpt-app` and `fastgpt-pro` services to apply the changes.

## Additional Configuration Resources
For complete documentation covering global and mainland China container registry image lists, root vs non-root image selection, and custom package registry settings, consult the official [OpenSandbox Configuration](../../config/sandbox/opensandbox) guide.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4161)
