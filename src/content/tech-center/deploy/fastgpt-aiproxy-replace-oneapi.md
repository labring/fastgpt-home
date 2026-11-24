---
title: FastGPT使用AI Proxy替换OneAPI的配置与迁移指南
slug: /zh/deploy/fastgpt-aiproxy-replace-oneapi
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/490
source_type: 官方文档小节
---

# FastGPT使用AI Proxy替换OneAPI的配置与迁移指南

本操作仅适用于需要将FastGPT原有的OneAPI替换为AI Proxy的用户，可完成服务替换、配置迁移与旧服务清理的全流程。

## 配置与迁移步骤
1.  修改docker-compose.yml文件：参考最新的官方yml文件，将AI Proxy的配置追加到OneAPI配置后方，暂不删除OneAPI服务。AI Proxy的配置内容如下：
```yaml
aiproxy:
image: 'ghcr.io/labring/aiproxy:latest'
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
  test: ['CMD', 'curl', '-f', 'http://localhost:3000/api/status']
  interval: 5s
  timeout: 5s
  retries: 10
aiproxy_pg:
image: pgvector/pgvector:0.8.0-pg15 # docker hub
# image: registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.8.0-pg15 # 阿里云
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
  test: ['CMD', 'pg_isready', '-U', 'postgres', '-d', 'aiproxy']
  interval: 5s
  timeout: 5s
  retries: 10
```
2.  为FastGPT容器添加环境变量：在yml文件的fastgpt容器环境变量中新增以下配置：
    - AIPROXY_API_ENDPOINT=http://aiproxy:3000
    - AIPROXY_API_TOKEN=aiproxy
3.  重载服务：执行`docker-compose down`停止现有服务，再执行`docker-compose up -d`启动服务，将自动追加AI Proxy服务并更新FastGPT配置。
4.  迁移OneAPI数据：
    - 可联网场景：进入aiproxy容器执行`docker exec -it aiproxy sh`，安装curl工具`apk add curl`，再执行迁移脚本：
      ```bash
      curl --location --request POST 'http://localhost:3000/api/channels/import/oneapi' \
      --header 'Authorization: Bearer aiproxy' \
      --header 'Content-Type: application/json' \
      --data-raw '{"dsn": "mysql://root:oneapimmysql@tcp(mysql:3306)/oneapi"}'
      ```
      返回`{"data":[],"success":true}`则代表迁移成功。
    - 无法联网场景：在yml文件中为aiproxy服务添加端口映射`3003:3000`，重启服务后在本地终端执行上述curl脚本，将地址替换为`http://localhost:3003/api/channels/import/oneapi`。
    若不熟悉docker操作，可直接删除OneAPI相关内容，手动重新添加模型渠道。
5.  验证服务状态：登录FastGPT的root账号，进入账号-模型提供商页面，若出现模型渠道和调用日志选项，且原有OneAPI渠道已同步，则迁移完成。
6.  删除旧OneAPI服务：执行`docker-compose down`停止服务，删除yml文件中的OneAPI及其MySQL依赖配置，再执行`docker-compose up -d`重启服务。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/490)
