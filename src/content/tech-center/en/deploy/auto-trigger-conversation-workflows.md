---
title: Set Up Auto-Trigger Conversation Workflows for Proactive Guidance
slug: /en/deploy/auto-trigger-conversation-workflows
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4814
source_type: 官方文档
---

# Set Up Auto-Trigger Conversation Workflows for Proactive Guidance

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Feature Overview
This auto-trigger workflow feature allows configuration of a chat workflow that runs exactly once when a user loads a conversation session. Standard chat workflows initiate only after a user sends a message, but this trigger activates automatically as soon as the user accesses the conversation. This functionality is specifically suited for CRM systems, where teams can proactively deliver guidance to users without waiting for them to initiate an interaction, reducing user friction and delivering more consistent support.

## Configuration Interface Reference
The official configuration interface for this feature is documented via two reference screenshots, presented in the table below:

| Screenshot 1: Initial Setup | Screenshot 2: Final Configuration |
|------------------------------|------------------------------------|
| ![Auto-trigger setup initial](../../../../public/imgs/image-8.png) | ![Auto-trigger setup final](../../../../public/imgs/image-9.png) |

These screenshots display the core workflow for enabling and customizing the auto-trigger behavior for conversation loads.

## Key Behavioral Specifications
Per the feature definition, the auto-trigger workflow will execute exactly one time per individual conversation load event. It will not re-trigger during the same active chat session, preventing repeated redundant prompts for users. The trigger activates prior to any user-submitted messages, ensuring proactive guidance is delivered as soon as the conversation loads, aligning with the intended CRM use case.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4814)
