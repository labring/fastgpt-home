---
title: FastGPT V4.7升级至V4.8.1后数据不展示的排查方法
slug: /zh/troubleshoot/fastgpt-upgrade-data-not-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1651
source_type: GitHub issue
---

# FastGPT V4.7升级至V4.8.1后数据不展示的排查方法

## 现象
用户通过docker方式将FastGPT从V4.7升级至V4.8.1后，出现应用、插件、知识库的所有信息均不展示的问题，但平台内存储的资料实际存在。升级步骤为执行`docker pull ghcr.io/labring/fastgpt:latest`后，运行`docker compose down && docker compose up -d`完成重启。

## 可能原因
需结合实际部署环境确认的可能因素包括：升级过程中镜像拉取异常，导致服务仍运行旧版本；新旧版本的配置或存储逻辑存在不兼容；升级未执行必要的初始化或迁移操作。

## 排查步骤
1.  确认当前运行的FastGPT镜像版本：执行`docker images | grep fastgpt`，查看镜像标签是否为V4.8.1，确认是否成功拉取新版本镜像。
2.  检查docker compose配置文件：确认配置文件中引用的镜像标签是否为`ghcr.io/labring/fastgpt:latest`或指定的V4.8.1版本，避免指向旧版本镜像。
3.  完整重启服务：执行`docker compose down`后重新运行`docker compose up -d`，确保服务完全加载新镜像配置。
4.  查看服务启动日志：执行`docker compose logs fastgpt`，查看日志中的报错信息，定位具体异常点。

## 解决与验证
若排查发现镜像拉取异常，重新执行`docker pull ghcr.io/labring/fastgpt:latest`后重启服务即可。若为配置或存储逻辑不兼容，需同步更新对应配置项后重启服务。验证方式为重启服务后访问平台，确认应用、插件、知识库的信息可正常展示，存储的资料可正常加载。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1651)
