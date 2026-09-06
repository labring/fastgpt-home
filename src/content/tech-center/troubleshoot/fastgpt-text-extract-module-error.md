---
title: 解决FastGPT高级编排文本内容提取模块异常问题
slug: /zh/troubleshoot/fastgpt-text-extract-module-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1794
source_type: GitHub issue
---

# 解决FastGPT高级编排文本内容提取模块异常问题

## 现象
本地部署FastGPT并使用chatglm3-6b大模型时，高级编排中的文本内容提取模块无法提取内容。单独测试该大模型，可正常实现内容提取能力。

## 可能原因
未明确具体技术根因，可能涉及大模型调用配置、高级编排模块参数设置、FastGPT与模型的适配环节异常，具体需结合实际部署环境确认。

## 排查步骤（有序列表，每步可照做）
1. 检查FastGPT本地部署的大模型调用配置，确认链路状态正常。
2. 核对高级编排内文本内容提取模块的输入参数、提示词等配置项。
3. 单独运行chatglm3-6b模型的内容提取功能，验证模型本身功能正常。
4. 查看FastGPT运行日志，提取模块调用过程中的异常信息。

## 解决与验证
根据排查结果调整对应配置，修正异常环节。调整完成后，在高级编排中重新测试文本内容提取模块，确认内容提取功能正常生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1794)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
