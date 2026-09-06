---
title: 解决FastGPT添加模型后默认模型识别不到的问题
slug: /zh/troubleshoot/fastgpt-added-model-detected
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3827
source_type: GitHub issue
---

# 解决FastGPT添加模型后默认模型识别不到的问题

## 现象
已添加chat与index类型模型，但平台默认模型列表中无法识别到已添加的模型，当前使用FastGPT版本为4.8.21-fix。

## 可能原因
暂无明确已知原因，需结合实际部署环境与配置细节确认，可能涉及配置同步、缓存状态、模型生效范围等相关环节。

## 排查步骤
1. 核对已添加的chat和index model的配置信息，确认参数填写无误。
2. 检查平台缓存状态，尝试执行刷新或重启相关服务的操作。
3. 确认已添加模型的生效范围是否匹配当前使用的默认场景。
4. 确认当前使用的FastGPT版本为4.8.21-fix，排查版本兼容性问题。

## 解决与验证
根据排查结果修正对应问题：若配置有误则重新填写正确参数；若缓存未刷新则执行刷新或重启操作；若生效范围未覆盖则调整模型的可用范围。验证时重新查看默认模型列表，确认已添加的chat和index model已正常显示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3827)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
