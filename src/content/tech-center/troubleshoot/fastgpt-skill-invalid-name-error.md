---
title: FastGPT skill模块invalidSkillName错误码详细说明
slug: /zh/troubleshoot/fastgpt-skill-invalid-name-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块invalidSkillName错误码详细说明

## 这个错误是什么
该错误是FastGPT skill模块下的参数校验类错误，用于标识技能名称不符合系统预设校验要求的场景。其枚举名为invalidSkillName，对应statusText为invalidSkillName，关联的国际化文案键为common:code_error.skill_error.invalid_name，标准HTTP响应状态码为400。

## 什么情况下会触发
在创建新技能或更新已有技能的基本信息时，若提交的技能名称参数无法通过系统的命名校验，就会触发该错误。

## 怎么定位（可照做的步骤）
1. 查看接口返回的原始响应数据，提取statusText字段，确认其值为invalidSkillName；2. 调出本次请求的参数列表，检查其中的技能名称字段内容；3. 查看接口返回的message字段，获取由系统返回的具体校验失败提示，该提示对应国际化文案键common:code_error.skill_error.invalid_name。

## 处理与验证
处理环节需调整技能名称内容，使其符合系统的命名校验规则。验证环节可重新发起创建或更新技能的请求，确认接口不再返回该错误，且请求成功完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
