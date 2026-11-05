---
title: FastGPT 服务连接配置基准：MONGODB_URI、MONGODB_LOG_URI、REDIS_URL、PG_URL
slug: /zh/reference/env-connection-baseline
page_type: 基准数据页
source: https://github.com/labring/FastGPT/blob/v4.17.2/document/content/self-host/config/env.mdx
source_type: 官方文档
meta_title: FastGPT 服务连接配置基准
meta_description: 依据FastGPT固定版本源码说明主业务库、可选日志库、Redis及PG向量库连接的作用，核对日志库回退、向量库选型和服务启动后的连接结果，明确各字段对应的存储。
keywords:
schema_type: TechArticle
date_published: 2026-11-03
date_modified: 2026-11-03
---

# FastGPT 服务连接配置基准：MONGODB_URI、MONGODB_LOG_URI、REDIS_URL、PG_URL

在 FastGPT v4.17.2 的自托管配置中，MONGODB_URI、MONGODB_LOG_URI、REDIS_URL、PG_URL 分别指向业务数据、日志数据、缓存与队列、PG 向量库四类存储；PG_URL 是 PostgreSQL/pgvector 的连接地址，日志库未单独配置时复用主库。配置时应区分主库连接、可选日志连接与实际选用的向量库连接，再检查对应服务的连接结果。以下按字段逐项列出作用、生效条件与边界。

## MONGODB_URI：业务数据的主连接

MONGODB_URI 用于指定 FastGPT 主业务数据所连接的 MongoDB 地址，属于服务启动阶段读取的连接字符串。该字段作用于应用运行期的主数据读写，涵盖知识库、应用配置等需要持久化的业务集合。配置形式为 MongoDB 标准连接串，通常包含协议、主机、端口、数据库名，如涉及认证还需携带用户名、密码与认证库参数。边界方面，该字段在服务启动时被读取，运行中修改需要重启服务才能生效；若连接串中未显式指定数据库名，实际使用的库由连接串解析结果决定。未单独设置 MONGODB_LOG_URI 时，日志连接复用主业务库连接；单独设置后可将日志数据写入指定库。当部署中存在多个 MongoDB 实例时，应确认该字段指向承载业务数据的那一个实例。字段为空或指向不可达地址时，依赖主数据的接口无法正常提供结果。

## MONGODB_LOG_URI：日志数据的独立连接

MONGODB_LOG_URI 用于指定 FastGPT 日志数据所连接的 MongoDB 地址，与主业务连接分开配置。该字段作用于运行日志、调用记录等需要写入日志集合的数据流。将其独立出来的意义在于日志写入量与业务读写可以落在不同实例或不同库上，便于分别管理容量与生命周期。配置形式与 MONGODB_URI 一致，同样为 MongoDB 标准连接串。边界方面，该字段在服务启动时读取，修改后需要重启服务生效；未配置时复用 MONGODB_URI；单独配置后，应核对该地址可达及目标账号的写入权限。该字段指向的库与 MONGODB_URI 指向的库可以是同一个 MongoDB 实例中的不同数据库，也可以是不同实例。部署时应确认日志集合的写入权限已在该连接串对应的账号中具备。日志数据的保留策略由数据库侧管理，不在该字段中体现。

## REDIS_URL：缓存与队列的连接

REDIS_URL 用于指定 FastGPT 所连接的 Redis 地址，承担缓存与队列相关职责。该字段作用于运行期的临时数据存取，包括会话缓存、任务队列等需要低延迟读写的场景。配置形式为 Redis 连接串，通常包含协议、主机、端口，若启用认证则包含密码，若使用特定数据库编号则在路径中体现。边界方面，该字段在服务启动时读取，修改后需要重启服务生效；Redis 中存放的数据多为可重建的临时数据，但队列中的待处理任务在实例切换时可能受到影响。该字段与 MongoDB、PostgreSQL 的连接字段相互独立，不共享连接串。当部署使用哨兵或集群模式时，连接串的写法需与所选客户端支持的形式一致。字段为空或指向不可达地址时，依赖缓存与队列的功能无法正常工作。容量与淘汰策略由 Redis 侧配置决定，不在该字段中设定。

## PG_URL：PG向量库的连接

PG_URL 用于指定 FastGPT 所连接的 PostgreSQL/pgvector 地址，承担向量库连接职责。该字段作用于向量数据的读写与检索，不承担业务关系表存储。配置形式为 PostgreSQL 连接串，通常包含协议、主机、端口、数据库名，若涉及认证则包含用户名与密码，必要时携带 schema 等参数。边界方面，该字段在服务启动时读取，修改后需要重启服务生效；连接串中的数据库需已存在并可被对应账号访问。该字段与 MONGODB_URI、MONGODB_LOG_URI、REDIS_URL 各自独立，分别指向不同类型的存储，不互相替代。当部署将 PostgreSQL 与 MongoDB 部署在同一主机时，仍需分别填写各自端口与库名，避免混淆。选用PG向量库时应核对该连接；选择其他向量库时，按实际选型使用对应连接字段。向量库初始化及版本迁移另按部署说明执行。

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/self-host/config/env.mdx)
