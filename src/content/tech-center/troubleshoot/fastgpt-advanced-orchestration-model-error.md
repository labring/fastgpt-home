---
title: 解决FastGPT高级编排调用本地模型时提示gpt3.5无可用渠道问题
slug: /zh/troubleshoot/fastgpt-advanced-orchestration-model-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/896
source_type: GitHub issue
---

# 解决FastGPT高级编排调用本地模型时提示gpt3.5无可用渠道问题

## 现象
用户在FastGPT 4.6.8私有部署版本中，使用高级编排的问题分类功能，选择本地部署的chatglm3模型，调试预览AI对话后，报错“gpt-3.5无可用渠道”。非高级编排场景下该本地模型可正常使用。

## 可能原因
该问题的具体原因需结合实际部署配置排查，需按实际环境确认。

## 排查步骤
1. 确认FastGPT版本为4.6.8私有部署版本，验证本地chatglm3模型在非高级编排场景下可正常使用。
2. 进入高级编排的问题分类配置页面，检查模型选择项是否正确选中本地chatglm3模型。
3. 查看调试预览时的报错信息，确认提示内容为“gpt-3.5无可用渠道”。
4. 核对相关配置项，需按实际环境确认异常点。

## 解决与验证
1. 修正高级编排中的模型选择配置，确保正确关联本地chatglm3模型并保存。
2. 重新进入调试预览界面，输入对话信息，验证是否不再提示“gpt-3.5无可用渠道”。
3. 确认问题分类功能可正常调用本地chatglm3模型的接口。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/896)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
