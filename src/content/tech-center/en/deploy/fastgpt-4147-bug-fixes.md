---
title: FastGPT 4.14.7 Bug Fix Resolutions
slug: /en/deploy/fastgpt-4147-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147
source_type: Official documentation
---

# FastGPT 4.14.7 Bug Fix Resolutions

This page details all resolved bugs included in FastGPT 4.14.7, for self-hosted users upgrading or validating their deployment. All fixes are pulled directly from the official 4.14.7 release documentation.

## Workflow Core Fixes
This section addresses bugs related to workflow design, execution, and import/export:
- Corrected incorrect `defaultValueType` assignments for global variable types in workflow configurations
- Fixed rendering failures for workflow AI node thinking output
- Resolved missing avatar duplication when converting a simple app to a workflow
- Fixed incorrect identification of reference-type model fields as invalid during workflow import, which cleared those fields
- Restored workflow canvas auto-positioning functionality after switching browser tabs
- Fixed failure of workflow nodes to follow configured error capture branches when an uncaught system error occurs

## Tool & MCP Integration Fixes
This section resolves issues with tool calls, MCP integrations, and HTTP tool configuration:
- Implemented precise permission checks for individual MCP sub-tools to block unauthorized access
- Fixed tool call failures caused by Toolkit ToolNames starting with a numeric character
- Resolved JSON parsing errors when creating HTTP tools that included variables in the request body
- Fixed missing file link passing when exposing an Agent via MCP

## Mobile Browser Fix
Fixed an issue where first-time visits to share links on iPhone Safari occasionally triggered requests with an empty `uid` parameter, breaking core functionality for some mobile users.

## Validation Steps
Follow these steps to confirm all fixes are active in your 4.14.7 deployment:
1. Navigate to the FastGPT admin dashboard’s version information page to confirm your instance is running version 4.14.7.
2. Validate workflow fixes:
   - Create a test workflow, add an AI node, and confirm thinking output renders properly
   - Convert a simple app to a workflow and verify the avatar is duplicated correctly
   - Import a workflow containing reference-type model fields and confirm no fields are cleared
   - Switch between browser tabs while editing a workflow and confirm canvas auto-positioning works
   - Trigger an uncaught system error in a workflow node and confirm the error capture branch activates
3. Validate tool and integration fixes:
   - Create a toolkit with a tool name starting with a numeric character, confirm successful tool calls
   - Create an HTTP tool with body variables, confirm no JSON parsing errors occur during saving or execution
   - Configure an MCP sub-tool and validate that unauthorized access attempts are blocked
   - Expose an Agent via MCP and confirm file links are correctly passed to connected tools
4. Validate mobile fix: Access a FastGPT share link on an iPhone running Safari, complete the first-time visit flow, and confirm no network requests include an empty `uid` parameter.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4147)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
