---
title: Upgrade Pgvector for Docker Compose FastGPT Deployments
slug: /en/deploy/pgvector-upgrade-docker-compose-fastgpt
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45
source_type: 官方文档
---

# Upgrade Pgvector for Docker Compose FastGPT Deployments

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Prerequisite Configuration Adjustments
All provided commands use the default values from the official FastGPT Docker Compose template. If you modified the default PostgreSQL username, password, or database name, update all connection strings and SQL commands to match your custom credentials before starting the upgrade.

## Step-by-Step Upgrade Workflow
1.  Update the pgvector image version in your `docker-compose.yml` file to either `ankane/pgvector:v0.5.0` or `registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.5.0`.
2.  Pull the updated container image and restart the PostgreSQL service:
    ```bash
    docker-compose pull && docker-compose up -d
    ```
    Wait for the container restart process to complete fully.
3.  Access the interactive shell of the running PostgreSQL container:
    ```bash
    docker exec -it pg bash
    ```
4.  Connect to the default `postgres` database using your credentials:
    ```bash
    psql 'postgresql://username:password@localhost:5432/postgres'
    ```
    Replace `username` and `password` with your actual database credentials if you customized them.
5.  Execute the following SQL commands in the connected database session:
    ```sql
    -- Upgrade the installed vector extension
    ALTER EXTENSION vector UPDATE;
    -- Validate successful upgrade: confirm vector extension version is 0.5.0
    \dx

    -- Set maintenance memory for index building (1/4 of total system memory recommended)
    alter system set maintenance_work_mem = '2400MB';
    select pg_reload_conf();

    -- Rebuild all database indexes and refresh collation versions
    REINDEX DATABASE postgres;
    ALTER DATABASE postgres REFRESH COLLATION VERSION;

    -- Create concurrent HNSW vector index (do not cancel with Ctrl+C; close terminal when finished)
    CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw (vector vector_ip_ops) WITH (m = 16, ef_construction = 64);
    ```

## Post-Upgrade Validation
To confirm the upgrade completed successfully:
1.  Reconnect to the PostgreSQL database if your session was disconnected.
2.  Run the `\dx` command to verify the `vector` extension version is now 0.5.0 (previously 0.4.2).
3.  Run the `\d modeldata` command to check the status of the `vector_index`: the output should show a valid HNSW index with no `INVALID` suffix, formatted as `vector_index hnsw (vector vector_ip_ops) WITH (m='16', ef_construction='64')`.

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/45)
