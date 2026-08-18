---
title: FastGPT Docker Compose部署的配置方法与操作步骤
slug: /zh/deploy/fastgpt-docker-compose-deploy
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker
source_type: 官方文档
---

# FastGPT Docker Compose部署的配置方法与操作步骤

## 部署架构与选型建议
FastGPT Docker Compose部署包含核心组件：MongoDB用于存储非向量类数据，PgVector/Milvus/Oceanbase/SeekDB用于存储向量数据，AIProxy用于聚合各类AI API并支持多模型调用。根据向量索引量选择合适的向量库：PgVector轻量适配，适合知识库索引量在5000万以下，单节点最低配置为2c4g，推荐配置2c8g；100万组向量最低配置4c8g50GB，推荐4c16g50GB；500万组向量最低配置8c32g200GB，推荐16c64g200GB。Milvus适合亿级以上向量场景，可参考官方推荐配置；Zilliz Cloud为全托管SaaS向量服务，无需占用本地资源；SeekDB基于MySQL协议，兼容OceanBase，支持1536维向量检索、内置HNSW索引算法，提供批量插入优化与连接池管理。

## 前置环境准备
部署需掌握基础网络知识（端口、防火墙）及Docker、Docker Compose基础知识。Linux环境下可通过官方脚本安装Docker：`curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun`，随后启用并启动服务：`systemctl enable --now docker`；安装指定版本Docker Compose：`curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose`，添加执行权限`chmod +x /usr/local/bin/docker-compose`，验证安装执行`docker -v`和`docker compose -v`，若执行失败可自行排查。Mac可通过Homebrew安装Orbstack，或使用WSL2后端在Windows部署Docker Desktop，也可在WSL2中安装命令行版Docker。

## 快速部署步骤
在Linux/MacOS/Windows WSL环境下，可通过交互式脚本快速部署：执行命令`bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)`，脚本将自动完成下载docker-compose.yml、引导选择S3与MCP外部访问地址、随机生成root登录密码、服务间Token、应用密钥与组件密码、自动检测并替换宿主机Docker socket挂载路径等操作。执行完成后终端会输出本次生成的root登录密码，需妥善保存，后续升级需基于生成的docker-compose.yml调整配置，请勿直接丢弃密码与密钥。如需固定使用特定配置文件，可手动下载对应向量库的配置文件，例如PgVector国内镜像执行`curl -fsSL https://doc.fastgpt.cn/deploy/docker/v4.15/cn/docker-compose.pg.yml -o docker-compose.source.yml`，再通过本地install.sh模式生成最终配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
