---
title: 解决FastGPT知识库QA对向量相似度匹配度偏低问题
slug: /zh/troubleshoot/fastgpt-knowledge-base-qa-matching
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2917
source_type: GitHub issue
---

# 解决FastGPT知识库QA对向量相似度匹配度偏低问题

## 现象
在FastGPT 4.8.2私有部署版本中，同时上传QA对类型CSV和文本类型文件作为知识库时，检索QA对中已有的问题，其向量相似度匹配度偏低。

## 可能原因
QA对形式的数据集会将Q和A内容共同作为检索内容，而检索时往往仅输入问题内容，导致匹配度降低。

## 排查步骤
1. 确认知识库同时包含QA对类型与文本类型的上传文件
2. 验证检索时仅输入QA对的问题内容
3. 观察向量相似度匹配度是否符合预期偏低的情况

## 解决与验证
目前可通过单独添加问题为自定义索引解决该问题，但操作较为繁琐。需按实际环境确认是否存在可调整检索内容范围的配置项。验证时，可单独输入QA对的问题，观察向量相似度匹配度是否恢复正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2917)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
