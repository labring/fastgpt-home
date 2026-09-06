---
title: FastGPT工具调用默认插件配置的排错指南
slug: /zh/troubleshoot/fastgpt-tool-call-default-plugin
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1966
source_type: GitHub issue
---

# FastGPT工具调用默认插件配置的排错指南

## 现象
LLM在FastGPT的工具调用场景下，未推理出匹配用户提问的目标工具，直接生成自然语言回答，导致出现答非所问或内容不实的问题，该问题常见于用户需要依赖工具完成特定任务的交互场景中，影响交互准确性。

## 可能原因
未配置工具调用的默认插件，LLM未被强制触发工具调用流程，仅依赖通用推理生成回答，无法有效调用工具解决用户提出的问题。

## 排查步骤
1. 检查FastGPT工具调用相关的配置项，确认是否存在默认插件的配置入口
2. 核对当前已配置的工具列表，确认目标插件是否已正确添加
3. 需按实际环境确认配置是否已正确保存并同步到运行环境

## 解决与验证
当前无公开的默认插件配置方案，需参考项目更新后的官方文档或指引完成配置。验证需确认LLM发起调用时是否强制触发指定插件，避免直接生成无依据的自然语言回答。

> 来源: [FastGPT GitHub issue #1966](https://github.com/labring/FastGPT/issues/1966)
