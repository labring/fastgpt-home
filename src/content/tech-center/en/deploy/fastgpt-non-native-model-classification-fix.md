---
title: Fix Non-Native Model Question Classification Issues
slug: /en/deploy/fastgpt-non-native-model-classification-fix
page_type: 部署场景
source: https://doc.fastgpt.cn/en/self-host/troubleshooting/faq
source_type: 官方文档
---

# Fix Non-Native Model Question Classification Issues

## Identifying Error Signals
When deploying external models through FastGPT, users may experience failures in automated question classification and content extraction. Common error log entries indicating this issue include `JSON invalid` and `not support tool`. These specific error messages confirm that the target model does not natively support tool calling or function calling functionality, which is required for the default FastGPT processing workflow.

## Core Configuration Adjustments
To resolve the native tooling compatibility gap, two key configuration parameters must be modified. The following table outlines the required settings:
| Configuration Parameter | Required Value | Purpose |
|------------------------|----------------|---------|
| `toolChoice`           | `false`        | Disables explicit enforcement of tool calling for the model |
| `functionCall`         | `false`        | Disables explicit enforcement of function calling for the model |
After applying these settings, the FastGPT system will automatically revert to the default prompt-based processing mode. It is important to note that the built-in prompts included with FastGPT have only been tested for commercial model APIs. While question classification functionality will work for most standard use cases, content extraction performance may be limited with this default setup.

## Custom Prompt Optimization
If the model operates without error logs but still fails to deliver consistent question classification or content extraction results, the default built-in prompt may not be compatible with the specific model's response format. In this scenario, users can adjust the `customCQPrompt` field to implement a custom prompt tailored to the target model's capabilities. No additional core model configuration changes are required beyond this prompt modification to align the processing workflow with the model's native output patterns.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/troubleshooting/faq)
