---
title: FastGPT V4.9.0版本升级步骤与环境配置说明
slug: /zh/deploy/fastgpt-v490-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490
source_type: 官方文档
---

# FastGPT V4.9.0版本升级步骤与环境配置说明

## 版本变更与前置准备
V4.9.0版本存在环境变量变更，需配合专用升级脚本完成升级。升级前必须做好数据库备份，本次升级需更新FastGPT官方镜像及PG容器版本，Sandbox镜像可选择不更新。需参考最新的docker-compose.yml文件完成配置调整，其中PG容器需更新至v0.8.0-pg15版本。

## 升级与配置步骤
1.  更新镜像：将FastGPT镜像tag设置为v4.9.0，商业版镜像同样使用v4.9.0。
2.  可选AI Proxy配置：若需使用AI Proxy替代OneAPI，需在docker-compose.yml中追加AI Proxy及其PG数据库的配置，示例配置如下：
```yaml
# AI Proxy 配置
aiproxy:
  image: ghcr.io/labring/aiproxy:latest
  container_name: aiproxy
  restart: unless-stopped
  depends_on:
    aiproxy_pg:
      condition: service_healthy
  networks:
    - fastgpt
  environment:
    - ADMIN_KEY=aiproxy
    - LOG_DETAIL_STORAGE_HOURS=1
    - SQL_DSN=postgres://postgres:aiproxy@aiproxy_pg:5432/aiproxy
    - RETRY_TIMES=3
    - BILLING_ENABLED=false
    - DISABLE_MODEL_CONFIG=true
  healthcheck:
    test: [ CMD , curl , -f , http://localhost:3000/api/status ]
    interval: 5s
    timeout: 5s
    retries: 10
aiproxy_pg:
  image: pgvector/pgvector:0.8.0-pg15
  restart: unless-stopped
  container_name: aiproxy_pg
  volumes:
    - ./aiproxy_pg:/var/lib/postgresql/data
  networks:
    - fastgpt
  environment:
    TZ: Asia/Shanghai
    POSTGRES_USER: postgres
    POSTGRES_DB: aiproxy
    POSTGRES_PASSWORD: aiproxy
  healthcheck:
    test: [ CMD , pg_isready , -U , postgres , -d , aiproxy ]
    interval: 5s
    timeout: 5s
    retries: 10
```
3.  修改FastGPT容器的环境变量，添加AI Proxy相关配置项：
```yaml
environment:
  - AIPROXY_API_ENDPOINT=http://aiproxy:3000
  - AIPROXY_API_TOKEN=aiproxy
```
4.  重载服务：执行`docker-compose down`停止现有服务，再执行`docker-compose up -d`启动服务，系统会自动追加aiproxy服务并更新FastGPT配置。
5.  迁移OneAPI配置：进入aiproxy容器，安装curl后执行迁移脚本：
```bash
docker exec -it aiproxy sh
apk add curl
curl --location --request POST http://localhost:3000/api/channels/import/oneapi \
--header Authorization: Bearer aiproxy \
--header Content-Type: application/json \
--data-raw '{"dsn": "mysql://root:oneapimmysql@tc"}'
```

## 升级注意事项
升级过程中请勿提前删除OneAPI配置，系统初始化会自动同步OneAPI的原有配置。PG容器的健康检查配置需严格按照示例配置，确保数据库正常启动。若未使用AI Proxy替代OneAPI，则无需执行上述可选配置步骤。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/490)
