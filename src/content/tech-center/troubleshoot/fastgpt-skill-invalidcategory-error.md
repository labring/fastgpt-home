---
title: FastGPT skill invalidCategory错误码说明
slug: /zh/troubleshoot/fastgpt-skill-invalidcategory-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill invalidCategory错误码说明

## 这个错误是什么
该错误属于FastGPT skill模块的错误码体系，枚举名为invalidCategory，对应返回的statusText为invalidCategory，关联的国际化文案键为common:code_error.skill_error.invalid_category，HTTP状态码为400。该错误是skill模块定义的错误码之一，同模块还包含unExist、unAuthSkill、invalidSkillName等其他错误码，用于覆盖不同的技能操作异常场景。

## 什么情况下会触发
当涉及技能分类的操作传入不符合系统校验规则的参数时，会触发该错误。此类操作可能包含技能的创建、配置调整、分类关联等场景，具体触发条件由系统的分类参数校验逻辑决定。

## 怎么定位
1. 查看接口返回的错误信息，确认statusText字段值为invalidCategory；
2. 提取当前请求中携带的分类相关参数，例如分类标识、分类名称等；
3. 核对该参数是否符合系统预设的格式、范围等校验约束，排查参数缺失、格式错误或超出限制等问题。

## 处理与验证
1. 修正分类相关参数，使其符合系统的校验规则，例如补全缺失参数、调整格式至合规范围等；
2. 重新发起对应的技能操作请求，确保请求参数正确无误；
3. 确认接口返回结果正常，无该错误提示，且目标操作顺利完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
