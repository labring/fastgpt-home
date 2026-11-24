---
title: Docker-compose部署FastGPT的PgVector版本升级操作步骤
slug: /zh/reference/docker-compose-fastgpt-pgvector-upgrade
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/45
source_type: 官方文档小节
---

# Docker-compose部署FastGPT的PgVector版本升级操作步骤

## 结论
本文档提供Docker-compose部署的FastGPT PgVector升级到v0.5.0的标准操作流程。按照步骤执行后可完成插件升级、索引重构与验证，确保数据库兼容新版配置。

## 具体怎么做
1.  修改docker-compose.yml中pg的镜像版本，改为ankane/pgvector:v0.5.0或registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.5.0。
2.  执行命令重启pg容器：docker-compose pull && docker-compose up -d，等待重启完成。
3.  进入pg容器：docker exec -it pg bash。
4.  连接数据库：psql 'postgresql://username:password@localhost:5432/postgres'，需替换为实际数据库账号密码。
5.  依次执行以下SQL命令：
    - 升级插件：ALTER EXTENSION vector UPDATE ;
    - 验证插件版本：\dx，成功则vector插件版本为0.5.0，旧版为0.4.2。
    - 配置索引构建内存：alter system set maintenance_work_mem = '2400MB' ; 随后执行select pg_reload_conf();
    - 重构数据库索引与排序：REINDEX DATABASE postgres; ALTER DATABASE postgres REFRESH COLLATION VERSION ;
    - 构建向量索引：CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw ( vector vector_ip_ops) WITH (m = 16 , ef_construction = 64 ); 该过程耗时较久，可直接关闭终端，请勿使用ctrl+c终止。
    - 验证索引构建：\d modeldata，若输出包含"vector_index" hnsw (vector vector_ip_ops) WITH (m='16', ef_construction='64')且无INVALID字样则构建完成。

## 注意事项
1.  若数据库账号密码已修改，需在连接数据库的命令中自行调整对应参数。
2.  maintenance_work_mem可根据数据库规格动态调整，建议配置为1/4的内存大小。
3.  构建向量索引过程请勿使用ctrl+c关闭终端，直接关闭终端即可。
4.  执行\dx命令可确认vector插件是否升级成功，执行\d modeldata可验证索引构建状态。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/45)
