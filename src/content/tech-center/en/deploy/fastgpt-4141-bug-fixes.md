---
title: List of Resolved Bugs in FastGPT 4.14.1
slug: /en/deploy/fastgpt-4141-bug-fixes
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4141
source_type: Official documentation
---

# List of Resolved Bugs in FastGPT 4.14.1

## Overview
This reference document lists all bug fixes included in the FastGPT 4.14.1 self-hosted upgrade release. These fixes address stability, usability, and functional gaps for technical teams deploying and operating FastGPT workflows and instances.

## Core Bug Fixes by Category
### Workflow Node & Execution Fixes
Resolved issues with workflow node behavior and execution flow:
- Interactive nodes now function correctly in debug mode
- Nested Agent workflows no longer fail due to an uninitialized skip-node queue
- Condition nodes no longer throw errors when the right-side value uses a number reference
- File selection input fields used as workflow tool parameters now properly display the selection dialog
- Code nodes no longer have overlapping content when exceeding 100 lines of code

### UI & Editor Fixes
Fixed layout and usability issues in platform editors:
- Rich text editor tab spacing now aligns correctly
- Default value editor for text-type global variables no longer has UI rendering issues
- Browsers now correctly pass real-time date data to the FastGPT server

### Deployment & Network Fixes
Resolved issues with instance management and plugin functionality:
- Deleting an app now removes all items within its associated directory
- HTTP plugin now correctly handles HTTP (non-HTTPS) protocol requests

## Post-Upgrade Validation Checklist
Use this step-by-step process to confirm all resolved bugs are fixed after upgrading to FastGPT 4.14.1:
1.  Launch debug mode for an interactive node workflow and confirm successful execution.
2.  Build and run a nested Agent workflow to verify full execution without queue-related failures.
3.  Configure a condition node with a number reference as the right-side input value and confirm no runtime error occurs.
4.  Add a file selection parameter to a workflow tool and trigger the field to confirm the selection dialog opens.
5.  Create a code node with 101+ lines of content and verify text does not overlap visually.
6.  Delete a test application and confirm all directory items linked to the app are removed from storage.
7.  Test the HTTP plugin with an HTTP (non-HTTPS) endpoint and confirm the request processes successfully.
8.  Edit the default value of a text-type global variable and confirm the editor renders without layout issues.
9.  Use the rich text editor to add tabbed content and verify spacing aligns properly.
10. Submit a request containing real-time date data from your browser and confirm the server receives the correct value.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-14/4141)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
