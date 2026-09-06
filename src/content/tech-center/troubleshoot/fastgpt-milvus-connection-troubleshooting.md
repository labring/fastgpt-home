---
title: FastGPT连接Milvus向量库失败的排查与解决方法
slug: /zh/troubleshoot/fastgpt-milvus-connection-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1839
source_type: GitHub issue
---

# FastGPT连接Milvus向量库失败的排查与解决方法

## 现象
FastGPT在docker-compose环境中配置Milvus向量库连接后出现报错，本地Milvus服务本身可正常使用且外部可直接操作。注销Milvus连接配置后Mongo连接恢复正常，启用Milvus连接后即出现报错。使用127.0.0.1、自定义域名均无法完成连接，部分场景下日志先显示`Milvus connected`，随即抛出`error-> mongo connect error Error: 14 UNAVAILABLE: No connection established. Last error: null`及相关gRPC调用栈报错。

## 可能原因
1.  容器网络限制：容器内无法通过127.0.0.1访问宿主机或外部部署的Milvus服务；
2.  向量库连接异常会连带触发Mongo连接报错，实际故障根源为Milvus连接失败。

## 排查步骤
1.  验证Milvus服务本身正常运行，通过外部直接操作确认服务可用性；
2.  检查FastGPT配置的Milvus连接地址，避免使用127.0.0.1这类容器内无法解析的地址；
3.  查看FastGPT运行日志，提取连接错误相关的gRPC调用栈信息；
4.  临时注销Milvus连接配置，启动服务验证Mongo连接是否正常，以此区分故障来源。

## 解决与验证
使用服务器实际IP作为Milvus连接地址进行配置。验证方式：重启FastGPT服务，检查日志是否出现Milvus连接成功提示，且无Mongo连接报错信息。

> 来源: [FastGPT GitHub issue #1839](https://github.com/labring/FastGPT/issues/1839)
