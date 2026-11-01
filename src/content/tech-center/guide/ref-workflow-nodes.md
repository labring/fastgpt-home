---
title: FastGPT 配置与开发参考：工作流与节点（88 篇清单）
slug: /zh/guide/ref-workflow-nodes
page_type: 问题清单聚合页
source: https://doc.fastgpt.cn/zh-CN/guide/build/workflow/intro
source_type: 站内已发布文档的程序化归类
check_day: 2026-10-19
article_section: 配置与开发参考
is_part_of: FastGPT 技术中心
date_modified: 2026-10-26
---

# FastGPT 配置与开发参考：工作流与节点

本页汇总站内已发布的工作流各节点的用法、参数与运行规则相关文档，共 88 篇，按标题排序列出。

## 这一类文档通常在讲什么

1. 问题分类、判断器、文本提取等节点的参数与用法
2. 循环、并行与 HTTP 请求节点的注意事项
3. 工作流的运行流程与节点执行规则

若问题与上述三个方向都不匹配，可返回[配置与开发参考全景](/zh/guide/reference-overview)查找工作流节点编排之外的关联主题。

## 阅读顺序建议

1. 先从表中选择与工作流节点编排当前问题直接对应的条目，核对文档适用版本
2. 对照工作流节点编排的关联条目，列出需要共同配置的依赖项
3. 将工作流节点编排涉及的设置项逐一与参考资料中的官方说明对照

## 已发布的文档清单（88 篇）

