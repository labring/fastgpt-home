---
title: FastGPT 4.6.8版本对接智普Embedding-2报API 404的排错指南
slug: /zh/troubleshoot/fastgpt-zhipu-embedding-404-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/967
source_type: GitHub issue
---

# FastGPT 4.6.8版本对接智普Embedding-2报API 404的排错指南

## 现象
用户使用FastGPT 4.6.8私有部署版本，在vectorModels配置项中添加智普文字向量模型。完成知识库创建并成功导入文档后，执行创建索引操作时，系统报Embedding API 404错误。用户同时反馈，在oneapi中创建智普渠道时，渠道选项列表内没有Embedding-2模型，但渠道测试可以正常通过。相关截图显示接口调用返回404状态码。

## 可能原因
1.  FastGPT的vectorModels配置中，智普Embedding-2的模型标识、接口参数与实际调用要求不匹配。
2.  oneapi创建的智普渠道未配置支持Embedding-2模型，导致接口调用路径错误。
3.  其他未明确的配置项异常，需按实际环境确认。

## 排查步骤
1.  打开FastGPT的配置文件，查看vectorModels中智普Embedding-2的配置参数，确认模型标识、接口地址、密钥等信息是否正确。
2.  登录oneapi管理后台，查看已创建的智普渠道，确认渠道支持的模型列表中是否包含Embedding-2。
3.  在oneapi中单独测试智普Embedding-2的接口调用，确认接口可以正常返回向量结果。
4.  查看FastGPT的运行日志，提取Embedding API 404的具体请求信息，定位错误发生的具体节点。

## 解决与验证
若oneapi渠道未显示Embedding-2选项，需按oneapi的配置规则添加对该模型的支持，确保渠道可以正确调用Embedding-2接口。调整FastGPT的vectorModels配置，确保模型标识与oneapi中配置的模型标识完全一致。重新创建知识库并执行索引创建操作，观察是否不再报Embedding API 404错误。验证知识库的文档检索功能，确认向量模型调用正常，无报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/967)
