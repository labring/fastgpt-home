---
title: FastGPT 模型配置字段对照表（v4.17.2）
slug: /zh/reference/model-config-fields-v4172
page_type: 基准数据页
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档与开源仓库源码（v4.17.2）
description: FastGPT v4.17.2 官方模型配置说明中五类模型的配置文件字段，逐个对照源码 schema.ts：字段在顶层、config 内还是未定义，以及源码定义了而文档示例未列出的字段。
language: zh
check_day: 2026-10-19
meta_description: FastGPT v4.17.2 官方模型配置说明中五类模型的配置文件字段，逐个对照源码 schema.ts：字段在顶层、config 内还是未定义，以及源码定义了而文档示例未列出的字段。
date_modified: 2026-10-26
---

# FastGPT 模型配置字段对照表（v4.17.2）

本页把 FastGPT v4.17.2 官方「模型配置说明」里语言模型、索引模型、重排模型、语音合成模型、语音识别模型五类字段示例（合计 50 个字段），逐个对照同一版本源码 `packages/global/core/ai/model/schema.ts` 中的定义。

## 先看结论

| 类型 | 文档示例字段 | 源码在顶层 | 源码在 `config` 内 | schema.ts 未定义 | 源码有、示例未列出 |
| --- | --- | --- | --- | --- | --- |
| 语言模型 | 19 | 5 | 11 | 3 | 15 |
| 索引模型 | 8 | 5 | 2 | 1 | 16 |
| 重排模型 | 8 | 7 | 0 | 1 | 8 |
| 语音合成模型 | 8 | 6 | 1 | 1 | 7 |
| 语音识别模型 | 7 | 6 | 0 | 1 | 7 |

在新版源码里，公共字段（模型 ID、别名、提供商、是否启用、请求地址、价格等）放在顶层，各类模型不同的能力与默认参数放在 `config` 对象里；文档示例仍把这些字段平铺在 `metadata` 一层。配置文件导入时是否兼容平铺写法，文档与 schema.ts 都没有写明，需按部署环境实测。

## 语言模型（`llm`）

| 字段 | 文档说明 | 源码位置 |
| --- | --- | --- |
| `isCustom` | 是否为自定义模型 | schema.ts 未定义 |
| `isActive` | 是否启用 | 顶层 |
| `provider` | 模型提供商，主要用于分类展示，目前已经内置提供商包括：（v4.17.2 中为 packages/global/core/ai/model/provider.ts）, 可 pr 提供新的提供商，或直接填写 Other | 顶层 |
| `model` | 模型ID(对应OneAPI中渠道的模型名) | 顶层 |
| `name` | 模型别名 | 顶层 |
| `maxContext` | 最大上下文 | `config` 内 |
| `maxResponse` | 最大回复 | `config` 内 |
| `quoteMaxToken` | 最大引用内容 | `config` 内 |
| `maxTemperature` | 最大温度 | `config` 内 |
| `charsPointsPrice` | n积分/1k token（商业版） | 顶层 |
| `censor` | 是否开启敏感校验（商业版） | `config` 内 |
| `vision` | 是否支持图片输入 | `config` 内 |
| `toolChoice` | 是否支持工具选择（分类，内容提取，工具调用会用到。） | `config` 内 |
| `functionCall` | 是否支持函数调用（分类，内容提取，工具调用会用到。会优先使用 toolChoice，如果为false，则使用 functionCall，如果仍为 false，则使用提示词模式） | `config` 内 |
| `customCQPrompt` | 自定义文本分类提示词（不支持工具和函数调用的模型 | schema.ts 未定义 |
| `customExtractPrompt` | 自定义内容提取提示词 | schema.ts 未定义 |
| `defaultSystemChatPrompt` | 对话默认携带的系统提示词 | `config` 内 |
| `defaultConfig` | 请求API时，挟带一些默认配置（比如 GLM4 的 top_p） | `config` 内 |
| `fieldMap` | 字段映射（o1 模型需要把 max_tokens 映射为 max_completion_tokens） | `config` 内 |

源码定义了、文档示例未列出的字段（15 个）：

| 字段 | 源码位置 | 类型 | 是否必填 |
| --- | --- | --- | --- |
| `showTopP` | `config` 内 | boolean | 可选 |
| `responseFormatList` | `config` 内 | array | 可选 |
| `showStopSign` | `config` 内 | boolean | 可选 |
| `audio` | `config` 内 | boolean | 可选 |
| `video` | `config` 内 | boolean | 可选 |
| `reasoning` | `config` 内 | boolean | 可选 |
| `reasoningEffort` | `config` 内 | boolean | 可选 |
| `priceTiers` | 顶层 | array | 可选 |
| `inputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `outputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `scope` | 顶层 | 固定值 | 有默认值 |
| `requestUrl` | 顶层 | string | 可选 |
| `requestAuth` | 顶层 | string | 可选 |
| `testMode` | 顶层 | boolean | 可选 |
| `type` | 顶层 | 固定值 | 必填 |

## 索引模型（`embedding`）

| 字段 | 文档说明 | 源码位置 |
| --- | --- | --- |
| `isCustom` | 是否为自定义模型 | schema.ts 未定义 |
| `isActive` | 是否启用 | 顶层 |
| `provider` | 模型提供商 | 顶层 |
| `model` | 模型ID | 顶层 |
| `name` | 模型别名 | 顶层 |
| `charsPointsPrice` | n积分/1k token | 顶层 |
| `defaultToken` | 默认文本分割时候的 token | `config` 内 |
| `maxToken` | 最大 token | `config` 内 |

