---
title: FastGPT outLink模块linkUnInvalid错误码说明
slug: /zh/troubleshoot/fastgpt-outlink-invalid-link-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts
source_type: 官方文档
---

# FastGPT outLink模块linkUnInvalid错误码说明

## 这个错误是什么
该错误属于FastGPT outLink模块的错误枚举，枚举名为linkUnInvalid，对应状态文本为linkUnInvalid，关联的文案键为common:code_error.outlink_error.invalid_link。根据代码定义，该错误的错误码为501，触发时会返回该错误码与对应提示信息。

## 什么情况下会触发
该错误在outLink模块处理外部链接相关操作时触发，当目标链接本身不符合系统的有效链接判定规则时，会触发该错误。

## 怎么定位（可照做的步骤）
1. 查看错误返回的statusText字段，确认其值为linkUnInvalid，以此确认属于该模块的该错误；
2. 提取错误返回的关联信息，定位触发错误的目标外部链接；
3. 核对该链接的格式、可访问性，确认是否符合系统要求的链接规则。

## 处理与验证
1. 修正目标外部链接，确保其格式符合要求且可正常访问；
2. 重新执行触发该错误的操作，查看错误是否不再出现；
3. 确认相关操作流程正常完成，验证错误已被解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
