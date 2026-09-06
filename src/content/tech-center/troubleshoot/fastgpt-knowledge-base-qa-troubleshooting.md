---
title: FastGPT知识库导入多列表格与图片后的问答排错
slug: /zh/troubleshoot/fastgpt-knowledge-base-qa-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1906
source_type: GitHub issue
---

# FastGPT知识库导入多列表格与图片后的问答排错

## 现象
导入含多列表格的Word或PDF文件至FastGPT知识库后，AI无法针对该知识库内的表格信息进行回复。导入含图片的Word或PDF文件至知识库后，AI能否回复图片相关内容未明确。

## 可能原因
未查询到公开的官方明确原因说明，需按实际部署环境与文件解析流程确认。

## 排查步骤
1. 确认待导入文件格式为Word或PDF，且文件内包含多列表格或图片元素。
2. 确认知识库已成功完成文件解析，可通过知识库文件列表查看文件解析状态。
3. 发起与文件内表格或图片内容相关的问答查询，观察AI的回复结果。

## 解决与验证
目前暂无公开的官方解决方案，相关后续升级计划需以项目官方公告为准。验证方式为重新导入符合格式要求的文件，完成解析后发起相关问答测试，观察AI是否能正确关联文件内的表格或图片信息。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1906)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
