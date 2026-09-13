---
title: FastGPT 环境变量速查全表
slug: /zh/reference/env-variables-reference
page_type: 基准数据页
source: https://github.com/labring/FastGPT/blob/5957d06807ff7f984c70c6425c8d0fc40eb1714d/projects/app/.env.template
source_type: 官方文档
meta_title: FastGPT 环境变量速查全表｜FastGPT 技术中心
meta_description: 查阅环境变量速查全表，按症状与技术对象定位相关配置、排查步骤和已发布文档，结合版本边界确认适用条件。
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/中文-fastgpt.cn/reference/env-variables-reference.md
source_sha256: d5f591b95dc65c29bd48a09e20466a8c3e8cd18c5c60956a20fb57db792017f7
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT 环境变量速查全表

本表对应 FastGPT 开发分支快照 5957d06（2026-09-07）。开发分支包含尚未进入正式版本的能力；部署时请核对所用版本。

## 这张表怎么用

本页把 FastGPT 社区版可配置的 137 个环境变量按用途分成 15 组逐条列出，每条给出默认值、官方说明与是否默认启用。变量清单取自开源仓库的配置模板文件。部署与升级时最常出问题的环节就是环境变量，这张表的用途是在不 clone 仓库的前提下逐项核对。

## 各列的含义

| 列 | 含义 |
| --- | --- |
| 变量名 | 配置文件中的键名，大小写敏感 |
| 默认值 | 配置模板中给出的值；空白表示模板中未给默认值，需按实际环境填写。密钥、令牌、口令类变量本表只标注「示例值」，不列出具体取值 |
| 默认启用 | 「是」表示模板中该行处于生效状态；「可选」表示模板中该行被注释，按需开启 |
| 说明 | 配置模板中该变量上方的官方注释原文；空白表示模板未附说明 |

## 服务地址与集成（34 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `PRO_URL` | — | 可选 | 商业版地址 |
| `PRO_TOKEN` | — | 可选 | — |
| `CRM_API_URL` | `https://crm.example.com/api/v1` | 可选 | 官网访客归因 CRM（地址未配置时不进行身份上报） |
| `CRM_API_KEY` | — | 可选 | — |
| `PLUGIN_BASE_URL` | `http://localhost:3004` | 是 | 插件服务 |
| `PLUGIN_TOKEN` | 示例值（**部署时必须改**） | 是 | — |
| `CODE_SANDBOX_URL` | `http://localhost:3002` | 是 | 代码沙箱服务 |
| `CODE_SANDBOX_TOKEN` | 示例值（**部署时必须改**） | 是 | — |
| `AIPROXY_API_ENDPOINT` | `http://localhost:3010` | 是 | AI Proxy API |
| `AIPROXY_API_TOKEN` | 示例值（**部署时必须改**） | 是 | — |
| `SSE_MCP_SERVER_PROXY_ENDPOINT` | `http://localhost:3003` | 是 | MCP Server 代理地址，用于 MCP 使用方式页拼接 SSE 地址（末尾不要带 /） |
| `MARKETPLACE_URL` | `https://v2.marketplace.fastgpt.cn` | 是 | 插件市场地址 |
| `AGENT_SANDBOX_PROVIDER` | — | 是 | Agent sandbox |
| `AGENT_SANDBOX_SEALOS_BASEURL` | — | 是 | Sealos devbox |
| `AGENT_SANDBOX_SEALOS_TOKEN` | — | 是 | — |
| `AGENT_SANDBOX_SEALOS_IMAGE` | — | 是 | — |
| `AGENT_SANDBOX_SEALOS_WORK_DIRECTORY` | `/home/devbox/workspace` | 是 | — |
| `AGENT_SANDBOX_CPU_COUNT` | `1` | 是 | Agent Sandbox 单实例 CPU 核数和内存上限（MiB） |
| `AGENT_SANDBOX_MEMORY_MIB` | `2048` | 是 | — |
| `AGENT_SANDBOX_STORAGE_SIZE_GI` | `1` | 是 | Agent Sandbox 存储容量，单位 Gi |
| `AGENT_SANDBOX_OPENSANDBOX_BASEURL` | `http://localhost:8090` | 是 | OpenSandbox 配置（PROVIDER=opensandbox 时生效） |
| `AGENT_SANDBOX_OPENSANDBOX_API_KEY` | 示例值（**部署时必须改**） | 是 | — |
| `AGENT_SANDBOX_OPENSANDBOX_RUNTIME` | `docker` | 是 | — |
| `AGENT_SANDBOX_OPENSANDBOX_IMAGE` | `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox:v0.1` | 是 | — |
| `AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY` | `true` | 是 | — |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL` | `http://localhost:3005` | 是 | — |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN` | 示例值（**部署时必须改**） | 是 | — |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX` | `fastgpt-session` | 是 | — |
| `AGENT_SANDBOX_MAX_EDIT_DEBUG` | `100` | 是 | 活跃编辑/调试沙箱数量上限 |
| `AGENT_SANDBOX_SUSPEND_MINUTES` | `60` | 是 | 运行中 Agent 沙箱持续未活跃多少分钟后自动暂停 |
| `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` | `7` | 是 | 已暂停 Agent 沙箱持续未活跃多少天后自动归档 |
| `AGENT_SANDBOX_NPM_REGISTRY` | — | 是 | Agent 沙箱内 npm/yarn/pnpm/bun 使用的 npm registry（可选） |
| `AGENT_SANDBOX_PYPI_INDEX_URL` | — | 是 | Agent 沙箱内 pip/python -m pip/uv 使用的 PyPI index URL（可选） |
| `AGENT_SANDBOX_APT_MIRROR` | — | 是 | Ubuntu 或 Debian Agent 沙箱内使用的 apt 镜像地址（可选），仅 root 有效；Debian 的 /debian-security 会自动推导 |

