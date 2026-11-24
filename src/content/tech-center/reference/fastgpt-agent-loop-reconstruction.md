---
title: FastGPT V4.15.2 Agent Loop重构配置与使用说明
slug: /zh/reference/fastgpt-agent-loop-reconstruction
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/4152
source_type: 官方文档小节
---

# FastGPT V4.15.2 Agent Loop重构配置与使用说明

## 结论
本次FastGPT V4.15.2的Agent Loop重构，统一了Workflow Agent与ToolCall的共享执行内核，整合了fastAgent和piAgent的Provider接口，同时统一了多类工具的事件生命周期、响应持久化流程与计费统计规则。
## 具体怎么做
1. 通过配置AGENT_ENGINE环境变量，切换执行引擎；
2. 使用ToolCall功能时，需关闭其plan和ask能力；
3. 工具执行遵循以下规则：安全工具支持批量并行执行，响应按模型调用顺序写回；plan、ask等有状态工具保持串行执行。
## 注意事项
1. 所有相关模块需共用标准化的输入、运行时和返回结果协议；
2. 统一usage收集入口后，需避免同一笔用量被重复计费或统计；
3. 事件生命周期统一后，SSE、运行详情和错误信息的展示逻辑保持一致。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/4152)
