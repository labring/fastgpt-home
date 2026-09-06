---
title: FastGPT outLink模块unAuthLink错误码的说明与处理
slug: /zh/troubleshoot/fastgpt-outlink-unauth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts
source_type: 官方文档
---

# FastGPT outLink模块unAuthLink错误码的说明与处理

## 这个错误是什么
该错误为FastGPT outLink模块下的unAuthLink错误，对应statusText为unAuthLink，错误码为505001，错误提示文案对应国际化键common:code_error.outlink_error.invalid_link，用于标识外部链接相关的授权校验失败问题。

## 什么情况下会触发
当尝试操作FastGPT的外部链接相关功能时，若该外部链接未通过授权验证，或访问者未满足该链接的授权要求，将触发此错误。

## 怎么定位
1. 提取报错返回的statusText与错误码，确认statusText为unAuthLink，错误码为505001；
2. 查看当前操作关联的外部链接的配置信息，核对授权相关设置；
3. 对照国际化文案键common:code_error.outlink_error.invalid_link，确认错误提示的具体内容；
4. 查阅outLink模块的错误定义代码，核实该错误的关联逻辑。

## 处理与验证
1. 调整外部链接的授权配置，确保访问者符合预设的授权要求；
2. 重新执行触发错误的操作，检查错误是否不再出现；
3. 验证外部链接的访问权限是否正常生效；
4. 确认功能恢复正常后，完成处理流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/outLink.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
