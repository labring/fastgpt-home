---
title: FastGPT 4.12.3 Bug Fixes for Self-Hosted Instances
slug: /en/deploy/fastgpt-4-12-3-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4123
source_type: Official documentation
---

# FastGPT 4.12.3 Bug Fixes for Self-Hosted Instances

## Overview of FastGPT 4.12.3 Bug Fixes
This self-hosted update resolves five critical functional bugs across core FastGPT modules, restoring expected behavior for instances running prior versions of FastGPT 4.12.x. The fixes address gaps in team collaboration, workflow automation, and application evaluation tracking, with no additional configuration required beyond completing the upgrade process.

## Bug Fix Breakdown Table
The following table lists all resolved issues and their corrected outcomes:
| Bug Category           | Affected Feature                          | Resolved Behavior                                                                 |
|-------------------------|-------------------------------------------|-----------------------------------------------------------------------------------|
| Team Management        | Single-team mode user access              | Users who left a single team can now submit and complete rejoin requests to regain access |
| Workflow Automation    | File upload default state & input/output | Workflow file upload remains enabled by default, and the input side now includes full file output support |
| Workflow Automation    | Consecutive user selection branches      | Branches configured after consecutive user selection prompts now execute correctly during workflow runs |
| Workflow Automation    | Variable update array selector            | The workflow variable update array selector functions as intended, allowing proper configuration of array-based variables |
| App Evaluation         | Output text capture                       | App evaluation now logs all generated output texts instead of only the first entry in a response |

## Post-Update Validation Steps
To confirm the fixes are active on your self-hosted instance, follow these targeted verification steps:
1. Access the single-team mode instance using a user account that previously left the team, then submit a rejoin request to confirm access is granted without errors.
2. Deploy a test workflow with file upload enabled, upload a test file to confirm both input handling and associated file output operations work without failure.
3. Build a workflow with consecutive user selection steps, trigger the workflow to confirm all configured branches execute in the correct sequence.
4. Edit a workflow variable update block using the array selector, confirm the selector loads and applies array variables as expected.
5. Run an app evaluation test, review the captured output logs to confirm all response texts are recorded, not just the first entry.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-12/4123)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
