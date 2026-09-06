---
title: Configure AI Models for FastGPT Chat Nodes
slug: /en/node/fastgpt-ai-model-config
page_type: 工作流节点
source: https://doc.fastgpt.cn/en/guide/build/workflow/nodes/ai_chat
source_type: 官方文档
---

# Configure AI Models for FastGPT Chat Nodes

## AI Model Configuration Overview
This document outlines the formal process to set up and adjust AI models for FastGPT workflow AI chat nodes. Correct configuration of these models is essential to ensure chat nodes operate with the intended large language models (LLMs) and tailored parameter settings aligned with workflow objectives.

## Base Available Model Setup
To establish the set of chat models available for use across FastGPT workflows, configure available models via the config.json file referenced at self-host/config/model/intro.en.mdx. This core configuration file controls which models are exposed as selectable options within all AI chat nodes. Prior to using a model in a workflow, administrators must first enable it by editing this config.json file, as documented in the linked introductory guide.

## Per-Model Parameter Tuning
After completing the base model availability setup, fine-tune individual model parameters to adjust chat behavior for specific workflow use cases. Follow these structured steps:
1. Open the FastGPT workflow editor and navigate to the target AI chat node configuration menu.
2. Locate and select the desired enabled AI model from the list of pre-configured models.
3. Click the selected model entry to open its dedicated parameter configuration panel.

Two reference screenshots are provided to assist with navigating this configuration interface: the first is available at /imgs/aichat02.png, and the second at /imgs/aichat2.png.

:::success[🍅]
For detailed descriptions of all available AI parameters, see: [AI Parameter Configuration](../../general/ai_settings.en.mdx)
:::

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/guide/build/workflow/nodes/ai_chat)
