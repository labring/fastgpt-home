---
title: 解决FastGPT中多模型调用时文档内容无法传递的问题
slug: /zh/troubleshoot/fastgpt-multi-model-doc-transfer-fail
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2759
source_type: GitHub issue
---

# 解决FastGPT中多模型调用时文档内容无法传递的问题

## 现象
在FastGPT 4.8.10-fix版本中，配置多个本地部署模型的AI应用内，文档解析模块可正常提取PDF内容，但所有配置的模型均提示未收到文档内容。当文档内容减少至约1000字时，模型可正常接收并处理文档内容。

## 可能原因
存在两种潜在的触发因素。第一，本地部署的模型工具不支持system字段，或该字段在传递过程中被过滤。第二，本地模型部署时，System prompt字段未被正确传入请求中。

## 排查步骤
1.  提取FastGPT向外发送的完整调试信息，确认信息中包含《quote></quote>包裹的文档内容。
2.  对比本地部署与云端部署的调试信息，确认两者传递的所有数据均一致。
3.  调试本地模型部署工具，获取其实际接收的请求内容。
4.  检查本地模型部署的参数配置，确认system prompt字段的传递状态。

## 解决与验证
若检测到system字段未被正确传递或被过滤，调整本地模型部署工具的配置，确保该字段可正常传入请求。完成配置调整后，恢复原文档内容长度，测试模型是否可正常接收并总结文档内容。若仍存在异常，可通过调试工具获取模型接收的实际请求数据，进一步排查字段缺失或过滤问题。

> 来源: [FastGPT GitHub issue #2759](https://github.com/labring/FastGPT/issues/2759)
