---
title: FastGPT 4910 Version Feature Improvement Breakdown
slug: /en/deploy/fastgpt-4910-upgrade-improvements
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4910
source_type: 官方文档
---

# FastGPT 4910 Version Feature Improvement Breakdown

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This page details the targeted functional and usability improvements included in FastGPT version 4910 for self-hosted deployments.

## Core LLM and Workflow Optimizations
Two key reliability and functionality updates have been made to core platform workflows and LLM interactions. First, the default timeout for LLM stream calls has been increased, reducing premature termination of streaming responses during long-running requests. Second, the context truncation algorithm has been optimized to guarantee that at least one Human message is retained during truncation, preventing the loss of critical initial user input context. For workflow dataset citations, a new limit rule has been implemented: if a workflow contains no related AI nodes, the interaction mode automatically switches to manual input only, with a maximum citation limit of 10 million.

## Dataset Management Enhancements
Dataset management tools have received targeted updates to improve backup and migration workflows. The Dataset's "Table Collection" feature has been officially renamed to "Backup Import". Additionally, support has been added for exporting and importing Dataset indexes, allowing users to easily back up and migrate dataset configurations between FastGPT deployments.

## UI and Mobile Experience Refinements
User interface and mobile interaction quality have been improved across the platform. Various confirmation dialog UI updates have been implemented to reduce user confusion and clarify action outcomes. For mobile voice input functionality, the detection logic has been refined to accurately identify physical phone devices, rather than only flagging small screen sizes, preventing unintended voice input activation on non-phone small-screen devices.

## Quick Reference Improvement Table
| Feature Area                | Change Summary                                                                 |
|------------------------------|--------------------------------------------------------------------------------|
| LLM Stream Calls             | Increased default timeout                                                      |
| Confirmation Dialogs         | Various UI improvements                                                        |
| Dataset Management          | Renamed "Table Collection" to "Backup Import"; added export/import of Dataset indexes |
| Workflow Citations           | No AI nodes → manual input only, 10 million limit                                |
| Mobile Voice Input           | Accurately detects physical phones (not just small screens)                     |
| Context Truncation Algorithm | Preserves at least one Human message during truncation                          |

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4910)
