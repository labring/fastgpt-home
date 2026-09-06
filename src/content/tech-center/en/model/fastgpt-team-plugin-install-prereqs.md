---
title: Confirm Prerequisites for FastGPT Team Plugin Installation
slug: /en/model/fastgpt-team-plugin-install-prereqs
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/team-installation
source_type: Official documentation
---

# Confirm Prerequisites for FastGPT Team Plugin Installation

# Role Permissions Prerequisites
Access to FastGPT team plugin management actions — including installation, updates, and removal — is restricted to authorized team members. Only users assigned the team administrator or team owner role can perform these management tasks. Regular team members do not have these modification permissions, but can freely use any plugins that have already been installed on the team workspace. No exceptions apply to this role-based access control for plugin management.

# Local Upload Configuration Settings
For teams performing local plugin installations, a critical preliminary step must be completed by the deployment’s system administrator. The team plugin uploads setting must be enabled on the FastGPT deployment. It is important to note that this setting only governs local file uploads; marketplace-based plugin installations remain fully functional even when this option is disabled. Teams that only use marketplace plugins do not need to adjust this setting at all.

# Network and File Prerequisites
There are two distinct sets of network and file requirements based on the plugin installation method:
1. **Marketplace Installations**: If installing plugins directly from the FastGPT Marketplace, the current FastGPT deployment must have outbound network connectivity to the FastGPT Marketplace platform. Without this access, marketplace plugin installation will fail.
2. **Local Installations**: For deployments using locally uploaded plugin packages, you must possess a valid .pkg plugin file, or a compressed .zip archive that contains one or more valid .pkg plugin files. Invalid or incomplete packages will prevent successful local installation.

# Quick Prerequisite Reference Checklist
| Prerequisite Category          | Exact Requirements                                                                 |
|--------------------------------|-------------------------------------------------------------------------------------|
| User Role                      | Must be a team administrator or team owner; regular members only use existing plugins |
| Local Upload Enablement        | System administrator enabled team plugin uploads (marketplace installs work even if disabled) |
| Network Access                  | Deployment can access FastGPT Marketplace for marketplace plugin installations       |
| Local Installation Files       | Valid .pkg file, or .zip archive containing one or more .pkg files                   |

For detailed guidance on developing and packaging FastGPT plugins, refer to the [System Tool Development Guide](./system-tool-development.en.mdx).

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/team-installation)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
