---
title: Verify Remote Plugin Debugging in FastGPT
slug: /en/model/fastgpt-remote-debug-verification
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Verify Remote Plugin Debugging in FastGPT

## Post-CLI Debug Validation Overview
Once the FastGPT remote debugging CLI reports that the debugging session is ready, you must return to the FastGPT test environment to complete plugin validation. A key access constraint applies to the debug plugin: the tool labeled `source` is exclusively bound to the currently signed-in workspace member. No other team members will see this debug plugin by default.

## Step-by-Step Validation Workflow
Follow these required steps to validate the remote plugin:
1. Navigate to the System Tools page in your FastGPT workspace, and confirm the debug plugin is active.
2. Open a target FastGPT resource—either an application, workflow, or Agent—and select the debug tool from the available plugin list.
3. Enter the required secrets and input parameters for the plugin, then start a real invocation of the plugin.
4. Review the local CLI terminal for real-time handler logs and any error messages generated during the invocation.

## Access Boundary Clarification
The binding of the `source` debug plugin to your signed-in account prevents unintended access by other workspace members. This binding is automatically applied based on your current login session, so no additional configuration is needed to restrict access to the debug tool.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
