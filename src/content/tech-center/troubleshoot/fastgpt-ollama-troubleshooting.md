---
title: 解决FastGPT结合Ollama的常见问题
slug: /zh/troubleshoot/fastgpt-ollama-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4215
source_type: GitHub issue
---

# 解决FastGPT结合Ollama的常见问题

## 现象
使用FastGPT搭配Ollama部署的模型时，存在三类常见异常。第一类为引用知识库内容后回答未达预期，单独向模型询问问答与参考信息时结果正常。第二类为知识库中的图片无法在FastGPT输出中展示，使用其他方式加载模型时可正常展示图片。第三类为知识库检索异常，存在索引过大的问题。

## 可能原因
结合线程内的信息，异常原因包含三类。第一类为Ollama运行模型的上下文token参数配置不足，默认值为2048，无法满足大尺寸知识库的检索需求。第二类为知识库在处理初期，其中的图片被系统自动清理。第三类为大模型未遵循指令，引用知识库图片时使用了绝对路径，导致无法正常展示。

## 排查步骤
1. 检查Ollama运行模型的上下文token参数配置情况。
2. 确认知识库中的图片在处理流程中未被自动清理。
3. 验证大模型在引用知识库图片时的路径格式是否符合要求。

## 解决与验证
针对上下文token参数不足的问题，可通过修改Ollama运行模型的最大token参数解决。在modelfile中添加PARAMETER num_ctx 8192，重新创建新模型即可生效。针对知识库图片被自动清理的问题，需按实际环境确认处理流程。针对大模型引用图片路径异常的问题，需调整模型提示词，纠正图片引用的路径格式。验证时，可通过查看模型上下文长度确认参数生效，同时验证知识库检索功能恢复正常，图片可正常在输出中展示。

> 来源: [FastGPT GitHub issue #4215](https://github.com/labring/FastGPT/issues/4215)
