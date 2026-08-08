---
title: 讲解FastGPT插件系统中模型预设的新增与配置方法
slug: /zh/tutorial/fastgpt-plugin-model-presets
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/plugin/model-presets
source_type: 官方文档
---

# 讲解FastGPT插件系统中模型预设的新增与配置方法

## 模型预设基础说明
模型预设维护在fastgpt-plugin仓库，用于向FastGPT提供内置模型供应商、模型列表、模型能力和默认参数。FastGPT读取这些静态预设后，用户才能在模型配置、AIProxy渠道和相关插件能力中选择对应模型。本文基于1.0版本以上的插件系统代码结构，旧版modules/model/*路径已不再作为主要维护入口。核心静态数据目录为`packages/infrastructure/src/static-data/models/`，其中包含注册所有供应商的`index.ts`、维护供应商显示名与AIProxy渠道的`model.ts`、定义配置schema的`type.ts`，按供应商分类的`provider/`目录，以及AIProxy渠道头像目录`channel-avatar/`。

## 给已有供应商新增模型的操作步骤
1. 确认供应商已注册：若仅为已有供应商新增模型，无需修改`packages/infrastructure/src/static-data/models/index.ts`，只需确保供应商已被引入`staticModelProviderConfigs`数组。
2. 修改供应商模型列表：进入对应供应商目录，例如`packages/infrastructure/src/static-data/models/provider/OpenAI/index.ts`，在`list`数组中新增模型。优先复制同供应商、同类型、同模型家族的相近项，再根据官方文档调整字段。以下是五类模型的最小配置示例：
```typescript
import { ModelTypeEnum, type ProviderConfigType } from '../../type';
const ttsVoices = [{ label: '默认音色', value: 'default' }];
const models: ProviderConfigType = {
  provider: 'ExampleProvider',
  list: [
    { type: ModelTypeEnum.llm, model: 'example-chat', maxContext: 128000, maxTokens: 16384, quoteMaxToken: 120000, maxTemperature: 1, responseFormatList: ['text', 'json_schema'], vision: true, reasoning: false, toolChoice: true },
    { type: ModelTypeEnum.embedding, model: 'example-embedding', defaultToken: 512, maxToken: 8192, normalization: true },
    { type: ModelTypeEnum.rerank, model: 'example-rerank', maxToken: 8192 },
    { type: ModelTypeEnum.tts, model: 'example-tts', voices: ttsVoices },
    { type: ModelTypeEnum.stt, model: 'example-stt' }
  ]
};
export default models;
```
新增时需遵循常用字段规则，例如`type`需从`ModelTypeEnum`的可选值`llm`、`embedding`、`rerank`、`tts`、`stt`中选择，`maxContext`为LLM最大上下文长度，`maxTokens`为LLM最大输出长度等。

## 模型预设维护注意事项
新增或修改模型前，需以官方模型文档、官方模型列表API或官方价格/模型页为依据，勿仅依赖第三方搜索结果或聚合站内容。需遵守以下规则：支持llm、embedding、rerank、tts、stt五类模型，按模型真实能力选择对应类型并补齐该类型schema要求的字段；仅当官方明确废弃、下线或不再推荐时，才可移除模型；开放目录类供应商需保留本地占位或用户自定义的模型；保持文件内原有排序风格，通常将更新或能力更强的模型放在前面。

> 来源：https://doc.fastgpt.cn/zh-CN/plugin/model-presets
