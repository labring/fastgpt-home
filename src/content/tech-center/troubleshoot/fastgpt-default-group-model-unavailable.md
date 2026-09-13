---
title: 解决FastGPT在线使用时default分组无gpt-4o-mini可用渠道的问题
slug: /zh/troubleshoot/fastgpt-default-group-model-unavailable
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2105
source_type: GitHub issue
---

# 解决FastGPT在线使用时default分组无gpt-4o-mini可用渠道的问题

## 现象
在线使用FastGPT公有云版本时，输入中转API key后出现报错，完整报错文本为：当前分组default下对于模型gpt-4o-mini无可用渠道 (request id: 20240720184929126232784JoNA4YYD)。

## 可能原因
需按实际环境确认，可能涉及以下情况：default分组未配置gpt-4o-mini模型的可用渠道，中转API key未获得调用gpt-4o-mini模型的权限，或其他相关配置未正确完成。

## 排查步骤（有序列表）
1. 确认当前使用FastGPT公有云版本，且已正确配置中转API key。
2. 查看default分组的模型配置，确认是否已添加gpt-4o-mini模型的可用渠道。
3. 验证中转API key是否具备调用gpt-4o-mini模型的相关权限。
4. 记录报错中的request id: 20240720184929126232784JoNA4YYD，用于后续排查或信息核对。

## 解决与验证
可通过调整default分组的模型配置解决该问题，将gpt-4o-mini模型关联至可用渠道。验证方式为：重新发起模型调用请求，确认不再出现"当前分组default下对于模型gpt-4o-mini无可用渠道"的报错，且模型调用流程正常完成。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2105)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
