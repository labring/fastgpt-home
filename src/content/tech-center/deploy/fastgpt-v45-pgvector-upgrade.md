---
title: FastGPT V4.5版本升级操作与数据库配置说明
slug: /zh/deploy/fastgpt-v45-pgvector-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/45
source_type: 官方文档
---

# FastGPT V4.5版本升级操作与数据库配置说明

## 升级背景
FastGPT V4.5版本包含两项核心更新：一是将PgVector插件升级至0.5版本，引入HNSW索引以提升知识库检索速度，该索引相比原有IVFFlat索引有性能提升，但构建索引的速度较慢，例如4c16g配置下处理500万组数据的并行构建约需48小时；二是新增AI对话模块的【返回AI内容】选项，可控制AI内容不直接返回浏览器。本次升级需对数据库进行专项操作，包含插件升级、索引重构与新索引构建。

## 升级操作步骤
根据部署方式分为两种场景：
### Sealos部署方案
1.  进入Sealos桌面的数据库应用，点击【pg】数据库的详情页面。
2.  点击右上角重启按钮，等待数据库重启完成。
3.  点击左侧一键链接，打开Terminal终端。
4.  依次执行以下SQL命令：
    ```sql
    ALTER EXTENSION vector UPDATE;
    \dx
    alter system set maintenance_work_mem = 2400MB;
    select pg_reload_conf();
    REINDEX DATABASE postgres;
    CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw ( vector vector_ip_ops) WITH (m = 16 , ef_construction = 64 );
    ```
5.  执行完成后可关闭终端，索引构建耗时较长无需等待完成。

### Docker Compose部署方案
1.  修改`docker-compose.yml`中pg容器的镜像版本，替换为`ankane/pgvector:v0.5.0`或`registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.5.0`。
2.  执行命令更新镜像并重启容器：
    ```bash
    docker-compose pull
    docker-compose up -d
    ```
3.  进入pg容器终端：
    ```bash
    docker exec -it pg bash
    ```
4.  连接数据库，需替换命令中的`username`和`password`为实际数据库账号密码：
    ```bash
    psql postgresql://username:password@localhost:5432/postgres
    ```
5.  依次执行以下SQL命令：
    ```sql
    ALTER EXTENSION vector UPDATE;
    \dx
    alter system set maintenance_work_mem = 2400MB;
    select pg_reload_conf();
    REINDEX DATABASE postgres;
    ALTER DATABASE postgres REFRESH COLLATION VERSION;
    CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw ( vector vector_ip_ops) WITH (m = 16 , ef_construction = 64 );
    ```
6.  执行完成后可关闭终端，索引构建无需等待完成。

## 升级验证
升级完成后可重新连接数据库终端，执行`\dx`命令查看vector插件版本，确认版本为0.5.0；执行`\d modeldata`命令，若返回结果中包含`vector_index hnsw (vector vector_ip_ops) WITH (m= 16 , ef_construction= 64 )`且无`INVALID`字样，则代表升级与索引构建完成。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/45
