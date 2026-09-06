---
title: Update FastGPT LLM and Vector Model Configurations
slug: /en/deploy/fastgpt-model-config-updates
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4816
source_type: 官方文档
---

# Update FastGPT LLM and Vector Model Configurations

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Legacy Configuration Deprecation
The legacy `config.json` setup guide for FastGPT is no longer actively maintained. All self-hosted deployments must update their LLMModel and VectorModel configurations to include a new required field for model categorization. For full details on the current standard model configuration format, refer to the official FastGPT model configuration documentation.

## Mandatory New Configuration Field
All LLMModel and VectorModel entries must include the `provider` string field. This field is used to categorize the model within the FastGPT system. No existing configuration fields require removal, but all model entries must have this field properly defined to function correctly with updated platform code.

## Example Valid Configuration
Below is a complete, updated LLM model configuration entry including the new `provider` field:
```json
{
  "provider": "OpenAI", // This is new
  "model": "gpt-4o",
  "name": "gpt-4o",
  "maxContext": 125000,
  "maxResponse": 4000,
  "quoteMaxToken": 120000,
  "maxTemperature": 1.2,
  "charsPointsPrice": 0,
  "censor": false,
  "vision": true,
  "datasetProcess": true,
  "usedInClassify": true,
  "usedInExtractFields": true,
  "usedInToolCall": true,
  "usedInQueryExtension": true,
  "toolChoice": true,
  "functionCall": false,
  "customCQPrompt": "",
  "customExtractPrompt": "",
  "defaultSystemChatPrompt": "",
  "defaultConfig": {},
  "fieldMap": {}
}
```

## Post-Update Validation
After editing your `config.json` or admin model configurations, complete these validation steps:
1. Confirm every LLMModel and VectorModel entry includes the `provider` field with a valid string value
2. Verify the modified JSON file has no syntax errors, such as trailing commas or mismatched brackets
3. Restart your FastGPT services to apply the new configuration changes

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4816)
