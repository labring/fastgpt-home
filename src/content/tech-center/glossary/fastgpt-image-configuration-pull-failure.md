---
title: 解决FastGPT部署过程中镜像配置拉取失败的问题
slug: /zh/glossary/fastgpt-image-configuration-pull-failure
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1797
source_type: 官方文档
---

# 解决FastGPT部署过程中镜像配置拉取失败的问题

## 一句话定义
镜像配置（image configuration）指Docker拉取FastGPT部署所需容器镜像时，需获取的镜像元数据配置文件，拉取失败会触发如`error pulling image configuration`类的部署中断报错。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT的Docker Compose部署流程中，需拉取如`quay.io/coreos/etcd:v3.5.5`等指定镜像，执行`docker-compose up -d`命令时会触发镜像配置拉取操作，常见报错文本包括`error pulling image configuration: Get https://production.cloudflare.docker.com/...: dial tcp 157.240.1.50:443: i/o timeout`和`error pulling image configuration: download failed after attempts=6: dialing cdn03.quay.io:443...`。若拉取超时，需排查网络连通性或更换镜像仓库地址。

## 容易搞错的地方
易将镜像配置拉取失败归因于镜像本身不存在，实际多为网络无法访问目标镜像仓库。如报错中出现的`dial tcp 157.240.1.50:443: i/o timeout`为网络连接超时，`connectex: No connection could be made because the target machine actively refused it`为目标端口连接被拒绝。此外，默认拉取尝试次数有限，如报错中显示`attempts=6`后下载失败，需及时处理超时问题。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1797)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
