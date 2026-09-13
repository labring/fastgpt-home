---
title: 解决FastGPT手工录入知识库搜索测试null属性读取报错
slug: /zh/troubleshoot/fastgpt-manual-knowledgebase-test-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/940
source_type: GitHub issue
---

# 解决FastGPT手工录入知识库搜索测试null属性读取报错

## 现象
在私有部署版本的FastGPT系统中，执行知识库搜索测试操作时触发报错。具体触发流程为：新建手工录入类型的知识库，录入一条问答对，问题为"你是谁"、回答为"我是XXX"，随后在该知识库的搜索测试模块中输入"你是谁"并点击测试按钮，页面弹出报错Cannot read properties of null (reading '_id')，无法正常完成搜索测试流程。

## 可能原因
当前仅明确该报错的触发场景为新建手工录入知识库并执行搜索测试操作，具体的底层原因未在当前反馈中提及，需结合实际部署环境、代码日志等信息进一步确认。

## 排查步骤
1. 确认当前使用的FastGPT部署类型为私有部署版本。
2. 按照复现流程操作：新建手工录入类型的知识库，录入一条问答对，例如设置问题为"你是谁"，对应回答为"我是XXX"。
3. 进入该知识库的搜索测试页面，输入与知识库内问题完全一致的关键词"你是谁"，点击测试按钮触发报错。
4. 完整记录报错文本Cannot read properties of null (reading '_id')，便于后续排查。

## 解决与验证
当前未在反馈中提供明确的修复方案，需基于实际排查得到的根本原因进行针对性修复。修复完成后，重复上述复现步骤，若不再弹出Cannot read properties of null (reading '_id')报错，且可正常完成知识库搜索测试流程，则验证修复生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/940)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
