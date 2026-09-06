---
title: FastGPT中嵌入第三方功能的实现步骤说明
slug: /zh/troubleshoot/fastgpt-third-party-embed
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/941
source_type: GitHub issue
---

# FastGPT中嵌入第三方功能的实现步骤说明

## 现象
需在FastGPT聊天界面嵌入第三方功能，替代超链接跳转的使用方式，无需跳转页面即可使用功能。
## 可能原因
FastGPT默认未内置第三方功能嵌入的配置项，需通过自定义代码修改实现功能嵌入。
## 排查步骤
1. 定位FastGPT聊天界面相关的代码文件位置，需按实际环境确认，明确界面渲染的核心文件范围。
2. 查找FastGPT中可用于嵌入外部功能的页面节点或组件位置，需按实际环境确认，确认可自定义修改的区域。
3. 确认第三方功能嵌入代码的适配要求，需按实际环境确认，确保代码与FastGPT前端环境兼容。
## 解决与验证
通过修改FastGPT前端聊天界面的相关代码文件，将第三方功能的嵌入代码添加至合适的界面节点位置，实现同一界面内的功能调用，无需跳转页面。验证方式为启动FastGPT服务并访问聊天界面，确认第三方功能正常嵌入并可直接使用，无跳转问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/941)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
