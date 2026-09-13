---
title: FastGPT技能模块archiveEmpty错误码的具体排查与处理说明
slug: /zh/troubleshoot/fastgpt-skill-archive-empty-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT技能模块archiveEmpty错误码的具体排查与处理说明

## 这个错误是什么
该错误属于FastGPT skill模块的错误枚举项，枚举名为archiveEmpty，对应statusText为archiveEmpty，国际化文案键为common:code_error.skill_error.archive_empty，归属agentSkill: 509000系列错误，用于标识技能相关归档文件的空内容错误。

## 什么情况下会触发
该错误会在处理技能导入、上传归档包等相关操作时触发，当系统检测到归档文件无有效内容时抛出。该错误属于skill模块的归档相关错误之一，同模块的归档类错误还包括invalidArchiveFormat、archiveExtractionFailed、archiveTooLarge等。

## 怎么定位（可照做的步骤）
1. 提取报错信息中的statusText字段，确认其值为archiveEmpty，且归属skill模块；
2. 定位触发错误的操作场景，通常为技能导入或归档包上传环节；
3. 检查对应操作中使用的归档文件，确认文件未被清空且包含有效技能配置内容；
4. 可结合同模块的其他归档类错误提示，辅助排查归档文件的具体问题。

## 处理与验证
1. 替换为空的归档文件为包含有效内容的技能归档包，确保归档文件非空且格式符合要求；
2. 重新执行触发错误的操作，检查报错是否消除；
3. 确认技能模块的配置已正常加载，无其他关联错误；
4. 若仍出现报错，可进一步检查归档文件的解压、解析流程，避免出现内容丢失的情况。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
