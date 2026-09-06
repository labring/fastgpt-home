---
title: Set Up Local FastGPT Plugin Remote Connections
slug: /en/deploy/fastgpt-plugin-remote-debug-connection
page_type: Deployment and upgrades
source: https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite
source_type: Official documentation
---

# Set Up Local FastGPT Plugin Remote Connections

## Overview
This remote debug workflow supports FastGPT self-hosted plugin development, allowing developers to connect their local plugin environments to a live FastGPT instance. This removes the requirement to package and deploy plugins before initial testing, accelerating the development validation cycle. After a successful connection, the local FastGPT CLI tool sends plugin metadata through the FastGPT Gateway, making the local plugin visible within the FastGPT platform for hands-on testing.

## Step-by-Step Connection Workflow
Follow these exact steps to establish a remote debug connection:
1.  Access the plugin debug entry within your FastGPT instance, enable the debug channel, and copy the automatically generated connection URL.
2.  Open a terminal window, navigate to the local directory containing your FastGPT plugin code, then run the following command. Replace `<connectionUrl>` with the full URL you copied in the first step:
    ```bash
    fastgpt-plugin dev --connect '<connectionUrl>'
    ```
Upon successful connection, the local CLI will complete metadata syncing via the FastGPT Gateway, making your local plugin available in the FastGPT platform.

## Debug Source Format
All connected local plugins are displayed in FastGPT under a dedicated debug source with a standardized, fixed format:
```text
debug:tmbId:{tmbId}
```
This debug source is tied to the FastGPT instance used to generate the initial connection URL, ensuring the local plugin is only accessible within the correct workspace context within FastGPT.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/self-host/config/remote-debug-suite)

## Applicability and version scope

Use this page for the documented Deployment and upgrades scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
