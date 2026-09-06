---
title: 解决FastGPT私有部署docker build加载上下文超时问题
slug: /zh/troubleshoot/fastgpt-private-deploy-docker-build-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5751
source_type: GitHub issue
---

# 解决FastGPT私有部署docker build加载上下文超时问题

## 现象
用户在Windows环境下执行`docker build -t fastgpt-app -f projects/app/Dockerfile .`构建FastGPT私有部署镜像时，构建过程出现`ERROR [internal] load build context`错误，该步骤耗时47.5秒后失败。构建日志还包含加载`docker.io/library/node:21.7.1-alpine`镜像元数据耗时4.5秒、提取镜像sha256校验值等步骤的相关记录。

## 可能原因
构建过程中加载本地上下文的耗时超过默认超时阈值；拉取基础镜像`docker.io/library/node:21.7.1-alpine`的过程出现延迟，影响整体构建进度；需按实际环境确认是否存在其他影响构建的配置问题。

## 排查步骤
1.  确认执行构建命令时的当前工作目录，检查该目录下的文件情况
2.  手动执行`docker pull docker.io/library/node:21.7.1-alpine`，验证基础镜像能否正常拉取
3.  查看Docker构建的默认超时配置，确认加载上下文的允许耗时
4.  检查本地网络连接状态，确认是否存在网络波动或访问限制

## 解决与验证
1.  将无需参与构建的文件添加到`.dockerignore`文件中，精简构建上下文的体积
2.  配置合适的镜像加速源，优化基础镜像的拉取速度
3.  调整Docker构建的超时参数，延长加载上下文的允许时长
4.  重新执行`docker build -t fastgpt-app -f projects/app/Dockerfile .`命令，确认构建过程不再出现`ERROR [internal] load build context`错误，镜像构建成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5751)
