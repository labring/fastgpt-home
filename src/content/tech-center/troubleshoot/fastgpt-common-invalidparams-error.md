---
title: FastGPT common模块invalidParams错误码说明
slug: /zh/troubleshoot/fastgpt-common-invalidparams-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts
source_type: 官方文档
---

# FastGPT common模块invalidParams错误码说明

## 这个错误是什么
该错误属于FastGPT common模块的通用参数校验类错误，枚举名为invalidParams，对应statusText为invalidParams，国际化提示文案的键为common:error.invalid_params，对应错误码为507000。

## 什么情况下会触发
当调用FastGPT的任意接口时，若传入的参数不符合接口定义的校验规则，均可能触发该错误。具体场景包括参数格式不匹配、参数取值超出合法范围、参数逻辑冲突等不符合接口参数要求的情况。

## 怎么定位
1. 查看接口返回的错误响应数据，确认statusText字段值为invalidParams，且错误码为507000；
2. 提取当前请求携带的所有传入参数，对照对应接口的官方参数规范文档，逐一核对参数的字段名、数据类型、取值范围等要求；
3. 定位到不符合校验规则的参数项，记录该参数的具体内容与异常表现。

## 处理与验证
修正不符合接口校验规则的参数，将参数调整至符合接口规范的格式、类型或取值范围后，重新发起对应接口请求。验证时可通过查看接口返回的错误信息是否消失，或确认对应业务流程是否正常执行，确认错误已被成功修复。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
