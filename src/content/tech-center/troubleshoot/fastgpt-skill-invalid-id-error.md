---
title: FastGPT skill模块invalidSkillId错误码说明
slug: /zh/troubleshoot/fastgpt-skill-invalid-id-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块invalidSkillId错误码说明

## 这个错误是什么
该错误属于FastGPT skill模块的标准错误码，枚举名为invalidSkillId，对应返回的statusText为invalidSkillId，国际化文案键为common:code_error.skill_error.invalid_skill_id，用于标记与技能ID相关的校验不通过情况。

## 什么情况下会触发
当发起的操作涉及的技能ID无法被系统正常识别，或该技能ID未在系统中创建、不符合预设的格式规则时，会触发该错误。

## 怎么定位
1. 查看接口返回的错误信息，确认statusText字段的值为invalidSkillId；2. 提取当前请求中携带的技能ID参数；3. 核对该技能ID是否存在于系统已创建的技能列表中，或检查参数格式是否符合系统要求的规范。

## 处理与验证
处理该错误需先修正请求中的技能ID为系统内已存在的有效ID，或调整参数格式至符合系统要求，随后重新发起对应操作。验证时可重新发起修正后的请求，若接口不再返回该错误，且操作流程正常完成，则验证该问题已解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
