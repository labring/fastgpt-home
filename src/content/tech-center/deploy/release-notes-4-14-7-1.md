---
title: FastGPT v4.14.7.1版本升级内容与操作说明
slug: /zh/deploy/release-notes-4-14-7-1
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.14.7.1
source_type: 官方文档
---

# FastGPT v4.14.7.1版本升级内容与操作说明

## 这个版本改了什么
本版本主要修复两类MCP相关问题，一是兼容MCP中JSON Schema type类型不在枚举类型里的场景，二是修复MCP新SDK兼容问题，解决连续调用同一个MCP服务时多次连接导致的报错。此外，本版本移除了过时的llm-ChatGLM2和llm-Baichuan2插件，优化了MCP工具JSON Schema Zod验证逻辑，同时包含多项文档更新、无效日志移除、GitHub Action配置更新、AsyncLocalStorage导入修复、英文文档同步与翻译优化，以及document目录下tar依赖包从7.5.7升级至7.5.9的依赖更新。

## 升级前要确认的事
升级前需确认当前部署的FastGPT版本为v4.14.7，本次升级的版本跨度为v4.14.7至v4.14.7.1。若当前部署中使用了llm-ChatGLM2或llm-Baichuan2插件，需提前确认业务不再依赖此类插件，本版本已正式移除该类插件，避免升级后出现插件加载异常问题。

## 升级步骤（照做）
按照官方发布的v4.14.7.1版本升级流程完成版本更新。

## 升级后怎么验证
升级完成后，可通过以下方式验证更新效果：一是连续调用同一个MCP服务，确认无多次连接导致的报错；二是测试JSON Schema type类型不在枚举类型里的MCP工具调用，确认功能正常运行；三是检查系统日志，确认无无效日志输出；四是确认llm-ChatGLM2和llm-Baichuan2插件不再加载，避免出现插件缺失相关的异常提示。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.14.7.1)