| 文档 |
| --- |
| [FastGPT 4.14.8及以上版本代码运行节点使用速查](/reference/fastgpt-sandbox-v2-node-guide) |
| [FastGPT AI节点中文档解析的使用方法与适配要点](/reference/fastgpt-ai-node-document-parsing) |
| [FastGPT HTTP状态码报错排查与处理](/glossary/fastgpt-http-status-code-troubleshooting) |
| [FastGPT 工作流节点能力速查表](/reference/workflow-nodes-reference) |
| [FastGPT 错误码全表（122 条 · 按模块分组）](/reference/error-codes-reference) |
| [FastGPT 错误码定位器：14 个模块 122 条错误码，含 8 个需要看 statusText 才能区分的码值](/reference/error-code-lookup) |
| [FastGPT中HTTP请求method字段的含义与用法](/glossary/fastgpt-http-request-method) |
| [FastGPT中HTTP请求体（body）的使用与常见问题处理](/glossary/fastgpt-http-request-body-issues) |
| [FastGPT中question_classify节点与User question empty报错处理](/glossary/fastgpt-question-classify-error) |
| [FastGPT交互节点后发起会话继续工作流的操作方法](/reference/fastgpt-interactive-session-continue) |
| [FastGPT代码运行节点的功能、参数配置与使用说明](/node/fastgpt-sandbox-code-runner) |
| [FastGPT代码运行节点的功能、配置与使用说明](/node/fastgpt-code-sandbox-usage) |
| [FastGPT内容审核与自动改写工作流的配置操作步骤](/tutorial/fastgpt-content-audit-workflow-config) |
| [FastGPT判断器工作流节点的功能与配置说明](/node/fastgpt-judge-node-config) |
| [FastGPT对话反馈功能的迁移与使用说明](/glossary/fastgpt-chat-feedback-guide) |
| [FastGPT工作流HTTP节点对接业务服务的POST请求实现](/reference/fastgpt-workflow-http-post-service-example) |
| [FastGPT工作流HTTP请求节点的配置与使用方法](/node/fastgpt-workflow-http-node) |
| [FastGPT工作流tfswitch判断模块的使用与问题排查](/glossary/fastgpt-tfswitch-module) |
| [FastGPT工作流中文件输入功能的配置与实际使用操作方法](/tutorial/fastgpt-workflow-file-input-usage) |
| [FastGPT工作流中文本内容提取节点的使用方法](/reference/fastgpt-text-content-extract-node) |
| [FastGPT工作流判断器节点的功能、配置与适用场景](/node/fastgpt-workflow-judger-node) |
| [FastGPT工作流并行执行节点的配置与使用方法](/reference/fastgpt-workflow-parallel-run-node) |
| [FastGPT工作流循环节点批量处理数组的操作方法](/reference/fastgpt-loop-batch-array-processing) |
| [FastGPT工作流循环节点的使用方法与注意事项](/node/fastgpt-workflow-loop-node-2) |
| [FastGPT工作流循环节点的配置与使用方法](/reference/fastgpt-workflow-loop-node) |
| [FastGPT工作流用户选择节点的使用方法说明](/reference/fastgpt-workflow-user-selection-node) |
| [FastGPT工作流的运行流程与节点执行规则说明](/reference/fastgpt-workflow-execution-rules) |
| [FastGPT工作流节点中HTTP请求模块的使用方法速查](/reference/fastgpt-workflow-http-node) |
| [FastGPT工作流节点文档解析组件的使用说明](/reference/fastgpt-workflow-document-parsing-node) |
| [FastGPT工作流节点的配置方法与运行逻辑说明](/tutorial/fastgpt-workflow-node-config) |
| [FastGPT工作流运行日志收集与可观测性配置说明](/glossary/fastgpt-workflow-log-observability) |
| [FastGPT工作流问题分类节点的配置与使用方法](/node/fastgpt-workflow-question-classify) |
| [FastGPT并行执行节点的使用规范与注意事项](/tutorial/fastgpt-parallel-run-notes) |
| [FastGPT并行执行节点的功能、参数与使用注意事项](/node/fastgpt-parallel-run-node) |
| [FastGPT并行执行节点的参数说明与使用示例](/node/fastgpt-parallel-execution-node) |
| [FastGPT并行运行节点failed状态的定义与用法说明](/glossary/fastgpt-parallel-failed-state) |
| [FastGPT并行运行节点的输出参数与结果说明](/tutorial/parallel-run-node-output-params) |
| [FastGPT应用与工作流的AI配置项含义与操作说明](/reference/fastgpt-app-ai-settings) |
| [FastGPT应用对话开场白功能的配置与使用说明](/tutorial/fastgpt-welcome-text-config) |
| [FastGPT循环节点使用注意事项与避坑说明](/tutorial/fastgpt-loop-node-pitfalls) |
| [FastGPT循环节点的配置方法、运行规则与使用场景说明](/node/fastgpt-workflow-loop-node) |
| [FastGPT循环运行节点的参数配置与输出说明](/tutorial/fastgpt-loop-run-node-params-output) |
| [FastGPT批量运行节点的配置与批量任务处理方法](/node/fastgpt-batch-run-node-usage) |
| [FastGPT批量运行节点的配置与批量数据处理方法](/node/fastgpt-batch-run-node) |
| [FastGPT文本内容提取节点的功能与配置使用方法说明](/node/fastgpt-text-extract-node) |
| [FastGPT文本内容提取节点的配置与功能说明](/node/fastgpt-text-content-extract-node) |
| [FastGPT文档解析节点的功能说明与配置使用方法](/node/fastgpt-document-parsing-node) |
| [FastGPT文档解析节点的工作原理与使用规则](/tutorial/fastgpt-document-parsing-node) |
| [FastGPT智能客服场景的全局变量与图片功能配置](/glossary/fastgpt-customer-service-variable-image) |
| [介绍FastGPT中文件输入与文档解析节点的使用规则](/glossary/fastgpt-file-input-parse) |
| [介绍FastGPT工作流AI对话节点的参数配置与使用方法](/node/fastgpt-workflow-ai-chat-node) |
| [介绍FastGPT工作流文本拼接节点的功能与配置方法](/node/fastgpt-workflow-text-splice) |
| [介绍FastGPT工作流文档解析节点的功能、配置与注意事项](/node/fastgpt-workflow-document-parsing) |
| [介绍FastGPT工作流节点中自定义反馈模块的使用方法](/reference/fastgpt-custom-feedback-node) |
| [介绍FastGPT用户选择节点的功能、配置与使用方法](/node/fastgpt-user-selection-node) |
| [介绍FastGPT用户选择节点的功能、配置与使用边界](/node/fastgpt-workflow-user-selection) |
| [使用FastGPT变量更新节点修改全局变量与节点输出](/node/fastgpt-variable-update-node-2) |
| [使用FastGPT工作流节点处理长文本翻译的分段与质量保障问题](/node/fastgpt-long-text-translation-nodes) |
| [使用FastGPT并行执行节点实现文本数组并行翻译](/reference/fastgpt-parallel-translate-text-array) |
| [使用FastGPT条件循环实现AI文案润色至达标输出](/reference/fastgpt-conditional-loop-polish-text) |
| [解决FastGPT工作流中tools空数组引发的400参数报错](/glossary/fastgpt-tools-empty-array-error) |
| [解决FastGPT高级编排Http模块的protocol mismatch报错问题](/glossary/fastgpt-http-protocol-mismatch) |
| [解释FastGPT聊天对话中响应中断且日志显示完整的问题](/glossary/fastgpt-chat-conversation-interrupt) |
| [讲解FastGPT工作流中AI对话节点的配置与使用方法](/node/ai-chat-workflow-node) |
| [讲解FastGPT工作流批量运行节点的配置与使用方法](/reference/fastgpt-batch-run-workflow-node) |
| [讲解FastGPT工作流节点的分类、运行逻辑与配置方法](/tutorial/fastgpt-workflow-node-guide) |
| [讲解FastGPT工作流表单输入节点的功能与使用方法](/node/form-input-workflow-node) |
| [讲解FastGPT自定义反馈节点的功能、配置与使用方法](/node/fastgpt-custom-feedback-node) |
| [详细完整说明在FastGPT应用中配置对话开场白及相关快捷问题的具体操作步骤](/tutorial/fastgpt-app-welcome-text-config) |
| [说明FastGPT工作流中表单输入节点的功能与配置方法](/node/fastgpt-workflow-form-input) |
| [说明FastGPT并行运行节点的输出参数与使用方法](/glossary/fastgpt-parallel-run-output) |
| [说明FastGPT并行运行节点的输出参数与使用规则](/glossary/fastgpt-parallel-run-output-2) |
| [说明FastGPT应用与工作流的AI配置参数与使用方法](/tutorial/fastgpt-ai-config-params) |
| [说明FastGPT应用与工作流的AI配置项和使用方法](/tutorial/fastgpt-ai-node-config) |
| [说明FastGPT文档解析节点的功能与使用规则](/glossary/fastgpt-document-parse-node) |
| [配置FastGPT内容审核与自动改写工作流的完整步骤](/tutorial/fastgpt-content-audit-rewrite-workflow) |
| [配置FastGPT变量更新节点实现全局变量与节点输出更新](/node/fastgpt-variable-update-node) |
| [配置FastGPT对话问题引导功能的方法与注意事项](/tutorial/chat-input-guide-config) |
| [配置FastGPT对话问题引导功能的详细说明](/tutorial/fastgpt-chat-input-guide) |
| [配置FastGPT工作流HTTP请求节点的参数与使用方法](/node/fastgpt-workflow-http-node-pitfalls) |
| [配置FastGPT工作流HTTP请求节点的操作与注意事项](/node/fastgpt-workflow-http-node-2) |
| [配置FastGPT工作流指定回复节点实现内容输出](/node/fastgpt-workflow-specified-reply) |
| [配置FastGPT工作流的文本拼接节点实现自定义文本处理](/node/fastgpt-workflow-text-splice-node) |
| [配置FastGPT工作流问题分类节点实现用户问题归类](/node/fastgpt-workflow-question-classify-2) |
| [配置FastGPT并行运行节点的输入参数与执行逻辑](/node/fastgpt-parallel-run-input-config) |
| [配置FastGPT指定回复模块实现固定或变量化内容输出](/node/fastgpt-specified-reply-node) |
| [配置FastGPT自定义反馈模块实现对话数据埋点分析](/node/custom-feedback-module-log) |
| [配置FastGPT问题分类节点的自定义调用函数参数](/reference/fastgpt-question-classify-function-config) |

