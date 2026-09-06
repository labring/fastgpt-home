---
title: 为FastGPT Workflow自定义变量添加聊天显示控制开关
slug: /zh/troubleshoot/workflow-custom-variable-display-control
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4815
source_type: GitHub issue
---

# 为FastGPT Workflow自定义变量添加聊天显示控制开关

## 现象
FastGPT当前版本中，Workflow的自定义变量会在聊天对话中展示。从用户提供的截图可见，自定义变量的内容直接出现在聊天对话的可见区域。

## 可能原因
当前版本未提供Workflow自定义变量的显示控制配置项，所有自定义变量默认在聊天对话中展示，未区分是否需要隐藏的场景。

## 排查步骤
1. 登录FastGPT平台，进入目标应用的Workflow编辑界面。
2. 查看已配置的自定义变量列表，记录需要控制显示状态的变量。
3. 启动与该Workflow关联的聊天会话，查看聊天历史中是否包含自定义变量的具体内容。
4. 确认是否存在用于临时缓存、需要隐藏的自定义变量。

## 解决与验证
目前官方发布的FastGPT版本未内置自定义变量的聊天显示控制开关。若要实现该控制功能，需在定义Workflow自定义变量时添加对应的显示控制选项。对于用于临时缓存的自定义变量，当前无内置的隐藏配置，需按实际环境确认调整方案。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4815)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
