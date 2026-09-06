---
title: Configure and Upgrade FastGPT ReRank Models
slug: /en/deploy/fastgpt-rerank-model-upgrade-config
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/47
source_type: 官方文档
---

# Configure and Upgrade FastGPT ReRank Models

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## v4.7 ReRank Model Format Updates
FastGPT version 4.7 revised the ReRank model integration format to be compatible with Cohere's API structure, allowing direct use of hosted Cohere ReRank models without custom adapter code. For users running local ReRank models, an updated container image is required to maintain compatibility with this new format. A key note: Cohere's ReRank models may exhibit differing performance with Chinese text when compared to BGE-based local models.

## Cohere ReRank Model Integration Steps
To integrate a Cohere ReRank model with your FastGPT 4.7+ deployment, follow these exact steps:
1.  Request a Cohere API key via the official dashboard at https://dashboard.cohere.com/api-keys.
2.  Update your FastGPT configuration file with the following JSON configuration block. All fields follow the official FastGPT specifications:
```json
{
  "reRankModels": [
    {
      "model": "rerank-multilingual-v2.0",
      "name": "Rerank",
      "requestUrl": "https://api.cohere.ai/v1/rerank",
      "requestAuth": "Your Cohere API key"
    }
  ]
}
```
Replace `Your Cohere API key` with the actual API key obtained in step 1. The `model` field must exactly match a valid Cohere ReRank model identifier, and the `name` field can be any custom display name for the model in your FastGPT interface.

## Local ReRank Model Image Update
For users deploying a local ReRank model with FastGPT 4.7+, update your container image to the official FastGPT-provided image to ensure compatibility with the revised integration format:
`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/47)
