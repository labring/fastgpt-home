---
title: FastGPT openapi模块unExist错误码说明与处理
slug: /zh/troubleshoot/fastgpt-openapi-unexist-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/openapi.ts
source_type: 官方文档
---

# FastGPT openapi模块unExist错误码说明与处理

## 这个错误是什么
该错误是FastGPT openapi模块下的错误，枚举名为unExist，对应statusText为`openapiUnExist`，错误码为`506000`，错误消息对应文案键`common:code_error.openapi_error.api_key_not_exist`，用于标识调用openapi接口时出现的API密钥不存在问题。该错误通过openapi接口直接返回，属于模块内的基础错误类型之一。

## 什么情况下会触发
当调用FastGPT的openapi相关接口时，若传入的API密钥未在系统中完成配置，或已被删除、失效，将触发该错误。此时请求无法完成合法的身份校验，直接返回该错误，返回的statusText为`openapiUnExist`，错误消息为`common:code_error.openapi_error.api_key_not_exist`。

## 怎么定位
1. 核对调用接口时携带的API密钥参数内容，确认其是否与平台配置的密钥完全一致；
2. 登录FastGPT平台，进入openapi密钥管理页面，检查是否存在该密钥的有效配置记录；
3. 排查调用代码中的密钥字符串，确认无拼写错误、多余空格或格式偏差等问题，确保参数传递正确。

## 处理与验证
首先重新生成有效的API密钥，替换调用代码中的旧密钥。若平台中无该密钥的配置记录，则需先完成密钥的创建与配置。随后使用更新后的密钥重新发起openapi接口调用，若接口不再返回statusText为`openapiUnExist`、错误消息为`common:code_error.openapi_error.api_key_not_exist`的内容，则表示问题已解决。若仍出现该错误，需再次核对密钥配置与调用参数的一致性，确保所有环节的密钥信息匹配。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/openapi.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
