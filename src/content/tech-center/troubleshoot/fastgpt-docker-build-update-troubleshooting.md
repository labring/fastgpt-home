---
title: 解决FastGPT Docker镜像构建与版本更新异常问题
slug: /zh/troubleshoot/fastgpt-docker-build-update-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/159
source_type: GitHub issue
---

# 解决FastGPT Docker镜像构建与版本更新异常问题

## 现象
出现两类异常：其一，使用run.sh部署后仍为老版本，需邮件注册登录，无法使用新版直接root登录的功能，且无法使用高级编排功能；其二，执行`docker build --build-arg name=app -t fastgpt:latest .`构建镜像时，构建过程在27/32步骤中断，总耗时717.8秒，加载上下文耗时8.3秒传输299.53MB数据，卡在`[builder  1/10] FROM docker.io/library/node:current-alpine`环节，且执行`RUN pnpm --filter=app run build`步骤时报错。

## 可能原因
1. 部署过程存在缓存，导致镜像未更新至最新版本；2. 镜像构建时拉取基础镜像或加载上下文耗时过长，或构建步骤超时；3. 部署配置文件未使用官方最新版本，导致版本未同步。

## 排查步骤
1. 确认部署使用的docker-compose.yml是否基于官方仓库https://github.com/labring/FastGPT/tree/main/files/deploy/fastgpt中的文件修改；
2. 查看镜像构建的完整日志，定位中断的具体环节；
3. 排查是否存在部署缓存导致镜像版本未更新。

## 解决与验证
针对版本更新异常：确保使用官方最新的docker-compose.yml文件进行部署，若怀疑存在缓存，可重新拉取基础镜像并重新执行部署流程。针对镜像构建报错：在执行`docker build --build-arg name=app -t fastgpt:latest .`前，确认构建上下文的文件完整性，检查`RUN pnpm --filter=app run build`步骤的相关配置。验证方式：部署后检查登录方式是否支持root直接登录，或构建镜像时无中断报错。

> 来源: [FastGPT GitHub issue #159](https://github.com/labring/FastGPT/issues/159)
