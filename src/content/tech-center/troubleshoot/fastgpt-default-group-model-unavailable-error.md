---
title: 解决FastGPT知识库问答中default分组gpt-3.5-turbo无可用渠道报错
slug: /zh/troubleshoot/fastgpt-default-group-model-unavailable-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1256
source_type: GitHub issue
---

# 解决FastGPT知识库问答中default分组gpt-3.5-turbo无可用渠道报错

## 现象
使用FastGPT知识库问答功能时，弹出报错提示：undefined 当前分组 default 下对于模型 gpt-3.5-turbo 无可用渠道。按照官方操作手册完成私有部署后，新建知识库、新建应用并在应用内关联知识库，在对话中使用知识库功能时触发该报错。

## 可能原因
该报错的核心原因为default分组未配置适配gpt-3.5-turbo模型的可用渠道，具体配置缺失情况需按实际部署环境确认。

## 排查步骤
1.  定位FastGPT的分组管理页面，找到default分组的模型渠道配置模块。
2.  检查default分组下是否存在已启用的gpt-3.5-turbo模型渠道。
3.  核对已配置渠道的密钥、权限等信息，确认可正常调用对应模型。

## 解决与验证
解决方式为在default分组中添加适配gpt-3.5-turbo模型的可用渠道，并确保渠道配置信息正确有效。验证方式为重新进入关联知识库的应用对话界面，发起知识库问答请求，确认报错提示不再出现，且问答功能可正常返回结果。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1256)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
