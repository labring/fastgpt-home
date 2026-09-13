---
title: 使用Docker启动FastGPT本地开发环境的操作指引
slug: /zh/deploy/start-fastgpt-local-dev-docker
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/dev
source_type: 官方文档
---

# 使用Docker启动FastGPT本地开发环境的操作指引

使用Docker启动FastGPT本地开发环境前，需先检查本地运行状态。若本地已通过Docker启动FastGPT服务，必须先关闭该服务，否则会出现端口冲突，导致后续启动失败。

## 启动开发依赖服务
执行以下步骤启动FastGPT的各类开发依赖服务：
1. 切换到项目的开发部署目录
```bash
cd FastGPT/deploy/dev
```
2. 后台运行Docker Compose配置的服务
```bash
docker compose up -d
```
> **警告**：1. 如果无法获取官方镜像，可以使用国内镜像版本的配置文件，执行命令`docker compose -f docker-compose.cn.yml up -d`。2. 连接Mongo数据库时，需在连接地址中增加`directConnection=true`参数，方可正常连接副本集数据库。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/dev)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
