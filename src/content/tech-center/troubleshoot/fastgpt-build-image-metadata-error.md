---
title: 解决FastGPT打包镜像加载Docker镜像元数据失败问题
slug: /zh/troubleshoot/fastgpt-build-image-metadata-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2569
source_type: GitHub issue
---

# 解决FastGPT打包镜像加载Docker镜像元数据失败问题

## 现象
在执行FastGPT镜像打包流程时，终端输出包含 `ERROR [internal] load metadata for docker.io/library/node:20.14.0-alpine` 的错误信息，导致镜像打包无法继续完成。

## 可能原因
该问题的可能原因为网络连接异常，无法正常拉取Docker镜像元数据。

## 排查步骤
1.  验证当前网络连通性，可通过访问公开网络资源确认网络是否正常。
2.  重试镜像打包操作，观察错误是否复现。
3.  需按实际环境确认是否存在网络限制或相关配置问题。

## 解决与验证
可尝试多次重试镜像打包操作。若存在网络限制或相关配置需求，需按实际环境调整后重新尝试。验证方式为重新执行镜像打包流程，确认镜像元数据加载错误不再出现，镜像打包流程顺利完成。

> 来源: [FastGPT GitHub issue #2569](https://github.com/labring/FastGPT/issues/2569)
