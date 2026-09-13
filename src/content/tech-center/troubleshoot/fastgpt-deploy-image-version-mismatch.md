---
title: 解决FastGPT部署镜像版本与发布包不一致的问题
slug: /zh/troubleshoot/fastgpt-deploy-image-version-mismatch
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4581
source_type: GitHub issue
---

# 解决FastGPT部署镜像版本与发布包不一致的问题

## 现象
1. 下载FastGPT 4.9.5版本安装包，进入deploy/docker/目录查看docker-compose配置文件，其中fastgpt镜像与fastgpt-sandbox镜像版本为4.9.4，oceanbase相关配置的版本为4.9.3。
2. aiproxy镜像使用ghcr.io/labring/aiproxy:v0.1.5时，切换至阿里云镜像源后版本变为0.1.3，全新部署后镜像版本与发布包标注的4.9.5版本不符。

## 可能原因
部署使用的docker-compose配置文件内的镜像版本未与发布包对应版本同步更新，aiproxy镜像版本与配置要求不匹配，导致部署后版本不一致。

## 排查步骤
1. 下载目标版本的FastGPT安装包，进入deploy/docker/目录，查看docker-compose配置文件中的镜像标签信息。
2. 对比配置文件中的镜像版本与发布包标注的版本号。
3. 核对aiproxy镜像的版本及镜像源信息，确认与配置要求是否一致。

## 解决与验证
修改docker-compose配置文件中的fastgpt、fastgpt-sandbox镜像版本为发布包对应版本，调整oceanbase相关配置的版本至匹配发布包的版本，修正aiproxy镜像的版本与镜像源配置。启动部署后，确认各服务的镜像版本与发布包版本一致，检查aiproxy镜像的版本匹配配置。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4581)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
