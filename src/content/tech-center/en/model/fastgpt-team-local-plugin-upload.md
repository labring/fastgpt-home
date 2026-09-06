---
title: Upload Local Plugin Packages for FastGPT Teams
slug: /en/model/fastgpt-team-local-plugin-upload
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/team-installation
source_type: Official documentation
---

# Upload Local Plugin Packages for FastGPT Teams

## Team Local Plugin Upload Overview
When team plugin upload functionality is enabled, authorized users of FastGPT team workspaces can deploy custom plugins directly from local storage. This workflow supports direct upload of custom-built or internal plugins without requiring access to external remote repositories, streamlining internal plugin distribution for team environments.

## Step-by-Step Local Plugin Upload Workflow
Follow this validated process to upload and preview local plugin packages:
1. Open the **Tools** menu within your FastGPT team workspace.
2. Navigate to the **Add Plugin** interface, then select the local upload deployment option.
3. Select your target files: either one or more standalone `.pkg` plugin files, or a single `.zip` archive containing multiple `.pkg` files.
4. Wait for FastGPT to complete the automated upload and parsing of the selected package(s).
5. Review the generated installation preview details: plugin name, version, requested permissions, and parsing results. Any files that fail parsing will display a specific error message, and individual retries are available for failed items.
6. Confirm the installation to finalize plugin deployment for the team workspace.

## Preview vs. Final Installation
The initial upload and parsing phase only generates an installation preview. No plugins are installed or activated for the team workspace until the final confirmation step is completed. This two-stage process ensures that all plugin metadata and parsed results are validated before being made available to all team members with access to the workspace.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/team-installation)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
