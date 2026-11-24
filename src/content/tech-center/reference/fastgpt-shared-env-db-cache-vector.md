---
title: 这一页提供FastGPT App/Admin共享变量与数据库缓存向量库配置参考
slug: /zh/reference/fastgpt-shared-env-db-cache-vector
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# 这一页提供FastGPT App/Admin共享变量与数据库缓存向量库配置参考

## 结论
本页整理了FastGPT自部署时的App/Admin共享环境变量，涵盖缓存、数据库与向量库的连接参数及流式恢复相关配置。通过配置这些环境变量，可完成FastGPT的基础依赖服务适配。

## 具体怎么做
1. 编辑FastGPT的环境变量配置文件或部署脚本。
2. 按需修改以下环境变量的默认值：

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| REDIS_URL | redis://default:mypassword@localhost:6379 | Redis 连接地址 |
| STREAM_RESUME_TTL_SECONDS | 300 | 流式恢复镜像在生成中的 TTL，单位秒 |
| STREAM_RESUME_POST_COMPLETE_TTL_SECONDS | 30 | 流结束后恢复镜像的缩短 TTL，单位秒 |
| STREAM_RESUME_REDIS_MAXMEMORY_RATIO | 0.5 | Redis 已用内存与 maxmemory 比例达到该值后，不再创建新的流恢复镜像 |
| STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS | 5000 | Redis 内存水位检测缓存时间，单位毫秒 |
| MONGODB_URI | 本地 MongoDB 示例地址 | 主业务 MongoDB 连接地址 |
| MONGODB_LOG_URI | 同 MONGODB_URI 示例地址 | 日志 MongoDB 连接地址；不配置时可复用主库 |
| VECTOR_VQ_LEVEL | 32 | 向量量化等级；不同向量库支持范围不同 |
| PG_URL | 空 | PostgreSQL/pgvector 向量库连接地址 |
| OCEANBASE_URL | 空 | OceanBase 向量库连接地址 |
| SEEKDB_URL | 空 | SeekDB 向量库连接地址 |
| MILVUS_ADDRESS | 空 | Milvus/Zilliz 连接地址 |
| MILVUS_TOKEN | 空 | Milvus/Zilliz 访问 Token |
| OPENGAUSS_URL | 空 | openGauss 向量库连接地址 |

3. 保存配置后重启FastGPT服务。

## 注意事项
1. MONGODB_LOG_URI未配置时，会自动复用主业务MongoDB的连接地址。
2. 仅需配置实际使用的向量库对应的连接变量，无需填写所有向量库的参数。
3. STREAM_RESUME相关参数需根据服务器实际内存资源调整，避免Redis内存溢出。
4. VECTOR_VQ_LEVEL需匹配所使用向量库的支持范围，不可随意修改超出范围的值。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
