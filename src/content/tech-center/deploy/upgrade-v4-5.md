---
title: FastGPT V4.5版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/45
source_type: 官方文档
---

# FastGPT V4.5版本升级操作与功能说明

## 这个版本改了什么
FastGPT V4.5 引入 PgVector0.5 版本的 HNSW 索引，知识库检索速度比起 IVFFlat 索引大致有3~10倍的性能提升，可实现百万数据毫秒级搜索。该索引构建速度较慢，4c16g 500w组数据使用并行构建大约花费48小时。该版本新增多项功能与优化：升级 PgVector 插件，引入 HNSW 索引；AI 对话模块增加【返回 AI 内容】选项，可控制 AI 内容不直接返回浏览器；支持问题分类选择模型；优化 TextSplitter，采用递归拆解法；优化高级编排 UX 性能；修复分享链接鉴权问题。旧版 `config.json` 配置说明已不再维护，当前版本请参考[模型配置方案](../../config/model/intro.mdx)。

## 升级前要确认的事
确认当前部署方案为 Sealos 或 docker-compose.yml；确认数据库实例的内存规格，用于配置构建索引时的可用内存；确认拥有数据库操作的相关权限。

## 升级步骤（照做）
### Sealos 部署方案
1. 点击 [Sealos 桌面](https://cloud.sealos.io?uid=fnWRt09fZP)的数据库应用。
2. 点击【pg】数据库的详情。
3. 点击右上角的重启，等待重启完成。
4. 点击左侧的一键链接，等待打开 Terminal。
5. 依次输入下方 SQL 命令：
```sql
ALTER EXTENSION vector UPDATE;
\dx
alter system set maintenance_work_mem = '2400MB';
select pg_reload_conf();
REINDEX DATABASE postgres;
CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw (vector vector_ip_ops) WITH (m = 16, ef_construction = 64);
```
构建索引耗时较长，可直接点击右上角叉号退出 Terminal。后续可再次进入 Terminal 执行 `\d modeldata` 查看索引状态。

### Docker-compose.yml 部署方案
1. 修改 `docker-compose.yml` 中 pg 的镜像版本，改成 `ankane/pgvector:v0.5.0` 或 `registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.5.0`。
2. 重启 pg 容器：`docker-compose pull && docker-compose up -d`，等待重启完成。
3. 进入容器：`docker exec -it pg bash`。
4. 连接数据库：`psql 'postgresql://[REDACTED_CREDENTIAL]@localhost:5432/postgres'`。
5. 执行下方 SQL 命令：
```sql
ALTER EXTENSION vector UPDATE;
\dx
alter system set maintenance_work_mem = '2400MB';
select pg_reload_conf();
REINDEX DATABASE postgres;
ALTER DATABASE postgres REFRESH COLLATION VERSION;
CREATE INDEX CONCURRENTLY vector_index ON modeldata USING hnsw (vector vector_ip_ops) WITH (m = 16, ef_construction = 64);
```
构建索引耗时较长，直接关掉终端即可，请勿使用 `ctrl+c` 关闭。后续可再次连接数据库执行 `\d modeldata` 查看索引状态。

## 升级后怎么验证
1. 插件版本验证：执行 `\dx` 命令，查看 vector 插件版本为 0.5.0（Sealos 部署旧版为 0.4.1，Docker 部署旧版为 0.4.2）。
2. 索引状态验证：执行 `\d modeldata` 命令，若结果中显示 `"vector_index" hnsw (vector vector_ip_ops) WITH (m='16', ef_construction='64')` 且无 INVALID 后缀，则索引构建完成。
3. 功能验证：测试知识库搜索速度，确认 AI 对话模块【返回 AI 内容】选项、问题分类选择模型功能正常，分享链接鉴权功能正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/45)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