## 数据库与缓存（15 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `REDIS_URL` | `redis://default:mypassword@localhost:6379` | 是 | Redis URL |
| `STREAM_RESUME_TTL_SECONDS` | `300` | 可选 | 流式恢复 Redis 镜像 TTL（秒）：生成中续期 / 结束后缩短，默认 300 / 30 |
| `STREAM_RESUME_POST_COMPLETE_TTL_SECONDS` | `30` | 可选 | — |
| `STREAM_RESUME_REDIS_MAXMEMORY_RATIO` | `0.8` | 可选 | Redis 已用内存 / maxmemory 达到阈值后，不再为新流请求创建恢复镜像 |
| `STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS` | `5000` | 可选 | — |
| `MONGODB_URI` | `mongodb://myusername:mypassword@localhost:27017/fastgpt?authSource=admin&directConnection=true` | 是 | MongoDB 连接参数；本地开发连接远程数据库时，可能需要添加 directConnection=true 才能连接 |
| `MONGODB_LOG_URI` | — | 是 | 日志库 |
| `VECTOR_VQ_LEVEL` | `32` | 是 | 向量库优先级: pg > oceanbase > milvus > opengauss 向量量化等级: PG 支持 32/16，OceanBase 支持 32/8/1 |
| `PG_URL` | `postgresql://username:password@localhost:5432/postgres` | 是 | PG 向量库连接参数 |
| `OCEANBASE_URL` | — | 可选 | OceanBase 向量库连接参数 |
| `SEEKDB_URL` | — | 可选 | SeekDB 向量库连接参数 |
| `MILVUS_ADDRESS` | — | 可选 | Milvus 向量库连接参数(使用 Milvus 时,全文检索自动启用 BM25;版本需 >= 2.5,推荐 2.5.16+) |
| `MILVUS_TOKEN` | — | 可选 | — |
| `MILVUS_LANGUAGE_IDENTIFIER` | `lingua` | 可选 | Milvus BM25 语言识别引擎: lingua(默认) \| whatlang |
| `OPENGAUSS_URL` | `postgresql://gaussdb:FastGPT@123@localhost:5432/fastgpt` | 可选 | openGauss 向量库连接参数 |

