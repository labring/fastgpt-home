---
title: FastGPT系统插件开发与旧版机制的区别说明
slug: /zh/model/fastgpt-plugin-old-mechanism-differences
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# FastGPT系统插件开发与旧版机制的区别说明

## 整体架构与包协议调整
FastGPT与FastGPT Plugin保持外置扩展的微服务架构，整体架构未脱离微服务范畴。插件包协议完成升级，从旧的内置系统工具目录切换为统一.pkg格式。该格式可简化安装流程，便于版本管理与热更新，同时预留了后续扩展其他插件类型的能力。

## 运行时与元信息管理规则
插件运行时由服务端统一进行管理，当前默认使用的运行时为local-pool。每个插件版本都拥有独立的进程池、队列以及运行时配置，保障不同插件间的资源隔离。插件的元信息、输入输出schema、密钥schema和图标资源，都会被纳入构建产物中，可直接供FastGPT页面、工作流和Agent调用使用。

## 开发流程变更说明
工具开发需使用@fastgpt-plugin/cli和@fastgpt-plugin/sdk-factory作为核心开发工具。旧版开发所依赖的config.ts、versionList配置文件，以及bun run build:pkg构建命令，不再作为主要的开发方式。开发过程需遵循新工具的使用规范，完成插件的开发与构建流程。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
