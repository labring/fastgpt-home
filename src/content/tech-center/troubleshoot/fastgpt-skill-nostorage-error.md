---
title: FastGPT skill模块noStorage错误码的详细说明
slug: /zh/troubleshoot/fastgpt-skill-nostorage-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块noStorage错误码的详细说明

## 这个错误是什么
该错误为FastGPT skill模块的错误枚举项，枚举名与statusText均为noStorage，对应国际化文案标识为common:code_error.skill_error.no_storage，用于提示该模块流程中的存储相关异常。

## 什么情况下会触发
该错误在skill模块执行涉及存储资源调用的操作时触发，具体触发场景需结合对应业务流程确认。

## 怎么定位（可照做的步骤）
定位该错误时，可通过查看系统返回的错误信息，确认枚举名为noStorage、状态文本为noStorage的错误项，结合对应业务流程排查存储相关配置。

## 处理与验证
处理该错误时，需先检查skill模块相关操作所需的存储资源配置是否完整，确认存储权限与连通性正常后，重新执行对应操作。验证时可查看操作是否正常完成，无该错误信息返回。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
