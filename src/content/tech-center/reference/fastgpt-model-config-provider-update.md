---
title: FastGPT 配置文件中模型配置新增provider字段的更新指南
slug: /zh/reference/fastgpt-model-config-provider-update
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/4816
source_type: 官方文档小节
---

# FastGPT 配置文件中模型配置新增provider字段的更新指南

## 结论
本次FastGPT更新需为LLMModel与VectorModel的配置新增provider字段，用于模型分类。旧版config.json配置说明已不再维护，需参考官方最新模型配置方案完成更新。

## 具体怎么做
1. 打开目标配置文件，即config.json或admin后台的模型配置项
2. 为每个LLMModel、VectorModel配置添加`provider`字段，字段值为对应模型服务商名称
3. 参考以下标准配置格式完成其余参数配置：
```json
{
  "provider": "OpenAI",
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

## 注意事项
1. 仅需为LLMModel与VectorModel配置添加provider字段，其他配置项无需额外调整
2. 旧版config.json配置说明已不再维护，请勿继续使用
3. 必须使用官方最新的模型配置方案进行配置，不可沿用旧版格式

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/4816)