## 这份清单的适用范围

这份工作流节点编排清单依据文档标题归类；跨主题的问题还需查阅关联目录。使用时先核对以下条件：

- 工作流节点编排的文档版本与当前部署版本是否一致
- 当前版本是否包含工作流节点编排所需的商业版功能
- 工作流节点编排涉及的环境依赖是否与私有化部署文档一致

## 继续阅读

- 从工作流节点编排返回[FastGPT 配置与开发参考全景](/zh/guide/reference-overview)
- 核对工作流节点编排前阅读[版本升级与变更说明](/zh/guide/ref-upgrade-and-changes)
- 配合工作流节点编排查看[模型接入与配置](/zh/guide/ref-model-integration)

## 参考资料

- [工作流介绍](https://doc.fastgpt.cn/zh-CN/guide/build/workflow/intro)
- [快速开始](https://doc.fastgpt.cn/zh-CN/guide/getting-started/quick-start)

## 需要进一步确认时

这些条目可用于核对工作流节点编排的配置前提。确定实施方式前，建议准备当前版本、部署形态和一组真实样本；涉及现有系统的数据边界或业务流程时，可据此进行商务咨询并评估实施条件。

- 商务咨询：结合现有系统讨论工作流节点编排的实施条件
- 立即开始：用真实样本验证工作流节点编排
- 定价：按工作流节点编排的部署需求比较可选形态
