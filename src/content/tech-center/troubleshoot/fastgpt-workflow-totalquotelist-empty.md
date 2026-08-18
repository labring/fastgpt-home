---
title: 解决FastGPT工作流模式下totalQuoteList为空且引用列表无法渲染的问题
slug: /zh/troubleshoot/fastgpt-workflow-totalquotelist-empty
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6487
source_type: GitHub issue
---

# 解决FastGPT工作流模式下totalQuoteList为空且引用列表无法渲染的问题

## 现象
在FastGPT V4.14.7私有部署版本中，使用绑定知识库的问答应用时，对话模式可正常返回引用列表并正常渲染。但切换至工作流模式后，对话完成刷新页面时，getPaginationRecords接口返回的totalQuoteList为空，调试界面无法渲染引用列表。

## 可能原因
该问题目前未明确具体根因，需结合实际部署环境，排查代码逻辑、接口数据返回、工作流节点配置等相关环节，具体原因需按实际环境确认。

## 排查步骤
1. 确认当前FastGPT版本为V4.14.7私有部署版，核对应用绑定的知识库配置是否无误。
2. 进入工作流调试界面，触发问答流程后，打开浏览器开发者工具，查看getPaginationRecords接口的返回结果，确认totalQuoteList字段是否为空。
3. 对比对话模式与工作流模式下的接口调用参数、返回数据的差异，检查工作流中知识库相关节点的配置。
4. 结合实际部署环境，排查后端服务的日志信息，需按实际环境确认。

## 解决与验证
若排查发现为接口数据未正确传递或代码逻辑异常，需参考对应环节的实现细节进行修复。验证方式为：切换至工作流模式绑定知识库进行问答，查看调试界面是否正常渲染引用列表，同时确认getPaginationRecords接口返回的totalQuoteList字段包含有效数据。

> 来源：[FastGPT GitHub Issue #6487](https://github.com/labring/FastGPT/issues/6487)
