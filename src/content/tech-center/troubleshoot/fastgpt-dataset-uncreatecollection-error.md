---
title: FastGPT dataset模块unCreateCollection错误码说明
slug: /zh/troubleshoot/fastgpt-dataset-uncreatecollection-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块unCreateCollection错误码说明

## 这个错误是什么
该错误属于FastGPT的dataset模块，枚举名为unCreateCollection，对应的statusText为unCreateCollection，错误提示文案通过i18nT工具加载common:core.dataset.error.unCreateCollection对应的国际化内容，属于dataset模块下的501000系列错误码。

## 什么情况下会触发
该错误触发于尝试创建数据集集合的操作过程中，当系统无法完成集合创建的完整流程时，会抛出此错误。仅在dataset模块的集合创建逻辑出现异常时触发。

## 怎么定位
首先查看错误返回的statusText字段，确认其值为unCreateCollection。其次查看错误信息中的文案内容，匹配common:core.dataset.error.unCreateCollection对应的国际化提示。同时可通过系统日志定位触发错误的具体业务操作节点，排查关联的数据集配置信息。

## 处理与验证
首先核对创建数据集集合的相关参数，确保参数符合系统预设要求。其次检查关联的模型、存储等依赖服务的运行状态。完成排查后重新执行集合创建操作，验证错误是否不再出现。若错误持续出现，可进一步查看系统详细日志获取更多异常信息。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
