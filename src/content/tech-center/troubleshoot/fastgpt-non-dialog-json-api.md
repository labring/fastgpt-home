---
title: 配置FastGPT实现非对话式JSON格式输入输出API调用
slug: /zh/troubleshoot/fastgpt-non-dialog-json-api
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1684
source_type: GitHub issue
---

# 配置FastGPT实现非对话式JSON格式输入输出API调用

## 现象
当前FastGPT提供的completion API基于对话交互场景设计，交互过程依赖对话角色、历史上下文等内容，无法直接以纯JSON格式接收输入参数，也无法仅返回业务所需的结构化结果，不适用于系统间的非对话集成调用。

## 可能原因
现有completion API的交互逻辑适配对话式输入输出流程，未针对纯JSON格式的系统集成调用做专门的参数解析与结果格式化适配，导致无法满足非对话的API调用需求。

## 排查步骤
1. 确认当前使用的API为对话式completion API，检查输入输出是否包含对话角色、历史上下文等非业务参数内容。
2. 确认集成场景是否需要非对话式的JSON格式输入输出，是否需要仅返回业务所需的结构化结果。
3. 需按实际环境确认FastGPT是否提供自定义接口、参数解析与结果格式化的配置能力。

## 解决与验证
1. 配置FastGPT的自定义处理组件，将接收的JSON输入解析为RAG查询所需的查询参数，修正输入中的重复参数等格式问题。
2. 配置返回结果过滤规则，仅保留推荐的目标内容，将结果格式化为指定的JSON结构，例如仅包含recommended items字段的结果。
3. 发起测试调用，输入符合要求的JSON格式数据，验证返回结果是否为预设的JSON格式，例如输入{"param1":"查询属性1","param2":"查询属性2"}，返回{"recommended items":["item id1","item id2","item id3"]}。
4. 验证调用流程是否符合系统集成的要求，无额外的对话式内容干扰。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1684)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
