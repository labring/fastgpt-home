---
title: 解决FastGPT调用本地文件创建集合接口报404错误的问题
slug: /zh/troubleshoot/fastgpt-localfile-create-api-404
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1785
source_type: GitHub issue
---

# 解决FastGPT调用本地文件创建集合接口报404错误的问题

## 现象
调用FastGPT的`http://localhost:3000/api/core/dataset/collection/create/localFile`接口创建本地文件集合时，返回404错误。该请求为POST类型的multipart/form-data请求，需携带file文件参数与data参数，示例请求格式如issue中提供的curl命令所示。

## 可能原因
1.  请求的接口路径与服务实际注册的路由不匹配
2.  FastGPT服务监听的端口并非默认的3000，导致请求地址无效
3.  服务启动时未成功加载该接口的路由配置

## 排查步骤
1.  核对请求的接口路径是否为`http://localhost:3000/api/core/dataset/collection/create/localFile`，与issue中提供的路径完全一致。
2.  查看FastGPT服务的启动日志，确认服务监听的端口是否为3000。若修改过服务端口，需将请求地址中的3000替换为实际监听的端口号。
3.  检查服务启动日志中是否存在路由加载失败的报错，确认该接口已成功注册到服务中。
4.  核对请求的HTTP方法为POST，且请求头包含正确的Authorization、Content-Type等参数，与示例中的请求格式匹配。

## 解决与验证
根据排查结果修正问题：若接口路径不匹配，调整为服务实际注册的路由地址；若端口不符，替换请求地址中的端口为服务实际监听端口；若路由未加载，重启服务以重新加载配置。验证方式为重新发起符合示例格式的POST请求，确认不再返回404错误，且接口成功创建本地文件集合。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1785)
