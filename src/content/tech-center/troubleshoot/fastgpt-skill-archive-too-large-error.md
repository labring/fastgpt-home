---
title: FastGPT skill模块archiveTooLarge错误码详细说明
slug: /zh/troubleshoot/fastgpt-skill-archive-too-large-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块archiveTooLarge错误码详细说明

## 这个错误是什么
该错误属于FastGPT skill模块的错误码，是用于标识技能相关归档文件体积超限的标准错误。其枚举名为SkillErrEnum.archiveTooLarge，statusText字段为archiveTooLarge，关联的多语言文案键为common:code_error.skill_error.archive_too_large，所在agentSkill模块的错误码起始编号为509000。

## 什么情况下会触发
该错误触发的核心场景为技能导入、上传或更新过程中，涉及的归档文件体积不符合系统预设的限制要求，此时系统会返回该错误以提示文件体积超限。

## 怎么定位
定位该错误的具体步骤如下：首先查看接口返回的statusText字段，确认其值为archiveTooLarge；其次提取当前操作关联的归档文件，核对其实际体积；最后结合skill模块的错误码定义，排查是否存在其他关联的归档操作异常。

## 处理与验证
处理该错误的核心方式为调整目标归档文件的体积，使其符合系统对技能归档文件的大小限制要求，随后重新执行技能导入、上传或更新操作。若操作完成后未再触发该错误，则验证流程通过。若仍出现相同报错，可进一步参考skill模块下其他归档相关错误码的排查逻辑，比如invalidArchiveFormat、archiveEmpty等错误的处理思路。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
