---
title: Migrate Chat Title Model Configuration for FastGPT Upgrade
slug: /en/deploy/fastgpt-chat-title-model-migration
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506
source_type: Official documentation
---

# Migrate Chat Title Model Configuration for FastGPT Upgrade

## Overview of Chat Title Model Configuration Change
With the FastGPT 4.15.06 self-hosted upgrade, the workflow for configuring the chat title generation model has been revised. Prior to this version, the chat title model was configured exclusively through the `CHAT_TITLE_MODEL` environment variable for the platform’s core services. This legacy configuration method has been deprecated, and all related settings now must be managed via the FastGPT admin user interface.

## Step-by-Step Migration for Existing Deployments
For teams that previously set the `CHAT_TITLE_MODEL` environment variable, complete the following steps to migrate your configuration:
1.  Locate the environment variable definitions for both the `fastgpt` and `fastgpt-pro` services. These may be stored in Docker compose files, Kubernetes config maps, shell startup scripts, or other orchestration tools used for your deployment.
2.  Delete the `CHAT_TITLE_MODEL` entry from the environment variable lists for both services to remove the legacy configuration.
3.  Restart the `fastgpt` and `fastgpt-pro` services to apply the updated environment variable set.
4.  Authenticate to the FastGPT admin dashboard using your authorized credentials.
5.  Navigate to the **Model Configuration** menu, then select **Default Model Configuration**.
6.  Use the Chat Title Model dropdown menu to select the specific generative model you wish to use for auto-generating chat conversation titles.
7.  Confirm and save the new default model configuration.

## Default Behavior Without Custom Configuration
If you choose not to configure a Chat Title Model via the admin UI, FastGPT will not initiate any generative model calls for chat title creation. In this scenario, the platform will automatically generate a simplified title using a truncated version of the first user question submitted in each new conversation.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/upgrading/4-15/41506)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
