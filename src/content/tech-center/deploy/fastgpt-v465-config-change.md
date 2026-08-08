---
title: FastGPT V4.6.5版本配置变更与功能更新说明
slug: /zh/deploy/fastgpt-v465-config-change
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465
source_type: 官方文档
---

# FastGPT V4.6.5版本配置变更与功能更新说明

## 版本配置变更背景
FastGPT V4.6.5版本存在配置变更需求，起因是OpenAI已弃用function call功能，改用toolChoice相关调用方式，因此FastGPT同步调整了模型配置与调用逻辑。旧版config.json配置说明已不再维护，当前版本需参考官方提供的模型配置方案进行调整。

## 可执行配置修改步骤
1.  修改模型配置中的字段：将原有的functionCall字段替换为toolChoice。
2.  配置项取值说明：将toolChoice设置为true的模型，会默认使用OpenAI的tools模式进行调用；未设置或设置为false的模型，则会走提示词生成模式。
3.  新增全局配置项ReRankModels，需以数组格式进行配置，示例格式为`ReRankModels: []`。
4.  调整模型分组逻辑：问题优化模型与内容提取模型将使用同一组配置，无需单独为两类模型分别配置。

## 功能更新与优化修复
本版本新增了多个功能模块，包括问题优化模块、文本编辑模块、判断器模块、自定义反馈模块，同时【内容提取】模块新增了模型选择与字段枚举功能。在体验优化方面，对docx文件读取功能进行了升级，兼容表格内容并支持转换为Markdown格式；优化了高级编排的连接线交互逻辑，修复了因html2md导致的CPU密集计算阻断线程的问题，同时修复了高级编排提示词提取描述的相关异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465
