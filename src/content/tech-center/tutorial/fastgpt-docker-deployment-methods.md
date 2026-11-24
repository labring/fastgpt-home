---
title: FastGPT Docker版本部署配置与三种部署方法
slug: /zh/tutorial/fastgpt-docker-deployment-methods
page_type: 教程/部署
source: https://doc.fastgpt.cn/self-host
source_type: 官方文档小节
---

# FastGPT Docker版本部署配置与三种部署方法

# FastGPT Docker版本部署配置与三种部署方法

## 部署方式总览
FastGPT Docker版本的部署支持三种方式：AI Agent代部署、交互式脚本部署、手动下载部署。AI Agent代部署可将提示词`参考 https://doc.fastgpt.cn/deploy/SKILL.md 帮我部署 FastGPT Docker 版本`复制给你的Coding Agent，请求其参考https://doc.fastgpt.cn/deploy/SKILL.md 完成部署。交互式脚本部署与手动下载部署适用于自主操作场景，可根据自身环境与需求选择适配方案，其中交互式脚本部署支持在Linux、MacOS或Windows WSL环境执行，手动下载部署适合需要固定使用特定docker-compose.yml文件的场景。

## 可执行部署步骤
交互式脚本部署需在Linux/MacOS/Windows WSL环境执行。非交互模式必须指定`FASTGPT_FE_DOMAIN=https://fastgpt.example.com`（用户访问FastGPT的完整地址）、`FASTGPT_SANDBOX_PROXY_URL=wss://sandbox-proxy.example.com`（沙盒WebSocket地址），4.16版本还需指定`FASTGPT_SANDBOX_PREVIEW_PROXY_URL`，4.15版本仅需指定沙盒WebSocket地址。执行命令：`FASTGPT_DEPLOY_BASE_URL=https://doc.fastgpt.cn bash <( curl -fsSL https://doc.fastgpt.cn/deploy/install.sh`。脚本会自动完成docker-compose.yml下载、S3与MCP外部访问地址引导写入，随机生成root登录密码、服务间Token、应用密钥和组件密码，自动检测宿主机Docker socket路径并替换挂载路径。执行完成后请妥善保存终端输出的root密码及生成的docker-compose.yml文件，后续升级建议基于该文件调整配置。

## 手动部署与自定义镜像源
手动下载部署适用于需要固定使用特定docker-compose.yml文件的场景。以Pgvector中国大陆镜像源为例，执行命令：`curl -fsSL https://doc.fastgpt.cn/deploy/docker/v4.15/cn/docker-compose.pg.yml -o docker-compose.source.yml`。其他数据库可替换对应下载地址，如Oceanbase对应docker-compose.oceanbase.yml等。下载install.sh文件：`curl -fsSL https://doc.fastgpt.cn/deploy/install.sh -o install.sh`，执行`FASTGPT_LOCAL_COMPOSE_PATH=./docker-compose.source.yml bash install.sh`生成最终部署配置。完全离线环境需提前准备docker-compose.yml和install.sh，无法运行脚本则需手动修改DEFAULT_ROOT_PSW、服务Token、数据库密码、S3/MCP地址等配置。自定义镜像源部署时，先下载docker-compose.yml，修改所有image地址为私有镜像源地址，再执行本地compose模式命令。若启用Agent/Skill沙盒，还需替换沙盒相关镜像及AGENT_SANDBOX_SEALOS_IMAGE或AGENT_SANDBOX_OPENSANDBOX_IMAGE配置，具体参考OpenSandbox配置说明。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host)
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/deploy/docker)
