---
title: 为FastGPT已有供应商新增、修改模型配置列表的操作方法
slug: /zh/tutorial/fastgpt-add-edit-model-list
page_type: 教程/部署
source: https://doc.fastgpt.cn/plugin/model-presets
source_type: 官方文档小节
---

# 为FastGPT已有供应商新增、修改模型配置列表的操作方法

FastGPT支持通过修改已有供应商的配置文件，自定义扩展或调整该供应商支持的模型列表，满足个性化的模型接入需求。

## 配置步骤与字段说明
首先执行以下操作步骤：
1. 进入对应供应商的配置目录，例如`packages/infrastructure/src/static-data/models/provider/OpenAI/index.ts`。
2. 在文件导出的`list`数组中新增模型条目，优先复制同供应商、同类型、同模型家族中最接近的现有条目，再根据官方文档调整对应字段。

以下是五类模型的配置示例：
```typescript
import { ModelTypeEnum, type ProviderConfigType } from '../../type';
const ttsVoices = [
  {
    label: '默认音色',
    value: 'default'
  }
];
const models : ProviderConfigType = {
  provider: 'ExampleProvider',
  list: [
    {
      type: ModelTypeEnum.llm,
      model: 'example-chat',
      maxContext: 128000,
      maxTokens: 16384,
      quoteMaxToken: 120000,
      maxTemperature: 1,
      responseFormatList: [ 'text', 'json_schema' ],
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
    },
    {
      type: ModelTypeEnum.rerank,
      model: 'example-rerank',
      maxToken: 8192
    },
    {
      type: ModelTypeEnum.tts,
      model: 'example-tts',
      voices: ttsVoices
    },
    {
      type: ModelTypeEnum.stt,
      model: 'example-stt'
    }
  ]
};
export default models;
```

常用配置字段说明如下：
| 字段 | 说明 |
| --- | --- |
| `type` | 模型类型，来自`ModelTypeEnum`，可选`llm`、`embedding`、`rerank`、`tts`、`stt` |
| `model` | 真实请求时使用的模型ID |
| `name` | 可选显示名，不填时默认使用`model`的值 |
| `maxContext` | LLM最大上下文长度 |
| `maxTokens` | LLM最大输出长度 |
| `quoteMaxToken` | FastGPT引用知识库内容时可使用的最大token |
| `maxTemperature` | 最大温度；不支持温度时填`null` |
| `responseFormatList` | 支持的返回格式，如`text`、`json_object`、`json_schema` |
| `vision` | 是否支持视觉输入 |
| `reasoning` | 是否为推理模型 |
| `reasoningEffort` | 是否支持推理强度配置 |
| `toolChoice` | 是否支持工具调用选择 |
| `fieldMap` | 字段名映射，用于适配非标准OpenAI兼容接口 |
| `defaultConfig` | 请求默认参数，会随模型请求一起发送 |
| `defaultToken` | Embedding默认分段token数 |
| `maxToken` | Embedding/Rerank最大输入token数 |
| `normalization` | Embedding是否做归一化处理 |
| `voices` | TTS可选音色列表 |

## 自动补充规则
在生成`staticModelList`时，系统会自动补充部分配置字段：`provider`取自当前供应商配置的`provider`值；`name`未显式填写时，默认使用`model`的值。同时会为LLM模型默认配置知识库处理、分类、内容提取、工具调用和评测等能力开关。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/model-presets)
