---
title: 解决FastGPT知识库上传后未配置模型的歧义与调用问题
slug: /zh/troubleshoot/fastgpt-knowledge-base-model-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4275
source_type: GitHub issue
---

# 解决FastGPT知识库上传后未配置模型的歧义与调用问题

## 现象
直接文档问答场景中，知识库上传文档后未配置问答模型，易引发歧义；使用提取QA、补充索引或自定义索引功能时，未配置模型会导致API调用需额外传递模型参数。

## 可能原因
未完成知识库对应功能的模型配置，包括问答模型、QA提取、补充索引及自定义索引所需的模型绑定；未在系统配置中完成模型参数的预设。

## 排查步骤
1. 进入知识库管理页面，检查是否已配置问答模型、QA提取、补充索引及自定义索引所需的模型。
2. 查看API调用日志，确认是否存在未传递模型参数的相关问题，具体报错需按实际环境确认。
3. 核对文档上传后的处理流程，确认是否跳过了模型配置环节。

## 解决与验证
完成知识库的模型配置，绑定问答模型、QA提取、补充索引及自定义索引所需的模型。若未配置模型，需在API调用时显式传递模型参数。验证时，上传文档后直接发起问答，确认无歧义；调用API时无需额外传递模型参数即可正常执行。

> 来源: [FastGPT GitHub issue #4275](https://github.com/labring/FastGPT/issues/4275)
