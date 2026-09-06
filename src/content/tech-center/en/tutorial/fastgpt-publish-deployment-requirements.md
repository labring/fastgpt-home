---
title: Understand the Critical FastGPT Publish Requirements
slug: /en/tutorial/fastgpt-publish-deployment-requirements
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/build/skill/version
source_type: Official documentation
---

# Understand the Critical FastGPT Publish Requirements

## Isolated Development and Production Environments
FastGPT maintains a strict separation between its debugging environment and production deployment environment. All edits made to skill code, agent configurations, or workflow settings within the platform’s editor are contained exclusively to the debugging phase. This isolation prevents accidental disruptions to live, active agents and workflows that are serving end users.

> [!WARNING]
> **Note:** The debugging environment is isolated from the production deployment environment. This ensures that when you edit or debug skill code, it will not affect the online agents and workflows currently running.

## Debug Chat Panel Exclusive Test Scope
Any changes made in the FastGPT editor will only be visible and functional within the "Debug Chat" panel. This testing environment is designed for iterative development and validation, but it does not integrate with live production deployments. Users cannot route end-user traffic to the "Debug Chat" panel; it is solely for developer testing of edited configurations.

## Mandatory Publish Step for Formal Deployment
To apply your edited configurations to active workflows or agents that serve end users, you must complete the publish process. The Publish action deploys a formal, locked version of your setup that can be linked to live production environments. Without clicking Publish, all changes made in the editor will remain restricted to the "Debug Chat" panel and will not impact live operations.

### Step-by-Step Publish Workflow
1.  Finalize all edits to your skill, agent, or workflow configuration in the FastGPT editor.
2.  Test the modified setup exclusively within the "Debug Chat" panel to confirm functionality before publishing.
3.  Select the **Publish** button within the editor interface to deploy a formal production version.
4.  All linked active workflows and agents will immediately begin using the updated configuration after successful publication.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/build/skill/version)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
