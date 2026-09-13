---
title: List of Fixed Bugs in FastGPT 4.14.4
slug: /en/deploy/fastgpt-4144-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144
source_type: Official documentation
---

# List of Fixed Bugs in FastGPT 4.14.4

This document details all resolved bugs included in the FastGPT 4.14.4 self-hosted upgrade, targeted at engineers and technical decision makers evaluating or running the FastGPT platform. All fixes are directly sourced from the official 4.14.4 upgrade documentation, with no unvetted external changes.

## Complete Resolved Bug List
| Affected Component | Fix Description |
|---------------------|-----------------|
| Loop Nodes | No longer filter out empty content from processed arrays |
| Workflow Tools | Fixed missing custom DataId passing, which caused "no permission" errors when viewing Datasets during test runs |
| Chat Agent Tool Configuration | Enabled direct confirmation for non-required boolean and number type parameters |
| Studio Card UI | Corrected misalignment of cards when component names exceed standard length limits |
| Shared Link Frontend | Fixed failure to load global variables passed via URL query parameters in share links |
| Windows File Handling | Resolved CSV file detection failures on Windows operating systems |
| Model Testing | Fixed inability to test models that were not in a started state |
| MCP Headers | Fixed platform errors caused by MCP headers with special content |
| Cross-Agent Workflow References | Corrected UI failure to update after switching versions of a referenced Agent |
| HTTP Node | Changed behavior to use empty strings instead of `null` for global variables with empty string values |
| Condition Nodes | Fixed broken connections when collapsing a condition node |
| Node Debugging | Restored display of single-select and multi-select variable options during node debugging |
| Publish Channels | Fixed incorrect redirect locations for publish channel documentation links |
| Disabled Checkboxes | Corrected incorrect hover styling for disabled checkbox inputs |
| Model Avatars | Fixed incorrect display of the default `huggingface.svg` icon when a model’s avatar was missing |
| Log Export | Adjusted log export end date to resolve off-by-one-day timing errors |
| Form Inputs | Fixed failure to pass frontend default values to actual submitted form values |
| Tool Calls | Ensured the `max_tokens` parameter is passed during all tool calls |
| Workflow Condition Nodes | Corrected value type determination by combining condition logic with input values |
| Dataset Citation Reader | Fixed incorrect navigation order and single-page loading for Dataset data not using direct chunking mode |

## Validation Checklist for Self-Hosted Deployments
To confirm the resolved bugs are addressed in your 4.14.4 deployment, use these targeted checks aligned with each fixed issue:
1.  Test loop nodes with empty array content to confirm empty values are retained instead of filtered out.
2.  Configure a workflow tool with a custom DataId, run a test run, and verify no "no permission" errors occur when accessing linked Datasets.
3.  Create a Chat Agent tool with non-required boolean and number parameters, confirm direct configuration confirmation works without errors.
4.  Load a shared link with URL-passed global variables and confirm the variables populate correctly in the frontend UI.
5.  Upload a CSV file from a Windows system and confirm the platform detects the file successfully.
6.  Attempt to test an unstarted model and confirm the test runs without failure.
7.  Configure an MCP integration with special header content and confirm no platform errors occur.
8.  Reference a versioned Agent in a workflow, switch the Agent’s version, and confirm the workflow UI updates to reflect the new version.
9.  Use an empty string global variable in an HTTP node and confirm the node passes an empty string instead of `null`.
10. Collapse a condition node in a workflow and confirm its connections remain intact.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4144)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
