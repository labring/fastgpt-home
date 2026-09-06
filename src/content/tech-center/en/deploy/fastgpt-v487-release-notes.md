---
title: FastGPT V4.8.7 Release Change Details
slug: /en/deploy/fastgpt-v487-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/487
source_type: 官方文档
---

# FastGPT V4.8.7 Release Change Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This page outlines all official technical changes included in the FastGPT V4.8.7 release, for self-hosted deployments and technical decision-makers evaluating the update.

## New Functional Additions
Two key new features are introduced in this release:
- Plugin functionality expansion: Plugins now support standalone execution, public publishing across applications, and detailed log viewing for past plugin runs.
- Application search: A dedicated search tool for deployed FastGPT applications, enabling quick navigation between active and archived application instances.

## System Infrastructure Improvements
Three core system components were refined to enhance stability and compatibility:
1. The chat dialog interface code was fully refactored to improve runtime reliability and reduce common interaction errors.
2. The Dockerfile configuration was updated to upgrade bundled Node.js and pnpm versions, aligning with current supported dependency standards.
3. Vision mode functionality was fixed for local domain deployments, resolving issues where visual input features failed to load on internal network setups.

## Step-by-Step Plugin Feature Validation
To confirm the new plugin capabilities are active after deployment, follow these steps:
1. Log into the FastGPT admin dashboard and open the Plugins management page.
2. Select an existing configured plugin and choose the "Standalone Execution" option to run it outside of an attached application workflow.
3. Click the "Publish" button to make the plugin accessible to other applications in your deployment.
4. Navigate to the "Logs" tab for the plugin to review full execution history and error details for past runs.

## Resolved Bug Fixes
All reported bugs addressed in this release include:
1. Fixed an issue where global variables could not be modified while using the Simple Mode application builder.
2. Resolved a conflict where GPT-4o models could not simultaneously utilize tool calling and image input features during chat interactions.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/487)
