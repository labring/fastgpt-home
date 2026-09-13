---
title: 解决FastGPT安装时etcd镜像拉取失败的问题
slug: /zh/glossary/fastgpt-install-etcd-image-pull-failed
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/1969
source_type: 官方文档
---

# 解决FastGPT安装时etcd镜像拉取失败的问题

## 一句话定义
该问题指在FastGPT安装过程中，拉取指定容器镜像时出现的网络连接失败报错。
## 在FastGPT里怎么用
当出现该报错时，可尝试更换镜像拉取地址。本次报错涉及的镜像为quay.io/coreos/etcd:v3.5.5，完整报错文本为`error pulling image configuration: download failed after attempts=6: dialing cdn03.quay.io:443 container via direct connection because app settings has no HTTPS proxy: connecting to 104.18.37.147:443: dial tcp 104.18.37.147:443: connectex: No connection could be made because the target machine actively refused it.` 用户在反馈中询问是否有其他镜像地址可供使用，可通过更换镜像仓库的方式尝试解决该问题。
## 容易搞错的地方
部分用户会将该报错归因于全局网络中断，实际原因为未配置HTTPS代理，导致直接连接cdn03.quay.io的443端口失败。重启网络或更换本地网络环境无法解决该问题，需配置HTTPS代理或更换镜像拉取地址。
> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2400)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1969)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
