---
title: Generate and use FastGPT team invitation links
slug: /en/tutorial/fastgpt-team-invitation-links
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/workspace/team/invitation_link
source_type: Official documentation
---

# Generate and use FastGPT team invitation links

## Team Invitation Link Overview
FastGPT team invitation links are a core access control feature for team-based FastGPT deployments, enabling authorized admin users to securely add new members to a dedicated team workspace. This standardized workflow removes manual permission configuration overhead and ensures consistent access controls for shared team resources. Link creation is restricted exclusively to users with team admin permissions, preventing unauthorized access requests.

## Step-by-Step Link Creation and Distribution
This section outlines the exact, native workflow for generating and sharing team invitation links:
1.  **Launch the Invitation Dialog**: Navigate to the FastGPT team management page, then select the "Invite Members" button to open the invitation configuration modal.
2.  **Generate a Unique Link**: Within the open modal, select the "Create Invitation Link" option to generate a new, unique invitation URL.
3.  **Configure Link Settings**: Complete the required and optional configuration fields:
    - *Link Description*: Enter a text description of the invitation’s intended use case. This field cannot be modified after the link is created, so use a clear, permanent label for the team access request.
    - *Expiration Time*: Choose from three predefined validity periods: 30 minutes, 7 days, or 1 year.
    - *Usage Limit*: Select either a maximum of 1 use per link, or an unlimited number of total uses.
4.  **Distribute the Link**: Select the "Copy Link" button to copy the generated URL to your clipboard, then share the link with intended team members. The standard format of all FastGPT team invitation links is `fastgpt.cn/account/team?invitelinkid=xxxx`, where `xxxx` represents the unique link identifier.

## Invitation Acceptance Process
When a recipient visits the shared invitation link, the following automated workflow activates:
1.  If the recipient is not already logged into their FastGPT account, they are redirected to the account login or registration page first.
2.  After completing authentication, the recipient is directed to the team invitation page for the associated workspace.
3.  The invitation page presents two actionable options:
    - Click "Accept" to formally join the linked team workspace, gaining all assigned permissions for the team’s resources.
    - Click "Ignore" to close the invitation dialog. The invitation remains valid for its configured lifespan, and the recipient can revisit the link at any time to attempt acceptance later.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/workspace/team/invitation_link)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
