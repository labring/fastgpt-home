---
title: FastGPT skill模块invalidArchiveFormat错误码说明
slug: /zh/troubleshoot/fastgpt-skill-invalid-archive-format-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块invalidArchiveFormat错误码说明

## 这个错误是什么
该错误属于FastGPT skill模块的ErrType枚举体系下的错误项，枚举名为invalidArchiveFormat，对应statusText为invalidArchiveFormat，关联的国际化文案键为common:code_error.skill_error.invalid_archive_format，用于标准化归档格式不符合要求的错误反馈。

## 什么情况下会触发
当处理技能相关的归档文件时，若该归档文件的格式不符合系统预设规范，将触发此错误。该错误属于skill模块的归档异常错误组，同组错误还包括invalidSkillPackage、archiveEmpty、archiveExtractionFailed、archiveTooLarge等，均用于标识技能相关归档操作中的各类异常问题。

## 怎么定位
1.  确认报错返回的statusText字段为invalidArchiveFormat；
2.  检查当前操作关联的归档文件格式，确认是否符合系统支持的规范；
3.  核对归档文件的文件后缀与内部结构是否匹配系统要求；
4.  可参考同模块的其他归档类错误信息，辅助缩小排查范围，定位具体异常点。

## 处理与验证
1.  更换为系统支持的归档格式重新提交相关操作；
2.  修正归档文件的内部结构或命名后缀后重试；
3.  验证操作是否成功完成，确认该错误不再触发；
4.  若仍存在异常，可结合同模块的其他归档类错误提示进一步排查问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
