---
title: 解决FastGPT转发接口时工具调用参数丢失的问题
slug: /zh/troubleshoot/fastgpt-tool-call-params-loss
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/658
source_type: GitHub issue
---

# 解决FastGPT转发接口时工具调用参数丢失的问题

## 现象
使用FastGPT转发API接口时，函数（functions）或工具（tools）参数未被传递至下游模型，请求中无对应参数。用户已按文档要求将模型配置的toolChoice设为true，但问题仍未解决。

## 可能原因
函数调用参数在FastGPT的传输链路中丢失，具体表现为通过其他工具接入FastGPT的API密钥时，相关参数未被正确传递。

## 排查步骤
1. 确认已将FastGPT升级至最新版本。
2. 检查模型配置项中toolChoice是否已设置为true。
3. 抓取转发请求的完整内容，确认请求中包含functions或tools字段。
4. 对比直接调用FastGPT接口与通过其他工具调用时的请求参数差异。

## 解决与验证
避免通过其他工具接入FastGPT的API密钥，直接使用API密钥发起包含functions或tools字段的请求。验证时可查看下游模型收到的请求，确认functions或tools参数已正确传递。

> 来源: [FastGPT GitHub issue #658](https://github.com/labring/FastGPT/issues/658)
