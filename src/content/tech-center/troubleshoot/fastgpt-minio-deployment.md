---
title: 说明FastGPT部署无需MinIO的配置方案
slug: /zh/troubleshoot/fastgpt-minio-deployment
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5262
source_type: GitHub issue
---

# 说明FastGPT部署无需MinIO的配置方案

## 现象
部署FastGPT时发现需依赖MinIO存储服务，无法直接沿用旧版无MinIO的部署方式，希望获取无需MinIO的部署配置。

## 可能原因
FastGPT新版本已转向S3存储相关逻辑，MinIO作为常用的S3兼容部署方案，成为默认依赖的存储服务，因此新版本部署需配置MinIO。

## 排查步骤
1. 查阅目标FastGPT版本的官方部署仓库，获取对应版本的docker-compose.yml配置文件，例如v4.9.14版本的部署路径为https://github.com/labring/FastGPT/tree/v4.9.14/deploy/docker
2. 对比新版本与旧版本的docker-compose.yml文件，提取其中不包含MinIO相关服务的部署逻辑
3. 按提取的配置调整当前部署的配置文件，需按实际环境确认相关参数适配性

## 解决与验证
使用旧版本（如v4.9.14及更早版本）的docker-compose.yml配置文件进行部署，即可无需部署MinIO。启动部署后，确认应用无MinIO相关依赖报错且功能正常运行，即完成验证。

> 来源: [FastGPT GitHub issue #5262](https://github.com/labring/FastGPT/issues/5262)
