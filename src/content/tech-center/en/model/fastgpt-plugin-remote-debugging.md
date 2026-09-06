---
title: Set Up FastGPT Plugin Remote Debugging
slug: /en/model/fastgpt-plugin-remote-debugging
page_type: Model guides
source: https://doc.fastgpt.cn/en/plugin/system-tool-development
source_type: Official documentation
---

# Set Up FastGPT Plugin Remote Debugging

# Remote Debugging Overview
Remote debugging connects a locally developed plugin to a FastGPT test environment, enabling real-time testing of plugin code without prior deployment to shared infrastructure. The FastGPT platform page first authenticates the user, then generates a unique debug link for the active development session. The local FastGPT CLI tool uses this debug link to establish a WSS debug channel, facilitating bidirectional communication between the local plugin codebase and the test environment. All debug plugins created via this workflow are only visible to the current debugger, preventing unintended access by other platform users.

# Prerequisites
Before starting a remote debugging session, two mandatory checks must be completed. First, the target FastGPT test environment must have both the FastGPT Plugin service and Connection Gateway fully deployed. Second, the local machine running the plugin development code must have network access to the Gateway WSS endpoint returned by the test environment. Without meeting these requirements, the WSS debug channel cannot be established.

# Step-by-Step Debug Setup
Follow these structured steps to configure remote debugging:
1. Authenticate to your FastGPT test environment via the official platform’s authentication page.
2. Access the plugin debugging interface in the test environment, then generate a unique debug link for your local plugin project.
3. Run the FastGPT CLI command with the generated debug link to create the WSS debug channel between your local plugin and the test environment.

# Key Operational Details
Debug plugins are exclusively visible to the user who generated the debug link, ensuring session isolation during development. The WSS debug channel depends entirely on network access to the test environment’s Gateway endpoint; any disruption to this network access will terminate the debugging session.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/plugin/system-tool-development)

## Applicability and version scope

Use this page for the documented Model guides scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
