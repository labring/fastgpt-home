---
title: 解决FastGPT私有化部署arm架构镜像适配问题
slug: /zh/troubleshoot/fastgpt-arm-image-deployment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7125
source_type: GitHub issue
---

# 解决FastGPT私有化部署arm架构镜像适配问题

## 现象
用户在进行FastGPT私有化部署的过程中，发现所使用的镜像版本与部署主机的架构不匹配，同时不清楚FastGPT是否提供arm架构的部署镜像，导致无法完成适配部署。

## 可能原因
1. 部署主机的CPU架构为arm架构，而拉取的FastGPT镜像为非arm架构（如x86架构），镜像与主机架构不兼容，无法正常启动运行；
2. 用户未确认FastGPT官方是否提供arm架构的部署镜像，无法获取适配的镜像资源进行部署。

## 排查步骤
1. 确认部署主机的CPU架构，可通过执行`uname -m`命令查看，返回结果`aarch64`代表arm64架构，`x86_64`代表x86架构；
2. 核对当前使用的FastGPT镜像的架构信息，可通过`docker inspect <镜像名称> | grep Architecture`命令查看镜像对应的官方架构；
3. 对比镜像架构与部署主机架构，确认二者是否匹配。

## 解决与验证
若FastGPT官方提供arm架构的部署镜像，直接拉取对应arm架构的镜像文件，按照常规私有化部署流程完成部署即可；若未提供arm架构镜像，需按实际环境确认适配方案。验证部署是否成功的方式为：启动FastGPT容器后，检查容器运行状态无异常，且服务可正常访问、功能可用，即为问题解决。

> 来源：https://github.com/labring/FastGPT/issues/7125
