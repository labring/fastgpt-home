---
title: FastGPT V4.6.5版本配置变更与功能更新说明
slug: /zh/deploy/fastgpt-v465-config-update
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465
source_type: 官方文档
---

# FastGPT V4.6.5版本配置变更与功能更新说明

FastGPT V4.6.5版本存在核心配置变更，本次变更源于OpenAI弃用function call接口，改用toolChoice相关调用逻辑，FastGPT同步完成了对应配置与调用方式的调整。旧版config.json配置说明已不再维护，当前版本需参考官方发布的模型配置方案文档进行配置更新。

### 配置修改操作步骤
1.  调整模型配置字段：将原有配置中的`functionCall`字段替换为`toolChoice`。将需要启用tools模式的模型配置为`toolChoice: true`，未设置或设置为`false`的模型将默认使用提示词生成模式。
2.  新增`ReRankModels: []`配置项，用于配置重排序相关模型。
3.  注意：问题优化模型与内容提取模型现在共用同一组配置，无需单独为两类模型分别配置。

### 版本功能更新与优化
本版本新增了四个功能模块：问题优化模块、文本编辑模块、判断器模块、自定义反馈模块；【内容提取】模块新增支持选择模型以及字段枚举功能。同时对多项体验和稳定性进行了优化与修复：优化docx文件读取逻辑，兼容表格内容并转换为markdown格式；优化高级编排的连接线交互体验；修复了因html2md导致的CPU密集计算阻断线程的问题；修复了高级编排提示词提取描述的相关异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/465)
