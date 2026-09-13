---
title: Update FastGPT Team Plugins and Validate Changes
slug: /en/model/fastgpt-team-plugin-update
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/team-installation
source_type: Official documentation
---

# Update FastGPT Team Plugins and Validate Changes

# Plugin Update Overview
FastGPT team plugins support two update pathways: marketplace-hosted official plugins and locally uploaded custom packages. A key detail of team plugin management is that all team-specific configuration settings remain entirely independent of the base FastGPT system installation. This means updates to team plugins do not alter global system plugin deployments, and vice versa. Updates become relevant when the official marketplace releases a newer version of a listed plugin, or when you need to deploy a revised local plugin package.

# Step-by-Step Plugin Update Workflow
Use this structured process to update your team plugins:
1. Open the team Marketplace interface and locate the specific plugin you intend to update.
2. Review the published release notes and any documented permission changes for the target new version to fully understand potential impacts to your existing integrations.
3. Select your desired target plugin version and initiate the update to apply the new release.
4. For locally hosted plugin packages: Upload the new version’s package file, then confirm the installation to finalize the update.

# Post-Update Validation and Risk Mitigation
Plugin updates may alter critical functional aspects including input schemas, output schemas, required secret credentials, or runtime operational behavior. These changes can disrupt existing workflows or Agent integrations that depend on the plugin’s previous functionality. To prevent unexpected downtime in production environments, you must test all workflows and Agents that use the updated plugin in a dedicated test application before rolling out the update to live production systems. This validation step ensures the updated plugin operates as expected within your team’s FastGPT setup without breaking dependent processes.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/team-installation)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
