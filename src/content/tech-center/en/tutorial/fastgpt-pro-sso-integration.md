---
title: Integrate SSO and Member Sync for FastGPT-pro
slug: /en/tutorial/fastgpt-pro-sso-integration
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/admin/sso
source_type: Official documentation
---

# Integrate SSO and Member Sync for FastGPT-pro

## Overview
This document covers the standard SSO and member synchronization interfaces for FastGPT-pro, built to support integration with non-standard external systems. Per official documentation, these standardized endpoints are intended for use when connecting to systems that do not have pre-built FastGPT-pro integrations, eliminating custom development overhead for automated authentication and cross-platform user/organization data sync.

## Standard Interface Reference
The following four standard interfaces are provided for SSO and member sync integration:

| Endpoint URL | Core Purpose |
|--------------|--------------|
| `https://example.com/login/oauth/getAuthURL` | Generate a redirect URL to initiate the SSO authentication workflow |
| `https://example.com/login/oauth/getUserInfo?code=xxxxx` | Validate an authorization code and return authenticated user profile data |
| `https://example.com/org/list` | Fetch the full list of organizations or teams from the external system |
| `https://example.com/user/list` | Retrieve the complete list of team members from the external system |

## Step-by-Step Integration Flow
Follow this structured workflow to implement SSO and member synchronization:
1.  **Initiate Authentication**: Call the getAuthURL endpoint to generate a redirect link, then redirect end users to this link to complete external identity verification.
2.  **Retrieve User Data**: Once authentication completes, the external system will return an authorization code. Call the getUserInfo endpoint with this code to extract standardized user information for FastGPT-pro account matching or creation.
3.  **Sync Organizational Data**: Use the /org/list endpoint to pull current organization and team data from the external system, then align this data with FastGPT-pro team settings.
4.  **Maintain Member Sync**: Schedule regular calls to the /user/list endpoint to pull updated member records, ensuring FastGPT-pro user lists stay synchronized with the external platform.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/admin/sso)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
