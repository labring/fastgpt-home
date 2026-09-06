---
title: FastGPT skill模块unAuthSkill错误码说明与处理指南
slug: /zh/troubleshoot/fastgpt-skill-unauth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块unAuthSkill错误码说明与处理指南

## 这个错误是什么
该错误属于FastGPT skill模块的权限类错误，枚举名为SkillErrEnum.unAuthSkill，对应statusText为unAuthSkill，国际化文案键为common:code_error.skill_error.un_auth_skill，用于标识操作未获得对应技能授权的场景。

## 什么情况下会触发
当执行与技能相关的操作时，若当前操作主体未被授予对应技能的访问或操作权限，将触发该错误。例如尝试访问、编辑不属于当前账号权限范围内的技能资源。

## 怎么定位
1. 从报错信息中提取statusText与枚举名，确认为SkillErrEnum.unAuthSkill；
2. 核对当前操作关联的技能资源，确认该技能的归属与授权配置；
3. 检查当前操作主体的权限列表，确认是否包含对应技能的操作权限。

## 处理与验证
首先为当前操作主体补充对应技能的访问或操作权限，调整权限配置至符合操作需求。随后重新执行原操作，验证报错是否消失，确认技能相关操作可正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
