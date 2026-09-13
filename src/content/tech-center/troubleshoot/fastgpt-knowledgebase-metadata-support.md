---
title: 解决FastGPT知识库元数据无法界面查看和引用的问题
slug: /zh/troubleshoot/fastgpt-knowledgebase-metadata-support
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3825
source_type: GitHub issue
---

# 解决FastGPT知识库元数据无法界面查看和引用的问题

## 现象
在使用FastGPT搭建AI客服场景时，需让AI返回参考文件的元数据信息，如分类、下载地址等，以提升回复可信度。当前仅能通过API创建知识库集合时配置Metadata字段，但无法通过界面查看已配置的元数据，且工作流中无法引用知识库的元数据返回结果。为临时实现需求，需在分片中冗余元数据信息，导致维护难度增加，且元数据类型不止一类，进一步提升维护成本。
## 可能原因
需按实际环境确认。
## 排查步骤
1. 确认是否通过API接口创建或更新知识库集合，并配置Metadata字段参数。
2. 登录FastGPT知识库管理界面，查找元数据相关的查看或配置入口。
3. 配置工作流调用知识库，检查返回结果中是否包含Metadata字段的内容。
## 解决与验证
目前可通过API创建或更新知识库集合时，传入Metadata字段完成配置。需等待对应界面功能上线，以实现元数据的界面查看与设置。在工作流中可按Metadata字段名引用返回的元数据内容，验证时可查看AI回复是否包含配置的元数据信息，确认需求是否满足。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3825)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
