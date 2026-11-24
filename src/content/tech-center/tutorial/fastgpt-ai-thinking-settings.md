---
title: 配置FastGPT的AI思考强度参数与多模型平台适配
slug: /zh/tutorial/fastgpt-ai-thinking-settings
page_type: 教程/部署
source: https://doc.fastgpt.cn/guide/build/general/ai_settings
source_type: 官方文档小节
---

# 配置FastGPT的AI思考强度参数与多模型平台适配

## 思考配置的核心作用与基础映射规则
思考配置用于控制模型的思考强度，提供多档位选项以适配不同复杂度的问题。默认选项使用模型原生默认配置，不思考模式适合简单问题，可直接返回结果。问题复杂度越高，可选择更高的思考强度档位。该配置对齐OpenAI规范中的reasoning_effort参数，通过ai-proxy适配不同模型平台的参数格式。各档位对应的OpenAI兼容值与token budget映射关系为：不思考对应none，默认budget 0；极简思考对应minimal，默认budget 1024；轻量思考对应low，默认budget 2048；标准思考对应medium，默认budget 8192；深度思考对应high，默认budget 16384；极致思考对应xhigh，默认budget 32768。对于仅支持token budget的平台，ai-proxy会将离散档位转换为对应budget；反向归一化时，<=0的budget会被视为none，1~1024视为minimal，1025~4096视为low，4097~12288视为medium，12289~24576视为high，更高值则视为xhigh。

## 多模型平台的参数适配规则
不同模型平台的参数适配规则存在差异。OpenAI Chat/Completions接口使用reasoning_effort字段，原样写入枚举值；OpenAI Responses接口使用reasoning.effort字段，同样原样写入枚举值。Google Gemini原生请求从generationConfig.thinkingConfig解析参数，ai-proxy会根据模型系列选择thinkingLevel或thinkingBudget字段。Claude系列模型会根据档位转换为thinking和output_config字段。Ali DashScope系列模型会根据是否支持thinking_budget，转换为enable_thinking和thinking_budget字段。Zhipu、DeepSeek、Doubao等平台仅保留开关语义，Moonshot、Kimi则根据模型是否支持开关调整参数发送逻辑。部分模型可能不支持全部思考档位，切换后出现报错可改回默认选项。

## 快速配置步骤与注意事项
1. 进入FastGPT的AI设置页面，找到思考配置下拉选项；
2. 根据业务需求选择对应档位：默认、不思考、极简思考、轻量思考、标准思考、深度思考、极致思考；
3. 系统会通过ai-proxy自动将选择的档位转换为对应模型平台的参数格式；
4. 若配置后出现报错，可将档位改回默认选项重试。
需要注意，qwen3-*系列模型的非流式请求会被强制关闭思考，qwq-*系列模型的请求会被强制改为流式返回。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/general/ai_settings)
