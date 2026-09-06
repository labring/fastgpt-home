---
title: FastGPT 494 New Feature Details
slug: /en/deploy/fastgpt-494-new-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/494
source_type: 官方文档
---

# FastGPT 494 New Feature Details

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This document details all new feature additions included in FastGPT 494, for engineering teams and technical decision-makers managing self-hosted FastGPT deployments.

## Core Infrastructure Improvements
FastGPT 494 upgrades backend infrastructure to enhance deployment reliability and performance:
- **BullMQ Message Queue**: Implements a new message queue system to manage asynchronous tasks such as dataset indexing and sync operations, improving task tracking and failure recovery.
- **Partial Redis Data Caching**: Introduces targeted caching of frequently accessed partial dataset entries via Redis, reducing unnecessary repeated data retrieval and lowering backend load for high-traffic deployments.

## Sync and Notification Tooling
This release adds critical tools for dataset management and outbound alerts:
- **Collection Indexing Status Display**: Adds a real-time status dashboard for dataset indexing operations, showing current state of each collection's indexing process for administrators.
- **SMTP Email Sending Plugin**: Integrates a native SMTP email sending plugin, allowing deployments to configure and send automated email notifications through standard SMTP services.
- **Enhanced Site Sync**: Expands site synchronization functionality to support two key new capabilities: configurable indexing parameters for synced collections, and incremental sync mode that only transfers modified or new dataset entries instead of full reindexing.

### Configurable Site Sync Parameters
| Parameter Category | Supported Capabilities |
|---------------------|------------------------|
| Indexing Configuration | Adjusts core indexing behavior for synced datasets |
| Incremental Sync | Enables selective sync of only updated/deleted collection entries |

## Chat API and User Interface Updates
This release includes targeted improvements to chat interactions and mobile usability:
- **Enhanced Chat Response Data**: AI chat and tool call responses now include the model's `finish_reason` field. This field provides explicit details about why a model output was interrupted, allowing teams to debug and track unexpected chat terminations more effectively.
- **Mobile Voice Input UI Adjustments**: Refines the user interface for mobile voice input functionality, optimizing layout and touch targets for improved usability on smartphone and tablet devices.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/494)
