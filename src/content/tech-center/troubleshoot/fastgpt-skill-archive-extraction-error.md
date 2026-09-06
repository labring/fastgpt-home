---
title: FastGPT skill模块归档提取失败错误码说明
slug: /zh/troubleshoot/fastgpt-skill-archive-extraction-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts
source_type: 官方文档
---

# FastGPT skill模块归档提取失败错误码说明

## 这个错误是什么
该错误属于FastGPT skill模块的错误码，枚举名为archiveExtractionFailed，对应statusText为archiveExtractionFailed，错误提示信息通过文案键common:code_error.skill_error.archive_extraction_failed进行国际化翻译生成。

## 什么情况下会触发
当执行涉及归档文件提取的相关操作时，若提取过程出现失败情况，将触发该错误。该错误属于skill模块下的归档处理相关错误，同模块下还存在invalidArchiveFormat、archiveTooLarge、archiveEmpty等相关归档校验类错误码。

## 怎么定位（可照做的步骤）
1. 查看接口返回的statusText字段，确认其值为archiveExtractionFailed；
2. 核对当前操作涉及的归档文件的格式、大小等参数；
3. 排查是否存在同模块下的其他归档相关错误，如invalidArchiveFormat、archiveTooLarge、archiveEmpty等；
4. 查看完整错误返回信息，匹配对应的文案键common:code_error.skill_error.archive_extraction_failed。

## 处理与验证
处理操作可参考同模块相关归档错误的校验逻辑：首先检查归档文件的格式是否符合要求，其次确认归档文件大小未超出限制，再确认归档文件内部内容不为空，最后重新处理或上传归档文件后重试。验证时重新执行触发错误的操作，确认错误不再出现且操作结果符合预期。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/skill.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
