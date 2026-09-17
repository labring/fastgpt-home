---
title: 使用Docker Compose完成FastGPT自部署的操作指南
slug: /zh/deploy/fastgpt-docker-compose-deploy-pitfalls
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker
source_type: 官方文档
---

# 使用Docker Compose完成FastGPT自部署的操作指南

## 部署架构与选型说明
FastGPT的Docker Compose部署包含三类核心组件：MongoDB用于存储除向量外的各类数据，PgVector、Milvus、Oceanbase、SeekDB用于存储向量数据，AIProxy用于聚合各类AI API，模型问题可先通过OneAPI测试校验。不同向量库适配不同场景：PgVector轻量，适合知识库索引量5000万以下；Milvus在亿级以上向量场景性能更优秀；SeekDB基于MySQL协议，兼容OceanBase，支持1536维向量检索、内置HNSW索引算法、批量插入优化等功能。各向量库对应推荐配置可参考官方说明，例如PgVector测试配置最低为2c4g，100万组向量推荐配置为4c8g 50GB。

## 环境准备步骤
部署前需掌握基础网络知识（端口、防火墙）与Docker、Docker Compose基础知识。不同系统的环境准备方式略有差异：Linux环境下可通过官方脚本安装Docker，执行`curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun`，随后启用并启动Docker服务`systemctl enable --now docker`，再安装Docker Compose v2.20.3，执行`curl -L https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`并添加执行权限`chmod +x /usr/local/bin/docker-compose`。Mac环境推荐使用Orbstack，可通过Homebrew执行`brew install orbstack`安装。Windows环境建议使用WSL2后端安装Docker Desktop，或在WSL2中安装命令行版Docker，且建议将源代码与数据存储在Linux文件系统，避免兼容性问题。完成安装后可通过`docker -v`与`docker compose -v`验证版本。

## 正式部署流程
部署提供三种方式：一是通过AI Agent代部署，将提示词复制给对应Agent即可；二是使用交互式脚本部署，在Linux/MacOS/Windows WSL环境下执行`bash <(curl -fsSL https://doc.fastgpt.cn/deploy/install.sh)`，脚本会自动下载配置文件、引导配置S3与MCP外部访问地址、生成随机的root登录密码、服务间Token等密钥、检测宿主机Docker socket路径并调整挂载配置，执行完成后终端会输出root登录密码，需妥善保存，后续升级建议基于生成的配置文件调整；三是手动下载部署，可先下载对应向量库的docker-compose.yml文件与install.sh，通过脚本的本地compose模式生成最终配置。不同向量库的docker-compose.yml下载地址可参考官方文档，例如PgVector中国大陆镜像源对应docker-compose.pg.yml，全球镜像源同理。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
