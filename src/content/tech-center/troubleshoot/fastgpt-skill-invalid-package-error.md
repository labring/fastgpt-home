---
title: FastGPT skill模块invalidSkillPackage错误码详细说明
slug: /zh/troubleshoot/fastgpt-skill-invalid-package-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块invalidSkillPackage错误码详细说明

## 这个错误是什么
该错误属于FastGPT skill模块，枚举名为invalidSkillPackage，statusText为invalidSkillPackage，对应国际化文案标识为common:code_error.skill_error.invalid_package。该错误用于标识与技能包相关的合法性校验失败场景，是skill模块下的标准化错误类型之一。

## 什么情况下会触发
当操作涉及的技能包无法通过系统的合法性校验时，会触发该错误。常见关联场景包括技能包格式不符合要求、内部结构存在非法内容，或未满足系统对技能包的基础规范要求。

## 怎么定位
1. 查看接口返回的statusText字段，确认其值为invalidSkillPackage；
2. 核对当前操作关联的技能包文件，检查其格式、内部组成是否符合系统预设规范；
3. 确认技能包未超出系统允许的大小或内容限制；
4. 匹配错误信息中的国际化文案标识common:code_error.skill_error.invalid_package，进一步确认错误类型。

## 处理与验证
先修正技能包的格式、内部结构至符合系统要求，再重新执行相关操作。操作完成后，检查接口返回结果中无该错误码，且技能包可正常加载、导入或使用，即可验证处理结果是否生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
