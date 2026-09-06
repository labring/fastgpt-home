---
title: 解决FastGPT中Mongoose连接MongoDB超时10000ms的问题
slug: /zh/troubleshoot/fastgpt-mongoose-mongodb-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4926
source_type: GitHub issue
---

# 解决FastGPT中Mongoose连接MongoDB超时10000ms的问题

## 现象
FastGPT服务启动或运行过程中，抛出MongooseError: Connection operation buffering timed out after 10000ms的报错信息。该场景下MongoDB数据库运行在同一服务器，通过navcat可正常连接数据库，执行telnet localhost 27017命令后返回Connected to localhost，基础网络连通性正常。

## 可能原因
FastGPT服务与MongoDB数据库的网络连接通路存在异常，或服务的数据库连接配置参数与实际数据库配置不匹配，导致无法建立稳定的数据库连接，触发连接超时报错。

## 排查步骤
1. 执行telnet 目标MongoDB数据库地址 端口命令，例如telnet localhost 27017，验证基础网络连通性，确认返回连通性正常的提示。
2. 使用navcat等数据库客户端工具测试MongoDB连接，确认数据库服务正常可用。
3. 使用mongo compass或mongosh工具连接目标MongoDB实例，验证数据库连接的可用性。
4. 核对FastGPT的MongoDB连接配置信息，确保参数与数据库实际配置保持一致。

## 解决与验证
修复FastGPT服务与MongoDB数据库之间的网络连接问题，确保服务可以正常访问目标数据库。完成修复操作后，重新启动FastGPT服务，确认不再抛出MongooseError: Connection operation buffering timed out after 10000ms的报错，且服务可正常启动并运行。

> 来源: [FastGPT GitHub issue #4926](https://github.com/labring/FastGPT/issues/4926)
