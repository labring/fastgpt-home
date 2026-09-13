---
title: Set Up FastGPT Share Link Authentication
slug: /en/integration/fastgpt-share-link-authentication-2
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/link
source_type: Official documentation
---

# Set Up FastGPT Share Link Authentication

## Share Link Authentication Overview
This authentication method is designed for directly embedding FastGPT share links into external applications. It adds a secure access layer to shared AI chat flows, ensuring only authorized users can interact with the deployed workflow, and aligns with an organization’s existing user identity systems.

## Required Authentication Parameter
The mandatory parameter for this workflow is `authToken`. Before opening the share link within an external app or web view, append the `authToken` query parameter to the base share link URL to authenticate the accessing user.

## Step-by-Step Integration Workflow
1. Retrieve the base share link from the FastGPT publish settings for your deployed chat flow.
2. Generate a valid `authToken` tied to the external user’s authenticated identity using your organization’s existing authentication logic.
3. Construct the authenticated share link by appending the parameter: `[base_share_link_url]?authToken=[valid_auth_token]`
4. Embed the constructed authenticated URL into your external application’s web view, iframe, or native web component to enable secure access to the chat flow.

## Balance Management Capabilities
Beyond integrating with existing user systems, this authentication framework supports balance-based access control. Two dedicated endpoints enable balance management:
- Pre-chat Verification Endpoint: Call this endpoint before loading the authenticated share link to validate the user’s available balance for chat interactions.
- Result Reporting Endpoint: Call this endpoint after a completed chat interaction to deduct the user’s allocated balance per configured usage rules.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/link)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
