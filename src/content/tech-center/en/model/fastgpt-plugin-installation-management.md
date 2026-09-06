---
title: Manage FastGPT Plugin Installations and Statuses
slug: /en/model/fastgpt-plugin-installation-management
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/intro
source_type: Official documentation
---

# Manage FastGPT Plugin Installations and Statuses

## Plugin Service Overview
The FastGPT Plugin service is responsible for core plugin lifecycle operations: plugin package management, runtime registration, plugin call forwarding, and system-level configuration. The FastGPT main service invokes plugins exclusively through the plugin runtime interface, and the plugin service dispatches each incoming plugin call to the corresponding dedicated runtime instance.

## Plugin Installation Workflows
There are two primary methods for installing plugins in FastGPT:
1. **System-level installation**: Available only to the root user. This installation makes the plugin visible across the entire FastGPT system. To complete a system-level installation:
   - Access the plugin management page as the root user
   - Either upload a `.pkg` format plugin package file, or install a plugin directly from the official Marketplace
2. **Team-level installation**: Restricted to team administrators, with the plugin only visible within the installing team. For full step-by-step instructions, refer to [Install and Manage Team Plugins](./team-installation.en.mdx).

## Plugin Lifecycle and Administrative Controls
After a plugin is installed, the FastGPT plugin service automatically saves the uploaded plugin package file, parses the plugin’s metadata, and registers the plugin with the runtime when the plugin is enabled. System administrators have access to three core management controls: plugin status configuration, system secret management, and runtime parameter adjustment.

Plugin statuses include three predefined states:
- **Normal**: The plugin is fully available for use in all compatible workflows
- **Pending Offline**: Existing active workflows using the plugin will continue to run, but the plugin can no longer be added to new workflows
- **Offline**: The plugin is disabled and cannot be used in any workflows

System administrators can also configure system-level secrets for plugin invocation. These secrets are hosted securely by the plugin service, and all authorized system users can reuse them during plugin calls. Callers reference these secrets exclusively through the plugin’s configuration interface, and never gain direct access to the plaintext secret values.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/intro)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
