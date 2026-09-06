---
title: 解决FastGPT拉取阿里云容器镜像超时报错问题
slug: /zh/troubleshoot/fastgpt-aliyun-registry-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/56
source_type: GitHub issue
---

# 解决FastGPT拉取阿里云容器镜像超时报错问题

## 现象
出现容器镜像拉取报错：Error response from daemon: Get "https://registry.cn-hangzhou.aliyuncs.com/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)。配置DNS等基础网络参数后仍失败，尝试多篇公开教程中的解决方法仍未解决，ping registry.cn-hangzhou.aliyuncs.com正常，但curl https://registry.cn-hangzhou.aliyuncs.com/v2/无法连通。

## 可能原因
需按实际环境确认，该问题由容器拉取镜像时的连接超时导致，且已配置的基础网络参数未有效解决该问题。

## 排查步骤
1.  执行 ping registry.cn-hangzhou.aliyuncs.com，验证基础网络连通性。
2.  执行 curl https://registry.cn-hangzhou.aliyuncs.com/v2/，验证镜像仓库接口的连通性。
3.  检查已配置的DNS等网络参数，确认配置已正确生效。

## 解决与验证
官方计划同步镜像至多仓库以解决拉取问题。临时可使用阿里云镜像仓库地址拉取镜像，例如registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-admin:latest。验证方式为执行镜像拉取命令，确认无超时报错。

> 来源: [FastGPT GitHub issue #56](https://github.com/labring/FastGPT/issues/56)
