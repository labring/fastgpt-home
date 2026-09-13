---
title: Configure FastGPT Admin Team Operational Modes
slug: /en/tutorial/fastgpt-admin-team-mode-configuration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/teamMode
source_type: Official documentation
---

# Configure FastGPT Admin Team Operational Modes

# FastGPT Team Mode Overview
FastGPT includes three pre-built team operation modes to support diverse organizational team structures and access control workflows. The default enabled mode is Multi-team mode. The three supported team modes are: Multi-team mode, Single-team mode, and Member sync mode. Each mode defines how user registrations and admin additions interact with team creation and root team access.

# Team Mode Feature Comparison
The following table outlines core behavioral differences across each team mode for registration and admin workflows:
| Team Mode          | SMS/Email Reg: Creates Default Team | SMS/Email Reg: Joins Root Team | Admin Direct Add: Creates Default Team | Admin Direct Add: Joins Root Team | SSO Reg: Creates Default Team | SSO Reg: Joins Root Team |
|---------------------|-------------------------------------|--------------------------------|----------------------------------------|-----------------------------------|--------------------------------|---------------------------|
| Single-team Mode    | ❌                                  | ✅                             | ❌                                      | ✅                                 | ❌                              | ✅                        |
| Multi-team Mode     | ✅                                  | ❌                             | ✅                                      | ❌                                 | ✅                              | ❌                        |
| Sync Mode           | ❌                                  | ❌                             | ❌                                      | ❌                                 | ❌                              | ✅                        |

# Mode-Specific Behavioral Details
Each mode enforces distinct rules for team creation and user onboarding:
- **Single-team Mode**: This mode restricts the platform to a single global root team. All users who register via SMS/email, or are added directly by an admin, automatically join the root team. No new default teams are created through these workflows, and SSO-authenticated users also join the root team exclusively.
- **Multi-team Mode**: As the default mode, this setup creates a unique default team for every user who registers via SMS/email, is added directly by an admin, or authenticates via SSO. No users are automatically added to the root team, and multiple independent teams can be managed on the platform.
- **Sync Mode**: This mode disables all local user registration and manual admin team creation workflows. No teams are created via SMS/email registration or admin direct addition. The only way users are added to the platform is through SSO sync, which routes all authenticated users to the root team.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/teamMode)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
