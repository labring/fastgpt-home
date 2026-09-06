---
title: Replace OneAPI with AI Proxy for FastGPT
slug: /en/deploy/fastgpt-replace-oneapi-aiproxy
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490
source_type: 官方文档
---

# Replace OneAPI with AI Proxy for FastGPT

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Update Docker Compose Configuration
First, append the AI Proxy service and dedicated PostgreSQL configuration to your existing docker-compose.yml file after your existing OneAPI setup. Do not remove OneAPI yet; the initialization process will automatically sync OneAPI's configuration. The full reference configuration is available in the [latest FastGPT docker-compose.yml](https://raw.githubusercontent.com/labring/FastGPT/main/document/public/deploy/docker/main/global/docker-compose.pg.yml). The AI Proxy service configuration includes:
```yaml
  # AI Proxy
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
      test: ['CMD', 'pg_isready', '-U', 'postgres', '-d', 'aiproxy']
      interval: 5s
      timeout: 5s
      retries: 10
```
Then add these environment variables to your FastGPT container configuration:
```
- AIPROXY_API_ENDPOINT=http://aiproxy:3000
- AIPROXY_API_TOKEN=aiproxy
```
This matches the ADMIN_KEY value set for the AI Proxy service.

## Restart Services and Migrate Data
Run the following commands to restart all services with the new AI Proxy setup:
```bash
docker-compose down
docker-compose up -d
```
To migrate existing OneAPI channel configurations, use one of two methods:
1.  **Container with internet access**: Exec into the aiproxy container, install curl, then run the migration script:
    ```bash
docker exec -it aiproxy sh
apk add curl
curl --location --request POST 'http://localhost:3000/api/channels/import/oneapi' \
--header 'Authorization: Bearer aiproxy' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dsn": "mysql://root:oneapimmysql@tcp(mysql:3306)/oneapi"
}'
```
    A successful response returns `{"data":[],"success":true}`.
2.  **Container without internet access**: Expose port `3003:3000` for the aiproxy service in docker-compose.yml, restart services with `docker-compose up -d`, then run the migration script locally:
    ```bash
curl --location --request POST 'http://localhost:3003/api/channels/import/oneapi' \
--header 'Authorization: Bearer aiproxy' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dsn": "mysql://root:oneapimmysql@tcp(mysql:3306)/oneapi"
}'
```
If you are unfamiliar with Docker operations, skip the migration script and manually re-add channels after removing OneAPI.

## Verify and Finalize Cleanup
Log into your FastGPT root account and navigate to the `Account - Model Providers` page. Two new options will appear: `Model providers` and `Call Logs`. Confirm your previous OneAPI channels are listed in `Model providers` to verify a successful migration. You may test individual channels to confirm functionality.
To complete the replacement, stop all services, remove the OneAPI service and its MySQL dependency from your docker-compose.yml file, then restart services:
```bash
docker-compose down
# Edit docker-compose.yml to remove OneAPI and its MySQL service
docker-compose up -d
```

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/490)
