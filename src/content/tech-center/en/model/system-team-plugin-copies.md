---
title: Manage System and Team Plugin Copies
slug: /en/model/system-team-plugin-copies
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/team-installation
source_type: Official documentation
---

# Manage System and Team Plugin Copies

## Standard Installation Behaviors
When the same plugin is installed at both system-wide and team-specific levels, FastGPT enforces standardized interface and functional rules to avoid operational confusion:
- Team-level plugin entries appear before system-level entries in all plugin selection menus across the platform
- System-level plugin entries display a bolded **System** label adjacent to the plugin title to clearly distinguish them from team-deployed copies
- Both copies support independent configuration, as every Workflow and Agent stores explicit reference to their assigned plugin source. This reference allows users to select and adjust settings for either copy without unintended changes to the other.
- Deleting the team-level copy of a plugin does not remove or disable the remaining system-level copy, preserving access to the system-wide plugin for all teams.

## Configuration Independence Details
Each installed plugin copy operates as a separate instance once deployed at its respective tier. Workflows and Agents tied to a team-level plugin will continue to use that copy even if the system-level version is updated, and vice versa. This separation ensures that teams can test new plugin configurations without disrupting system-wide workflows, and system administrators can manage core plugin settings without impacting team-specific customizations.

## Step-by-Step Plugin Copy Management
Follow these standardized steps to manage dual plugin installations per platform design:
1. Locate plugin entries in selection menus: team-level entries will appear first, with system-level entries marked with a bold **System** label.
2. Assign plugins to Workflows or Agents by selecting the appropriate copy, leveraging the stored source reference to avoid unintended configuration changes.
3. Document any version or configuration discrepancies between system and team copies to align with internal conventions.
4. Remove a team-level plugin copy only after verifying no active Workflows or Agents are assigned to it; deletion will not impact the system-level copy.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/team-installation)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
