---
title: FastGPT 4822 Upgrade New Technical Features
slug: /en/deploy/fastgpt-4822-upgrade-features
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4822
source_type: 官方文档
---

# FastGPT 4822 Upgrade New Technical Features

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

This document details the new functional additions included in the FastGPT 4822 self-hosted upgrade, for engineers and technical decision makers managing on-premises FastGPT instances.

## AI Chat Node Chain-of-Thought Parsing
This update introduces native support for parsing chain-of-thought reasoning in chat nodes. The system will automatically extract and render content wrapped in `<think></think>` XML tags as a dedicated thinking step, enabling visibility into a model's internal reasoning process for all compatible language models. This functionality must be manually enabled for each applicable chat node prior to use, allowing teams to toggle the feature based on their specific workflow needs.

## Chat API Logging Enhancements
This update optimizes chat log storage behavior for the FastGPT chat API. All chat conversations will now have their logs saved permanently, regardless of whether a `chatId` parameter is included in the API request. For requests that omit the `chatId` field, the system automatically generates a unique random identifier to associate and store the complete chat log. The following table outlines the official `chatId` parameter details:

| Parameter Name | Requirement | Functional Behavior |
|----------------|-------------|---------------------|
| `chatId`       | Optional    | Links chat logs to the provided custom identifier. If not provided, a random unique ID is generated for log storage. |

## New Model Provider Support
The 4822 upgrade adds official support for the PPIO model provider, expanding the range of third-party model hosting services that can be integrated with FastGPT deployments. Users can configure and connect PPIO-hosted language models through the standard FastGPT model setup workflow, with no additional custom code required.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4822)