## 对象存储（14 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `STORAGE_VENDOR` | `minio` | 是 | 存储供应商；如果是 Sealos 的对象存储请填 aws-s3 |
| `STORAGE_REGION` | `us-east-1` | 是 | — |
| `STORAGE_ACCESS_KEY_ID` | 示例值（**部署时必须改**） | 是 | — |
| `STORAGE_SECRET_ACCESS_KEY` | 示例值（**部署时必须改**） | 是 | — |
| `STORAGE_PUBLIC_BUCKET` | `fastgpt-public` | 是 | — |
| `STORAGE_PRIVATE_BUCKET` | `fastgpt-private` | 是 | — |
| `STORAGE_EXTERNAL_ENDPOINT` | — | 是 | — |
| `STORAGE_S3_CDN_ENDPOINT` | — | 是 | — |
| `STORAGE_DOWNLOAD_URL_MODE` | `short-proxy` | 是 | 下载链接模式：short-proxy \| short-redirect \| presigned |
| `STORAGE_DOWNLOAD_REDIRECT_TTL_SECONDS` | `300` | 是 | short-redirect 模式下临时 S3 预签名下载链接 TTL（秒），不太需要改。 |
| `STORAGE_S3_ENDPOINT` | `http://localhost:9000` | 是 | — |
| `STORAGE_S3_FORCE_PATH_STYLE` | `true` | 是 | — |
| `STORAGE_S3_MAX_RETRIES` | `3` | 是 | — |
| `STORAGE_PUBLIC_ACCESS_EXTRA_SUB_PATH` | — | 是 | — |

## 沙盒代理 (agent-sandbox-proxy) 与网络配置（3 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `AGENT_SANDBOX_PROXY_SECRET` | 示例值（**部署时必须改**） | 是 | JWT 验签与内网安全物理阻断密钥 (必须与 Rust Proxy 的 AGENT_SANDBOX_PROXY_SECRET 环境变量保持完全一致) 生产环境必须配置为至少 32 字节的高强度随机值，不能使用示例占位。 |
| `AGENT_SANDBOX_PROXY_URL` | `ws://localhost:3006` | 是 | 浏览器客户端连接沙盒代理的对外 WebSocket 地址。 启用 Agent Sandbox（show_agent_sandbox）时必填；未启用时可留空。 开发环境建议配置为 ws://localhost:3006 (指向 Docker Compose 中的 Rust 代理)。 生产环境请配置浏览器可访问的 ws:// 或 wss:// 代理地址。 |
| `AGENT_SANDBOX_PREVIEW_PROXY_URL` | `http://localhost:3006` | 是 | 浏览器访问沙盒文件预览的 HTTP(S) 地址。启用 Agent Sandbox 时必填；默认单端口部署时与 WebSocket 使用相同端口。 |

