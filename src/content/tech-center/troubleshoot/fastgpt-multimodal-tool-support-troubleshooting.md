---
title: 排查FastGPT多模态模型工具调用与内容提取的支持情况
slug: /zh/troubleshoot/fastgpt-multimodal-tool-support-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5188
source_type: GitHub issue
---

# 排查FastGPT多模态模型工具调用与内容提取的支持情况

## 现象
用户在使用FastGPT的过程中，提出两项相关疑问：一是当前FastGPT的多模态模型是否已支持工具调用与内容提取功能；二是本地部署的qwen2.5-vl-70B模型，在FastGPT开源版中是否具备上述两项功能。

## 可能原因
多模态模型的功能支持情况存在个体差异，FastGPT对不同型号多模态模型的适配支持未明确覆盖所有类型，特定模型的功能支持需单独验证。

## 排查步骤
1. 明确当前使用的多模态模型的具体完整型号。
2. 确认目标模型本身是否具备工具调用和内容提取的基础能力。
3. 结合实际部署环境，验证FastGPT对该模型的适配情况。

## 解决与验证
针对特定多模态模型的功能支持情况，需通过实际部署测试完成验证。对于本地部署的qwen2.5-vl-70B模型，需在FastGPT开源版中完成对应配置并测试工具调用与内容提取功能，观察功能是否正常运行。若模型本身不具备相关基础能力，则无法在FastGPT中实现对应功能。对于未明确适配的模型，需结合模型实际能力与FastGPT的适配规则完成最终验证。

> 来源: [FastGPT GitHub issue #5188](https://github.com/labring/FastGPT/issues/5188)
