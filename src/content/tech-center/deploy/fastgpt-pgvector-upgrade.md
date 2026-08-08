---
title: FastGPT V4.5版本PgVector插件升级指南
slug: /zh/deploy/fastgpt-pgvector-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/45
source_type: 官方文档
---

# FastGPT V4.5版本PgVector插件升级指南

FastGPT V4.5版本升级了PgVector插件至0.5.0版本，引入HNSW索引以提升知识库检索速度，相比原IVFFlat索引有3~10倍性能提升，可实现百万数据毫秒级搜索。但该升级需对数据库进行复杂操作，且HNSW索引构建速度较慢，例如4c16g服务器处理500万组数据并行构建约需48小时，操作前需根据自身数据库规格调整相关配置。

### 两种部署方案的升级操作步骤
#### Sealos部署方案
1.  进入Sealos桌面的数据库应用，点击【pg】数据库详情，重启数据库并等待完成。
2.  点击左侧一键链接打开Terminal，依次执行以下SQL命令：
    - 升级插件：`ALTER EXTENSION vector UPDATE;`
    - 验证插件版本：执行`\dx`，成功后vector插件版本应为0.5.0（旧版为0.4.1）
    - 配置构建索引内存：`alter system set maintenance_work_mem = 2400MB;`，再执行`select pg_reload_conf();`
    - 重构数据库索引：`REINDEX DATABASE postgres;`
    - 创建HNSW索引：`CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw ( vector vector_ip_ops) WITH (m = 16 , ef_construction = 64 );`，该命令执行耗时较久，可直接点击右上角叉号退出Terminal，无需使用Ctrl+C关闭。
3.  再次进入Terminal，执行`\d modeldata`，若结果显示`vector_index hnsw (vector vector_ip_ops) WITH (m= 16 , ef_construction= 64 )`且无INVALID后缀，则索引构建完成。

#### Docker Compose部署方案
1.  修改`docker-compose.yml`中pg的镜像版本为`ankane/pgvector:v0.5.0`或`registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.5.0`。
2.  执行`docker-compose pull`和`docker-compose up -d`重启pg容器，等待重启完成。
3.  进入容器：`docker exec -it pg bash`，连接数据库：`psql postgresql://username:password@localhost:5432/postgres`（需替换为实际数据库账号密码）。
4.  依次执行SQL命令：
    - 升级插件：`ALTER EXTENSION vector UPDATE;`
    - 验证版本：执行`\dx`，成功后版本为0.5.0（旧版为0.4.2）
    - 配置内存：`alter system set maintenance_work_mem = 2400MB;`，`select pg_reload_conf();`
    - 重构索引：`REINDEX DATABASE postgres;`，执行`ALTER DATABASE postgres REFRESH COLLATION VERSION;`
    - 创建索引：`CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw ( vector vector_ip_ops) WITH (m = 16 , ef_construction = 64 );`，执行后可直接关闭终端。
5.  重新连接数据库执行`\d modeldata`，确认索引构建完成。

### 升级易错点与注意事项
本次升级存在多个需注意的细节：一是Sealos部署与Docker Compose部署的SQL命令存在差异，例如后者需额外执行`ALTER DATABASE postgres REFRESH COLLATION VERSION;`；二是构建索引的内存配置需根据数据库规格调整，示例的`2400MB`仅适用于4c16g的服务器，建议设置为1/4的数据库内存；三是索引构建过程中不可强制中断，否则需重新执行创建索引的命令；四是验证索引时需确认结果无`INVALID`后缀，否则代表索引构建失败。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/45
