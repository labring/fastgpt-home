---
title: 解决FastGPT私有部署Redis镜像拉取失败的问题
slug: /zh/troubleshoot/fastgpt-redis-pull-error-resolution
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4578
source_type: GitHub issue
---

# 解决FastGPT私有部署Redis镜像拉取失败的问题

## 现象
FastGPT私有部署4.9.4及4.9.5版本中，使用deploy/docker/docker-compose-(pgvector/milvus/zilliz).yml配置模板启动服务时，拉取官方Redis镜像redis:7.2-alpine失败。尝试切换为阿里云镜像registry.cn-hangzhou.aliyuncs.com/fastgpt/redis时，出现报错信息：
```bash
Error response from daemon: pull access denied for registry.cn-hangzhou.aliyuncs.com/fastgpt/redis, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
```

## 可能原因
官方Redis镜像redis:7.2-alpine无法正常拉取，尝试替换为指定的阿里云镜像时，该镜像仓库不存在或无访问权限，导致拉取失败。

## 排查步骤
1. 确认FastGPT私有部署版本为4.9.4或4.9.5。
2. 查看对应docker-compose配置文件，确认Redis镜像地址为redis:7.2-alpine。
3. 执行docker pull redis:7.2-alpine命令，验证官方镜像拉取是否失败。
4. 若尝试替换镜像源，确认目标镜像仓库的正确性与访问权限。

## 解决与验证
修改deploy/docker/docker-compose-(pgvector/milvus/zilliz).yml配置文件，将Redis镜像地址替换为国内可正常拉取的镜像源。执行docker-compose up -d命令，验证Redis容器成功启动，无镜像拉取相关报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4578)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