## 并发控制与限制（7 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `WECHAT_CHANNEL_CONCURRENCY` | `1000` | 是 | 微信渠道 poll worker 并发数（默认 1000），需 ≥ online channel 数；channel 数超过该值时消息延迟会线性恶化 |
| `SYSTEM_MIGRATION_BATCH_SIZE` | `100` | 是 | 系统迁移任务每批处理的记录数，范围 50～1000，默认 100 |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600` | 是 | 文件解析超时时间（秒） |
| `WORKFLOW_MAX_RUN_TIMES` | `500` | 是 | 工作流最大运行次数，避免极端死循环 |
| `WORKFLOW_MAX_LOOP_TIMES` | `100` | 是 | 循环/并行节点最大输入数组长度（默认 100） |
| `WORKFLOW_PARALLEL_MAX_CONCURRENCY` | `10` | 是 | 并行节点并发上限（最终会 clamp 到 [5, 100]，默认 10） |
| `CHAT_MAX_QPM` | `5000` | 是 | 工作流 QPM（若用户套餐有限制，这里不生效） |

## 资源限制（8 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `SERVICE_REQUEST_MAX_CONTENT_LENGTH` | `10` | 是 | 服务器接收请求的最大大小（MB） |
| `MAX_FOLDER_DEPTH` | `4` | 是 | 允许的最深文件夹层级，默认 4，范围 2~20（根目录下最多 4 层文件夹） |
| `APP_FOLDER_MAX_AMOUNT` | `1000` | 是 | 应用文件夹最大数量 |
| `DATASET_FOLDER_MAX_AMOUNT` | `1000` | 是 | 数据集文件夹最大数量 |
| `UPLOAD_FILE_MAX_SIZE` | `1000` | 是 | 最大上传文件大小（MB） |
| `UPLOAD_FILE_MAX_AMOUNT` | `1000` | 是 | 最大上传文件数量 |
| `LLM_REQUEST_TRACKING_RETENTION_HOURS` | `6` | 是 | LLM 请求追踪保留时长（小时） |
| `MAX_HTML_TRANSFORM_CHARS` | `1000000` | 是 | HTML 转 Markdown 最大字符数（超过后不执行转换） |

## 知识库处理并发控制（4 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `DATASET_PARSE_MAX_PROCESS` | `10` | 是 | 知识库文件解析队列最大并发数 |
| `VECTOR_MAX_PROCESS` | `10` | 是 | 向量训练队列最大并发数 |
| `QA_MAX_PROCESS` | `10` | 是 | 问答拆分队列最大并发数 |
| `VLM_MAX_PROCESS` | `10` | 是 | 图片理解模型处理队列最大并发数 |

## PDF 增强解析（可选）（8 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `CUSTOM_PDF_PARSE_URL` | — | 可选 | 自定义 PDF 解析服务地址 |
| `CUSTOM_PDF_PARSE_KEY` | — | 可选 | 自定义 PDF 解析服务密钥 |
| `SOMARK_API_KEY` | — | 可选 | SoMark PDF 解析服务密钥 |
| `DOC2X_KEY` | — | 可选 | Doc2x PDF 解析服务密钥 |
| `TEXTIN_APP_ID` | — | 可选 | 合合信息 Textin 服务 App ID |
| `TEXTIN_SECRET_CODE` | — | 可选 | 合合信息 Textin 服务 Secret Code |
| `HNSW_EF_SEARCH` | `100` | 是 | 向量检索 hnsw ef_search 参数，仅对 PG / OB / OpenGauss 生效 |
| `HNSW_MAX_SCAN_TUPLES` | `100000` | 是 | 向量检索最大扫描数据量，仅对 PG 生效 |

## 安全配置（10 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `USE_IP_LIMIT` | `false` | 是 | 启动 IP 限流（true）；部分接口启用 IP 限流策略以防止异常请求 |
| `CHECK_INTERNAL_IP` | `false` | 是 | 启用内网 IP 检查 |
| `AUTH_COOKIE_SECURE` | `false` | 是 | 是否为登录 Cookie 添加 Secure 属性，仅在全站 HTTPS 时启用 |
| `TRUSTED_PROXY_ENABLE` | `false` | 是 | 是否启用可信反向代理客户端 IP 校验 |
| `TRUSTED_PROXY_IPS` | — | 是 | 可信反向代理 IP/CIDR 列表，逗号或空白分隔。仅 TRUSTED_PROXY_ENABLE=true 时生效；仅显式可信代理传入的 X-Forwarded-For/X-Real-IP 会用于客户端 IP 解析 |
| `PASSWORD_LOGIN_MINUTE_LIMIT_COUNT` | — | 是 | 密码登录每分钟次数限制（默认 10） |
| `PASSWORD_EXPIRED_MONTH` | — | 是 | 密码过期月份（不设置则不过期） |
| `MAX_LOGIN_SESSION` | — | 是 | 最大登录客户端数量（默认 10） |
| `ALLOWED_ORIGINS` | — | 是 | 自定义跨域；不配置时默认允许所有跨域（逗号分割） |
| `MULTIPLE_DATA_TO_BASE64` | `true` | 是 | 强制将图片转成 base64 传递给模型 |

## 密钥（4 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `FILE_TOKEN_KEY` | — | 是 | 文件阅读时的密钥 |
| `AES256_SECRET_KEY` | 示例值（**部署时必须改**） | 是 | 密钥加密 key |
| `INVOKE_TOKEN_SECRET` | 示例值（**部署时必须改**） | 是 | Invoke 反向调用 JWT 密钥，至少 32 位 |
| `ROOT_KEY` | 示例值（**部署时必须改**） | 是 | root key（最高权限） |

## 域名与前端（3 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `FE_DOMAIN` | `http://localhost:3000` | 是 | 必填。客户端访问 FastGPT 时使用的地址，由协议、主机和可选端口组成，用于补全相对路径资源（注意结尾不要带 /） |
| `FILE_DOMAIN` | `http://localhost:3000` | 是 | 文件域名（也指向 FastGPT 服务）；如需更高安全性可独立分配域名，避免高危文件读取到主域名内容 |
| `NEXT_PUBLIC_BASE_URL` | `/fastai` | 可选 | 二级路由，需要在打包时确定 |

