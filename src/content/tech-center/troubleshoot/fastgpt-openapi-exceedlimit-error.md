---
title: FastGPT openapi exceedLimit错误说明处理
slug: /zh/troubleshoot/fastgpt-openapi-exceedlimit-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/openapi.ts
source_type: 官方文档
---

# FastGPT openapi exceedLimit错误说明处理

## 这个错误是什么
该错误属于FastGPT openapi模块的预定义错误，枚举名为exceedLimit，对应statusText为openapiExceedLimit，错误码为506002。触发该错误时，接口会返回包含message字段的错误信息，其文案键为common:code_error.openapi_error.exceed_limit，该文案用于描述调用超出限额的具体情况。

## 什么情况下会触发
当调用FastGPT的openapi接口时，若实际调用行为达到了平台预设的调用限额，就会触发该错误。该限额由平台根据配置或套餐设定，涵盖调用次数、数据用量等维度，具体限额规则需参考平台对应文档。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为openapiExceedLimit；2. 核对当前使用的openapi接口的调用限额配置，确认平台设定的限额标准；3. 统计近期的openapi接口调用次数或用量，确认是否已达到预设限额；4. 查看接口返回的message字段内容，匹配common:code_error.openapi_error.exceed_limit对应的文案，进一步确认错误类型。

## 处理与验证
首先调整openapi接口的调用频率，降低单位时间内的调用次数或用量，确保调用行为符合平台限额要求。调整完成后，重新调用目标openapi接口，验证接口不再返回该错误，确认错误码506002不再出现。若调整后仍触发该错误，可进一步核对平台的限额配置是否正确，或联系对应支持渠道确认限额情况。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/openapi.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
