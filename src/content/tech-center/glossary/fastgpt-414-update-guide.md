---
title: FastGPT 4.14版本更新修复与系统插件使用指南
slug: /zh/glossary/fastgpt-414-update-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411
source_type: 官方文档
---

# FastGPT 4.14版本更新修复与系统插件使用指南

## 一句话定义
本内容为FastGPT 4.14版本的官方修复补丁说明与系统插件更新安装指南。

## 在 FastGPT 里怎么用
首先，系统插件更新需前往插件市场操作，完成4.14.6版本升级后可跳过该步骤，也可直接下载指定zip包完成安装。需更新的系统插件包含base64Decode、dallle3、docDiff、drawing、gptImage、markdownTransform、mineru、minimax、openrouterMultiModal、stability。其次，4.14.11版本修复了11项已知问题，对应问题无需额外操作，升级至该版本后自动生效，包括对话Agent模式模型刷新重置、接口权限校验、API推送知识库计费异常、Markdown上传中文乱码、python代码执行空入参处理、工作流全局变量配置、工作流代码节点输出ID替换、工作流节点对齐偏移、评估列表权限过滤、MCP与Http工具raw schema保存等场景。

## 容易搞错的地方
部分场景易出现配置偏差或操作误区：一是完成4.14.6版本升级后，无需重复执行系统插件更新步骤；二是知识库上传Markdown文档时，若文件前部英文占比较高，升级前可能触发中文乱码，升级至4.14.11版本后该问题已修复；三是工作流中删除全局变量多选框的enum选项时，需确认默认值已被清理，避免残留配置导致异常；四是python代码执行节点若传入空入参，对应参数会被直接忽略，需避免该类空入参配置。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41411)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