## 日志配置（12 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `LOG_ENABLE_CONSOLE` | `true` | 是 | 日志等级: trace \| debug \| info \| warning \| error \| fatal |
| `LOG_CONSOLE_LEVEL` | `debug` | 是 | — |
| `LOG_ENABLE_OTEL` | `true` | 是 | — |
| `LOG_OTEL_LEVEL` | `info` | 是 | — |
| `LOG_OTEL_SERVICE_NAME` | `fastgpt-client` | 是 | — |
| `LOG_OTEL_URL` | `http://localhost:4318/v1/logs` | 是 | — |
| `METRICS_ENABLE_OTEL` | `true` | 是 | 指标 |
| `METRICS_OTEL_URL` | `http://localhost:4318/v1/metrics` | 是 | — |
| `METRICS_OTEL_SERVICE_NAME` | `fastgpt-client` | 是 | — |
| `TRACING_ENABLE_OTEL` | `true` | 是 | 追踪 |
| `TRACING_OTEL_URL` | `http://localhost:4318/v1/traces` | 是 | — |
| `TRACING_OTEL_SERVICE_NAME` | `fastgpt-client` | 是 | — |

## 对话日志推送（可选）（3 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `CHAT_LOG_URL` | `http://localhost:8080` | 可选 | 日志服务地址 |
| `CHAT_LOG_INTERVAL` | `10000` | 可选 | 日志推送间隔 |
| `CHAT_LOG_SOURCE_ID_PREFIX` | `fastgpt-` | 可选 | 日志来源 ID 前缀 |

## 功能开关与特殊配置（8 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `SHOW_COUPON` | `false` | 是 | 是否展示兑换码功能 |
| `SHOW_DISCOUNT_COUPON` | `false` | 是 | 是否展示优惠券功能 |
| `APP_REGISTRATION_URL` | — | 是 | 申请应用备案地址 |
| `HIDE_CHAT_COPYRIGHT_SETTING` | — | 是 | 是否隐藏版权信息配置，只有值为 true 时隐藏 |
| `WECOM_LOGIN_AUTO_REDIRECT` | `false` | 是 | 是否允许企微终端自动跳转登录，默认 false |
| `OPENAPI_KEY_MAX_COUNT` | `100` | 是 | 单个团队成员最多可创建的系统 API Key 数量，最小值为 1 |
| `AGENT_ENGINE` | `fastAgent` | 是 | Agent 引擎选择：fastAgent（FastGPT agent loop）\| piAgent（pi-agent-core 引擎） |
| `SKIP_FILE_TYPE_CHECK` | `false` | 是 | — |

## 基础配置（4 项）

| 变量名 | 默认值 | 默认启用 | 说明 |
| --- | --- | --- | --- |
| `LOG_DEPTH` | `3` | 是 | — |
| `DEFAULT_ROOT_PSW` | 示例值（部署时必须改） | 是 | 默认用户密码（用户名为 root），每次重启会自动更新。 |
| `DB_MAX_LINK` | `20` | 是 | 数据库最大连接数 |
| `SYNC_INDEX` | `true` | 是 | 自动同步索引 |

## 什么情况下这张表会过期

本表按配置模板的当前内容生成，下列情况会使其失效，需要重新核对：

1. **版本升级引入或移除变量。** 升级前应对照目标版本的升级说明逐条核对，
   已被移除的变量若留在配置中可能导致启动失败。
2. **商业版与社区版的配置项不同。** 本表取自社区版配置模板，商业版另有独立配置。
3. **默认值随版本变化。** 表中默认值是模板中的取值，不代表运行时的实际生效值 ——
   容器编排文件、密钥管理服务与启动参数都可能覆盖它。
4. **空白的默认值不等于可以留空。** 密钥类与服务地址类变量模板中不给默认值，
   属于必须按实际环境填写的项。
5. **配置模板中的密钥、令牌、口令都是示例值，上线前必须全部替换。**
   沿用模板示例值等同于把凭证公开，本表因此不列出这些取值。

## 参考资料

- [FastGPT env variables reference — 5957d06](https://github.com/labring/FastGPT/blob/5957d06807ff7f984c70c6425c8d0fc40eb1714d/projects/app/.env.template)
