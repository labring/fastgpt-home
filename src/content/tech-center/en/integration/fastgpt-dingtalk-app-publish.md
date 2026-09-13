---
title: Publish FastGPT Apps for DingTalk Access
slug: /en/integration/fastgpt-dingtalk-app-publish
page_type: Integrations
source: https://doc.fastgpt.cn/en/guide/build/publish/dingtalk
source_type: Official documentation
---

# Publish FastGPT Apps for DingTalk Access

## Mandatory Post-Configuration Publication Step
After finalizing the initial DingTalk bot setup and publishing the base bot configuration, a separate app version publication workflow is required to enable full end-user access. This workflow is administered via the dedicated **Version Management and Publishing** page within the FastGPT platform. The associated user interface screenshot displays the main dashboard for managing app versions and publication statuses.

## Step-by-Step App Version Publishing
Follow these exact documented steps to publish a validated app version for DingTalk deployment:
1. Navigate directly to the **Version Management and Publishing** page in the FastGPT interface.
2. Click the clearly labeled **Create New Version** button to launch the version setup form.
3. Input a unique version number and optional descriptive version notes in the provided dedicated fields.
4. Select the save action to finalize the configuration and publish the new app version.
The corresponding UI screenshot for this step shows the form with labeled inputs for version number and description.

## End-User Access Workflows
Once the app version is successfully published, all authorized users within the linked DingTalk enterprise can interact with the deployed FastGPT bot. Two standard supported interaction methods are available:
1. Private direct chat: Users can initiate a one-on-one conversation with the bot without requiring group integration.
2. Group chat integration: Add the bot to a DingTalk group chat and use the `@mention` function to trigger bot responses and start a conversation.
The accompanying UI screenshot illustrates both private and group chat interaction scenarios for end users.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/publish/dingtalk)

## Applicability and version scope

Use this page for the documented Integrations scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
