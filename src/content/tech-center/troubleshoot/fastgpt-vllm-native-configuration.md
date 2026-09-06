---
title: 解决FastGPT无法原生接入vllm部署模型的问题
slug: /zh/troubleshoot/fastgpt-vllm-native-configuration
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5286
source_type: GitHub issue
---

# 解决FastGPT无法原生接入vllm部署模型的问题

## 现象
在FastGPT中使用vllm部署的模型时，无法直接原生接入，需借助第三方工具完成接入。

## 可能原因
vllm部署的模型兼容OpenAI格式，但多模型部署时需使用独立端口；FastGPT原生模型配置需手动调整自定义地址，未直接内置vllm的快速接入流程。

## 排查步骤
1. 确认vllm部署的模型已正常启动，且监听了指定的端口。
2. 进入FastGPT的模型配置页面，找到自定义OpenAI格式模型的配置入口。
3. 记录vllm模型的完整访问地址（包含部署主机地址与端口）。
4. 若部署多个vllm模型，确认每个模型使用的端口互不重复。

## 解决与验证
1. 在FastGPT的模型配置中，选择自定义OpenAI格式的模型类型。
2. 将vllm模型的完整访问地址（如http://部署主机IP:端口）填入自定义API地址字段。
3. 配置模型的访问密钥，若vllm未启用密钥校验，可留空或填入任意字符串。
4. 保存配置后发起测试对话，验证模型能否正常返回响应。验证成功则说明接入完成。

> 来源: [FastGPT GitHub issue #5286](https://github.com/labring/FastGPT/issues/5286)
