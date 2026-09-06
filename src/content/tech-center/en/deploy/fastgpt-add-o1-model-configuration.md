---
title: Add OpenAI o1 Models to FastGPT Configuration
slug: /en/deploy/fastgpt-add-o1-model-configuration
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4811
source_type: 官方文档
---

# Add OpenAI o1 Models to FastGPT Configuration

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Purpose of Configuration Update
This modification extends self-hosted FastGPT instances to support OpenAI’s o1-mini and o1-preview large language models. The predefined configuration settings are tailored to each model’s official specifications, ensuring compatibility with FastGPT’s core features including document processing, tool calling, and chat workflow automation. All configuration values are taken directly from the official FastGPT third-party model integration schema.

## Exact Configuration Parameter Values
The following table lists all required parameters and their respective values for each o1 model:
| Parameter | o1-mini Value | o1-preview Value |
|-----------|---------------|------------------|
| model | "o1-mini" | "o1-preview" |
| name | "o1-mini" | "o1-preview" |
| avatar | "/imgs/model/openai.svg" | "/imgs/model/openai.svg" |
| maxContext | 125000 | 125000 |
| maxResponse | 65000 | 32000 |
| quoteMaxToken | 120000 | 120000 |
| maxTemperature | 1.2 | 1.2 |
| charsPointsPrice | 0 | 0 |
| censor | false | false |
| vision | false | false |
| datasetProcess | true | true |
| usedInClassify | true | true |
| usedInExtractFields | true | true |
| usedInToolCall | true | true |
| toolChoice | false | false |
| functionCall | false | false |
| customCQPrompt | "" | "" |
| customExtractPrompt | "" | "" |
| defaultSystemChatPrompt | "" | "" |
| defaultConfig | {"temperature": 1} | {"temperature": 1} |

## Full Configuration Code Block
Insert the following JSON snippet into your existing FastGPT model configuration array:
```json
{
    "model": "o1-mini",
    "name": "o1-mini",
    "avatar": "/imgs/model/openai.svg",
    "maxContext": 125000,
    "maxResponse": 65000,
    "quoteMaxToken": 120000,
    "maxTemperature": 1.2,
    "charsPointsPrice": 0,
    "censor": false,
    "vision": false,
    "datasetProcess": true,
    "usedInClassify": true,
    "usedInExtractFields": true,
    "usedInToolCall": true,
    "toolChoice": false,
    "functionCall": false,
    "customCQPrompt": "",
    "customExtractPrompt": "",
    "defaultSystemChatPrompt": "",
    "defaultConfig": {
        "temperature": 1
    }
},
{
    "model": "o1-preview",
    "name": "o1-preview",
    "avatar": "/imgs/model/openai.svg",
    "maxContext": 125000,
    "maxResponse": 32000,
    "quoteMaxToken": 120000,
    "maxTemperature": 1.2,
    "charsPointsPrice": 0,
    "censor": false,
    "vision": false,
    "datasetProcess": true,
    "usedInClassify": true,
    "usedInExtractFields": true,
    "usedInToolCall": true,
    "toolChoice": false,
    "functionCall": false,
    "customCQPrompt": "",
    "customExtractPrompt": "",
    "defaultSystemChatPrompt": "",
    "defaultConfig": {
        "temperature": 1
    }
}
```

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/4811)
