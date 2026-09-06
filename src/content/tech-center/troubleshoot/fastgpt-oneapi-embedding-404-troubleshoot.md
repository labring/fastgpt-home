---
title: 解决FastGPT私有部署版无法调用One-API渠道的Embedding模型问题
slug: /zh/troubleshoot/fastgpt-oneapi-embedding-404-troubleshoot
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1865
source_type: GitHub issue
---

# 解决FastGPT私有部署版无法调用One-API渠道的Embedding模型问题

## 现象
FastGPT私有部署4.8.4版本中，无法正常调用One-API渠道的Embedding模型，渠道测试返回404错误。直接通过docker部署的m3e模型接口可正常生成向量。尝试将One-API渠道的URL替换为`http://host.docker.internal:6008/v1/embeddings`等配置，仍返回404错误，使用其他Embedding模型也出现相同问题。

## 可能原因
结合问题表现，可能的原因包括：
1.  FastGPT中One-API渠道的基础URL、接口路径或访问密钥配置有误；
2.  容器部署环境下，FastGPT容器无法正常访问One-API服务的网络路径；
3.  One-API后台的Embedding渠道配置与FastGPT的调用格式不匹配。

## 排查步骤
1.  直接通过终端请求One-API的Embedding接口，验证接口可用性。例如执行命令：`curl -X POST "One-API基础URL/v1/embeddings" -H "Authorization: Bearer 你的密钥" -d '{"input": ["测试文本"], "model": "模型名称"}'`，确认返回正常的向量结果。
2.  检查FastGPT内One-API渠道的配置参数：确认基础URL、接口路径、密钥与One-API后台的渠道配置完全一致，避免遗漏接口路径后缀。
3.  验证容器网络访问权限：如果是docker部署的FastGPT，尝试使用`host.docker.internal`作为主机地址，或切换为host网络模式，确认容器可以正常访问One-API服务。
4.  核对当前FastGPT版本（4.8.4）的官方文档，确认是否存在Embedding渠道调用的已知适配问题。

## 解决与验证
根据排查结果针对性修复：
1.  若配置参数有误，修正基础URL、接口路径和密钥后，重新保存渠道配置并发起测试。
2.  若为网络访问问题，调整容器网络配置，确保FastGPT容器可以正常连通One-API服务。
3.  验证方式：在FastGPT的渠道测试页面发起Embedding测试，确认返回200状态码和正常的向量数据，同时可通过实际文档向量化流程验证功能正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1865)
