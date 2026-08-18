---
title: 使用Docker Compose部署FastGPT的完整操作步骤与配置说明
slug: /zh/tutorial/fastgpt-docker-compose-deploy-2
page_type: 教程/部署
source: https://doc.fastgpt.cn/zh-CN/self-host
source_type: 官方文档
---

# 使用Docker Compose部署FastGPT的完整操作步骤与配置说明

## 部署前置与架构说明
使用Docker Compose部署FastGPT需具备基础的网络与容器工具知识，需了解端口、防火墙配置，提前安装Docker及Docker Compose。本次部署的核心组件包括：MongoDB存储非向量类数据，PgVector/Milvus/Oceanbase/SeekDB存储向量数据，AIProxy聚合AI API调用。根据向量索引量选择对应向量库：PgVector适合5000万以下索引量，单节点最低配置2c4g，推荐配置2c8g；Milvus适合亿级以上向量场景；SeekDB基于MySQL协议，支持1536维向量检索与HNSW索引。

## 快速部署操作步骤
1.  准备容器环境：Linux环境可执行以下命令安装Docker与Docker Compose v2.20.3版本：
    ```bash
    curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
    systemctl enable --now docker
    curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    docker -v && docker compose -v
    ```
    MacOS可使用Orbstack，Windows推荐通过WSL 2安装Docker，需将数据存储在Linux文件系统以避免兼容问题。
2.  获取配置文件：可选择交互式脚本部署，在Linux/MacOS/WSL环境执行：
    ```bash
    bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)
    ```
    脚本会自动生成root登录密码、服务间Token等密钥，配置S3与MCP访问地址，检测Docker socket路径，执行后需妥善保存输出的root密码。也可手动下载对应向量库的docker-compose.yml文件，再通过本地install.sh模式生成最终配置。

## 部署注意事项
部署过程中需注意：生成的docker-compose.yml文件需妥善保存，后续升级需基于该文件调整，不可直接丢弃生成的密码与密钥。若使用Zilliz Cloud向量库，无需占用本地资源。若出现模型调用问题，需先通过OneAPI测试校验API可用性，再排查向量库连接或配置问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host)
