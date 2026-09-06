---
title: FastGPT dataset模块sameApiCollection错误码说明
slug: /zh/troubleshoot/fastgpt-dataset-sameapicollection-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts
source_type: 官方文档
---

# FastGPT dataset模块sameApiCollection错误码说明

## 这个错误是什么
该错误为FastGPT dataset模块下的sameApiCollection错误码，枚举名为sameApiCollection，对应状态文本为sameApiCollection，国际化文案标识为common:core.dataset.error.sameApiCollection，用于标识API集合相关的重复错误场景。

## 什么情况下会触发
该错误会在FastGPT dataset模块处理API集合相关业务时触发，当执行的操作涉及已存在的API集合配置或重复调用API集合时触发。

## 怎么定位（可照做的步骤）
1. 查看报错返回的statusText字段，确认其值为sameApiCollection；
2. 通过国际化文案键common:core.dataset.error.sameApiCollection获取对应的错误提示文本，确认错误类型；
3. 检查当前操作的API集合是否已在系统中存在。

## 处理与验证
处理时需排查并删除或修改已存在的重复API集合配置，随后重新执行原本触发错误的业务操作。验证时需确认报错不再出现，且业务操作正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/dataset.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