源码定义了、文档示例未列出的字段（16 个）：

| 字段 | 源码位置 | 类型 | 是否必填 |
| --- | --- | --- | --- |
| `weight` | `config` 内 | number | 有默认值 |
| `hidden` | `config` 内 | boolean | 可选 |
| `vision` | `config` 内 | boolean | 可选 |
| `normalization` | `config` 内 | boolean | 可选 |
| `batchSize` | `config` 内 | number | 可选 |
| `defaultConfig` | `config` 内 | object | 可选 |
| `dbConfig` | `config` 内 | object | 可选 |
| `queryConfig` | `config` 内 | object | 可选 |
| `priceTiers` | 顶层 | array | 可选 |
| `inputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `outputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `scope` | 顶层 | 固定值 | 有默认值 |
| `requestUrl` | 顶层 | string | 可选 |
| `requestAuth` | 顶层 | string | 可选 |
| `testMode` | 顶层 | boolean | 可选 |
| `type` | 顶层 | 固定值 | 必填 |

## 重排模型（`rerank`）

| 字段 | 文档说明 | 源码位置 |
| --- | --- | --- |
| `isCustom` | 是否为自定义模型 | schema.ts 未定义 |
| `isActive` | 是否启用 | 顶层 |
| `provider` | 模型提供商 | 顶层 |
| `model` | 模型ID | 顶层 |
| `name` | 模型别名 | 顶层 |
| `requestUrl` | 自定义请求地址 | 顶层 |
| `requestAuth` | 自定义请求认证 | 顶层 |
| `type` | 模型类型 | 顶层 |

源码定义了、文档示例未列出的字段（8 个）：

| 字段 | 源码位置 | 类型 | 是否必填 |
| --- | --- | --- | --- |
| `maxToken` | `config` 内 | number | 可选 |
| `defaultConfig` | `config` 内 | object | 可选 |
| `charsPointsPrice` | 顶层 | number | 可选 |
| `priceTiers` | 顶层 | array | 可选 |
| `inputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `outputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `scope` | 顶层 | 固定值 | 有默认值 |
| `testMode` | 顶层 | boolean | 可选 |

## 语音合成模型（`tts`）

| 字段 | 文档说明 | 源码位置 |
| --- | --- | --- |
| `isActive` | 是否启用 | 顶层 |
| `isCustom` | 是否为自定义模型 | schema.ts 未定义 |
| `type` | 模型类型 | 顶层 |
| `provider` | 模型提供商 | 顶层 |
| `model` | 模型ID | 顶层 |
| `name` | 模型别名 | 顶层 |
| `voices` | — | `config` 内 |
| `charsPointsPrice` | n积分/1k token | 顶层 |

源码定义了、文档示例未列出的字段（7 个）：

| 字段 | 源码位置 | 类型 | 是否必填 |
| --- | --- | --- | --- |
| `priceTiers` | 顶层 | array | 可选 |
| `inputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `outputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `scope` | 顶层 | 固定值 | 有默认值 |
| `requestUrl` | 顶层 | string | 可选 |
| `requestAuth` | 顶层 | string | 可选 |
| `testMode` | 顶层 | boolean | 可选 |

## 语音识别模型（`stt`）

| 字段 | 文档说明 | 源码位置 |
| --- | --- | --- |
| `isActive` | 是否启用 | 顶层 |
| `isCustom` | 是否为自定义模型 | schema.ts 未定义 |
| `provider` | 模型提供商 | 顶层 |
| `model` | 模型ID | 顶层 |
| `name` | 模型别名 | 顶层 |
| `charsPointsPrice` | n积分/1k token | 顶层 |
| `type` | 模型类型 | 顶层 |

源码定义了、文档示例未列出的字段（7 个）：

| 字段 | 源码位置 | 类型 | 是否必填 |
| --- | --- | --- | --- |
| `priceTiers` | 顶层 | array | 可选 |
| `inputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `outputPrice` | 顶层 | number | 可选（源码标注已弃用） |
| `scope` | 顶层 | 固定值 | 有默认值 |
| `requestUrl` | 顶层 | string | 可选 |
| `requestAuth` | 顶层 | string | 可选 |
| `testMode` | 顶层 | boolean | 可选 |

## 怎么读这张表

1. 「文档说明」一列照录官方文档示例里的行尾注释，未改写。
2. 「源码位置」按 schema.ts 判断：顶层字段来自 `PriceTypeSchema` 与各类模型共用的基础定义，`config` 内字段来自各类模型自己的配置定义。
3. 「schema.ts 未定义」只说明这个文件里没有这个字段，不代表系统其他地方不读取它。
4. 「是否必填」按 schema.ts 中有无 optional、nullish 或默认值判断。

## 这张表的适用范围

字段清单取自 FastGPT v4.17.2 官方模型配置说明与同版本 schema.ts。通过页面表单配置模型时，页面会按模型类型显示对应选项；私有化部署若做过二次开发，以实际部署为准。

## 参考资料

- [模型配置说明](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- [schema.ts（v4.17.2）](https://github.com/labring/FastGPT/blob/v4.17.2/packages/global/core/ai/model/schema.ts)
