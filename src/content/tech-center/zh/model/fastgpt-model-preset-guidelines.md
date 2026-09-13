---
title: FastGPT模型预设的配置规则与维护注意事项
slug: /zh/model/fastgpt-model-preset-guidelines
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/model-presets
source_type: 官方文档
---

# FastGPT模型预设的配置规则与维护注意事项

## 模型配置的合规依据
新增或修改模型前，需以官方模型文档、官方模型列表API或官方价格/模型页为判断依据。不宜仅根据搜索结果、第三方博客或聚合站判断模型是否存在。此类官方渠道的信息可确保模型的有效性与合规性，避免因非官方渠道的内容导致配置出现偏差。

## 模型维护的通用规则
维护模型预设时，需严格遵守以下通用规则。模型预设支持llm、embedding、rerank、tts、stt五类模型，需按模型真实能力选择对应类型，并补齐该类型schema要求的字段。不得仅因存在稳定版名称就删除preview、experimental或dated模型，仅当官方明确废弃、下线或不再推荐时，方可移除对应模型。针对OpenRouter、Ollama、HuggingFace、Other这类开放目录，需避免删除本地占位或用户可能自定义的模型。需保持文件内原有排序风格，通常将更新或能力更强的模型放在列表前方。

## 模型配置的操作要点
在配置模型预设时，需先按模型真实能力选择对应类型，该类型包含llm、embedding、rerank、tts、stt五类。选择完成后，需补齐该类型schema要求的字段。以下为支持的模型类型列表：
| 模型类型编码 | 模型类型全称 |
| --- | --- |
| llm | 大语言模型 |
| embedding | 向量嵌入模型 |
| rerank | 重排序模型 |
| tts | 文本转语音模型 |
| stt | 语音转文本模型 |
所有配置需遵循维护规则中的各项要求，确保模型预设的合理性与稳定性。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/model-presets)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
