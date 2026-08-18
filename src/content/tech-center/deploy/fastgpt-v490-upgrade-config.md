---
title: FastGPT V4.9.0版本升级操作与配置说明
slug: /zh/deploy/fastgpt-v490-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490
source_type: 官方文档
---

# FastGPT V4.9.0版本升级操作与配置说明

### 升级前置说明
FastGPT V4.9.0版本包含环境变量变更与升级脚本相关调整，升级前需完成数据库备份。本次升级需更新FastGPT官方镜像与PG容器镜像，官方镜像tag需调整为`v4.9.0`，商业版镜像同样使用该tag；Sandbox镜像可选择不更新。PG容器需更新为`pgvector/pgvector:0.8.0-pg15`，也可使用阿里云镜像`registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.8.0-pg15`，具体配置可参考最新的docker-compose.yml文件。

### 详细升级步骤
1.  **更新镜像与容器**：修改docker-compose.yml文件，将FastGPT镜像tag改为`v4.9.0`，PG容器镜像更新为指定版本。
2.  **可选替换OneAPI为AI Proxy**：若需使用AI Proxy替代OneAPI，需按以下步骤操作：
    - 参考最新yml文件，将AI Proxy的配置追加到OneAPI配置后，暂不删除OneAPI配置，初始化流程会自动同步OneAPI配置。AI Proxy的配置包含`aiproxy`服务与`aiproxy_pg`数据库，其中环境变量包括`ADMIN_KEY=aiproxy`、`LOG_DETAIL_STORAGE_HOURS=1`、`SQL_DSN=postgres://postgres:aiproxy@aiproxy_pg:5432/aiproxy`、`RETRY_TIMES=3`、`BILLING_ENABLED=false`、`DISABLE_MODEL_CONFIG=true`。
    - 为FastGPT容器追加环境变量：`AIPROXY_API_ENDPOINT=http://aiproxy:3000`与`AIPROXY_API_TOKEN=aiproxy`。
3.  **重载服务**：执行`docker-compose down`停止现有服务，再执行`docker-compose up -d`启动服务，完成aiproxy服务追加与FastGPT配置更新。
4.  **执行OneAPI迁移脚本**：可联网环境下，进入aiproxy容器执行`docker exec -it aiproxy sh`，安装curl工具`apk add curl`，再执行迁移命令：`curl --location --request POST http://localhost:3000/api/channels/import/oneapi --header Authorization: Bearer aiproxy --header Content-Type: application/json --data-raw { dsn : mysql://root:oneapimmysql@tc }`。

### 升级注意事项
本次升级需注意多个细节：首先，环境变量变更需严格按照官方配置调整，不可随意修改默认参数；替换OneAPI时切勿提前删除原有配置，否则会导致初始化同步失败；PG容器更新后需确保挂载的本地卷路径正确，避免数据丢失。若无需使用AI Proxy功能，则无需执行替换OneAPI的相关步骤。同时，升级过程中需确保服务器网络正常，否则可能导致镜像拉取或脚本执行失败。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490)
