---
title: FastGPT outLink模块unExist错误码详细说明
slug: /zh/troubleshoot/fastgpt-outlink-unexist-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts
source_type: 官方文档
---

# FastGPT outLink模块unExist错误码详细说明

## 这个错误是什么
该错误属于FastGPT outLink模块的错误枚举项unExist，对应状态文本为outlinkUnExist，错误提示的文案键为common:code_error.outlink_error.link_not_exist，默认分配的错误码为505000。该错误用于标识外部链接不存在的相关问题，是outLink模块下的错误类型之一。

## 什么情况下会触发
当系统接收到指向不存在的外部链接的请求时，会触发该错误。此时请求无法正常获取目标外部资源，系统会返回该错误以提示链接不存在的问题。

## 怎么定位（可照做的步骤）
1. 查看接口返回的statusText字段，确认其值为outlinkUnExist，以此确认该错误属于outLink模块的unExist错误。2. 提取请求中携带的外部链接地址，核对地址的拼写、格式是否符合系统要求。3. 手动访问该链接，确认链接是否已被删除、失效或无法正常访问。4. 查看接口返回的错误码，确认其值为505000或该枚举项对应的实际返回码，进一步验证错误类型。

## 处理与验证
处理该错误时，首先修正请求中的外部链接地址，替换为可用的有效链接地址。修正完成后，重新发起对应的请求，验证错误是否消失。验证环节可通过检查接口返回的statusText是否不再为outlinkUnExist，且请求对应的业务流程正常完成，以此确认问题已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
