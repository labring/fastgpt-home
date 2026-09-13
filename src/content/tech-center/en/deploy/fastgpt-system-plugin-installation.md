---
title: Install and Manage FastGPT System Plugins
slug: /en/deploy/fastgpt-system-plugin-installation
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/deploy/docker
source_type: Official documentation
---

# Install and Manage FastGPT System Plugins

## Plugin Installation Mandate for V4.14.0+
Beginning with FastGPT version 4.14.0, the fastgpt-plugin container image only provides a base runtime environment, with no pre-packaged system plugins included by default. All FastGPT deployments must complete manual system plugin installation to unlock extended tooling and functionality. Without proper plugin setup, core extended features will remain unavailable for end users.

## Online Plugin Installation via Public Marketplace
The default and recommended installation workflow uses the public FastGPT Plugin Marketplace. This method automatically fetches official, verified plugins directly from the hosted marketplace repository, with no local file transfers required. This is the simplest approach for deployments that have unrestricted outbound internet access to the public FastGPT service endpoints.

## Offline Plugin Installation for Restricted Environments
For FastGPT deployments that cannot connect to the public marketplace, follow this exact step-by-step process:
1. Access the public FastGPT Plugin Marketplace at https://marketplace.fastgpt.cn/ from a device with active internet access.
2. Identify and download the target system plugin `.pkg` package files.
3. Return to the FastGPT deployment’s plugin management dashboard.
4. Use the built-in file upload tool to import the downloaded `.pkg` files directly into the FastGPT system.
This offline workflow supports air-gapped or network-restricted deployments where access to the public marketplace is fully blocked.

## Plugin Library Management Tools
The FastGPT plugin management interface includes built-in controls to organize and curate the plugin library. Available management features are:
- Sorting available and installed tools by name, release date, or functional category
- Configuring default plugin installations for new team deployments
- Assigning and managing custom tags to group related plugins
A corresponding screenshot of the plugin management interface is referenced in the official FastGPT documentation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/deploy/docker)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
