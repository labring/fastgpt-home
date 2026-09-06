---
title: 解决FastGPT无法兼容Ollama模型reasoning字段的问题
slug: /zh/troubleshoot/fastgpt-ollama-reasoning-compatibility
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/5990
source_type: GitHub issue
---

# 解决FastGPT无法兼容Ollama模型reasoning字段的问题

## 现象
本地使用Ollama部署qwen3:30b模型后，手动调用ollama的chat API，返回的JSON格式数据中，思考内容对应的字段名为"reasoning"。FastGPT在解析该思考字段时，仅识别"reasoning_content"字段，无法读取到Ollama返回的思考内容，导致模型生成的思考过程无法正常展示。

## 可能原因
FastGPT的代码逻辑中，解析第三方模型返回的思考内容时，仅预设了"reasoning_content"作为有效提取字段，未兼容"reasoning"字段格式，导致无法正确提取Ollama部署模型返回的思考内容。

## 排查步骤
1. 确认使用Ollama部署的目标模型，调用其chat API后，返回的JSON数据中思考内容字段为"reasoning"。
2. 查阅FastGPT的代码，确认处理模型返回结果的逻辑中，仅读取"reasoning_content"字段作为思考内容。
3. 对比模型API返回格式与FastGPT的字段解析规则，确认二者字段不匹配。

## 解决与验证
解决方法为修改FastGPT的字段解析逻辑，同时兼容"reasoning"和"reasoning_content"两个字段。具体修改可参考公开的代码调整示例。验证步骤为：
1. 按照调整后的代码更新FastGPT的解析逻辑。
2. 重新调用Ollama部署的模型接口，确认FastGPT可正确读取并展示"reasoning"字段中的思考内容。
3. 确认模型的思考内容可正常显示在FastGPT的交互界面中。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/5990)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
