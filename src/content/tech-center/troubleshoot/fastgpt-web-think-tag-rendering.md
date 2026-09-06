---
title: 解决FastGPT Web对话中think标签渲染与历史消息携带问题
slug: /zh/troubleshoot/fastgpt-web-think-tag-rendering
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3712
source_type: GitHub issue
---

# 解决FastGPT Web对话中think标签渲染与历史消息携带问题

## 现象
Web对话中，模型输出的think标签以纯文本形式展示，未被渲染为对应的组件样式。同时需确认持续对话的历史消息是否携带think标签，以及该标签是否仅在最后一条消息中输出给用户。

## 可能原因
当前无官方明确说明的触发原因，需结合实际部署的FastGPT环境与相关配置进行排查。

## 排查步骤
1. 查看当前Web对话的输出配置项，确认针对think标签的展示规则设置。
2. 检查对话历史的存储逻辑与前端展示逻辑，确认think标签是否被自动过滤或携带。
3. 分别发起单轮与多轮对话，观察think标签的输出形式、展示位置与携带范围。

## 解决与验证
需根据实际业务场景调整相关配置。若需实现think标签的组件化渲染，需确认当前框架支持的自定义渲染规则并进行适配。若需控制历史消息中think标签的展示，需调整历史消息的过滤逻辑。验证方式为发起多轮对话，观察think标签的输出形式是否符合预期，以及历史消息中是否携带该标签。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3712)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
