---
title: Update FastGPT 4.16.0 Environment Variables
slug: /en/deploy/fastgpt-4160-environment-variable-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160
source_type: 官方文档
---

# Update FastGPT 4.16.0 Environment Variables

This document covers environment variable updates required for self-hosted FastGPT 4.16.0, specifically changes to Agent Sandbox configurations. All variable modifications must be applied to both `fastgpt-app` and `fastgpt-pro` deployment environments.

## Mandatory New Environment Variables
Two new required environment variables must be added to your FastGPT configuration:
```dotenv
# HTTP(S) URL used by browsers to preview Sandbox files. Use the URL configured in step 1.
AGENT_SANDBOX_PREVIEW_PROXY_URL=https://sandbox-proxy.example.com
# Required for OpenSandbox. Sets the full storage name prefix (previously configured on the volume image).
VM_VOLUME_NAME_PREFIX=fastgpt-session
```
Set `AGENT_SANDBOX_PREVIEW_PROXY_URL` to the public URL established during your initial sandbox setup, and `VM_VOLUME_NAME_PREFIX` to match the storage name prefix configured for your OpenSandbox volume image.

## Deprecated and Removed Configuration
The following changes apply to legacy sandbox configurations:
1.  `AGENT_SANDBOX_DISK_MB` and all E2B-related environment variables are deprecated and should be removed from your configuration.
2.  The E2B Sandbox Provider has been fully removed. Any environments previously configured for E2B must switch to either `opensandbox` or `sealosdevbox`, and the `AGENT_SANDBOX_E2B_API_KEY` variable must be deleted entirely.
3.  Preview protocols for `fastgpt-agent-sandbox-proxy` and `fastgpt-agent-sandbox` have been updated. Mixing old and new service versions is not supported; all related FastGPT images must use the 4.16.0 release.

## Optional Sandbox Tuning Parameters
You can configure optional environment variables to adjust Agent Sandbox resource limits and automatic lifecycle policies. The following table lists all available optional parameters, their default values, and descriptions:
| Variable                              | Default | Description                                                                                                                           |
| ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `AGENT_SANDBOX_CPU_COUNT`             | `1`     | Maximum CPU cores per Agent Sandbox instance.                                                                                         |
| `AGENT_SANDBOX_MEMORY_MIB`            | `2048`  | Memory limit per Agent Sandbox instance, in MiB.                                                                                      |
| `AGENT_SANDBOX_STORAGE_SIZE_GI`       | `1`     | Agent Sandbox storage capacity, in Gi. Used as the Sealos Devbox storage limit and to create new PVCs in OpenSandbox Kubernetes mode. |
| `AGENT_SANDBOX_SUSPEND_MINUTES`       | `60`    | Number of minutes an active Sandbox can remain idle before it is automatically suspended.                                             |
| `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` | `7`     | Number of days a suspended Sandbox can remain inactive before it is automatically archived.                                           |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/4-16/4160)
