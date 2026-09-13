---
title: FastGPT OpenAPI unAuth错误码说明与处理
slug: /zh/troubleshoot/fastgpt-openapi-unauth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/openapi.ts
source_type: 官方文档
---

# FastGPT OpenAPI unAuth错误码说明与处理

## 这个错误是什么
该错误属于FastGPT OpenAPI模块的认证类错误，枚举名为unAuth，对应statusText为openapiUnAuth，错误码为506001。错误信息包含code、statusText、message与data字段，其中message字段对应文案键common:code_error.openapi_error.un_auth。

## 什么情况下会触发
当调用FastGPT OpenAPI接口时，未提供有效的认证凭证，或提供的认证凭证无法通过系统校验时，会触发该错误。

## 怎么定位
1. 查看接口返回的statusText与code字段，确认为openapiUnAuth与506001；
2. 检查请求中携带的认证信息是否符合接口要求的格式；
3. 核对当前使用的认证凭证是否存在于系统的有效列表中；
4. 确认认证凭证的权限范围是否覆盖当前调用的接口类型。

## 处理与验证
1. 重新生成或获取符合要求的有效认证凭证；
2. 在请求中正确配置认证信息，确保格式与接口文档要求一致；
3. 重新发起接口调用，检查返回的错误码与提示信息是否恢复正常；
4. 验证调用结果是否符合业务预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/openapi.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
