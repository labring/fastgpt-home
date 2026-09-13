---
title: FastGPT技能skillNameTooLong错误码说明
slug: /zh/troubleshoot/fastgpt-skill-name-too-long-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT技能skillNameTooLong错误码说明

## 这个错误是什么
该错误属于FastGPT的skill模块，枚举名为skillNameTooLong，对应statusText为skillNameTooLong，国际化文案键为common:code_error.skill_error.skill_name_too_long，用于标识技能名称不符合长度要求的错误场景。

## 什么情况下会触发
当创建或编辑FastGPT技能时，提交的技能名称长度超出系统预设的最大允许长度时，会触发该错误。

## 怎么定位
1. 查看报错信息中的statusText字段，确认其值为skillNameTooLong，即可定位为该错误；
2. 核对提交的技能名称参数的实际字符数量，与系统要求的最大长度进行对比；
3. 检查接口请求的入参，确认技能名称字段的内容是否符合长度限制要求。

## 处理与验证
处理该错误时，将技能名称调整至系统允许的最大长度范围内，重新发起创建或编辑技能的请求。验证时，提交调整后的技能名称，确认接口返回成功，无该错误提示，技能可正常创建或更新。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
