---
title: Update FastGPT App and Pro Sandbox Environment Variables
slug: /en/deploy/fastgpt-app-pro-sandbox-env-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# Update FastGPT App and Pro Sandbox Environment Variables

This document covers environment variable updates for `fastgpt-app` and `fastgpt-pro` when upgrading FastGPT to this release, focused on Agent Sandbox configuration changes.

## Required New Environment Variables
Add these two environment variables to both `fastgpt-app` and `fastgpt-pro` configurations:
```dotenv
# HTTP(S) URL used by browsers to preview Sandbox files. Use the URL configured in step 1.
AGENT_SANDBOX_PREVIEW_PROXY_URL=https://sandbox-proxy.example.com
# Required for OpenSandbox. Sets the full storage name prefix (previously configured on the volume image).
VM_VOLUME_NAME_PREFIX=fastgpt-session
```
Each variable’s purpose is documented in the accompanying comments.

## Deprecated and Removed Variables
Two categories of variables are no longer supported:
1.  `AGENT_SANDBOX_DISK_MB`
2.  All E2B-related environment variables.

If you previously configured E2B as your sandbox provider, you must switch to either `opensandbox` or `sealosdevbox`, and remove the `AGENT_SANDBOX_E2B_API_KEY` environment variable entirely.

## Optional Sandbox Configuration Variables
Several optional environment variables are available to fine-tune Agent Sandbox performance and lifecycle. These apply to both `fastgpt-app` and `fastgpt-pro`:

| Variable                              | Default | Description                                                                                                                           |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENT_SANDBOX_CPU_COUNT`             | `1`     | Maximum CPU cores per Agent Sandbox instance.                                                                                         |
| `AGENT_SANDBOX_MEMORY_MIB`            | `2048`  | Memory limit per Agent Sandbox instance, in MiB.                                                                                      |
| `AGENT_SANDBOX_STORAGE_SIZE_GI`       | `1`     | Agent Sandbox storage capacity, in Gi. Used as the Sealos Devbox storage limit and to create new PVCs in OpenSandbox Kubernetes mode. |
| `AGENT_SANDBOX_SUSPEND_MINUTES`       | `60`    | Number of minutes an active Sandbox can remain idle before it is automatically suspended.                                             |
| `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` | `7`     | Number of days a suspended Sandbox can remain inactive before it is automatically archived.                                           |

## Preview Protocol Changes
FastGPT, `fastgpt-agent-sandbox-proxy`, and `fastgpt-agent-sandbox` preview protocols have been updated in this release. When enabling Agent Sandbox, only use container images released with this version. Mixing old and new versions of these components is not supported.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/41601)
