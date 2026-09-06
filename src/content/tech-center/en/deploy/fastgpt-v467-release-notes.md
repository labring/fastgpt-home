---
title: FastGPT v4.6.7 Release Feature and Fix Notes
slug: /en/deploy/fastgpt-v467-release-notes
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/467
source_type: 官方文档
---

# FastGPT v4.6.7 Release Feature and Fix Notes

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## FastGPT v4.6.7 Release Overview
This document covers all official changes included in the FastGPT 4.6.7 self-hosted release, tailored for technical engineers and decisionmakers responsible for deploying or maintaining FastGPT instances. All details below are sourced directly from the official v4.6.7 release notes.

## Key Feature Additions and Optimizations
This release includes several targeted improvements to core FastGPT functionality:
1.  **Dataset Interface Overhaul**: A fully redesigned dataset management UI with an updated import workflow to simplify dataset configuration.
2.  **Indexing Performance Improvements**: Optimized indexing logic for both dataset documents and chat conversation data to streamline retrieval and response processing.
3.  **Dataset Management OpenAPI**: Added official programmatic access to manage datasets via API; full endpoint specifications, authentication requirements, and usage examples are available in the [Dataset OpenAPI documentation](../../../openapi/dataset.en.mdx).
4.  **Input Variable Hints**: New in-app suggestion functionality displays available variables immediately after typing the `{` character in supported input fields. Per community feedback on advanced orchestration workflows, a future February release will expand variable support to include node-scoped local variables and additional global variables.
5.  **Persistent Team Selection**: Updated team switching behavior to save your selected team, ensuring automatic login to the chosen team on subsequent site visits.

## Step-by-Step: Using Input Variable Hints
To utilize the new variable suggestion feature:
1.  Navigate to any input field configured to support workflow variables within your FastGPT instance.
2.  Type the opening brace character `{` to trigger the built-in variable suggestion menu.
3.  Browse or search the displayed list of available variables, then select the desired entry to auto-insert it into the input field.

## Resolved Bug Fixes
This release addresses two critical reported issues:
1.  Fixed chatId conflict errors that occurred when initiating or managing conversations via the FastGPT API.
2.  Resolved potential `window.onLoad` event conflicts that arose when embedding FastGPT within an external iframe.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/467)
