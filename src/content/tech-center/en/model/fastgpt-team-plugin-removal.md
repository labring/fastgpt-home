---
title: Remove Team Plugins from FastGPT Teams
slug: /en/model/fastgpt-team-plugin-removal
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/team-installation
source_type: Official documentation
---

# Remove Team Plugins from FastGPT Teams

## Team Plugin Removal Overview
Only team administrators are authorized to remove a team plugin from its associated tool card or detailed drawer. A mandatory confirmation dialog requires entering the exact plugin name to proceed with the removal process. Critically, removing a team plugin does not impact system plugins that share the same plugin ID, nor does it affect any plugin installations owned by other teams within the FastGPT platform.

## Step-by-Step Team Plugin Removal Workflow
Follow these structured steps to remove a team plugin:
1. Navigate to the target plugin: Access either the plugin’s tool card or its detailed drawer within your FastGPT team environment.
2. Trigger the removal action: Select the official remove plugin option from the available menu for the target plugin.
3. Complete confirmation: In the prompted confirmation dialog, input the exact, full name of the plugin to validate the removal request.
4. Finalize the action: Confirm the prompt to complete the plugin removal.

Upon successful completion of these steps, three definitive changes take effect:
- The plugin installation tied to the current team’s source is deleted from the central plugin service.
- Future runtime access for the current team to this specific plugin is permanently revoked.
- The plugin is removed from the list of available tools for new workflow and Agent node selection flows.

## Post-Removal Behavior and Recovery
Existing workflow and Agent nodes that utilized the removed plugin are not altered or rewritten automatically. These nodes will fail to execute successfully during their next run cycle following the plugin’s removal. To restore full access to the plugin for the team, reinstall it either through the official FastGPT Marketplace or by re-uploading the original plugin package to the team environment.

> [FastGPT team plugin installation guide](https://doc.fastgpt.cn/en/plugin/team-installation)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.
