---
title: 详细讲解FastGPT中local-pool运行时与Pod插件进程的使用规则
slug: /zh/glossary/fastgpt-local-pool-pod-guide
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/plugin/intro
source_type: 官方文档
---

# 详细讲解FastGPT中local-pool运行时与Pod插件进程的使用规则

## 一句话定义
local-pool是FastGPT当前默认的插件运行时，负责执行插件代码；Pod是本地进程池中的单个插件子进程，一个插件服务可拥有多个Pod。

## 在 FastGPT 里怎么用
插件通过打包后的.pkg文件完成安装、更新和管理。默认使用local-pool作为插件运行时，每个插件版本拥有独立进程池、队列和运行时配置。Pod作为本地进程池中的单个插件子进程，由服务端统一管理。插件的元信息、输入输出schema、密钥schema和图标资源会进入构建产物，供FastGPT页面、工作流和Agent调用使用。开发工具类插件时，需使用@fastgpt-plugin/cli和@fastgpt-plugin/sdk-factory，不再使用旧版config.ts、versionList和bun run build:pkg。

## 容易搞错的地方
部分用户可能混淆运行时与Pod的层级关系，运行时是整体执行插件代码的后端实现，Pod是运行时中的单个插件子进程。部分开发者可能沿用旧版插件开发流程，需注意新版开发工具与旧版的差异。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/intro)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
