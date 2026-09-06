---
title: 解决FastGPT调用本地多模态模型图片识别效果不佳的问题
slug: /zh/troubleshoot/fastgpt-local-multimodal-model-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2792
source_type: GitHub issue
---

# 解决FastGPT调用本地多模态模型图片识别效果不佳的问题

## 现象
使用FastGPT通过--onapi调用本地多模态模型时，图片识别效果不准确。测试多个模型后未获得理想效果，涉及模型包括minicpm-v:8b、llava:13b、bakllava、blackened/llama-3-8b-gpt-4o-ru1.0:latest、gemma2:27b、llava-llama3。同时qwen2-vl模型因本地服务不支持、下载报错无法使用。

## 可能原因
当前线程未明确标注具体原因，需结合实际运行环境与模型加载配置排查。

## 排查步骤
1. 确认本地模型服务的运行状态与端口配置是否正常。
2. 核对FastGPT调用本地模型的参数与模型名称的匹配一致性。
3. 测试不同多模态模型的适配性，记录各模型的识别表现。

## 解决与验证
可尝试使用minicpm-v:8b-2.6-fp16模型，该模型的识别效果优于llava:34b。部署该模型至本地服务后，在FastGPT中配置调用该模型，即可测试图片识别任务并验证效果。

> 来源: [FastGPT GitHub issue #2792](https://github.com/labring/FastGPT/issues/2792)
