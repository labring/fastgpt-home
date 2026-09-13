---
title: Clarify FastGPT Team Permission Management Logic
slug: /en/tutorial/fastgpt-team-permission-management-logic
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/workspace/team/team_roles_permissions
source_type: Official documentation
---

# Clarify FastGPT Team Permission Management Logic

## Permission Level Definitions
FastGPT offers three structured permission management levels with clear priority and aggregation rules:
1.  **Member Permissions**: Permissions assigned directly to individual users, which carry the highest priority across all permission sets.
2.  **Department & Group Permissions**: Permissions tied to a user's assigned organizational departments or collaboration groups. This level uses a union logic to combine all permissions from every group and department the user is part of, and has lower priority than individual member permissions.
3.  **Combined Final Permissions**: The aggregated result of merging individual member permissions and department/group permissions, which represents the user's full effective permissions.

## Permission Evaluation Workflow
The formal permission evaluation process follows a strict sequential order to calculate effective user permissions:
1.  First, retrieve and validate the user's directly assigned individual member permissions. Any permissions granted here take precedence over all other permission sources.
2.  Next, aggregate permissions from all of the user's linked departments and groups, applying union logic to merge overlapping or complementary permissions into a single set.
3.  Combine the individual member permissions and the aggregated department/group permissions to produce the user's final effective permissions. No additional merging or overriding occurs beyond this combined set.

## Authorization Logic Reference
The official FastGPT authorization logic for team permissions is documented in an accompanying reference diagram. This diagram visually maps the sequential evaluation steps and union aggregation process to provide a clear visual reference for configuration validation and troubleshooting. All standard FastGPT team permission setups adhere to this fixed logic framework.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/workspace/team/team_roles_permissions)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
