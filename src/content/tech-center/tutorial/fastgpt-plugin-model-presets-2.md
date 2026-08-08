---
title: 为FastGPT插件系统新增与维护模型预设的操作说明
slug: /zh/tutorial/fastgpt-plugin-model-presets-2
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/plugin/model-presets
source_type: 官方文档
---

# 为FastGPT插件系统新增与维护模型预设的操作说明

FastGPT 插件系统的模型预设维护于 fastgpt-plugin 仓库，用于提供内置模型供应商、模型列表、模型能力与默认参数，是用户在模型配置、AIProxy 渠道及相关插件能力中选择对应模型的基础。本文适配 1.0 版本以上的插件系统代码结构，旧版 `modules/model/*` 路径已不再作为主要维护入口。相关静态数据目录为 `packages/infrastructure/src/static-data/models/`，包含总注册文件 `index.ts`、供应商显示名与 AIProxy 渠道配置文件 `model.ts`、类型定义文件 `type.ts`，以及按供应商分类的模型配置目录 `provider/` 和 AIProxy 渠道头像目录 `channel-avatar/`。

## 维护已有供应商的模型
若仅为已有供应商新增或修改模型，无需修改总注册文件。首先确认供应商已在 `packages/infrastructure/src/static-data/models/index.ts` 中被引入并加入 `staticModelProviderConfigs` 数组。随后进入对应供应商目录，例如 `packages/infrastructure/src/static-data/models/provider/OpenAI/index.ts`，在 `list` 数组中添加模型，优先复制同供应商、同类型、同模型家族中最接近的条目，再根据官方文档调整字段。示例配置如下：
```typescript
import { ModelTypeEnum, type ProviderConfigType } from '../../type';
const ttsVoices = [{ label: '默认音色', value: 'default' }];
const models: ProviderConfigType = {
  provider: 'ExampleProvider',
  list: [
    {
      type: ModelTypeEnum.llm,
      model: 'example-chat',
      maxContext: 128000,
      maxTokens: 16384,
      quoteMaxToken: 120000,
      maxTemperature: 1,
      responseFormatList: ['text', 'json_schema'],
      vision: true,
      reasoning: false,
      reasoningEffort: false,
      toolChoice: true
    },
    {
      type: ModelTypeEnum.embedding,
      model: 'example-embedding',
      defaultToken: 512,
      maxToken: 8192,
      normalization: true
    }
  ]
};
export default models;
```
常用配置字段包括：`type`（模型类型，可选 `llm`、`embedding`、`rerank`、`tts`、`stt`）、`model`（请求时的模型ID）、`maxContext`（LLM最大上下文长度）、`maxTokens`（LLM最大输出长度）等。维护时需遵守以下规则：仅以官方模型文档、官方模型列表API或官方价格/模型页为依据判断模型是否存在，勿依赖第三方搜索结果或博客；勿仅因存在稳定版名称就删除preview、experimental或dated版本模型，仅在官方明确废弃时移除；对开放目录类供应商，勿删除本地占位或用户可自定义的模型；保持文件内原有排序风格，通常将更新或能力更强的模型放在前列。

## 新增全新模型供应商
仅当需要接入全新的模型供应商时，才需新增供应商目录。需在 `packages/infrastructure/src/static-data/models/provider/` 下创建以供应商标识命名的目录，目录内需包含模型配置文件 `index.ts` 和供应商Logo文件 `logo.svg`。随后在总注册文件 `index.ts` 中引入该供应商配置，并将其加入 `staticModelProviderConfigs` 数组，完成注册。

> 来源：https://doc.fastgpt.cn/zh-CN/plugin/model-presets
