---
title: 为FastGPT配置接入ChatGLM2与m3e-large私有化模型的详细操作步骤
slug: /zh/reference/fastgpt-chatglm2-m3e-integration
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/custom-models/chatglm2-m3e
source_type: 官方文档小节
---

# 为FastGPT配置接入ChatGLM2与m3e-large私有化模型的详细操作步骤

## 结论
本页提供将FastGPT接入ChatGLM2和m3e-large私有化模型的详细操作步骤，属于FastGPT本地模型使用的配置范畴，适用于Docker Compose部署、Sealos部署及本地开发等自部署场景。完成配置后，可在FastGPT中使用该组合模型完成对话与向量相关任务。

## 具体怎么做
1. 进入FastGPT自部署环境的模型配置方案页面。
2. 按照页面指引先完成ChatGLM2-6B模型的接入配置。
3. 继续完成M3E向量模型的接入配置。
4. 将两个已接入的模型组合为ChatGLM2-m3e模型，完成整体接入流程。

## 注意事项
需确保已完成ChatGLM2-6B与M3E模型的本地部署准备，否则无法完成接入流程。配置过程需严格遵循FastGPT官方的模型接入规范，不可随意跳过前置步骤。仅支持ChatGLM2与m3e-large的组合接入，其他模型组合无法通过该流程完成配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/custom-models/chatglm2-m3e)
