---
title: 解决FastGPT知识库搜索模型默认选中不符合预期问题
slug: /zh/troubleshoot/fastgpt-knowledge-search-model-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1792
source_type: GitHub issue
---

# 解决FastGPT知识库搜索模型默认选中不符合预期问题

## 现象
用户在FastGPT v4.8.2版本中，创建知识库时选择了文件处理模型，但在该知识库的搜索页面，默认选中的模型为config.json配置文件中的第一个模型。

## 可能原因
当前未明确具体触发逻辑，需按实际部署环境确认。

## 排查步骤
1. 登录FastGPT部署环境，找到并打开config.json配置文件，确认其中配置的模型顺序及第一个模型的具体标识。
2. 进入目标知识库的创建编辑页面，确认创建时选择的文件处理模型的名称、标识等详细信息。
3. 进入该知识库的搜索交互页面，查看默认选中的模型选项，对比与config.json中第一个模型是否一致。

## 解决与验证
当前未提供明确的官方修复方案，需结合实际排查出的逻辑问题进行对应调整。验证时，可在知识库搜索页面手动选择创建时配置的文件处理模型，保存设置后刷新页面，确认后续搜索是否默认选中该模型。同时可对比config.json中的模型配置顺序，确认是否与默认选中逻辑存在关联。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1792)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
