---
title: FastGPT plugin模块unAuth错误码的说明与处理方法
slug: /zh/troubleshoot/fastgpt-plugin-unauth-error-guide
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/plugin.ts
source_type: 官方文档
---

# FastGPT plugin模块unAuth错误码的说明与处理方法

## 这个错误是什么
该错误属于FastGPT plugin模块的未授权类错误，错误码为508001，对应statusText为pluginUnAuth，错误提示文本关联文案键common:code_error.plugin_error.un_auth。该错误遵循统一的错误响应格式，包含错误码、状态文本与提示信息。

## 什么情况下会触发
当尝试访问plugin模块下受权限控制的资源，或执行plugin模块相关的受限操作时，若未通过授权验证，将触发该错误。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为pluginUnAuth；2. 核对错误码是否为508001；3. 回溯当前操作关联的plugin资源，检查该资源的权限配置范围；4. 确认发起操作的主体是否被授予该plugin资源的访问权限。

## 处理与验证
1. 为当前操作主体补充或更新对应plugin资源的访问权限；2. 检查并修复请求中的认证信息，确保其有效且完整；3. 重新执行原操作，检查错误是否消失；4. 验证操作结果符合预期，确认权限验证流程正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/plugin.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
