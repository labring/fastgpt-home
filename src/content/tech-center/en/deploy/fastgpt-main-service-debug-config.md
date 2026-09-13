---
title: Configure FastGPT Main Service for Remote Debugging
slug: /en/deploy/fastgpt-main-service-debug-config
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Configure FastGPT Main Service for Remote Debugging

## Required Environment Variables
The FastGPT main service relies on three core environment variables to integrate with the remote debug suite and plugin service. The standard configuration block is:
```dotenv
PLUGIN_BASE_URL=http://fastgpt-plugin:3000
PLUGIN_TOKEN=replace-with-the-same-value-as-plugin-auth-token
NEXT_PUBLIC_BASE_URL=https://fastgpt.example.com
```
A breakdown of each variable:
| Variable Name               | Detailed Purpose                                                                 |
|------------------------------|----------------------------------------------------------------------------------|
| `PLUGIN_BASE_URL`            | Fixed base URL for the connected FastGPT plugin service instance.                 |
| `PLUGIN_TOKEN`               | Secure authentication token that must match the value configured for the FastGPT plugin service. |
| `NEXT_PUBLIC_BASE_URL`       | Publicly accessible base URL for your FastGPT instance, used to generate valid remote debug connection links. |

## Configuration Implementation Steps
Follow these steps to apply the correct configuration:
1. Locate the environment configuration file for your FastGPT main service, commonly named `.env.local` or `.env.production`.
2. Insert the standard configuration snippet into the file.
3. Replace the `PLUGIN_TOKEN` placeholder text with the exact auth token value set for your FastGPT plugin service.
4. For public deployments where end users access FastGPT via a browser, update `NEXT_PUBLIC_BASE_URL` to the fully qualified URL that browsers can reach to access your instance.

## Debug Link Behavior
The `NEXT_PUBLIC_BASE_URL` variable directly controls the domain and path included in generated remote debug connection links. If this value is misconfigured, the resulting debug links will be unresolvable for external or browser-based users. For public access scenarios, this value must exactly match the public URL end users use to navigate to your FastGPT deployment.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
