---
title: FastGPT系统插件开发前需明确的核心准备事项
slug: /zh/reference/fastgpt-system-plugin-prep
page_type: 技术速查
source: https://doc.fastgpt.cn/plugin/system-tool-development
source_type: 官方文档小节
---

# FastGPT系统插件开发前需明确的核心准备事项

## 结论
FastGPT系统插件开发前，需先明确指定的核心配置信息。提前梳理相关参数与要求，可有效降低后续开发与发布的风险。

## 具体怎么做
1. 确认基础标识：插件类型为`tool`或`tool-suite`，配置全局唯一且发布后不变的`pluginId`；工具集插件需额外确认`children[].id`。
2. 配置多语言内容：填写`name.en`/`name.zh-CN`、`description.en`/`description.zh-CN`。
3. 定义输入输出参数：明确输入字段的类型、约束、默认值、UI标题与说明；明确输出字段的类型、含义与下游使用方式。
4. 配置密钥与外部服务：通过`secretSchema`描述API Key、Base URL等密钥信息，明确外部API的请求方式、鉴权方式、超时、限流、错误响应与测试账号。
5. 确认功能能力：明确是否需要文件能力（使用`ctx.invoke.uploadFile()`）、流式输出（使用`ctx.streamResponse()`）。
6. 准备测试样例：编写至少覆盖成功路径、参数错误、鉴权失败、上游失败的测试用例。
7. 影响安全性的配置需提前确认，其余可使用合理默认值，提交时记录假设内容。

## 注意事项
1. 涉及插件ID、鉴权方式、计费或上架安全性的配置，必须提前完成确认。
2. 非核心配置可先使用合理默认值推进开发，需在提交说明中记录所采用的假设内容。
3. 测试样例需至少覆盖成功路径、参数错误、鉴权失败、上游失败四类场景。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/plugin/system-tool-development)
