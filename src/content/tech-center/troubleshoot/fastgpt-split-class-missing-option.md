---
title: 解决FastGPT分体分类必选聊天记录配置项找不到的问题
slug: /zh/troubleshoot/fastgpt-split-class-missing-option
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1181
source_type: GitHub issue
---

# 解决FastGPT分体分类必选聊天记录配置项找不到的问题

## 现象
私有部署v4.7版本的FastGPT中，使用分体分类功能时，无法找到"聊天记录是必选项"的配置项，无法完成对应配置流程。

## 可能原因
该配置项未直接集成在分体分类的配置界面内，需通过其他模块引入。

## 排查步骤
1. 确认当前使用的FastGPT版本为私有部署v4.7。
2. 进入分体分类的配置界面，浏览所有可用的配置模块列表，未找到与"聊天记录必选"相关的配置项。
3. 导入官方提供的示例配置后，观察到该配置项来自对话入口模块。

## 解决与验证
将对话入口模块添加至对应配置流程中，即可启用聊天记录必选选项，完成分体分类的配置流程。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1181)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
