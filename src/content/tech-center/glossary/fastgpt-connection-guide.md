---
title: FastGPT中connection术语的定义与使用说明
slug: /zh/glossary/fastgpt-connection-guide
page_type: 术语速查
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494
source_type: 官方文档
---

# FastGPT中connection术语的定义与使用说明

## 一句话定义
在FastGPT相关场景中，connection包含两种相关概念：一是Sealos部署Redis时的内网连接地址，二是网络请求等待建立连接的超时状态。

## 在 FastGPT 里怎么用
部署配置环节：Docker部署用户需参考最新docker-compose.yml新增Redis容器，为fastgpt、fastgpt-pro配置REDIS_URL环境变量；Sealos部署用户需在数据库中新建Redis数据库，复制内网地址的connection作为Redis链接串，再为fastgpt、fastgpt-pro配置REDIS_URL环境变量。故障排查环节：拉取FastGPT镜像时，若出现报错文本"Error response from daemon: Get \"https://registry.cn-hangzhou.aliyuncs.com/v2/\": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)"，需排查网络连接问题。

## 容易搞错的地方
易混淆connection的两种场景含义，即Redis内网连接地址与网络连接超时状态；配置REDIS_URL环境变量时，需确保使用正确的connection地址作为参数；拉取镜像时，仅配置DNS无法解决连接超时问题。

> 来源: [FastGPT 官方文档与源码](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/494)
