---
title: 使用Docker Compose完成FastGPT自部署的操作与配置说明
slug: /zh/deploy/fastgpt-docker-compose-deploy-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker
source_type: 官方文档
---

# 使用Docker Compose完成FastGPT自部署的操作与配置说明

### 部署前提与架构说明
使用Docker Compose部署FastGPT需具备基础网络、Docker与Docker Compose基础知识。其部署架构包含三类核心组件：MongoDB存储非向量类数据，PgVector、Milvus等组件存储向量数据，AIProxy用于聚合各类AI API并支持多模型调用。不同向量库有明确适用边界：PgVector轻量，适合知识库索引量5000万以下场景；Milvus在亿级以上向量场景性能更优秀；SeekDB基于MySQL协议，兼容OceanBase，支持1536维向量检索与HNSW索引算法。

### 快速部署操作步骤
1.  完成Docker与Docker Compose环境安装：Linux环境下可执行`curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun`安装Docker，随后启用并启动服务`systemctl enable --now docker`；安装Docker Compose v2.20.3版本，执行`curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose`，添加执行权限`chmod +x /usr/local/bin/docker-compose`，并通过`docker -v`和`docker compose -v`验证安装。Windows环境推荐使用WSL2后端或直接在WSL2中安装命令行版Docker，也可使用Orbstack工具。
2.  获取部署配置：可通过交互式脚本快速生成配置，在Linux/MacOS/Windows WSL环境执行`bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)`，脚本会自动下载配置文件、引导配置S3与MCP地址、随机生成登录密码与密钥并写入配置，执行完成后需妥善保存终端输出的root登录密码，以及生成的`docker-compose.yml`文件。

### 部署注意事项
部署时需注意：将源代码与数据绑定到Linux容器时，应存储在Linux文件系统而非Windows文件系统；若使用Zilliz Cloud向量库，无需占用本地硬件资源，无需关注本地配置。不同向量库的硬件配置需匹配业务规模：100万组向量的最低配置为2c4g，500万组向量推荐8c32g、200GB存储。若遇到模型相关问题，需先通过OneAPI测试校验。升级部署时需基于已生成的`docker-compose.yml`文件调整，避免丢失已生成的密码与密钥。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
