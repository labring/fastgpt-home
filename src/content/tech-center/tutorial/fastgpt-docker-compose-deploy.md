---
title: FastGPT Docker Compose部署的配置与操作说明
slug: /zh/tutorial/fastgpt-docker-compose-deploy
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/self-host
source_type: 官方文档
---

# FastGPT Docker Compose部署的配置与操作说明

## 部署前置说明
部署FastGPT需掌握基础网络知识（端口、防火墙等）与Docker、Docker Compose基础知识。本次部署的核心架构包含三类组件：MongoDB用于存储除向量外的各类数据，Pgvector/Milvus/Oceanbase/SeekDB用于存储向量数据，AIProxy用于聚合各类AI API。不同向量库适配的场景与配置要求不同：Pgvector版本轻量，适合知识库索引量在5000万以下；Milvus版本适合亿级以上向量场景；SeekDB基于MySQL协议，兼容OceanBase协议，支持高效向量检索。

## 环境准备步骤
需提前安装Docker与Docker Compose。Linux环境下可执行以下命令完成安装：先安装Docker：`curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun`，再启用并启动Docker服务：`systemctl enable --now docker`；安装Docker Compose v2.20.3：`curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose`，添加执行权限：`chmod +x /usr/local/bin/docker-compose`，最后通过`docker -v`和`docker compose -v`验证安装。Mac环境推荐使用Orbstack，可通过Homebrew执行`brew install orbstack`或下载安装包安装。Windows环境建议使用WSL 2后端安装Docker Desktop，或在WSL 2中安装命令行版本Docker，且建议将源代码与数据绑定到Linux容器时存储在Linux文件系统中。

## 快速部署流程
可通过交互式脚本快速完成部署，在Linux/MacOS/Windows WSL环境下执行命令：`bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)`。脚本会自动完成以下操作：下载docker-compose.yml配置文件，引导选择S3与MCP的外部访问地址并写入配置，随机生成root登录密码、服务间Token、应用密钥和组件密码并写入配置，自动检测宿主机Docker socket路径并替换挂载路径。执行完成后终端会输出本次生成的root登录密码，需妥善保存，后续升级建议基于该文件调整配置，请勿丢失生成的密码与密钥。如需固定使用特定版本的docker-compose.yml，可手动下载对应数据库的配置文件与install.sh，再通过install.sh的本地compose模式生成最终配置。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host)
