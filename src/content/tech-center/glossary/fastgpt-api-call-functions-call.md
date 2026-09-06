---
title: FastGPT中API调用与工具调用问题的速查说明
slug: /zh/glossary/fastgpt-api-call-functions-call
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/152
source_type: 官方文档
---

# FastGPT中API调用与工具调用问题的速查说明

## 一句话定义
API调用（call）指FastGPT向外部模型服务发起的各类请求过程，工具调用（functions_call）是其中携带函数或工具配置参数的特定API调用类型。

## 在 FastGPT 里怎么用
API调用相关场景中，当请求被分段过多时，可能触发调用频率超限问题。工具调用相关场景中，官方文档说明支持OpenAI标准的functions_call功能，需将对应配置模型的toolChoice参数设置为true。外部使用FastGPT的API接口时，需遵循官方文档的配置规则以实现对应功能。

## 容易搞错的地方
部分用户在配置toolChoice为true后，会误认为接口会自动转发functions或tools参数，但实际外部使用场景下，FastGPT转发的API接口未实现该转发逻辑，且不会返回functions_call或tools_call内容。当触发API调用频率超限问题时，会出现`openai error: 生成向量错误`，具体报错信息包含`429 Too Many Requests`，提示超过当前OpenAI S0定价层级的调用速率限制，需等待1秒后重试或调整请求策略，当前未内置自动延迟重试或并发数限制机制。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/152)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
