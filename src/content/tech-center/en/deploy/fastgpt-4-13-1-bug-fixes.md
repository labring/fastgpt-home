---
title: List of Resolved Bugs in FastGPT 4.13.1
slug: /en/deploy/fastgpt-4-13-1-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4131
source_type: Official documentation
---

# List of Resolved Bugs in FastGPT 4.13.1

This document outlines the official bug fixes included in the FastGPT 4.13.1 self-hosted upgrade release. Each fix addresses a specific functional flaw to improve platform reliability and end-user interaction accuracy.

## Detailed Resolved Bug List
The following table lists all resolved issues in this release:
| Bug Domain               | Fixed Issue                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| Loop Nodes               | Previous round's interactive response value was not cleared at the end of each iteration. |
| Chat Statistics          | Chat record statistics were not updated immediately after an interactive node responded. |
| Prompt Editor            | Incorrect default values were displayed in popup prompt editor windows.     |
| Form Input Fields        | Input fields with `.` in the variable name failed to accept assigned values properly. |
| Shared Sub-Workflows     | Dataset citations returned by a sub-workflow were not displayed in shared links. |

## Post-Upgrade Validation Steps
To confirm the fixes are successfully applied to your self-hosted FastGPT instance, follow these targeted checks:
1.  Validate loop node functionality: Run a loop workflow that includes interactive steps, then confirm no residual interactive response data from prior iterations persists before the start of a new loop.
2.  Verify chat statistics updates: Trigger a response from an interactive node, then check that platform chat record statistics reflect the new interaction.
3.  Check prompt editor defaults: Open a popup prompt editor window, and confirm default values load correctly without display errors.
4.  Test dotted variable form inputs: Create a form variable with a `.` in its name, submit a test value to the field, and confirm the value is properly stored and processed.
5.  Confirm shared workflow citations: Share a sub-workflow configured to return dataset citations, then access the shared link and verify the citations are visible to external viewers.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-13/4131)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
