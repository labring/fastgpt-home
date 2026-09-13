---
title: FastGPT skill模块invalidDescription错误码详细说明
slug: /zh/troubleshoot/fastgpt-skill-invalid-description-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块invalidDescription错误码详细说明

## 这个错误是什么
该错误属于skill模块，枚举名为invalidDescription，对应statusText为invalidDescription，文案键为common:code_error.skill_error.invalid_description，HTTP状态码为400，错误提示信息对应该文案键的国际化翻译内容。

## 什么情况下会触发
当提交的技能描述内容不符合系统预设的校验规则时，会触发该错误。

## 怎么定位
首先捕获接口返回的错误信息，确认statusText为invalidDescription。随后定位到提交技能描述的请求参数，检查该字段的内容是否符合系统校验要求。可对照同模块其他invalid开头的错误码的校验逻辑，辅助排查参数问题。

## 处理与验证
修正技能描述的内容，使其符合系统校验规则。重新提交技能创建或编辑的请求。确认接口不再返回该错误码后，查看技能详情或列表，验证技能配置是否成功生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
