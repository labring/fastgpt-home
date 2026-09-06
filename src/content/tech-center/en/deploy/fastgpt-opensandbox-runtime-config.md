---
title: Configure FastGPT OpenSandbox Runtime Environment Settings
slug: /en/deploy/fastgpt-opensandbox-runtime-config
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox
source_type: 官方文档
---

# Configure FastGPT OpenSandbox Runtime Environment Settings

## Runtime Image Selection and CPU Architectures
The `AGENT_SANDBOX_OPENSANDBOX_IMAGE` environment variable specifies the full runtime image reference for Agent Sandbox instances created by OpenSandbox. The standard `fastgpt-agent-sandbox` image runs as a non-root user and is suitable for most default use cases. Use the `fastgpt-agent-sandbox-root` image when a sandbox needs to modify `/etc/apt` or install apt packages, and pair it with the `AGENT_SANDBOX_APT_MIRROR` environment variable.

All official image tags include both `amd64` and `arm64` variants. Docker automatically selects the matching architecture based on the host running the OpenSandbox Server. The table lists the image names and tags.
| Use Case       | Image Reference                                      |
|----------------|------------------------------------------------------|
| Non-root Usage | `ghcr.io/labring/fastgpt-agent-sandbox:v0.3.1`       |
| Root Usage     | `ghcr.io/labring/fastgpt-agent-sandbox-root:v0.3.1`  |

For mainland China deployments, replace `ghcr.io/labring` with `registry.cn-hangzhou.aliyuncs.com/fastgpt`. For private registries, ensure each tag preserves both `amd64` and `arm64` manifests. If the registry only provides single-architecture images, set `AGENT_SANDBOX_OPENSANDBOX_IMAGE` to an image matching the architecture of the OpenSandbox Server host.

## Required Environment Variables
Three critical environment variables must match corresponding configurations across FastGPT and related services:
1. `AGENT_SANDBOX_OPENSANDBOX_API_KEY`: Must match the `[server].api_key` value of the FastGPT server
2. `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN`: Must match the `x-volume-manager-auth-token` value
3. `AGENT_SANDBOX_PROXY_SECRET`: Must match the same variable used by the Agent Sandbox Proxy

Note that `fastgpt-pro` does not include the Sandbox Editor or WebSocket proxy path, so it does not require `AGENT_SANDBOX_PROXY_SECRET` or `AGENT_SANDBOX_PROXY_URL`. It still requires `AGENT_SANDBOX_PREVIEW_PROXY_URL`.

## Security and Upgrade Guidelines
> ⚠️ Warning: Host the preview proxy on an origin separate from the FastGPT application, using a different scheme, host, or port. Sandbox HTML may contain user-generated scripts. If previews share the application origin, those scripts may be able to access application credentials or APIs.

Preview URLs are temporary, read-only bearer capabilities. Anyone with a valid preview URL can modify the path to access other files in the same Sandbox Workspace during the URL’s validity period. Do not share preview URLs with unauthorized users.

When upgrading from an earlier Volume Manager release, set `AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX` to the previous `VM_VOLUME_NAME_PREFIX` value to ensure existing persistent volumes can still be cleaned up using their original names.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/config/sandbox/opensandbox)
