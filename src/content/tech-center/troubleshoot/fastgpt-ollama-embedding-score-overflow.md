---
title: 解决FastGPT使用Ollama嵌入模型得分超出0-1范围的问题
slug: /zh/troubleshoot/fastgpt-ollama-embedding-score-overflow
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1163
source_type: GitHub issue
---

# 解决FastGPT使用Ollama嵌入模型得分超出0-1范围的问题

## 现象
使用FastGPT搭配Ollama的nomic-embed-text:v1.5嵌入模型执行语义检索时，检索结果的相似度得分超出0至1的正常范围，部分得分高于1，无法按照0-1的分数区间进行结果过滤。

## 可能原因
当前无明确已知关联原因，需结合实际部署环境与配置参数确认排查方向。

## 排查步骤
1. 确认FastGPT版本为v4.7私有部署版本，嵌入模型为nomic-embed-text:v1.5。
2. 核对Ollama部署的嵌入模型运行状态，确认服务正常可用。
3. 检查语义检索的分数过滤配置，确认区间设置为0至1。
4. 查看检索结果的原始返回数据，确认得分异常是否来自模型输出。

## 解决与验证
目前无明确已知的标准化解决方法，需结合排查步骤定位的具体异常点进行针对性处理。验证方式为重新执行语义检索，确认相似度得分回归至0至1的正常区间，且可按照该区间完成结果过滤。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1163)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
